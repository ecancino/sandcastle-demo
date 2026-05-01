import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/cli.ts",
      formats: ["es"],
      fileName: "cli",
    },
    rollupOptions: {
      external: ["commander"],
    },
  },
  plugins: [dts()],
  test: {
    globals: true,
  },
});
