import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const distDirectory = process.env.DIST_DIR ?? 'dist';
const siteMode = process.env.SITE_MODE === 'landing' ? 'landing' : 'full';
const siteUrl = 'https://lacoloradacocina.com.ar';

function readRequiredFile(fileName) {
  const filePath = join(distDirectory, fileName);
  try {
    return readFileSync(filePath, 'utf8');
  } catch {
    throw new Error(`No se encontró ${filePath}.`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const html = readRequiredFile('index.html');
const llms = readRequiredFile('llms.txt');
const robots = readRequiredFile('robots.txt');
const sitemap = readRequiredFile('sitemap.xml');
const textArtifacts = [html, llms, robots, sitemap];

['vercel.app', 'bolt.new'].forEach((origin) => {
  assert(textArtifacts.every((text) => !text.includes(origin)), `Origen temporal encontrado: ${origin}`);
});

assert(html.includes(`<link rel="canonical" href="${siteUrl}/">`), 'Canonical incorrecto.');
assert(html.includes(`<meta property="og:url" content="${siteUrl}/">`), 'og:url incorrecto.');
assert(robots === `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'robots.txt incorrecto.');
assert(sitemap.includes(`<loc>${siteUrl}/</loc>`), 'sitemap.xml sin URL canónica.');
assert(!sitemap.includes('<lastmod>'), 'sitemap.xml no debe inventar lastmod.');

['# La Colorada', `${siteUrl}/`, 'Blanco Encalada 2229', '10:30 a 15:00', '4897-5432', '[Ubicación](/#ubicacion)', 'Pedidos Programados', 'opciones para vegetarianos o veganos', 'todo el Partido de San Isidro', 'Eventos: contactar directamente por WhatsApp', 'ChIJVxbwP8i6vJURnJyqT_sTvZE'].forEach((text) => {
  assert(llms.includes(text), `llms.txt no contiene: ${text}`);
});
assert(html.includes('opciones para vegetarianos o veganos'), 'La metadata no contiene el copy aprobado.');

if (siteMode === 'full') {
  assert(llms.includes('[Menú](/#menu)'), 'El modo full no enlaza el menú.');
} else {
  assert(!llms.includes('[Menú](/#menu)'), 'El modo landing enlaza un menú oculto.');
  assert(llms.includes('menú interactivo todavía no está publicado'), 'Landing mal descrita.');
}
assert(!llms.includes('$'), 'llms.txt no debe publicar precios.');

const sectionMeta = html.match(/<meta name="la-colorada:sections" content="([^"]*)">/);
assert(sectionMeta, 'Falta el mapa de secciones.');
const sectionIds = new Set(sectionMeta[1].split(/\s+/).filter(Boolean));
for (const match of llms.matchAll(/\]\(\/#([^)]+)\)/g)) {
  assert(sectionIds.has(match[1]), `Sección inexistente en llms.txt: ${match[1]}`);
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
assert(jsonLdMatch, 'Falta JSON-LD.');
const restaurant = JSON.parse(jsonLdMatch[1]);
assert(restaurant['@type'] === 'Restaurant', 'JSON-LD no describe un Restaurant.');
assert(restaurant.url === `${siteUrl}/`, 'JSON-LD usa otra URL.');
assert(restaurant.hasMap.includes('ChIJVxbwP8i6vJURnJyqT_sTvZE'), 'JSON-LD no enlaza Maps.');
assert(Array.isArray(restaurant.telephone) && restaurant.telephone.length === 2, 'JSON-LD perdió teléfonos.');
assert(siteMode === 'full' ? restaurant.menu === `${siteUrl}/carta/` : !('menu' in restaurant), 'Menú incorrecto en JSON-LD.');

const localReferences = [...html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]+)"/g)]
  .map((match) => decodeURIComponent(match[1]).replace(/^\//, ''))
  .filter((path) => path && !path.endsWith('.txt'));
for (const path of localReferences) {
  assert(existsSync(join(distDirectory, path)), `Asset inexistente: /${path}`);
}

console.log(`✅ Producto coherente en modo ${siteMode}: SEO, datos, secciones y assets.`);

if (siteMode === 'full') {
  const carta = readRequiredFile('carta/index.html');
  const catalog = JSON.parse(readRequiredFile('catalogo.json'));
  const items = catalog.categories.flatMap((category) => category.items);
  assert(items.length > 0 && new Set(items.map((item) => item.code)).size === items.length, 'Catálogo vacío o códigos duplicados.');
  assert(!carta.includes('<script type="module"'), 'La carta debe ser legible sin JavaScript.');
  assert(carta.includes(`rel="canonical" href="${siteUrl}/carta/"`), 'Canonical de carta incorrecto.');
  assert(sitemap.includes(`<loc>${siteUrl}/carta/</loc>`), 'Falta carta en sitemap.');
  assert(!sitemap.includes('#'), 'No incluir fragmentos en sitemap.');
  assert(llms.includes('/catalogo.json') && llms.includes('/carta/'), 'Faltan enlaces para descubrimiento.');
  const graph = JSON.parse(carta.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const menu = graph.find((entry) => entry['@type'] === 'Menu');
  const structured = menu.hasMenuSection.flatMap((category) => category.hasMenuItem);
  assert(structured.length === items.length, 'Schema y JSON difieren.');
  for (const item of items) {
    assert(carta.includes(`data-product-code="${item.code}"`), `Plato ausente en HTML: ${item.code}`);
    assert(carta.includes(`id="${item.code}"`), `Ancla ausente: ${item.code}`);
    assert(existsSync(join(distDirectory, new URL(item.image).pathname)), `Foto ausente: ${item.code}`);
    const schema = structured.find((entry) => entry.identifier === item.code);
    assert(schema.name === item.name && schema.offers.price === item.price, `Deriva en Schema: ${item.code}`);
    assert(!('availability' in schema.offers), 'No inventar stock.');
  }
  assert(!carta.includes('InStock'), 'No inventar stock en la carta.');
} else {
  assert(!existsSync(join(distDirectory, 'carta/index.html')), 'Landing expone carta oculta.');
  assert(!existsSync(join(distDirectory, 'catalogo.json')), 'Landing expone catálogo oculto.');
  assert(!sitemap.includes('/carta/') && !llms.includes('/catalogo.json'), 'Landing enlaza catálogo oculto.');
}
console.log(`✅ Carta y catálogo: modo ${siteMode} validado.`);

const preview = process.env.VERCEL === '1' ||
  (process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH !== 'main');
assert(html.includes('content="noindex,follow"') === preview, 'Política de indexación de preview incorrecta.');
if (siteMode === 'full') {
  const carta = readRequiredFile('carta/index.html');
  assert(carta.includes('content="noindex,follow"') === preview, 'Carta: política de preview incorrecta.');
}
if (preview) assert(readRequiredFile('_headers').includes('X-Robots-Tag: noindex'), 'Preview sin encabezados noindex.');
