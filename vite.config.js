import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import offlinePlugin from './scripts/offline-plugin.mjs'

export default defineConfig({
  plugins: [react(), offlinePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
})
