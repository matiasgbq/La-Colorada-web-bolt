import { readFileSync } from 'node:fs';

const distDirectory = 'dist';
const llmsPath = `${distDirectory}/llms.txt`;
const indexPath = `${distDirectory}/index.html`;

function readRequiredFile(filePath) {
  try {
    return readFileSync(filePath, 'utf8');
  } catch {
    throw new Error(`No se encontró ${filePath}. Ejecutá primero npm run build.`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const llms = readRequiredFile(llmsPath);
const html = readRequiredFile(indexPath);
const temporaryDomain = 'la-colorada-web-bolt.vercel.app';

[
  '# La Colorada',
  'Blanco Encalada 2229',
  '11:30 a 14:30',
  '19:00 a 23:00',
  '4897-5432',
  '[Menú](/#menu)',
  '[Ubicación](/#ubicacion)',
].forEach((requiredText) => {
  assert(llms.includes(requiredText), `llms.txt no contiene: ${requiredText}`);
});

assert(!llms.includes('$'), 'llms.txt no debe publicar precios.');
assert(
  !llms.includes('Notas de desarrollo') && !llms.includes('Próximos Pasos'),
  'llms.txt no debe incluir notas internas.',
);
assert(!llms.includes(temporaryDomain), 'llms.txt contiene el dominio temporal.');
assert(!html.includes(temporaryDomain), 'El HTML contiene el dominio temporal.');

const internalLinks = [...llms.matchAll(/\]\((\/#[^)]+)\)/g)].map(
  (match) => match[1],
);
const sectionMeta = html.match(
  /<meta name="la-colorada:sections" content="([^"]*)">/,
);
assert(sectionMeta, 'No se encontró el mapa de secciones de la SPA.');
const sectionIds = new Set(sectionMeta[1].split(/\s+/).filter(Boolean));

internalLinks.forEach((link) => {
  const sectionId = link.slice(2);
  assert(
    sectionIds.has(sectionId),
    `llms.txt enlaza una sección inexistente: ${link}`,
  );
});

const jsonLdMatch = html.match(
  /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
);
assert(jsonLdMatch, 'No se encontró JSON-LD en el HTML compilado.');

const restaurant = JSON.parse(jsonLdMatch[1]);
assert(restaurant['@type'] === 'Restaurant', 'JSON-LD no describe un Restaurant.');
assert(restaurant.name === 'La Colorada', 'JSON-LD tiene un nombre incorrecto.');
assert(restaurant.menu === '/#menu', 'JSON-LD tiene un enlace de menú incorrecto.');
assert(
  Array.isArray(restaurant.openingHoursSpecification) &&
    restaurant.openingHoursSpecification.length === 2,
  'JSON-LD no contiene los dos rangos horarios canónicos.',
);

console.log('✅ llms.txt y JSON-LD compilados son coherentes y no usan el dominio temporal.');
