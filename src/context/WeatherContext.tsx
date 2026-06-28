"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { normalizeWeather } from "@/utils/weatherAdapter";
import { fetchWeather } from "@/utils/weatherApi";
import type { WeatherData } from "@/utils/weatherCondition";

type Theme = "day" | "night";

interface WeatherContextProps {
  weather: WeatherData | null;
  theme: Theme;
  refreshWeather: (city?: string, lat?: number, lon?: number) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps>({
  weather: null,
  theme: "day",
  refreshWeather: async () => {},
});

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState<Theme>("day");

  const refreshWeather = useCallback(
    async (city?: string, lat?: number, lon?: number) => {
      try {
        const data = await fetchWeather(city, lat, lon);

        console.log("Fetched weather data:", data);
        const mappedWeather = normalizeWeather(data);

        setWeather(mappedWeather);
        setTheme(mappedWeather.isDay ? "day" : "night");

        // Apply global theme to <html> in a single class swap so the browser
        // does one style recalc instead of one per add/remove.
        if (typeof document !== "undefined") {
          const root = document.documentElement;
          root.classList.toggle("day", mappedWeather.isDay);
          root.classList.toggle("night", !mappedWeather.isDay);
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
    },
    [],
  );

  const getUserLocationAndFetchWeather = useCallback(() => {
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Success: use coordinates
          const { latitude, longitude } = position.coords;
          try {
            await refreshWeather(undefined, latitude, longitude);
          } catch (error) {
            // If coordinates fail, fallback to Kigali
            console.warn(
              "Coordinates weather fetch failed, using fallback:",
              error,
            );
            await refreshWeather("Kigali");
          }
        },
        async (error) => {
          // Error or denied: fallback to Kigali
          console.warn("Geolocation error, using fallback:", error.message);
          await refreshWeather("Kigali");
        },
      );
    } else {
      // Geolocation not supported: fallback to Kigali
      console.warn("Geolocation not supported, using fallback");
      refreshWeather("Kigali");
    }
  }, [refreshWeather]);

  // Fetch weather once on mount using the user's location.
  useEffect(() => {
    getUserLocationAndFetchWeather();
  }, [getUserLocationAndFetchWeather]);

  // Stable context value — only changes when the weather or theme actually
  // changes, so consumers (and the weather particle systems) don't re-render on
  // unrelated parent renders.
  const value = useMemo(
    () => ({ weather, theme, refreshWeather }),
    [weather, theme, refreshWeather],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
