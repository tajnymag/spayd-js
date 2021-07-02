import commonJs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

const input = "src/index.ts";

export default [
	{
		input: input,
		output: {
			file: "dist/spayd.esm.js",
			format: "esm",
			sourcemap: true
		},
		external: ["ibantools", "date-fns/format", "date-fns/isValid"],
		plugins: [
			typescript({tsconfig: "./tsconfig.esm.json"})
		]
	},
	{
		input: input,
		output: {
			file: "dist/spayd.cjs.js",
			format: "cjs",
			exports: "default",
			sourcemap: true
		},
		external: ["ibantools", "date-fns/format", "date-fns/isValid"],
		plugins: [
			typescript({tsconfig: "./tsconfig.cjs.json"})
		]
	},
	{
		input: input,
		output: {
			file: "dist/spayd.umd.min.js",
			format: "umd",
			name: "spayd",
			sourcemap: true
		},
		plugins: [resolve(), commonJs(), typescript({
			tsconfig: "./tsconfig.umd.json"
		}), terser()]
	}
];
