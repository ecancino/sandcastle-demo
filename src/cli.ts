import { Command } from "commander";
import { fetchWeather, formatWeather } from "./weather/index.js";

export function buildProgram(): Command {
  const program = new Command();

  program.name("sandcastle-demo").description("A simple CLI demo").version("0.1.0");

  program
    .command("weather")
    .description("Show current weather for a city")
    .argument("<city>", "city to get weather for")
    .action(async (city: string) => {
      try {
        const data = await fetchWeather(city);
        console.log(formatWeather(data));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Error: ${message}`);
        process.exitCode = 1;
      }
    });

  return program;
}

const isMainModule = process.argv[1]?.includes("cli");
if (isMainModule && !process.env["VITEST"]) {
  buildProgram().parse();
}
