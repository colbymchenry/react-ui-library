/**
 * Build script for the React UI Library
 * 
 * This script uses Bun's native bundler to create a properly formatted
 * ESM bundle with correct module resolution for distribution.
 * 
 * Senior note: We use Bun.build instead of tsc directly because TypeScript's
 * ESNext output doesn't add .js extensions to imports, which breaks many
 * module resolvers in Node.js environments.
 */

import { readdir, rm, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const SRC_DIR = './src';
const DIST_DIR = './dist';

/**
 * Clean the dist directory
 */
async function clean() {
  console.log('🧹 Cleaning dist directory...');
  await rm(DIST_DIR, { recursive: true, force: true });
  await mkdir(DIST_DIR, { recursive: true });
}

/**
 * Copy static assets (CSS files and JSON data)
 */
async function copyAssets() {
  console.log('📦 Copying assets...');
  
  // Copy styles
  await mkdir(join(DIST_DIR, 'styles'), { recursive: true });
  const stylesDir = join(SRC_DIR, 'styles');
  const styleFiles = await readdir(stylesDir);
  
  for (const file of styleFiles) {
    await copyFile(
      join(stylesDir, file),
      join(DIST_DIR, 'styles', file)
    );
  }
  
  // Copy assets
  await mkdir(join(DIST_DIR, 'assets'), { recursive: true });
  const assetsDir = join(SRC_DIR, 'assets');
  const assetFiles = await readdir(assetsDir);
  
  for (const file of assetFiles) {
    await copyFile(
      join(assetsDir, file),
      join(DIST_DIR, 'assets', file)
    );
  }
}

/**
 * Build TypeScript files using Bun
 */
async function buildTypeScript() {
  console.log('🔨 Building TypeScript...');
  
  const result = await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'browser',
    format: 'esm',
    splitting: true,
    sourcemap: 'external',
    external: ['react', 'react-dom', 'formik'],
    naming: {
      entry: 'index.js',
      chunk: '[name]-[hash].js',
    },
  });

  if (!result.success) {
    console.error('❌ Build failed:');
    for (const log of result.logs) {
      console.error(log);
    }
    process.exit(1);
  }

  console.log('✅ Build completed successfully');
}

/**
 * Generate TypeScript declaration files
 */
async function generateDeclarations() {
  console.log('📝 Generating TypeScript declarations...');
  
  const proc = Bun.spawn(['tsc', '--emitDeclarationOnly'], {
    stdout: 'inherit',
    stderr: 'inherit',
  });
  
  await proc.exited;
  
  if (proc.exitCode !== 0) {
    console.error('❌ Declaration generation failed');
    process.exit(1);
  }
}

/**
 * Main build function
 */
async function build() {
  try {
    await clean();
    await buildTypeScript();
    await generateDeclarations();
    await copyAssets();
    
    console.log('\n✨ Build complete! Package is ready for publishing.');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
build();

