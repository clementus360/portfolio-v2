// /components/WeatherCard.tsx
"use client";

import { WeatherIcon } from "@/components/Weather/WeatherIcon";
import { useEffect, useRef, useState } from "react";

interface WeatherCardProps {
    location: string; // e.g. "Kigali"
    temperature: number; // e.g. 26
    condition: "cloudyday" | "cloudynight" | "night" | "rain" | "snow" | "sunny" | "thunderstorm";
    localTime?: string; // e.g. "2026-03-02 14:30"
    className?: string; // optional styling
}

export function WeatherCard({ location, temperature, condition, localTime, className }: WeatherCardProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const currentRotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const maxTilt = 12;
        const smoothness = 0.12;
        let animationFrameId = 0;

        const clamp = (value: number, min: number, max: number) => {
            return Math.max(min, Math.min(max, value));
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const offsetX = event.clientX - centerX;
            const offsetY = event.clientY - centerY;

            const normalizedX = clamp(offsetX / (window.innerWidth / 2), -1, 1);
            const normalizedY = clamp(offsetY / (window.innerHeight / 2), -1, 1);

            targetRotationRef.current = {
                x: -normalizedY * maxTilt,
                y: normalizedX * maxTilt,
            };
        };

        const handleMouseLeaveWindow = () => {
            targetRotationRef.current = { x: 0, y: 0 };
        };

        const animate = () => {
            const current = currentRotationRef.current;
            const target = targetRotationRef.current;

            const nextX = current.x + (target.x - current.x) * smoothness;
            const nextY = current.y + (target.y - current.y) * smoothness;

            currentRotationRef.current = { x: nextX, y: nextY };
            setRotation({ x: nextX, y: nextY });

            animationFrameId = window.requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeaveWindow);
        animationFrameId = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeaveWindow);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            style={{
                perspective: "1000px",
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: "preserve-3d",
                willChange: "transform",
                backgroundColor: 'var(--weather-card-bg)',
                borderColor: 'var(--weather-card-border)',
            }}
            className={`
    flex flex-col items-center justify-center 
    p-6 sm:p-8 rounded-sm
    backdrop-blur-md 
    border-2
    shadow-2xl
    z-50
    ${className}
  `}
        >
            <p className="flex items-start text-5xl font-bold text-center font-space-mono">
                {temperature}
                <span className="text-2xl ml-1">°C</span>
            </p>

            <div className="flex flex-col items-center gap-3 mt-4 border-t border-[var(--weather-card-border)] pt-4">
                <h2 className="text-lg font-space-mono font-semibold text-center uppercase tracking-wider">{location}</h2>
                {localTime && (
                    <p className="text-xs font-space-mono opacity-60">{new Date(localTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                )}
                <WeatherIcon condition={condition} className="w-5 h-5 mt-1" />
            </div>
            <div className="mt-4 border-t border-[var(--weather-card-border)] pt-4 w-full">
                <p className="text-[10px] text-center font-space-mono opacity-50">DATA: <a href="https://www.weatherapi.com/" className="font-bold opacity-70" title="Free Weather API">WeatherAPI.com</a></p>
            </div>
        </div>
    );
}