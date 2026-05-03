import { fetchURL, encodeCity } from "./utils.js";
import { parseData, WeatherData, WttrResponse } from "./parseData.js";
import { colorize } from "./colors.js";
import { renderTemplate } from "./template.js";

export async function fetchWeather(city: string): Promise<WeatherData> {
  const weather = await fetchURL<WttrResponse>(
    `https://wttr.in/${encodeCity(city)}?format=j1`,
  );

  return parseData(weather);
}

export function formatWeather(weather: WeatherData): string {
  return renderTemplate(
    colorize({ ...weather, cityUrl: encodeCity(weather.city) }),
  );
}
