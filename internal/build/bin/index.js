#!/usr/bin/env node
import { relative } from 'node:path';
import { parseArgs } from 'node:util';

import { runBuild } from './build.js';

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  options: {
    watch: { type: 'boolean', short: 'w' },
  },
});

const rawPath = positionals[0] || '.';

const relativePath = relative(process.cwd(), rawPath);

runBuild(relativePath, values);
