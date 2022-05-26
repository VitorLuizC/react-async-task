// @ts-check

import { terser } from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';

import pkg from './package.json';

/** Comment with library information to be appended in the generated bundles. */
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author.name}
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/** @type {import('rollup').RollupOptions} */
const baseOptions = {
  input: './src/index.ts',
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
};

/**
 * The options array for Rollup.js.
 * @type {import('rollup').RollupOptions[]}
 */
const options = [
  {
    ...baseOptions,
    external: ['react', 'tslib'],
    output: [
      createOutputOptions({
        file: './dist/index.cjs',
        format: 'commonjs',
      }),
      createOutputOptions({
        file: './dist/index.mjs',
        format: 'esm',
      }),
    ],
  },
  {
    ...baseOptions,
    external: ['react'],
    output: [
      createOutputOptions({
        file: './dist/index.iife.js',
        name: 'ReactAsyncTask',
        format: 'iife',
        globals: {
          react: 'React',
        },
      }),
      createOutputOptions({
        file: './dist/index.iife.min.js',
        name: 'ReactAsyncTask',
        format: 'iife',
        globals: {
          react: 'React',
        },
        plugins: [terser()],
      }),
    ],
  },
];

export default options;
