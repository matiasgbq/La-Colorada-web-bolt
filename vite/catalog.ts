import { isPublicDish } from '../src/catalog';
import { CATEGORIES, MENU } from '../src/data';
import { SITE } from '../src/site-data';
import { DISCOVERY_PAGES, type DiscoveryPage } from '../src/discovery';

export const CARTA_PATH = '/carta/';
export const CATALOG_PATH = '/catalogo.json';
const absolute = (path: string) => new URL(path, `${SITE.url}/`).href;
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export function buildCatalog() {
  return {
    schemaVersion: '1.0',
    language: 'es-AR',
    currency: 'ARS',
    restaurant: { name: SITE.shortName, url: `${SITE.url}/`, menuUrl: absolute(CARTA_PATH) },
    order: {
      url: absolute('/#menu'),
      confirmationChannel: 'WhatsApp',
      status: 'request_requires_confirmation',
      rules: [
        'Los precios se expresan en pesos argentinos.',
        'Las pizzas publicadas son grandes.',
        'Los platos con guarnición incluyen ensalada; los cambios se solicitan por WhatsApp.',
        'La ensalada para tarta es un adicional opcional ligado a una tarta, nunca un plato independiente.',
        'Disponibilidad y aceptación del pedido a confirmar con el local. El catálogo no informa stock en tiempo real.',
      ],
    },
    categories: CATEGORIES.map((category) => ({
      id: category.id,
      name: category.label,
      url: absolute(`${CARTA_PATH}#${category.id}`),
      items: MENU[category.id].filter(isPublicDish).map((dish) => ({
        id: dish.id,
        code: dish.code,
        vegetarian: dish.vegetarian === true,
        name: dish.name,
        description: dish.desc,
        price: dish.price,
        currency: 'ARS',
        image: absolute(dish.img),
        imageFit: dish.imgFit ?? 'cover',
        url: absolute(`${CARTA_PATH}#${dish.code}`),
        active: dish.active ?? true,
        available: dish.available ?? null,
        availability: dish.available === true ? 'available' : 'unknown',
        ...(dish.tag ? { label: dish.tag } : {}),
        addons: dish.saladAddon ? [{
          ...dish.saladAddon, currency: 'ARS', optional: true, requiresParent: true,
        }] : [],
      })),
    })),
  };
}

export function buildPageCatalog(page?: DiscoveryPage) {
  const catalog = buildCatalog();
  return { ...catalog, categories: catalog.categories
    .filter((c) => !page || page.categories.includes(c.id))
    .map((c) => ({ ...c, items: c.items.filter((item) => !page?.vegetarianOnly || item.vegetarian) }))
    .filter((c) => c.items.length > 0) };
}

export function buildMenuJsonLd(page?: DiscoveryPage) {
  const catalog = buildPageCatalog(page);
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': absolute(`${page?.path ?? CARTA_PATH}#menu`),
    name: page?.heading ?? `Carta de ${SITE.shortName}`,
    url: absolute(page?.path ?? CARTA_PATH),
    inLanguage: 'es-AR',
    hasMenuSection: catalog.categories.filter((c) => !page || page.categories.includes(c.id)).map((category) => ({
      '@type': 'MenuSection', '@id': category.url, name: category.name,
      hasMenuItem: category.items.map((item) => ({
        '@type': 'MenuItem', '@id': item.url, identifier: item.code,
        name: item.name,
        description: [item.description, ...item.addons.map((addon) =>
          `${addon.name} opcional por ARS ${addon.price}, solamente junto con esta tarta.`)].join(' '),
        image: item.image, url: item.url,
        ...(item.vegetarian ? { suitableForDiet: 'https://schema.org/VegetarianDiet' } : {}),
        offers: { '@type': 'Offer', price: item.price, priceCurrency: item.currency },
      })),
    })),
  };
}

