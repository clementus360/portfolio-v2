"use client";

import type React from "react";
import "./LightningFlash.css";

type LightningFlashProps = {
  enabled?: boolean;
};

/**
 * Occasional sky-wide lightning flashes for thunderstorms. Two overlays flash on
 * long, offset cycles so the strikes feel irregular rather than metronomic — a
 * quick double-blink of brightness over the storm clouds. Purely decorative and
 * disabled under reduced-motion.
 */
const LightningFlash: React.FC<LightningFlashProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  return (
    <div className="lightning-flash" aria-hidden="true">
      <div className="lightning-flash__sheet lightning-flash__sheet--a" />
      <div className="lightning-flash__sheet lightning-flash__sheet--b" />
    </div>
  );
};

export default LightningFlash;
