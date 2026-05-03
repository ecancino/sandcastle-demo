import chalk from "chalk";

export function colorizeWeatherValues(
  data: Record<string, string>
): Record<string, string> {
  const colored: Record<string, string> = { ...data };

  colored.city = chalk.bold.cyan(data.city);
  colored.country = chalk.cyan(data.country);
  colored.region = chalk.dim(data.region);
  colored.description = chalk.bold.yellow(data.description);

  colored.temperatureC = chalk.yellow(data.temperatureC);
  colored.temperatureF = chalk.yellow(data.temperatureF);
  colored.feelsLikeC = chalk.yellow(data.feelsLikeC);
  colored.feelsLikeF = chalk.yellow(data.feelsLikeF);

  colored.humidity = chalk.green(data.humidity);
  colored.windSpeedKmph = chalk.green(data.windSpeedKmph);
  colored.windDirection = chalk.green(data.windDirection);
  colored.pressure = chalk.green(data.pressure);
  colored.visibility = chalk.green(data.visibility);
  colored.uvIndex = chalk.green(data.uvIndex);
  colored.precipitationMM = chalk.green(data.precipitationMM);

  return colored;
}
