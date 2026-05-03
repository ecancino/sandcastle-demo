import chalk from "chalk";

export function colorize(data: Record<string, string>): Record<string, string> {
  return {
    ...data,
    city: chalk.bold.cyan(data.city),
    country: chalk.cyan(data.country),
    region: chalk.dim(data.region),
    description: chalk.bold.yellow(data.description),
    temperatureC: chalk.yellow(data.temperatureC),
    temperatureF: chalk.yellow(data.temperatureF),
    feelsLikeC: chalk.yellow(data.feelsLikeC),
    feelsLikeF: chalk.yellow(data.feelsLikeF),
    humidity: chalk.green(data.humidity),
    windSpeedKmph: chalk.green(data.windSpeedKmph),
    windDirection: chalk.green(data.windDirection),
    pressure: chalk.green(data.pressure),
    visibility: chalk.green(data.visibility),
    uvIndex: chalk.green(data.uvIndex),
    precipitationMM: chalk.green(data.precipitationMM),
  };
}
