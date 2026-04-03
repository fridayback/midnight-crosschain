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

  minify: true, 

  // 清理输出目录
  clean: true,

  // 目标环境
  target: 'es2020',
  skipNodeModulesBundle: true,

  // 外部依赖（不打包进 bundle）
  external: [],
  // noExternal: ['wallet-sdk', 'api', 'witnesses'], // 将 wallet-sdk 内联打包
  noExternal: [/(.*)/],

  // 内联依赖
  // noExternal: [],

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
})