"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchWeather } from "@/utils/weatherApi";
import { mapWeatherCondition } from "@/utils/weatherCondition";

type Theme = "day" | "night";

type WeatherCondition =
    | "cloudyday"
    | "cloudynight"
    | "night"
    | "rain"
    | "snow"
    | "sunny"
    | "thunderstorm";

interface WeatherData {
    location: string;
    temp_c: number;
    condition: WeatherCondition;
    isDay: boolean;
    localTime: string;
}

interface WeatherContextProps {
    weather: WeatherData | null;
    theme: Theme;
    refreshWeather: (city?: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps>({
    weather: null,
    theme: "day",
    refreshWeather: async () => { },
});

export function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [theme, setTheme] = useState<Theme>("day");

    // Fetch weather once on mount
    useEffect(() => {
        refreshWeather("Kigali");
    }, []);

    async function refreshWeather(city: string = "Kigali") {
        try {
            const data = await fetchWeather(city);

            console.log("Fetched weather data:", data);
            const isDay = data.current.is_day === 1;

            const mappedWeather: WeatherData = {
                location: data.location.name,
                temp_c: data.current.temp_c,
                condition: mapWeatherCondition(data.current.condition.text, isDay),
                isDay,
                localTime: data.location.localtime,
            };

            setWeather(mappedWeather);
            setTheme(isDay ? "day" : "night");

            // Apply global theme to <html>
            document.documentElement.classList.remove("day", "night");
            document.documentElement.classList.add(isDay ? "day" : "night");
        } catch (err) {
            console.error("Weather fetch failed", err);
        }
    }

    return (
        <WeatherContext.Provider value={{ weather, theme, refreshWeather }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => useContext(WeatherContext);