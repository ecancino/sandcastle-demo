import { describe, it, expect } from "vitest";
import { buildProgram } from "./cli.js";

describe("cli", () => {
  it("has a greet command", () => {
    const program = buildProgram();
    const greetCmd = program.commands.find((c) => c.name() === "greet");
    expect(greetCmd).toBeDefined();
  });

  it("greet command has a description", () => {
    const program = buildProgram();
    const greetCmd = program.commands.find((c) => c.name() === "greet")!;
    expect(greetCmd.description()).toBe("Print a greeting");
  });

  it("has a weather command", () => {
    const program = buildProgram();
    const weatherCmd = program.commands.find((c) => c.name() === "weather");
    expect(weatherCmd).toBeDefined();
  });

  it("weather command has a description", () => {
    const program = buildProgram();
    const weatherCmd = program.commands.find((c) => c.name() === "weather")!;
    expect(weatherCmd.description()).toBe("Show current weather for a city");
  });

  it("weather command requires a city argument", () => {
    const program = buildProgram();
    const weatherCmd = program.commands.find((c) => c.name() === "weather")!;
    const args = weatherCmd.registeredArguments;
    expect(args).toHaveLength(1);
    expect(args[0].name()).toBe("city");
    expect(args[0].required).toBe(true);
  });
});
