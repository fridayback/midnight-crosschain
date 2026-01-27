import { defineConfig } from 'tsup'

export default defineConfig({
  // 关键配置：匹配src下所有.ts文件并保持目录结构
  entry: ["src/*.ts"],  
  format: ["esm", "cjs"],    // 同时输出ESM和CommonJS
  outDir: "dist",            // 根输出目录
  dts: true,                 // 生成类型声明
  bundle: false,             // 不打包依赖，这样输出的文件就是单个文件
  splitting: false,          // 关闭代码拆分（确保单文件输出）
  sourcemap: true,           // 可选：生成sourcemap
  clean: true,                // 可选：构建前清空dist
  outExtension: ({ format }) => {  // 关键配置：保持目录结构
    return {
      js: format === "esm" ? ".mjs" : ".cjs"
    }
  }
})
