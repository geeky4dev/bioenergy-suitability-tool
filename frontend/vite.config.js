import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    proxy: command === 'serve' ? {
      '/api': 'http://localhost:5000',
    } : undefined
  }
}))

