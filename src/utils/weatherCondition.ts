// helpers/weatherCondition.ts
export type WeatherCardCondition =
  | "cloudyday"
  | "cloudynight"
  | "night"
  | "rain"
  | "snow"
  | "sunny"
  | "thunderstorm";

/**
 * Maps WeatherAPI condition text to WeatherCardCondition
 */
export const mapWeatherCondition = (apiCondition: string, isDay: boolean): WeatherCardCondition => {
    const cond = apiCondition.toLowerCase();

    if (cond.includes("sun") || cond.includes("clear")) {
        return isDay ? "sunny" : "night";
    }
    if (cond.includes("cloud") || cond.includes("overcast")) {
        return isDay ? "cloudyday" : "cloudynight";
    }
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("showers")) {
        return "rain";
    }
    if (cond.includes("snow") || cond.includes("sleet") || cond.includes("blizzard")) {
        return "snow";
    }
    if (cond.includes("thunder") || cond.includes("storm")) {
        return "thunderstorm";
    }
    // fallback
    return isDay ? "sunny" : "night";
};