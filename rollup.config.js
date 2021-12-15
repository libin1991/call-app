import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';
import path from 'path';
import ts from "rollup-plugin-ts"; // 支持sw TS文件
const extensions = ['.js', '.ts'];
const getPath = _path => path.resolve(__dirname, _path);
export default {
  input: getPath('./src/index.ts'),
  output: [{
    file: pkg.module,
    format: 'es',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.browser,
    format: 'umd',
    name: 'CallApp',
  },
  ],
  external: [],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    ts({
      tsconfig: {
        allowJs: true
      }
    }),
    babel({
      extensions,
      include: ['src/**/*'],
      babelHelpers: 'bundled',
    }),
  ],
};
