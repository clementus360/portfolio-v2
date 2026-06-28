"use client";

import Image from "next/image";
import type React from "react";
import type { WeatherCondition } from "@/utils/weatherCondition";
import "./CelestialBody.css";

type CelestialBodyProps = {
  isDay: boolean;
  condition: WeatherCondition;
  enabled?: boolean;
};

/**
 * How covered the sky is for each condition, 0 (clear) → 1 (overcast). This is
 * the single knob that keeps the sun/moon *subtle*: the more weather there is in
 * front of them, the more they fade back, so the body always reads as a quiet
 * corner accent behind the scene rather than something competing with the copy.
 */
const COVER: Record<WeatherCondition, number> = {
  sunny: 0,
  night: 0,
  cloudyday: 0.45,
  cloudynight: 0.45,
  fog: 0.65,
  snow: 0.55,
  rain: 0.7,
  thunderstorm: 0.85,
};

/**
 * The sun/moon cycle. One body lives in the top-right corner at a time — the sun
 * by day, the moon by night — each with a soft glow. The lens flare only appears
 * on a genuinely clear day; the moon (a detailed PNG on a black background) is
 * composited with `screen` blend + opacity + a per-condition brightness filter so
 * it melts into whatever night sky sits behind it.
 */
const CelestialBody: React.FC<CelestialBodyProps> = ({
  isDay,
  condition,
  enabled = true,
}) => {
  if (!enabled) return null;

  const cover = COVER[condition] ?? 0;

  if (isDay) {
    // Brightest on a clear day, fading back as cloud/rain rolls in. Lens
    // flare is reserved for the cloudless "sunny" state only.
    const opacity = 0.92 * (1 - cover * 0.65);
    const showFlare = condition === "sunny";

    return (
      <div
        className="celestial celestial--day"
        style={{ opacity }}
        aria-hidden="true"
      >
        <div className="celestial__anchor">
          <span className="celestial__glow celestial__glow--sun" />
          <span className="celestial__disc celestial__disc--sun" />

          {showFlare && (
            <>
              <span className="celestial__flare-streak" />
              <span className="celestial__flare-ring celestial__flare-ring--1" />
              <span className="celestial__flare-ring celestial__flare-ring--2" />
              <span className="celestial__flare-ring celestial__flare-ring--3" />
            </>
          )}
        </div>
      </div>
    );
  }

  const opacity = 0.7 * (1 - cover * 0.6);
  // Dim the disc itself a touch under cloud so it sits *in* the haze rather
  // than punching through it; `screen` blend already drops the PNG's black bg.
  const moonFilter = `brightness(${(1 - cover * 0.35).toFixed(2)}) contrast(1.05)`;

  return (
    <div
      className="celestial celestial--night"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="celestial__anchor">
        <span className="celestial__glow celestial__glow--moon" />
        <div className="celestial__moon" style={{ filter: moonFilter }}>
          <Image
            src="/moon/moon.png"
            alt=""
            fill
            sizes="(max-width: 768px) 110px, 160px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default CelestialBody;