export function buildCartaHtml(restaurant: unknown, noindex = false, page?: DiscoveryPage) {
  const catalog = buildPageCatalog(page);
  const e = escapeHtml;
  const items = catalog.categories.flatMap((c) => c.items);
  const representative = items.find((item) => item.code === page?.preferredCode) ?? items.find((item) => !item.image.includes('placeholder-'));
  const image = representative?.image;
  const path = page?.path ?? CARTA_PATH;
  const title = page ? page.heading : `Carta completa | ${SITE.shortName}`;
  const description = page?.description ?? 'Carta de La Colorada en La Horqueta, San Isidro: pizzas grandes, empanadas, milanesas, tartas y medallones vegetarianos, con fotos y precios en pesos argentinos.';
  const discoveryLinks = DISCOVERY_PAGES.map((p) => `<a href="${e(p.path)}">${e(p.label)}</a>`).join('');
  const price = (amount: number) => `$${amount.toLocaleString('es-AR')}`;
  const navigation = catalog.categories.map((c) => `<a href="#${e(c.id)}">${e(c.name)}</a>`).join('');
  const sections = catalog.categories.map((c) => `<section id="${e(c.id)}" aria-labelledby="title-${e(c.id)}">
    <h2 id="title-${e(c.id)}">${e(c.name)}</h2><div class="grid">${c.items.map((item) => `<article id="${e(item.code)}" data-product-code="${e(item.code)}">
      <img src="${e(new URL(item.image).pathname)}" alt="${e(c.id === 'empanadas' ? `Empanada ${item.name} de ${SITE.shortName}` : c.id === 'pizzas' && item.id !== 'faina' ? `Pizza ${item.name} de ${SITE.shortName}` : `${item.name} de ${SITE.shortName}`)}" loading="lazy" width="600" height="450" style="object-fit:${e(item.imageFit)}">
      <div class="details"><p class="code">${e(item.code)}</p><h3>${e(item.name)}</h3><p>${e(item.description)}</p>
      <p class="price">${price(item.price)} <small>ARS</small></p>
      ${item.addons.map((addon) => `<p class="addon">${e(addon.name)} opcional: +${price(addon.price)}. Solo junto con esta tarta.</p>`).join('')}
      <a class="order" href="/#menu">Armar pedido en el menú</a></div></article>`).join('')}</div></section>`).join('');
  return `<!doctype html>
<html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(title)}</title>
<meta name="description" content="${e(description)}">
<meta name="robots" content="${noindex ? 'noindex,follow,' : ''}max-image-preview:large">
<meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="${e(absolute(path))}">
${image ? `<meta property="og:image" content="${e(image)}"><meta property="og:image:alt" content="${e(representative!.name)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${e(image)}">` : ''}
<link rel="canonical" href="${e(absolute(path))}">
<link rel="alternate" type="application/json" href="${CATALOG_PATH}" title="Catálogo estructurado">
<script type="application/ld+json">${safeJson({ '@context': 'https://schema.org', '@graph': [page && image && restaurant && typeof restaurant === 'object' ? { ...restaurant, image } : restaurant, buildMenuJsonLd(page)] })}</script>
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{margin:0;background:#faf7f2;color:#252321;font:17px/1.55 system-ui,sans-serif}a{color:#a61922}a:focus-visible{outline:3px solid #a61922;outline-offset:4px}header{background:#a61922;color:white;padding:36px 20px}header a{color:white}header .wrap,main,footer{max-width:1180px;margin:auto}main{padding:24px 20px}h1{font-size:clamp(2rem,5vw,3rem);line-height:1.1}h2{margin:36px 0 18px;font-size:1.8rem}h3{font-size:1.15rem;margin:0 0 8px}nav{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0}nav a{padding:8px 16px;border:1px solid #dccfc3;border-radius:24px;text-decoration:none;background:white}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:22px}article{background:white;border:1px solid #e6dfd6;border-radius:18px;overflow:hidden;display:flex;flex-direction:column}article img{display:block;width:100%;height:220px;background:white}.details{padding:20px;display:flex;flex-direction:column;flex:1}.details p{margin:0 0 12px}.code{font-size:.75rem;color:#74685f}.price{font-size:1.4rem;font-weight:750;color:#a61922}.price small{font-size:.75rem}.addon{font-size:.9rem}.order{margin-top:auto;font-weight:650}footer{padding:30px 20px 40px;border-top:1px solid #dccfc3}footer a{display:inline-block;margin-right:20px}.notice{max-width:850px}section{scroll-margin-top:20px}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
${page?.path === '/la-colorada-veggie/' ? 'body{background:#f3f8f1}header{background:#24623b}a,.price,h2{color:#24623b}a:focus-visible{outline-color:#24623b}header a{color:white}nav a{border-color:#b7cfb8}article{border-color:#cddfca}footer{border-color:#b7cfb8}' : ''}
</style></head><body>
<header><div class="wrap"><a href="/">${e(SITE.shortName)}</a><h1>${e(page?.heading ?? 'Nuestra carta completa')}</h1><p>Pizzas, empanadas y comidas caseras · La Horqueta</p><a href="/#menu">Armar pedido</a></div></header>
<main><div class="notice">${page ? `<p>${e(page.intro)}</p>` : '<p>Conocé nuestras pizzas, empanadas, milanesas y tartas caseras. La Colorada Veggie reúne las opciones vegetarianas de todas nuestras secciones.</p>'}<p>Precios en pesos argentinos · Las pizzas del menú son grandes.</p><p>Los platos con guarnición incluyen ensalada. Consultá disponibilidad y cambios al confirmar por WhatsApp.</p></div><nav aria-label="Especialidades de La Colorada"><a href="/carta/">Carta completa</a>${discoveryLinks}</nav>${page && !page.vegetarianOnly ? '' : `<nav aria-label="Categorías de la carta">${navigation}</nav>`}${sections}</main>
<footer><p>${e(SITE.address.streetAddress)} · ${e(SITE.address.area)}</p><a href="/#menu">Armar pedido</a><a href="${CATALOG_PATH}">Catálogo en JSON</a><a href="/">Volver al inicio</a></footer>
</body></html>`;
}
