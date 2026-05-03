import { describe, it, expect } from "vitest";
import { renderTemplate, DEFAULT_WEATHER_TEMPLATE } from "./template.js";

describe("renderTemplate", () => {
  it("replaces a single placeholder using Pug interpolation", () => {
    expect(renderTemplate("| Hello !{name}", { name: "World" })).toBe(
      "Hello World"
    );
  });

  it("replaces multiple different placeholders", () => {
    const result = renderTemplate("| !{city}, !{country}", {
      city: "London",
      country: "UK",
    });
    expect(result).toBe("London, UK");
  });

  it("replaces repeated placeholders", () => {
    const result = renderTemplate("| !{x} and !{x}", { x: "yes" });
    expect(result).toBe("yes and yes");
  });

  it("renders undefined placeholders as empty string", () => {
    expect(renderTemplate("| !{unknown}", {})).toBe("");
  });

  it("does not HTML-escape special characters in output", () => {
    expect(renderTemplate("| !{text}", { text: "a & b < c" })).toBe(
      "a & b < c"
    );
  });

  it("renders multiline Pug templates", () => {
    const template = "| Line 1\n| Line 2";
    expect(renderTemplate(template, {})).toBe("Line 1\nLine 2");
  });

  it("returns empty string for empty template", () => {
    expect(renderTemplate("", { a: "1" })).toBe("");
  });
});

describe("DEFAULT_WEATHER_TEMPLATE", () => {
  it("is a valid Pug template that renders with weather data", () => {
    const data: Record<string, string> = {
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
    const output = renderTemplate(DEFAULT_WEATHER_TEMPLATE, data);
    expect(output).toContain("London");
    expect(output).toContain("United Kingdom");
    expect(output).toContain("18");
    expect(output).toContain("64");
    expect(output).toContain("Partly cloudy");
    expect(output).toContain("72");
    expect(output).toContain("NW");
    expect(output).toContain("15");
    expect(output).toContain("1013");
    expect(output).toContain("https://wttr.in/London");
  });

  it("uses Pug syntax with unescaped interpolation", () => {
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{city}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{country}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{temperatureC}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{temperatureF}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{humidity}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{description}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{windSpeedKmph}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("!{windDirection}");
  });
});
