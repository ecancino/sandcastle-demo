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
});
