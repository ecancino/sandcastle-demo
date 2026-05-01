import { describe, it, expect } from "vitest";
import { greet } from "./greet.js";

describe("greet", () => {
  it("returns a greeting with the given name", () => {
    expect(greet("World")).toBe("Hello, World!");
  });

  it("returns a default greeting when no name is provided", () => {
    expect(greet()).toBe("Hello, stranger!");
  });
});
