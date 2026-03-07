import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  // Determine the query parameter for the weather API
  let query: string;
  
  if (lat && lon) {
    // Use coordinates if provided
    query = `${lat},${lon}`;
  } else if (city && city.trim()) {
    // Use city name
    query = city;
  } else {
    // Default to Kigali
    query = "Kigali";
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
  weatherApiUrl.searchParams.set("q", query);

  console.log("Fetching weather for query:", query);

  try {
    const weatherResponse = await fetch(weatherApiUrl.toString(), {
      cache: "no-store",
    });

    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      console.error("Weather API error:", weatherData);
      return NextResponse.json(
        { error: weatherData?.error?.message || "Weather API request failed" },
        { status: weatherResponse.status },
      );
    }

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Weather fetch exception:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
