import { describe, it, expect } from "vitest";
import { renderTemplate, DEFAULT_WEATHER_TEMPLATE } from "./template.js";

describe("renderTemplate", () => {
  it("replaces a single placeholder", () => {
    expect(renderTemplate("Hello {{name}}", { name: "World" })).toBe(
      "Hello World"
    );
  });

  it("replaces multiple different placeholders", () => {
    const result = renderTemplate("{{city}}, {{country}}", {
      city: "London",
      country: "UK",
    });
    expect(result).toBe("London, UK");
  });

  it("replaces repeated placeholders", () => {
    const result = renderTemplate("{{x}} and {{x}}", { x: "yes" });
    expect(result).toBe("yes and yes");
  });

  it("leaves unknown placeholders as-is", () => {
    expect(renderTemplate("{{unknown}}", {})).toBe("{{unknown}}");
  });

  it("handles placeholders with surrounding whitespace in braces", () => {
    expect(renderTemplate("{{ name }}", { name: "Alice" })).toBe("Alice");
  });

  it("returns the string unchanged when there are no placeholders", () => {
    expect(renderTemplate("no placeholders here", { a: "1" })).toBe(
      "no placeholders here"
    );
  });

  it("handles empty template string", () => {
    expect(renderTemplate("", { a: "1" })).toBe("");
  });
});

describe("DEFAULT_WEATHER_TEMPLATE", () => {
  it("contains key weather placeholders", () => {
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{city}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{country}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{temperatureC}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{temperatureF}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{humidity}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{description}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{windSpeedKmph}}");
    expect(DEFAULT_WEATHER_TEMPLATE).toContain("{{windDirection}}");
  });
});
