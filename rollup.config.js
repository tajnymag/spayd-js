import commonJs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const input = "src/index.ts";
const typescriptPluginOptions = {
	useTsconfigDeclarationDir: true
};

export default [
	{
		input: input,
		output: [
			{
				file: "dist/spayd.esm.js",
				format: "esm"
			},
			{
				file: "dist/spayd.common.js",
				format: "cjs"
			}
		],
		plugins: [
			typescript(typescriptPluginOptions)
		]
	},
	{
		input: input,
		output: {
			file: "dist/spayd.browser.min.js",
			format: "iife",
			name: "spayd"
		},
		plugins: [resolve(), commonJs(), typescript(typescriptPluginOptions), terser()]
	}
];
