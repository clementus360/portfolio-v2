"use client";

import React from "react";
import "./NightBackground.css";

type NightBackgroundProps = {
    enabled?: boolean;
    opacity?: number;
};

const NightBackground: React.FC<NightBackgroundProps> = ({
    enabled = true,
    opacity = 1,
}) => {
    if (!enabled) return null;

    // Generate random stars (biased toward top half)
    const stars = Array.from({ length: 120 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 70}%`, // Keep stars in upper 70%
        size: Math.random() * 1 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        brightness: Math.random() * 0.4 + 0.1, // Much dimmer (0.1-0.5)
    }));

    // Generate shooting stars
    const shootingStars = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        delay: Math.random() * 15 + i * 8, // Stagger appearances
    }));

    return (
        <div className="night-background" style={{ opacity }}>
            {/* Stars */}
            <div className="stars-container">
                {stars.map((star) => (
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
            {shootingStars.map((shootingStar) => (
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
