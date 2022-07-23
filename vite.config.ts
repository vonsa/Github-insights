import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 5001,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `build/bundle.js`,
        chunkFileNames: `build/bundle.js`,
        assetFileNames: `build/bundle.[ext]`,
      },
    },
  },
})
