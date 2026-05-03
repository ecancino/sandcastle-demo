import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

const env = { ...process.env, VITEST: "" };

function run(args: string): string {
  return execSync(`npx tsx src/cli.ts ${args}`, { encoding: "utf-8", env });
}

describe("cli integration (dev mode via tsx)", () => {
  it("shows help via tsx", () => {
    const output = run("--help");
    expect(output).toContain("sandcastle-demo");
    expect(output).not.toContain("greet");
    expect(output).toContain("weather");
  });

  it("shows version via tsx", () => {
    expect(run("--version").trim()).toBe("0.1.0");
  });
});
