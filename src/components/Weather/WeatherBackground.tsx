"use client";

import HeatBackground from "./HeatBackground/HeatBackground";
import RainfallBackground from "./RainfallBackground/RainfallBackground";
import SnowBackground from "./SnowBackground/SnowBackground";
import SunBackground from "./SunBackground/SunBackground";
import NightBackground from "./NightBackground/NightBackground";
import CloudBackground from "./CloudBackground/CloudBackground";

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
    windKph?: number;
};

export default function WeatherBackground({
    condition,
    isDay = true,
    windKph = 0,
}: WeatherBackgroundProps) {
    // A starry night sky sits behind every nighttime condition. The more the
    // sky is covered (cloud → rain → storm), the fewer stars peek through — but
    // it's never empty, so some stars always show at night.
    const nightSky = (starDensity: number) => (
        <NightBackground enabled opacity={1} starDensity={starDensity} />
    );

    switch (condition) {
        case "sunny":
            return <div className="absolute inset-0 z-0 pointer-events-none">
                <SunBackground enabled opacity={0.8} />
                <HeatBackground enabled opacity={0.6} />
                <CloudBackground enabled isDay windKph={windKph} density="minimal" />
            </div>;

        case "rain":
        case "thunderstorm":
            return (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {!isDay && nightSky(condition === "thunderstorm" ? 0.25 : 0.35)}
                    <CloudBackground enabled isDay={isDay} windKph={windKph} density="heavy" />
                    <RainfallBackground
                        enabled
                        intensity={condition === "rain" ? 2 : 3}
                        windKph={windKph}
                        color={
                            isDay
                                ? "rgba(40,50,70,0.45)" // darker streaks for day
                                : "rgba(200,215,245,0.5)" // cool bright streaks for night
                        }
                    />
                </div>
            );

        case "snow":
            return (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {!isDay && nightSky(0.45)}
                    <CloudBackground enabled isDay={isDay} windKph={windKph} density="full" />
                    <SnowBackground intensity={2} enabled isDay={isDay} />
                </div>
            );

        case "cloudyday":
            return <CloudBackground enabled isDay windKph={windKph} density="full" />;

        case "cloudynight":
            return (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {nightSky(0.5)}
                    <CloudBackground enabled isDay={false} windKph={windKph} density="full" />
                </div>
            );

        case "night":
            return (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {nightSky(1)}
                    <CloudBackground enabled isDay={false} windKph={windKph} density="minimal" />
                </div>
            );

        default:
            return null;
    }
}