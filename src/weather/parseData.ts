export interface WttrResponse {
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

export function parseData(weatherData: WttrResponse): WeatherData {
  const [current] = weatherData.current_condition;
  const [area] = weatherData.nearest_area;
  const [city] = area.areaName;
  const [country] = area.country;
  const [region] = area.region;
  const [description] = current.weatherDesc;

  return {
    city: city.value,
    country: country.value,
    region: region.value,
    temperatureC: current.temp_C,
    temperatureF: current.temp_F,
    feelsLikeC: current.FeelsLikeC,
    feelsLikeF: current.FeelsLikeF,
    humidity: current.humidity,
    windSpeedKmph: current.windspeedKmph,
    windDirection: current.winddir16Point,
    description: description.value,
    visibility: current.visibility,
    pressure: current.pressure,
    uvIndex: current.uvIndex,
    precipitationMM: current.precipMM,
  };
}
