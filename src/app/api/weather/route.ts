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
    query = city.trim().replace(/[.,;:!?]+$/g, "");
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
      signal: AbortSignal.timeout(10000),
    });

    const contentType = weatherResponse.headers.get("content-type") || "";
    const responseText = await weatherResponse.text();
    let weatherData: Record<string, unknown> | null = null;

    if (responseText) {
      if (contentType.includes("application/json")) {
        weatherData = JSON.parse(responseText) as Record<string, unknown>;
      } else {
        try {
          weatherData = JSON.parse(responseText) as Record<string, unknown>;
        } catch {
          weatherData = null;
        }
      }
    }

    if (!weatherResponse.ok) {
      console.error("Weather API error:", {
        status: weatherResponse.status,
        contentType,
        bodyPreview: responseText.slice(0, 200),
      });

      const weatherError =
        weatherData &&
        typeof weatherData === "object" &&
        "error" in weatherData &&
        weatherData.error &&
        typeof weatherData.error === "object" &&
        "message" in weatherData.error &&
        typeof weatherData.error.message === "string"
          ? weatherData.error.message
          : "Weather API request failed";

      return NextResponse.json(
        { error: weatherError },
        { status: weatherResponse.status },
      );
    }

    if (!weatherData) {
      console.error("Weather API returned non-JSON success response", {
        contentType,
        bodyPreview: responseText.slice(0, 200),
      });

      return NextResponse.json(
        { error: "Weather API returned invalid response format" },
        { status: 502 },
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
