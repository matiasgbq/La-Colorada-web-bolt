import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { siteArtifactsPlugin } from './vite/siteArtifacts';
import { menuFlyersPlugin } from './vite/menuFlyers';

const menuImagesDirectory = fileURLToPath(
  new URL('./public/images', import.meta.url),
);

// https://vitejs.dev/config/
export default defineConfig(() => {
  const siteMode = process.env.VITE_SITE_MODE === 'landing' ? 'landing' : 'full';

  return {
    plugins: [
      menuFlyersPlugin(menuImagesDirectory),
      siteArtifactsPlugin(siteMode),
      react(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
