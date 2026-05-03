# sandcastle-demo

A simple CLI demo built with TypeScript, Commander, and Vite.

## Setup

```bash
npm install
```

## Usage

### Development

Run the CLI directly from source using tsx:

```bash
npm run dev -- <command> [options]
```

### Production

Build and run the compiled CLI:

```bash
npm run build
node dist/cli.js <command> [options]
```

Or, if installed globally or via `npx`:

```bash
sandcastle-demo <command> [options]
```

## Commands

### `weather <city>`

Show current weather for a city (powered by [wttr.in](https://wttr.in)).

```bash
npm run dev -- weather London
```

Displays temperature, humidity, wind, pressure, visibility, UV index, and precipitation.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Run the CLI in dev mode via tsx |
| `npm run build` | Build for production with Vite |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint:md` | Lint Markdown files with markdownlint |

## Project Structure

```text
src/
├── cli.ts                   # CLI entry point (Commander program)
├── cli.test.ts              # CLI unit tests
├── cli-integration.test.ts  # CLI integration tests
├── weather.ts               # Weather fetching and formatting
├── weather.test.ts          # Weather tests
├── template.ts              # Pug template rendering
└── template.test.ts         # Template tests
```
