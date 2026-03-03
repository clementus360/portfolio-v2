export const fetchWeather = async (location: string) => {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(location)}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
};
