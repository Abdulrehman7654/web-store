import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- 1. Import the plugin

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), // <-- 2. Use the plugin here
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});

