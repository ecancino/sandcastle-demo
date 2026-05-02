export function renderTemplate(
  template: string,
  data: Record<string, string>
): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => {
    return key in data ? data[key] : match;
  });
}

export const DEFAULT_WEATHER_TEMPLATE = [
  "",
  "  Weather for {{city}}, {{country}}",
  "  {{region}}",
  "",
  "  {{description}}",
  "",
  "  Temperature:   {{temperatureC}}°C / {{temperatureF}}°F",
  "  Feels like:    {{feelsLikeC}}°C / {{feelsLikeF}}°F",
  "  Humidity:      {{humidity}}%",
  "  Wind:          {{windSpeedKmph}} km/h {{windDirection}}",
  "  Pressure:      {{pressure}} hPa",
  "  Visibility:    {{visibility}} km",
  "  UV Index:      {{uvIndex}}",
  "  Precipitation: {{precipitationMM}} mm",
  "",
  "  More details: https://wttr.in/{{city}}",
  "",
].join("\n");
