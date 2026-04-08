import { defineConfig } from 'tsup'

export default defineConfig({
  // 入口文件
  entry: ['src/index.ts'], // 假设你的文件在 src 目录下

  // 输出格式
  format: ['cjs', 'esm'], // 同时生成 CommonJS 和 ES Module

  // 生成类型声明文件
  dts: true,

  // 源码映射
  sourcemap: true,

  // 清理输出目录
  clean: true,

  // 目标环境
  target: 'es2022',
  skipNodeModulesBundle: true,

  // 外部依赖（不打包进 bundle）
  external: [],
  
  // 只内联特定的包，排除那些使用动态 require 的包
  // 这样 ESM 输出不会包含动态 require 调用
  noExternal: [
    /@midnight-ntwrk/,
    /wallet-sdk/,
  ],
  
  splitting: false,

  // 为 ESM 输出启用 shims，处理 Node.js 内置模块
  shims: true,

  // 输出文件扩展名配置
  outExtension: ({ format }) => {
    if (format === 'esm') {
      return { js: '.mjs' }
    }
    return { js: '.cjs' }
  },

  // 输出目录
  outDir: 'dist',

  // 压缩代码
  minify: false,

  // 按需启用 tree shaking
  treeshake: true,

  // // 解决 named 和 default exports 警告
  // output: {
  //   exports: 'named',
  // },

  // 处理 WASM 文件
  loader: {
    '.wasm': 'file',
  },
})