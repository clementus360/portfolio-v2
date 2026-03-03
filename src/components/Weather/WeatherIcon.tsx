// /components/icons/WeatherIcon.tsx
import { CloudyDay } from "@/components/Icons/weather/CloudyDay";
import { CloudyNight } from "@/components/Icons/weather/CloudyNight";
import { Night } from "@/components/Icons/weather/Night";
import { Rain } from "@/components/Icons/weather/Rain";
import { Snow } from "@/components/Icons/weather/Snow";
import { Sunny } from "@/components/Icons/weather/Sunny";
import { Thunderstorm } from "@/components/Icons/weather/Thunderstorm";

type WeatherCondition =
    | "cloudyday"
    | "cloudynight"
    | "night"
    | "rain"
    | "snow"
    | "sunny"
    | "thunderstorm";

interface WeatherIconProps {
    condition: WeatherCondition;
    className?: string; // allows passing Tailwind color/size
}

export function WeatherIcon({ condition, className }: WeatherIconProps) {
    const icons = {
        cloudyday: <CloudyDay className={className} />,
        cloudynight: <CloudyNight className={className} />,
        night: <Night className={className} />,
        rain: <Rain className={className} />,
        snow: <Snow className={className} />,
        sunny: <Sunny className={className} />,
        thunderstorm: <Thunderstorm className={className} />,
    };

    return icons[condition] || <Sunny className={className} />; // fallback
}