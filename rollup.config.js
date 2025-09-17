
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist/cjs',
    format: 'cjs',
    exports: 'auto',
    preserveModules: true,
    entryFileNames: '[name].cjs'
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ['require'] // 强制CJS解析
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto'
    }),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        module: 'ESNext',
        target: 'ES2022',
        esModuleInterop: true
      }
    })
  ],
  external: id => /node_modules/.test(id)
};
