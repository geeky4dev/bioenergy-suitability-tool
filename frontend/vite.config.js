import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias a carpeta exacta de leaflet para evitar problemas de resolución
      'leaflet': path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet-src.js'),
    }
  },
  assetsInclude: ['**/*.png', '**/*.svg', '**/*.gif'], // por si agregas otros assets
  build: {
    rollupOptions: {
      output: {
        // Esto puede ayudar a manejar rutas relativas de assets
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});
