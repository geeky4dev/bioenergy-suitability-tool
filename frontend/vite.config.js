import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.svg', '**/*.gif'],
  resolve: {
    // No alias para 'leaflet' para evitar errores de build
  },
});