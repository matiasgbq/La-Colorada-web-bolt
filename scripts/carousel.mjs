import { constants } from 'node:fs';
import { copyFile, mkdir, readdir, stat, unlink } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const images = resolve(root, 'public/images');
const archive = resolve(root, 'repo-fotos/carrusel-retirado');
const extensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const [action = 'list', source, name] = process.argv.slice(2);

function validateName(value) {
  if (!value || value !== basename(value) || value.startsWith('.') || /[\\/\x00-\x1f]/.test(value)) {
    throw new Error('Usá un nombre de imagen sin carpetas ni caracteres de control.');
  }
  if (!extensions.has(extname(value).toLowerCase())) {
    throw new Error('Formato de imagen incompatible con el carrusel.');
  }
  return value;
}

async function list() {
  return (await readdir(images, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && extensions.has(extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' }));
}

try {
  if (action === 'list' && !source) {
    console.log((await list()).join('\n'));
  } else if (action === 'add' && source && name) {
    const filename = validateName(name);
    const file = resolve(source);
    const info = await stat(file);
    if (!info.isFile() || info.size === 0) throw new Error('La imagen está vacía o no es un archivo.');
    if (extname(file).toLowerCase() !== extname(filename).toLowerCase()) {
      throw new Error('Conservá la extensión del archivo. Cambiarla no convierte la imagen.');
    }
    await copyFile(file, resolve(images, filename), constants.COPYFILE_EXCL);
    console.log('Agregada: ' + filename);
  } else if (action === 'remove' && source && !name) {
    const filename = validateName(source);
    const current = await list();
    if (!current.includes(filename)) throw new Error('La imagen no está en el carrusel.');
    if (current.length <= 1) throw new Error('El carrusel necesita al menos una imagen.');
    await mkdir(archive, { recursive: true });
    const backup = resolve(archive, Date.now() + '-' + filename);
    await copyFile(resolve(images, filename), backup, constants.COPYFILE_EXCL);
    await unlink(resolve(images, filename));
    console.log('Retirada y conservada en ' + backup);
  } else {
    throw new Error('Uso: npm run carousel -- list | add /ruta/imagen.webp 08-promocion.webp | remove 08-promocion.webp');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
