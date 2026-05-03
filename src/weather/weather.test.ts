import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import chalk from "chalk";
import { fetchWeather, formatWeather, type WeatherData } from "./weather.js";

const sampleApiResponse = {
  current_condition: [
    {
      temp_C: "18",
      temp_F: "64",
      FeelsLikeC: "16",
      FeelsLikeF: "61",
      humidity: "72",
      windspeedKmph: "15",
      winddir16Point: "NW",
      weatherDesc: [{ value: "Partly cloudy" }],
      visibility: "10",
      pressure: "1013",
      uvIndex: "4",
      precipMM: "0.0",
    },
  ],
  nearest_area: [
    {
      areaName: [{ value: "London" }],
      country: [{ value: "United Kingdom" }],
      region: [{ value: "City of London, Greater London" }],
    },
  ],
};

const expectedWeatherData: WeatherData = {
  city: "London",
  country: "United Kingdom",
  region: "City of London, Greater London",
  temperatureC: "18",
  temperatureF: "64",
  feelsLikeC: "16",
  feelsLikeF: "61",
  humidity: "72",
  windSpeedKmph: "15",
  windDirection: "NW",
  description: "Partly cloudy",
  visibility: "10",
  pressure: "1013",
  uvIndex: "4",
  precipitationMM: "0.0",
};

beforeAll(() => {
  chalk.level = 1;
});

describe("fetchWeather", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and parses weather data for a city", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(sampleApiResponse),
      })
    );

    const result = await fetchWeather("London");
    expect(result).toEqual(expectedWeatherData);
    expect(fetch).toHaveBeenCalledWith(
      "https://wttr.in/London?format=j1",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it("encodes city names with spaces", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(sampleApiResponse),
      })
    );

    await fetchWeather("New York");
    expect(fetch).toHaveBeenCalledWith(
      "https://wttr.in/New+York?format=j1",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    await expect(fetchWeather("InvalidCity123")).rejects.toThrow(
      "Failed to fetch weather: 404"
    );
  });
});

describe("formatWeather", () => {
  it("formats weather data as a readable string", () => {
    const output = formatWeather(expectedWeatherData);

    expect(output).toContain("London");
    expect(output).toContain("United Kingdom");
    expect(output).toContain("18°C");
    expect(output).toContain("64°F");
    expect(output).toContain("Partly cloudy");
    expect(output).toContain("72%");
    expect(output).toContain("NW");
    expect(output).toContain("15 km/h");
    expect(output).toContain("1013 hPa");
    expect(output).toContain("10 km");
    expect(output).toContain("0.0 mm");
  });

  it("includes a link to more details", () => {
    const output = formatWeather(expectedWeatherData);
    expect(output).toContain("https://wttr.in/London");
  });

  it("accepts a custom template", () => {
    const output = formatWeather(
      expectedWeatherData,
      "| !{city}: !{temperatureC}°C"
    );
    expect(output).toBe("London: 18°C");
  });

  it("uses the default template when none is provided", () => {
    const defaultOutput = formatWeather(expectedWeatherData);
    const explicitDefault = formatWeather(expectedWeatherData, undefined);
    expect(defaultOutput).toBe(explicitDefault);
  });

  it("applies ANSI color codes when color option is true", () => {
    const output = formatWeather(expectedWeatherData, undefined, {
      color: true,
    });
    expect(output).toContain("\x1b[");
  });

  it("does not apply ANSI codes by default", () => {
    const output = formatWeather(expectedWeatherData);
    expect(output).not.toContain("\x1b[");
  });

  it("colored output still contains all weather data", () => {
    const output = formatWeather(expectedWeatherData, undefined, {
      color: true,
    });
    const stripped = output.replace(/\x1b\[[0-9;]*m/g, "");
    expect(stripped).toContain("London");
    expect(stripped).toContain("United Kingdom");
    expect(stripped).toContain("18°C");
    expect(stripped).toContain("64°F");
    expect(stripped).toContain("Partly cloudy");
    expect(stripped).toContain("72%");
    expect(stripped).toContain("NW");
    expect(stripped).toContain("https://wttr.in/London");
  });

  it("does not colorize when using a custom template", () => {
    const output = formatWeather(
      expectedWeatherData,
      "| !{city}: !{temperatureC}°C",
      { color: true }
    );
    expect(output).not.toContain("\x1b[");
    expect(output).toBe("London: 18°C");
  });
});
