"use client";

import { memo } from "react";
import {
  cloudPctToDensity,
  precipToIntensity,
  type WeatherCondition,
} from "@/utils/weatherCondition";
import CelestialBody from "./CelestialBody/CelestialBody";
import CloudBackground from "./CloudBackground/CloudBackground";
import FogBackground from "./FogBackground/FogBackground";
import HeatBackground from "./HeatBackground/HeatBackground";
import LightningFlash from "./LightningFlash/LightningFlash";
import NightBackground from "./NightBackground/NightBackground";
import RainfallBackground from "./RainfallBackground/RainfallBackground";
import SnowBackground from "./SnowBackground/SnowBackground";
import SunBackground from "./SunBackground/SunBackground";

type WeatherBackgroundProps = {
  condition: WeatherCondition;
  isDay?: boolean;
  windKph?: number;
  /** Wind bearing, degrees — leans the rain left/right. */
  windDeg?: number;
  /** Precipitation rate, mm/hr — drives rain & snow amount. */
  precipMm?: number;
  /** Cloud cover, 0–100% — drives cloud density. */
  cloudPct?: number;
};

function WeatherBackground({
  condition,
  isDay = true,
  windKph = 0,
  windDeg = 0,
  precipMm = 0,
  cloudPct = 0,
}: WeatherBackgroundProps) {
  // A starry night sky sits behind every nighttime condition. The more the
  // sky is covered (cloud → rain → storm), the fewer stars peek through — but
  // it's never empty, so some stars always show at night.
  const nightSky = (starDensity: number) => (
    <NightBackground enabled opacity={1} starDensity={starDensity} />
  );

  // The sun/moon cycle is rendered last (on top of the sky wash / star field of
  // each scene) so the body is always visible, then faded back per-condition so
  // it stays a subtle corner accent. Computed once here and appended to whatever
  // scene the switch returns.
  const scene = (() => {
    switch (condition) {
      case "sunny":
        return (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <SunBackground enabled opacity={0.8} />
            <HeatBackground enabled opacity={0.6} />
            {/* Even on a clear day there can be a few clouds — let the real
                    cover decide, but never more than light. */}
            <CloudBackground
              enabled
              isDay
              windKph={windKph}
              density={cloudPctToDensity(Math.min(cloudPct, 30))}
            />
          </div>
        );

      case "rain":
      case "thunderstorm": {
        const isStorm = condition === "thunderstorm";
        // Rain amount from the precipitation rate; storms get a one-level
        // bump and a floor so they always read as a downpour.
        const intensity =
          precipToIntensity(precipMm, isStorm ? 3 : 1) + (isStorm ? 1 : 0);
        // Rain implies a covered sky — floor the cloud cover accordingly.
        const density = cloudPctToDensity(cloudPct, isStorm ? "heavy" : "full");

        return (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {!isDay && nightSky(isStorm ? 0.25 : 0.35)}
            <CloudBackground
              enabled
              isDay={isDay}
              windKph={windKph}
              density={density}
            />
            <RainfallBackground
              enabled
              intensity={intensity}
              windKph={windKph}
              windDeg={windDeg}
              color={
                isDay
                  ? "rgba(40,50,70,0.45)" // darker streaks for day
                  : "rgba(200,215,245,0.5)" // cool bright streaks for night
              }
            />
            {isStorm && <LightningFlash enabled />}
          </div>
        );
      }

      case "snow":
        return (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {!isDay && nightSky(0.45)}
            <CloudBackground
              enabled
              isDay={isDay}
              windKph={windKph}
              density={cloudPctToDensity(cloudPct, "full")}
            />
            <SnowBackground
              intensity={precipToIntensity(precipMm)}
              enabled
              isDay={isDay}
            />
          </div>
        );

      case "fog":
        return (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {!isDay && nightSky(0.3)}
            {/* Mist sits under a real sky — keep some cloud cover behind the haze
              instead of a bare gradient. */}
            <CloudBackground
              enabled
              isDay={isDay}
              windKph={windKph}
              density={cloudPctToDensity(cloudPct, "full")}
            />
            <FogBackground enabled isDay={isDay} windKph={windKph} />
          </div>
        );

      case "cloudyday":
        return (
          <CloudBackground
            enabled
            isDay
            windKph={windKph}
            density={cloudPctToDensity(cloudPct, "light")}
          />
        );

      case "cloudynight":
        return (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {nightSky(0.5)}
            <CloudBackground
              enabled
              isDay={false}
              windKph={windKph}
              density={cloudPctToDensity(cloudPct, "light")}
            />
          </div>
        );

      case "night":
        return (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {nightSky(1)}
            <CloudBackground
              enabled
              isDay={false}
              windKph={windKph}
              density={cloudPctToDensity(Math.min(cloudPct, 30))}
            />
          </div>
        );

      default:
        return null;
    }
  })();

  return (
    <>
      {scene}
      <CelestialBody isDay={isDay} condition={condition} />
    </>
  );
}

// Props are all primitives, so the default shallow comparison keeps the whole
// weather particle tree from re-rendering when Hero re-renders for unrelated
// reasons (its language/skill glitch timers fire several times a minute).
export default memo(WeatherBackground);
