export const fetchWeather = async (city?: string, lat?: number, lon?: number) => {
  let url = "/api/weather";
  
  if (lat !== undefined && lon !== undefined) {
    // Use coordinates if provided
    url += `?lat=${lat}&lon=${lon}`;
  } else if (city) {
    // Use city name if provided
    url += `?city=${encodeURIComponent(city)}`;
  } else {
    // Default to Kigali
    url += "?city=Kigali";
  }
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
};
