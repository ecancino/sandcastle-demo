import { fetch } from "undici";
import { renderTemplate, DEFAULT_WEATHER_TEMPLATE } from "./template.js";
import { colorizeWeatherValues } from "./colors.js";

interface WttrResponse {
  current_condition: Array<{
    temp_C: string;
    temp_F: string;
    FeelsLikeC: string;
    FeelsLikeF: string;
    humidity: string;
    windspeedKmph: string;
    winddir16Point: string;
    weatherDesc: Array<{ value: string }>;
    visibility: string;
    pressure: string;
    uvIndex: string;
    precipMM: string;
  }>;
  nearest_area: Array<{
    areaName: Array<{ value: string }>;
    country: Array<{ value: string }>;
    region: Array<{ value: string }>;
  }>;
}

export interface WeatherData {
  [key: string]: string;
  city: string;
  country: string;
  region: string;
  temperatureC: string;
  temperatureF: string;
  feelsLikeC: string;
  feelsLikeF: string;
  humidity: string;
  windSpeedKmph: string;
  windDirection: string;
  description: string;
  visibility: string;
  pressure: string;
  uvIndex: string;
  precipitationMM: string;
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const encodedCity = city.replace(/ /g, "+");
  const url = `https://wttr.in/${encodedCity}?format=j1`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Failed to fetch weather: ${response.status}`);
    }

    const data = (await response.json()) as WttrResponse;
    const current = data.current_condition[0];
    const area = data.nearest_area[0];

    return {
      city: area.areaName[0].value,
      country: area.country[0].value,
      region: area.region[0].value,
      temperatureC: current.temp_C,
      temperatureF: current.temp_F,
      feelsLikeC: current.FeelsLikeC,
      feelsLikeF: current.FeelsLikeF,
      humidity: current.humidity,
      windSpeedKmph: current.windspeedKmph,
      windDirection: current.winddir16Point,
      description: current.weatherDesc[0].value,
      visibility: current.visibility,
      pressure: current.pressure,
      uvIndex: current.uvIndex,
      precipitationMM: current.precipMM,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function formatWeather(data: WeatherData): string {
  const templateData: Record<string, string> = {
    ...data,
    cityUrl: data.city.replace(/ /g, "+"),
  };

  return renderTemplate(
    DEFAULT_WEATHER_TEMPLATE,
    colorizeWeatherValues(templateData),
  );
}
