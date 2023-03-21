import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const WORKING_DIRECTORY = process.cwd();

const SASS_ROOT = resolve(WORKING_DIRECTORY, 'src', 'styles').replace(
  /\\/g,
  '/'
);

const SASS_AUTO_IMPORT = `@use "sass:color";
@use "sass:math";`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: SASS_AUTO_IMPORT,
        sassOptions: {
          precision: 8,
          outputStyle: 'compressed',
          sourceComments: false,
          includePaths: [SASS_ROOT],
          quietDeps: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(WORKING_DIRECTORY, 'src'),
    },
  },
});
