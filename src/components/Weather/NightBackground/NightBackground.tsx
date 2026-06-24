"use client";

import React, { useMemo } from "react";
import "./NightBackground.css";

type NightBackgroundProps = {
    enabled?: boolean;
    opacity?: number;
    /**
     * 0–1 multiplier on how many stars show. Clouds/rain hide most of the sky,
     * so cloudy and stormy nights pass a lower value — but never 0, so some
     * stars always peek through.
     */
    starDensity?: number;
};

const STAR_COUNT = 140;

const NightBackground: React.FC<NightBackgroundProps> = ({
    enabled = true,
    opacity = 1,
    starDensity = 1,
}) => {
    // Generate the full star field once on mount. Computing Math.random() in the
    // render body would re-roll every star's position on each re-render (e.g.
    // the hero's glitch timers), which makes the stars visibly snap around.
    const stars = useMemo(
        () =>
            Array.from({ length: STAR_COUNT }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 72}%`, // Keep stars in upper 72%
                size: Math.random() * 1.4 + 0.7,
                delay: Math.random() * 5,
                duration: Math.random() * 3 + 2,
                brightness: Math.random() * 0.5 + 0.4, // Visible on bluish sky (0.4-0.9)
            })),
        [],
    );

    const shootingStars = useMemo(
        () =>
            Array.from({ length: 3 }, (_, i) => ({
                id: i,
                delay: Math.random() * 15 + i * 8, // Stagger appearances
            })),
        [],
    );

    if (!enabled) return null;

    // Slice the field rather than regenerating it, so a denser sky is always a
    // superset of a sparser one (stars never reshuffle when the weather shifts).
    const clampedDensity = Math.max(0, Math.min(1, starDensity));
    const visibleStars = stars.slice(0, Math.round(STAR_COUNT * clampedDensity));
    const visibleShootingStars = clampedDensity >= 0.5 ? shootingStars : shootingStars.slice(0, 1);

    return (
        <div className="night-background" style={{ opacity }}>
            {/* Stars */}
            <div className="stars-container">
                {visibleStars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                            animationDuration: `${star.duration}s`,
                            opacity: star.brightness,
                        }}
                    />
                ))}
            </div>

            {/* Shooting Stars */}
            {visibleShootingStars.map((shootingStar) => (
                <div
                    key={`shooting-${shootingStar.id}`}
                    className="shooting-star"
                    style={{
                        animationDelay: `${shootingStar.delay}s`,
                    }}
                />
            ))}


            {/* Atmospheric Effects */}
            <div className="atmosphere-haze"></div>
            <div className="ground-glow"></div>
        </div>
    );
};

export default NightBackground;
