"use client";

import HeatBackground from "./HeatBackground/HeatBackground";
import RainBackground from "./RainBackground/RainBacground";
import SnowBackground from "./SnowBackground/SnowBackground";
import SunBackground from "./SunBackground/SunBackground";
import NightBackground from "./NightBackground/NightBackground";

type WeatherCondition =
    | "cloudyday"
    | "cloudynight"
    | "night"
    | "rain"
    | "snow"
    | "sunny"
    | "thunderstorm";

type WeatherBackgroundProps = {
    condition: WeatherCondition;
    isDay?: boolean;
};

export default function WeatherBackground({
    condition,
    isDay = true,
}: WeatherBackgroundProps) {
    switch (condition) {
        case "sunny":
            return <div className="fixed inset-0 z-[-1]">
                <SunBackground enabled opacity={0.8} />
                <HeatBackground enabled opacity={0.6} />
            </div>;

        case "rain":
        case "thunderstorm":
            return (
                <RainBackground
                    intensity={condition === "rain" ? 2 : 3}
                    interval={condition === "rain" ? 800 : 500}
                    enabled
                    color={
                        isDay
                            ? "rgba(0,0,0,0.4)" // softer for day
                            : "rgba(255,255,255,0.6)" // brighter contrast for night
                    }
                />
            );

        case "snow":
            return <SnowBackground intensity={2} enabled isDay={isDay} />;

        case "cloudyday":
        case "cloudynight":
            return (
                <div className="fixed inset-0 z-[-1]">
                    {/* ☁️ Placeholder — could animate clouds later */}
                    <div
                        className={`absolute inset-0 ${isDay ? "bg-gray-200/40" : "bg-gray-800/60"
                            }`}
                    />
                </div>
            );

        case "night":
            return (
                <div className="fixed inset-0 z-[-1]">
                    <NightBackground enabled opacity={1} />
                </div>
            );

        default:
            return null;
    }
}