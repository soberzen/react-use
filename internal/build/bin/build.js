// @ts-check
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { build, defineConfig } from 'tsdown';

/**
 *
 * @param {string} relativePath
 * @param {{watch?: boolean}} options
 */
function runBuild(relativePath, options) {
  const packageJsonPath = resolve(relativePath, 'package.json');

  // 检查 package.json 是否存在
  if (!existsSync(packageJsonPath)) {
    throw new Error(`No package.json found at ${packageJsonPath}`);
  }

  const files = ['index.ts'];
  const entryPoints = files.map((file) => `${relativePath || '.'}/src/${file}`);

  const tsDownConfig = defineConfig({
    entry: entryPoints,
    target: 'es2022',
    format: ['cjs', 'esm'],
    outDir: resolve(relativePath, 'dist'),
    clean: !options.watch,
    dts: true,
    deps: {
      neverBundle: ['react', 'react-dom'],
    },
    ...(options.watch && { watch: true }), // 添加 watch 选项
  });
  build(tsDownConfig)
    .then(() => {
      console.log('Build completed');
    })
    .catch((error) => {
      console.error('Build failed:', error);
      process.exit(1);
    });
}

export { runBuild };
