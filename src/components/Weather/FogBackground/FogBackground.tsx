"use client";

import type React from "react";
import "./FogBackground.css";

type FogBackgroundProps = {
  enabled?: boolean;
  isDay?: boolean;
  /** 0–1; thicker fog = more opaque, slower bands. Defaults to a medium mist. */
  density?: number;
  windKph?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Slow drifting sheets of fog. A few oversized, heavily-blurred gradient bands
 * glide across each other at different speeds to read as a soft, shifting haze
 * rather than a flat wash. Wind speeds the drift up a touch.
 */
const FogBackground: React.FC<FogBackgroundProps> = ({
  enabled = true,
  isDay = true,
  density = 0.6,
  windKph = 0,
}) => {
  if (!enabled) return null;

  const d = clamp(density, 0.2, 1);
  // Calm fog drifts very slowly; wind shortens the loop but it stays serene.
  const speedup = 1 + clamp(windKph / 120, 0, 0.6);

  return (
    <div
      className={`fog-background ${isDay ? "fog-background--day" : "fog-background--night"}`}
      aria-hidden="true"
      style={
        {
          "--fog-opacity": d,
          "--fog-speedup": speedup,
        } as React.CSSProperties
      }
    >
      <div className="fog-band fog-band--1" />
      <div className="fog-band fog-band--2" />
      <div className="fog-band fog-band--3" />
    </div>
  );
};

export default FogBackground;
