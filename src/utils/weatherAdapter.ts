// utils/weatherAdapter.ts
//
// THE PROVIDER SEAM. This is the only file that knows WeatherAPI.com's response
// shape. To switch weather providers, rewrite *this file* to map the new payload
// into the normalized `WeatherData` — nothing else in the app references raw
// provider fields.

import {
  mapWeatherCondition,
  type WeatherCondition,
  type WeatherData,
} from "@/utils/weatherCondition";

/** The slice of WeatherAPI.com's current.json response we actually read. */
interface WeatherApiResponse {
  location?: {
    name?: string;
    localtime?: string;
  };
  current?: {
    temp_c?: number;
    is_day?: number;
    wind_kph?: number;
    wind_degree?: number;
    precip_mm?: number;
    cloud?: number;
    vis_km?: number;
    condition?: {
      text?: string;
    };
  };
}

const num = (value: unknown, fallback = 0): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

/**
 * Below this visibility we treat the scene as foggy regardless of the text.
 * Kept tight (true fog, not tropical haze) so a hazy ~2–4 km day in Kigali
 * doesn't get misread as fog. Explicit "mist/fog/haze" text still maps to fog
 * via mapWeatherCondition.
 */
const FOG_VISIBILITY_KM = 1;

/**
 * Normalizes a raw WeatherAPI.com payload into the app's `WeatherData`.
 * Picks the discrete background from the condition text, then enriches it with
 * the physical metrics (precip, cloud, wind) that drive how heavily each
 * background renders.
 */
export const normalizeWeather = (raw: WeatherApiResponse): WeatherData => {
  const current = raw.current ?? {};
  const isDay = current.is_day === 1;
  const visKm = num(current.vis_km, 10);

  let condition: WeatherCondition = mapWeatherCondition(
    current.condition?.text ?? "",
    isDay,
  );

  // Low visibility with no active precipitation reads as fog/mist even when the
  // provider labels it "cloudy" or "clear".
  if (
    condition !== "rain" &&
    condition !== "snow" &&
    condition !== "thunderstorm" &&
    visKm <= FOG_VISIBILITY_KM
  ) {
    condition = "fog";
  }

  return {
    condition,
    isDay,
    location: raw.location?.name ?? "",
    temp_c: num(current.temp_c),
    localTime: raw.location?.localtime ?? "",
    windKph: num(current.wind_kph),
    windDeg: num(current.wind_degree),
    precipMm: num(current.precip_mm),
    cloudPct: num(current.cloud),
  };
};
