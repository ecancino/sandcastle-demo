import { describe, it, expect } from "vitest";
import { renderTemplate } from "./template.js";

const weatherData: Record<string, string> = {
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

describe("renderTemplate", () => {
  it("renders all weather fields", () => {
    const output = renderTemplate(weatherData);
    expect(output).toContain("London");
    expect(output).toContain("United Kingdom");
    expect(output).toContain("18");
    expect(output).toContain("64");
    expect(output).toContain("Partly cloudy");
    expect(output).toContain("72");
    expect(output).toContain("NW");
    expect(output).toContain("15");
    expect(output).toContain("1013");
  });

  it("includes wttr.in link using cityUrl", () => {
    const output = renderTemplate(weatherData);
    expect(output).toContain("https://wttr.in/London");
  });
});
