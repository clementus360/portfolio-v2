"use client";

import type React from "react";
import "./SunBackground.css";

type SunBackgroundProps = {
  enabled?: boolean;
  opacity?: number; // global fade
};

const SunBackground: React.FC<SunBackgroundProps> = ({
  enabled = true,
  opacity = 0.8,
}) => {
  if (!enabled) return null;

  // Warm daytime sky wash only. The sun disc, its glow and the lens flare now
  // live in CelestialBody, so a single component owns the whole sun/moon cycle.
  return <div className="sun-background" style={{ opacity }} />;
};

export default SunBackground;
