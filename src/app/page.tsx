"use client";

import { useEffect } from "react";

import { WeatherCard } from "@/components/Weather/WeatherCard";
import { useWeather } from "@/context/WeatherContext";
import WeatherBackground from "@/components/Weather/WeatherBackground";
import Hero from "@/components/Sections/Hero";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import About from "@/components/Sections/About";
import Contact from "@/components/Sections/Contact";

export default function Home() {
  const { weather, refreshWeather } = useWeather();

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        refreshWeather();
      },
      15 * 60 * 1000,
    ); // Refresh every 15 minutes

    return () => clearInterval(intervalId);
  }, [refreshWeather]);

  return (
    <div className="font-roboto pt-54 overflow-x-hidden">
      <Hero />
      <About />
      <ProjectsSection />
      <Contact />

      {weather && (
        <WeatherCard
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-16 lg:right-32"
          location={weather.location}
          temperature={weather.temp_c}
          condition={weather.condition}
          localTime={weather.localTime}
        />
      )}
      {weather?.condition && (
        <WeatherBackground
          condition={weather.condition}
          isDay={weather.isDay}
        />
      )}

      <Footer />
    </div>
  );
}
