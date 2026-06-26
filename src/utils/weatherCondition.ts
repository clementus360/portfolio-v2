// helpers/weatherCondition.ts

/**
 * The discrete visual states the hero background can render. This is the app's
 * own vocabulary — it is intentionally decoupled from any specific weather
 * provider. Only the adapter (see weatherAdapter.ts) knows about a provider's
 * field names, so swapping APIs later touches one file, not this type.
 */
export type WeatherCondition =
  | "cloudyday"
  | "cloudynight"
  | "night"
  | "rain"
  | "snow"
  | "sunny"
  | "thunderstorm"
  | "fog";

/** @deprecated use {@link WeatherCondition}. Kept as an alias for older imports. */
export type WeatherCardCondition = WeatherCondition;

/** Cloud-cover buckets the CloudBackground understands. */
export type CloudDensity = "minimal" | "light" | "full" | "heavy";

/**
 * Normalized weather, in the app's own units. Everything downstream (context,
 * backgrounds, card) consumes this shape — never a raw provider payload.
 * The numeric fields are standard meteorological quantities that virtually every
 * weather API returns, which is what makes the visuals portable: we tune off
 * physical measurements, not provider-specific condition codes.
 */
export interface WeatherData {
  condition: WeatherCondition;
  isDay: boolean;
  location: string;
  temp_c: number;
  localTime: string;
  /** Wind speed, km/h. Drives rain/cloud speed and tilt. */
  windKph: number;
  /** Wind bearing, degrees (0–360, direction the wind blows *from*). Drives rain lean direction. */
  windDeg: number;
  /** Precipitation rate, mm/hr. Drives rain & snow amount. */
  precipMm: number;
  /** Cloud cover, 0–100%. Drives cloud density. */
  cloudPct: number;
}

/**
 * Classifies a human-readable condition string into a discrete visual state.
 * Text classification is deliberately provider-agnostic — most APIs return a
 * comparable phrase. The *intensity* of the weather comes from the physical
 * metrics on {@link WeatherData}, not from this string.
 */
export const mapWeatherCondition = (
  apiCondition: string,
  isDay: boolean,
): WeatherCondition => {
  const cond = apiCondition.toLowerCase();

  // Thunder first: "patchy light rain with thunder" also contains "rain", so
  // it must be caught before the rain check or storms would read as plain rain.
  if (cond.includes("thunder") || cond.includes("storm")) {
    return "thunderstorm";
  }
  if (
    cond.includes("snow") ||
    cond.includes("sleet") ||
    cond.includes("blizzard")
  ) {
    return "snow";
  }
  if (
    cond.includes("rain") ||
    cond.includes("drizzle") ||
    cond.includes("showers")
  ) {
    return "rain";
  }
  // Mist / fog / haze get their own drifting-fog treatment.
  if (cond.includes("fog") || cond.includes("mist") || cond.includes("haze")) {
    return "fog";
  }
  if (cond.includes("cloud") || cond.includes("overcast")) {
    return isDay ? "cloudyday" : "cloudynight";
  }
  if (cond.includes("sun") || cond.includes("clear")) {
    return isDay ? "sunny" : "night";
  }
  // fallback
  return isDay ? "sunny" : "night";
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Precipitation rate (mm/hr) → rain/snow intensity level (1–4), using the
 * standard meteorological bands: light < 2.5, moderate < 7.6, heavy < 50,
 * violent ≥ 50. A floor keeps a visible amount of precipitation whenever the
 * condition itself is rain/snow even if the reported rate rounds to ~0.
 */
export const precipToIntensity = (precipMm: number, floor = 1): number => {
  let level = 1;
  if (precipMm >= 50) level = 4;
  else if (precipMm >= 7.6) level = 3;
  else if (precipMm >= 2.5) level = 2;
  return clamp(Math.max(level, floor), 1, 4);
};

/**
 * Cloud cover (0–100%) → CloudBackground density bucket. `minFloor` lets callers
 * guarantee a covered sky for conditions that imply cloud (rain, snow, storm)
 * regardless of the raw percentage.
 */
export const cloudPctToDensity = (
  cloudPct: number,
  minFloor: CloudDensity = "minimal",
): CloudDensity => {
  const order: CloudDensity[] = ["minimal", "light", "full", "heavy"];
  let bucket: CloudDensity = "minimal";
  if (cloudPct >= 75) bucket = "heavy";
  else if (cloudPct >= 40) bucket = "full";
  else if (cloudPct >= 15) bucket = "light";
  return order[Math.max(order.indexOf(bucket), order.indexOf(minFloor))];
};
