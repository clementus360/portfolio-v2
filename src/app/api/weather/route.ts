import { NextResponse } from "next/server";

const WEATHER_TIMEOUT_MS = 20000;
const WEATHER_MAX_ATTEMPTS = 2;

function isTimeoutLikeError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "TimeoutError" ||
    error.name === "AbortError" ||
    error.message.includes("aborted due to timeout")
  );
}

async function fetchWeatherWithRetry(url: string) {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= WEATHER_MAX_ATTEMPTS; attempt++) {
    try {
      return await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(WEATHER_TIMEOUT_MS),
      });
    } catch (error) {
      lastError = error;

      if (!isTimeoutLikeError(error) || attempt === WEATHER_MAX_ATTEMPTS) {
        throw error;
      }

      console.warn(
        `Weather API timeout on attempt ${attempt}/${WEATHER_MAX_ATTEMPTS}. Retrying...`,
      );
    }
  }

  throw lastError;
}

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
    const weatherResponse = await fetchWeatherWithRetry(weatherApiUrl.toString());

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
    if (isTimeoutLikeError(error)) {
      console.warn("Weather fetch timed out", {
        query,
        timeoutMs: WEATHER_TIMEOUT_MS,
        attempts: WEATHER_MAX_ATTEMPTS,
      });

      return NextResponse.json(
        { error: "Weather service timeout. Please try again." },
        { status: 504 },
      );
    }

    console.error("Weather fetch exception:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
