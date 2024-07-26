import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { lezer } from "@lezer/generator/rollup";

export default {
  input: "src/index.ts",
  external: (id) => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: [
    { file: "./dist/index.cjs", format: "cjs" },
    { file: "./dist/index.es.js", format: "es" },
  ],
  plugins: [lezer(), json(), typescript()],
};
