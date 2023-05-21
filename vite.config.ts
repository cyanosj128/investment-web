import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import lessToJS from 'less-vars-to-js';
import * as fs from 'fs';
import * as path from 'path';

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/configs/variables.less'),
    'utf8'
  )
);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: themeVariables,
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: /^@(?=\/)/, replacement: path.resolve(__dirname, './src') },
    ],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
});
