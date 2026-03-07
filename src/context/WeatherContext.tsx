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
    refreshWeather: (city?: string, lat?: number, lon?: number) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps>({
    weather: null,
    theme: "day",
    refreshWeather: async () => { },
});

export function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [theme, setTheme] = useState<Theme>("day");

    // Fetch weather once on mount using user's location
    useEffect(() => {
        getUserLocationAndFetchWeather();
    }, []);

    async function getUserLocationAndFetchWeather() {
        if (typeof navigator !== 'undefined' && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // Success: use coordinates
                    const { latitude, longitude } = position.coords;
                    try {
                        await refreshWeather(undefined, latitude, longitude);
                    } catch (error) {
                        // If coordinates fail, fallback to Kigali
                        console.warn("Coordinates weather fetch failed, using fallback:", error);
                        await refreshWeather("Kigali");
                    }
                },
                async (error) => {
                    // Error or denied: fallback to Kigali
                    console.warn("Geolocation error, using fallback:", error.message);
                    await refreshWeather("Kigali");
                }
            );
        } else {
            // Geolocation not supported: fallback to Kigali
            console.warn("Geolocation not supported, using fallback");
            await refreshWeather("Kigali");
        }
    }

    async function refreshWeather(city?: string, lat?: number, lon?: number) {
        try {
            const data = await fetchWeather(city, lat, lon);

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
            if (typeof document !== 'undefined') {
                document.documentElement.classList.remove("day", "night");
                document.documentElement.classList.add(isDay ? "day" : "night");
            }
        } catch (err) {
            console.error("Weather fetch failed", err);
            // If not already using Kigali as fallback, try Kigali
            if (city !== "Kigali" && (lat !== undefined || lon !== undefined)) {
                console.warn("Retrying with fallback location: Kigali");
                try {
                    await refreshWeather("Kigali");
                } catch (fallbackErr) {
                    console.error("Fallback weather fetch also failed", fallbackErr);
                }
            }
        }
    }

    return (
        <WeatherContext.Provider value={{ weather, theme, refreshWeather }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => useContext(WeatherContext);