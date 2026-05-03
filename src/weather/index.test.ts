import { describe, it, expect } from "vitest";
import {
  fetchWeather,
  formatWeather,
  renderTemplate,
  DEFAULT_WEATHER_TEMPLATE,
} from "./index.js";

describe("weather module barrel export", () => {
  it("exports fetchWeather", () => {
    expect(fetchWeather).toBeTypeOf("function");
  });

  it("exports formatWeather", () => {
    expect(formatWeather).toBeTypeOf("function");
  });

  it("exports renderTemplate from template", () => {
    expect(renderTemplate).toBeTypeOf("function");
  });

  it("exports DEFAULT_WEATHER_TEMPLATE from template", () => {
    expect(DEFAULT_WEATHER_TEMPLATE).toBeTypeOf("string");
  });
});
