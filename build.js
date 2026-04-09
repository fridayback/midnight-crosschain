// build.js
const esbuild = require('esbuild');
const path = require('path');

// 关键: 指定入口文件是你的 CJS 文件
esbuild.build({
  entryPoints: ['./index.js'],       // 你的 CJS 入口文件
  bundle: true,                      // 打包所有依赖
  platform: 'node',                  // 目标平台是 Node.js
  target: 'node22',                  // 指定 Node.js 版本，建议与 pkg 目标版本一致
  format: 'cjs',                     // 输出 CommonJS 格式，与 pkg 最佳兼容
  outfile: './dist/bundle.cjs',      // 输出文件路径和名称
  external: [],    
//   external: ['classic-level'],                      // 一般不设 external，让 esbuild 打包所有内容
  loader: {
    // 关键: 将 .wasm 文件作为 binary 加载，直接嵌入为 Uint8Array
    '.wasm': 'binary',
  },
  // 可选: 控制台输出更详细的信息
  logLevel: 'verbose',//'info',
}).catch(() => process.exit(1));