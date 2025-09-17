// import typescript from 'rollup-plugin-typescript2';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import { defineConfig } from 'rollup';

// export default defineConfig({
//   input: 'src/index.ts', // 你的入口文件
//   output: [
//     {
//       file: 'dist/index.cjs', // CommonJS 输出文件
//       format: 'cjs', // CommonJS 格式
//       sourcemap: true, // 生成 sourcemap
//       exports: 'named' // 导出命名方式
//     },
//     {
//       file: 'dist/index.mjs', // ES 模块输出文件
//       format: 'esm', // ES 模块格式
//       sourcemap: true // 生成 sourcemap
//     }
//   ],
//   plugins: [
//     resolve(), // 将 node_modules 中的依赖解析为 ES6 模块
//     commonjs(), // 将 CommonJS 模块转换为 ES6 模块，以便 Rollup 处理
//     typescript({ // 使用 typescript 插件编译 TypeScript 文件
//       // tsconfig: './tsconfig.json' // 使用 tsconfig.json 文件中的配置
//     })
//   ],
//   external: id => {
//     return id.includes('node_modules'); // 排除本地文件和 node_modules 中的依赖
//   }
// });

/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-09-17 14:43:52
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-09-17 15:18:19
 * @FilePath: /midnight-crosschain/rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs', format: 'cjs' },
      { file: 'dist/index.mjs', format: 'es' }
    ],
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];
