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
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs', format: 'cjs' },
      { file: 'dist/index.mjs', format: 'es' }
    ],
    plugins: [
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
