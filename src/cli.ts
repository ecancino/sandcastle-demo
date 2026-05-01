import { Command } from "commander";
import { greet } from "./greet.js";

export function buildProgram(): Command {
  const program = new Command();

  program.name("sandcastle-demo").description("A simple CLI demo").version("0.1.0");

  program
    .command("greet")
    .description("Print a greeting")
    .argument("[name]", "name to greet")
    .action((name?: string) => {
      console.log(greet(name));
    });

  return program;
}

const isMainModule = process.argv[1]?.includes("cli");
if (isMainModule && !process.env["VITEST"]) {
  buildProgram().parse();
}
