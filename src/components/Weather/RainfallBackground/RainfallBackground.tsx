"use client";

import type React from "react";
import { useMemo } from "react";
import "./RainfallBackground.css";

type RainfallBackgroundProps = {
  enabled?: boolean;
  /** Roughly 1 (drizzle) → 4 (violent). Drives drop count, length and speed. */
  intensity?: number;
  /** Wind speed in km/h — tilts the sheet of rain and speeds it up a touch. */
  windKph?: number;
  /** Wind bearing in degrees (direction the wind blows *from*) — leans the rain left or right. */
  windDeg?: number;
  /** Streak color; defaults to a soft translucent white. */
  color?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const RainfallBackground: React.FC<RainfallBackgroundProps> = ({
  enabled = true,
  intensity = 2,
  windKph = 0,
  windDeg = 0,
  color,
}) => {
  // The drop field is generated once per intensity level. Keeping the
  // randomness out of the render body stops the rain from re-rolling (and
  // visibly jumping) whenever the hero re-renders.
  const drops = useMemo(() => {
    const level = clamp(intensity, 1, 4);
    const count = Math.round(level * 45); // ~90 for rain, ~135 for storms
    // Heavier rain falls faster and in longer streaks.
    const baseDuration = 1.4 - level * 0.2;

    return Array.from({ length: count }, (_, i) => {
      const duration = clamp(
        baseDuration + Math.random() * 0.4 - 0.1,
        0.4,
        1.5,
      );
      return {
        id: i,
        left: Math.random() * 100,
        length: 6 + level * 1.6 + Math.random() * 5, // vh
        thickness: Math.random() < 0.22 ? 2 : 1,
        duration,
        delay: -Math.random() * duration, // spread across one cycle to pre-fill
        opacity: 0.12 + Math.random() * 0.26,
      };
    });
  }, [intensity]);

  if (!enabled) return null;

  // Wind tilts the rain (capped so it never lies flat) and shortens the fall
  // time slightly, but it always stays in a calm, readable range. The lean
  // *direction* follows the wind bearing: the east–west component of where the
  // wind is blowing decides whether the rain slants right (+) or left (−), so a
  // westerly and an easterly gust visibly differ. A pure N/S wind falls
  // straight (it blows toward/away from the viewer).
  const magnitude = clamp(windKph * 0.4, 0, 24);
  // wind_degree is the direction the wind comes *from*; it travels toward the
  // opposite bearing, whose eastward component is -sin(deg).
  const eastWest = -Math.sin((windDeg * Math.PI) / 180);
  const angle = magnitude * eastWest;
  const speedup = 1 + clamp(windKph / 140, 0, 0.5);
  const rainColor = color ?? "rgba(255, 255, 255, 0.45)";

  return (
    <div className="rainfall-background" aria-hidden="true">
      <div
        className="rainfall-tilt"
        style={
          {
            "--rain-angle": `${angle}deg`,
            "--rain-color": rainColor,
          } as React.CSSProperties
        }
      >
        {drops.map((drop) => (
          <span
            key={drop.id}
            className="raindrop"
            style={
              {
                left: `${drop.left}%`,
                "--len": `${drop.length}vh`,
                "--thickness": `${drop.thickness}px`,
                "--drop-opacity": drop.opacity,
                animationDuration: `${drop.duration / speedup}s`,
                animationDelay: `${drop.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RainfallBackground;
