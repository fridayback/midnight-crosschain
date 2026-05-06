import { defineConfig } from 'tsup'

export default defineConfig([
  // ESM 配置 - 将所有依赖外部化
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true, // 只在 CJS 构建中生成类型声明
    sourcemap: true,
    clean: false, // 不清理，由 CJS 构建负责
    target: 'es2022',
    skipNodeModulesBundle: true,
    external: [/^[^.\/]/], // 所有裸模块导入都外部化
    noExternal: [],
    splitting: false,
    shims: true,
    outDir: 'dist',
    minify: false,
    treeshake: true,
    outExtension: ({ format }) => {
    if (format === 'esm') {
      return { js: '.mjs' }
    }
    return { js: '.cjs' }
  },
  },
  // CJS 配置 - 打包所有依赖
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: false,
    sourcemap: true,
    clean: true,
    target: 'es2022',
    skipNodeModulesBundle: true,
    external: [], // CJS 格式打包所有依赖
    noExternal: [/^(?!(@msgpackr-extract|classic-level|cpu-features|ssh2)).*$/],
    splitting: false,
    shims: false, // CJS 不需要 shims
    outDir: 'dist',
    minify: false,
    treeshake: true,
    outExtension: ({ format }) => {
    if (format === 'esm') {
      return { js: '.mjs' }
    }
    return { js: '.cjs' }
  },
  }
])
