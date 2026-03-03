"use client"

import { useEffect } from "react";

import { WeatherCard } from "@/components/Weather/WeatherCard";
import { useWeather } from "@/context/WeatherContext";
import WeatherBackground from "@/components/Weather/WeatherBackground";
import Hero from "@/components/Sections/Hero";

export default function Home() {
  const { weather, refreshWeather } = useWeather();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshWeather();
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(intervalId);
  }, [refreshWeather]);

  return (
    <div className="font-roboto pt-54">
      <Hero />

      <div className="w-full h-screen"></div>

      {weather && (
        <WeatherCard
          className="fixed bottom-16 right-32"
          location={weather.location}
          temperature={weather.temp_c}
          condition={weather.condition}
          localTime={weather.localTime}
        />
      )}
      {weather?.condition && (
        <WeatherBackground condition={weather.condition} isDay={weather.isDay} />
      )}
    </div>
  );
}
