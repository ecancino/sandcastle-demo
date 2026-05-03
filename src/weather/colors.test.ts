import { describe, it, expect, beforeAll } from "vitest";
import chalk from "chalk";
import { colorizeWeatherValues } from "./colors.js";
import { stripAnsi } from "./test-utils.js";

beforeAll(() => {
  chalk.level = 1;
});

const ESC = "\x1b[";

describe("colorizeWeatherValues", () => {
  const input: Record<string, string> = {
    city: "London",
    country: "United Kingdom",
    region: "Greater London",
    description: "Partly cloudy",
    temperatureC: "18",
    temperatureF: "64",
    feelsLikeC: "16",
    feelsLikeF: "61",
    humidity: "72",
    windSpeedKmph: "15",
    windDirection: "NW",
    pressure: "1013",
    visibility: "10",
    uvIndex: "4",
    precipitationMM: "0.0",
    cityUrl: "London",
  };

  it("returns an object with the same keys", () => {
    const result = colorizeWeatherValues(input);
    expect(Object.keys(result).sort()).toEqual(Object.keys(input).sort());
  });

  it("applies ANSI codes to city", () => {
    const result = colorizeWeatherValues(input);
    expect(result.city).toContain(ESC);
    expect(result.city).toContain("London");
  });

  it("applies ANSI codes to description", () => {
    const result = colorizeWeatherValues(input);
    expect(result.description).toContain(ESC);
    expect(result.description).toContain("Partly cloudy");
  });

  it("applies ANSI codes to temperature values", () => {
    const result = colorizeWeatherValues(input);
    expect(result.temperatureC).toContain(ESC);
    expect(result.temperatureC).toContain("18");
    expect(result.temperatureF).toContain(ESC);
    expect(result.temperatureF).toContain("64");
  });

  it("applies ANSI codes to humidity", () => {
    const result = colorizeWeatherValues(input);
    expect(result.humidity).toContain(ESC);
    expect(result.humidity).toContain("72");
  });

  it("applies ANSI codes to wind values", () => {
    const result = colorizeWeatherValues(input);
    expect(result.windSpeedKmph).toContain(ESC);
    expect(result.windDirection).toContain(ESC);
  });

  it("leaves cityUrl uncolored for valid URLs", () => {
    const result = colorizeWeatherValues(input);
    expect(result.cityUrl).toBe("London");
  });

  it("preserves all original text content within ANSI codes", () => {
    const result = colorizeWeatherValues(input);
    for (const key of Object.keys(input)) {
      expect(stripAnsi(result[key])).toBe(input[key]);
    }
  });
});
