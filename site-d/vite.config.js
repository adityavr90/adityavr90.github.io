import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: { '@shared': resolve(__dirname, '../shared') }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Private stats dashboard, served at avrgk.com/track/
        track: resolve(__dirname, 'track/index.html')
      }
    }
  }
});
