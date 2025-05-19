import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // permite acceso desde IP local
    port: 5173,        // puedes cambiarlo si necesitas
    strictPort: true,  // si el puerto está ocupado, falla en lugar de usar otro
  }
});
