"use client"

import React, { useEffect, useRef } from "react";
import "./RainBackground.css";

type RainBackgroundProps = {
    intensity?: number;  // drops per cycle
    interval?: number;   // ms per cycle
    enabled?: boolean;   // toggle rain on/off
    color?: string;      // ripple border color
};

const RainBackground: React.FC<RainBackgroundProps> = ({
    intensity = 1,
    interval = 800,
    enabled = true,
    color = "rgba(0,0,0,0.5)",
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const createRipples = (x: number, y: number) => {
        if (!containerRef.current) return;

        const rippleCount = 2 + Math.floor(Math.random() * 2); // 2–3 ripples
        for (let i = 0; i < rippleCount; i++) {
            const delay = i * 100;
            setTimeout(() => {
                const ripple = document.createElement("div");
                ripple.classList.add("ripple");

                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                const size = 120 + i * 240;
                const duration = 0.9 + i * 0.2;

                ripple.style.setProperty("--ripple-size", `${size}px`);
                ripple.style.setProperty("--ripple-duration", `${duration}s`);
                ripple.style.setProperty("--ripple-color", color);

                containerRef.current?.appendChild(ripple);

                ripple.addEventListener("animationend", () => ripple.remove());
            }, delay);
        }
    };

    const createRain = () => {
        if (typeof window === 'undefined') return;
        
        for (let i = 0; i < intensity; i++) {
            const jitter = Math.random() * (interval * 0.8);
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createRipples(x, y);
            }, jitter);
        }
    };

    useEffect(() => {
        if (enabled) {
            intervalRef.current = setInterval(createRain, interval);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [enabled, intensity, interval]);

    // Click handler for manual ripple
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createRipples(x, y);
    };

    return <div ref={containerRef} className="rain-background" onClick={handleClick} aria-hidden="true" />;
};

export default RainBackground;