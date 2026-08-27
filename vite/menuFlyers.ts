import { readdirSync } from 'node:fs';
import { extname } from 'node:path';
import type { Plugin } from 'vite';

const VIRTUAL_MODULE_ID = 'virtual:menu-flyers';
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;
const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.webp',
]);

type MenuFlyer = {
  src: string;
  alt: string;
};

function listMenuFlyers(imagesDirectory: string): MenuFlyer[] {
  const filenames = readdirSync(imagesDirectory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        SUPPORTED_IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort((left, right) =>
      left.localeCompare(right, 'es', { numeric: true, sensitivity: 'base' }),
    );

  if (filenames.length === 0) {
    throw new Error(
      `[menu-flyers] No se encontraron imágenes compatibles en ${imagesDirectory}`,
    );
  }

  return filenames.map((filename, index) => ({
    src: `/images/${encodeURIComponent(filename)}`,
    alt: `Menú de La Colorada, imagen ${index + 1} de ${filenames.length}`,
  }));
}

export function menuFlyersPlugin(imagesDirectory: string): Plugin {
  return {
    name: 'la-colorada-menu-flyers',
    resolveId(id) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return undefined;

      return `export default ${JSON.stringify(listMenuFlyers(imagesDirectory))};`;
    },
  };
}
