import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
 
export default defineConfig({
  input: 'src/index.ts', // 你的入口文件
  output: [
    {
      file: 'dist/index.cjs', // CommonJS 输出文件
      format: 'cjs', // CommonJS 格式
      sourcemap: true, // 生成 sourcemap
      exports: 'named' // 导出命名方式
    },
    {
      file: 'dist/index.mjs', // ES 模块输出文件
      format: 'esm', // ES 模块格式
      sourcemap: true // 生成 sourcemap
    }
  ],
  plugins: [
    resolve(), // 将 node_modules 中的依赖解析为 ES6 模块
    commonjs(), // 将 CommonJS 模块转换为 ES6 模块，以便 Rollup 处理
    typescript({ // 使用 typescript 插件编译 TypeScript 文件
      tsconfig: './tsconfig.json' // 使用 tsconfig.json 文件中的配置
    })
  ],
  external: id => {
    return id.includes('node_modules'); // 排除本地文件和 node_modules 中的依赖
  }
});