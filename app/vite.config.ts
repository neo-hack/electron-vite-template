import { resolve } from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import WindiCSS from 'vite-plugin-windicss'
import StyledWindiCSS from 'vite-plugin-styled-windicss'

export default defineConfig({
  plugins: [
    reactRefresh(),
    WindiCSS({
      config: {
        extract: {
          include: ['**/*.{ts,tsx}'],
        },
      },
    }),
    StyledWindiCSS(),
  ],
  base: './',
  root: resolve('./src/renderer'),
  build: {
    outDir: resolve('./dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: '@/renderer',
        replacement: resolve(__dirname, 'src/renderer'),
      },
      {
        find: '@/common',
        replacement: resolve(__dirname, 'src/common'),
      },
      {
        find: 'editor',
        replacement: resolve(__dirname, '../src'),
      },
    ],
    dedupe: ['react', 'react-dom'],
  },
})
