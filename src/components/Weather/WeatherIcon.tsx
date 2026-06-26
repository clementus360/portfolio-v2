// /components/icons/WeatherIcon.tsx

import type { ReactNode } from "react";
import { CloudyDay } from "@/components/Icons/weather/CloudyDay";
import { CloudyNight } from "@/components/Icons/weather/CloudyNight";
import { Night } from "@/components/Icons/weather/Night";
import { Rain } from "@/components/Icons/weather/Rain";
import { Snow } from "@/components/Icons/weather/Snow";
import { Sunny } from "@/components/Icons/weather/Sunny";
import { Thunderstorm } from "@/components/Icons/weather/Thunderstorm";
import type { WeatherCondition } from "@/utils/weatherCondition";

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string; // allows passing Tailwind color/size
}

export function WeatherIcon({ condition, className }: WeatherIconProps) {
  const icons: Record<WeatherCondition, ReactNode> = {
    cloudyday: <CloudyDay className={className} />,
    cloudynight: <CloudyNight className={className} />,
    night: <Night className={className} />,
    rain: <Rain className={className} />,
    snow: <Snow className={className} />,
    sunny: <Sunny className={className} />,
    thunderstorm: <Thunderstorm className={className} />,
    // No dedicated fog glyph — the cloudy icon reads closest.
    fog: <CloudyDay className={className} />,
  };

  return icons[condition] || <Sunny className={className} />; // fallback
}
