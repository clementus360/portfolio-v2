"use client";

import { useMemo } from "react";
import "./SnowBackground.css";

type SnowBackgroundProps = {
    intensity?: number;
    enabled?: boolean;
    isDay?: boolean;
};

type Snowflake = {
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    opacity: number;
};

const buildSnowflakes = (count: number): Snowflake[] => {
    return Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 3 + Math.random() * 7,
        duration: 7 + Math.random() * 10,
        delay: Math.random() * 10,
        drift: -50 + Math.random() * 100,
        opacity: 0.35 + Math.random() * 0.65,
    }));
};

export default function SnowBackground({
    intensity = 2,
    enabled = true,
    isDay = true,
}: SnowBackgroundProps) {
    const count = Math.max(20, intensity * 35);

    const snowflakes = useMemo(() => buildSnowflakes(count), [count]);

    if (!enabled) {
        return null;
    }

    return (
        <div className="snow-background" aria-hidden>
            <div className={`snow-glow ${isDay ? "snow-glow-day" : "snow-glow-night"}`} />

            {snowflakes.map((flake, index) => (
                <span
                    key={`snowflake-${index}`}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        opacity: flake.opacity,
                        animationDuration: `${flake.duration}s`,
                        animationDelay: `${flake.delay}s`,
                        ["--snow-drift" as string]: `${flake.drift}px`,
                    }}
                />
            ))}
        </div>
    );
}