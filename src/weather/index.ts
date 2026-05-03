import chalk from "chalk";
import { fetchWeather, formatWeather } from "./weather.js";

export async function weatherCommand(city: string) {
  try {
    const data = await fetchWeather(city);
    console.log(formatWeather(data));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`Error: ${message}`));
    process.exitCode = 1;
  }
}
