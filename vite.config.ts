import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/wareki',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
