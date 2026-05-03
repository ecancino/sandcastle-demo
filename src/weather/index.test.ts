import { describe, it, expect } from "vitest";
import { weatherCommand } from "./index.js";

describe("weather module export", () => {
  it("exports weatherCommand", () => {
    expect(weatherCommand).toBeTypeOf("function");
  });
});
