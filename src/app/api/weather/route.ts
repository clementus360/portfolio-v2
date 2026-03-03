import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Kigali";

  if (!city.trim()) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server weather API key is missing" },
      { status: 500 },
    );
  }

  const weatherApiUrl = new URL("https://api.weatherapi.com/v1/current.json");
  weatherApiUrl.searchParams.set("key", apiKey);
  weatherApiUrl.searchParams.set("q", city);

  try {
    const weatherResponse = await fetch(weatherApiUrl.toString(), {
      cache: "no-store",
    });

    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      return NextResponse.json(
        { error: weatherData?.error?.message || "Weather API request failed" },
        { status: weatherResponse.status },
      );
    }

    return NextResponse.json(weatherData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
