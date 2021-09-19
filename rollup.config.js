import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';

const packageJson = require('./package.json');

const plugins = [
	peerDepsExternal(),
	resolve(),
	commonjs(),
	typescript({
		useTsconfigDeclarationDir: true,
	}),
	postcss({
		extract: 'index.css',
		autoModules: true,
	}),
	json(),
	url(),
	svgr(),
];

if (process.env.NODE_ENV === 'production') {
	plugins.push(terser());
}

export default {
	input: 'src/index.ts',
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins,
};
