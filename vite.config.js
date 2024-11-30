import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/pagina-web-react/', // La base coincide con el nombre de tu repositorio
});