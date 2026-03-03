export const fetchWeather = async (location: string) => {
    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`
    );
    if (!res.ok) throw new Error("Weather fetch failed");
    return res.json();
};