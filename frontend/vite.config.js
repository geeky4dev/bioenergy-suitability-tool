import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Carga las variables desde .env según el modo
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    define: {
      'process.env': env
    },
    build: {
      outDir: 'dist',
    },
    base: '/', // importante para despliegue en Render
  }
})