import { CATEGORIES, MENU } from '../src/data';
import { SITE } from '../src/site-data';

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
      items: MENU[category.id].map((dish) => ({
        id: dish.id,
        code: dish.code,
        name: dish.name,
        description: dish.desc,
        price: dish.price,
        currency: 'ARS',
        image: absolute(dish.img),
        imageFit: dish.imgFit ?? 'cover',
        url: absolute(`${CARTA_PATH}#${dish.code}`),
        availability: 'unknown',
        ...(dish.tag ? { label: dish.tag } : {}),
        addons: dish.saladAddon ? [{
          ...dish.saladAddon, currency: 'ARS', optional: true, requiresParent: true,
        }] : [],
      })),
    })),
  };
}

export function buildMenuJsonLd() {
  const catalog = buildCatalog();
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': absolute(`${CARTA_PATH}#menu`),
    name: `Carta de ${SITE.shortName}`,
    url: absolute(CARTA_PATH),
    inLanguage: 'es-AR',
    hasMenuSection: catalog.categories.map((category) => ({
      '@type': 'MenuSection', '@id': category.url, name: category.name,
      hasMenuItem: category.items.map((item) => ({
        '@type': 'MenuItem', '@id': item.url, identifier: item.code,
        name: item.name,
        description: [item.description, ...item.addons.map((addon) =>
          `${addon.name} opcional por ARS ${addon.price}, solamente junto con esta tarta.`)].join(' '),
        image: item.image, url: item.url,
        offers: { '@type': 'Offer', price: item.price, priceCurrency: item.currency },
      })),
    })),
  };
}

export function buildCartaHtml(restaurant: unknown, noindex = false) {
  const catalog = buildCatalog();
  const e = escapeHtml;
  const price = (amount: number) => `$${amount.toLocaleString('es-AR')}`;
  const navigation = catalog.categories.map((c) => `<a href="#${e(c.id)}">${e(c.name)}</a>`).join('');
  const sections = catalog.categories.map((c) => `<section id="${e(c.id)}" aria-labelledby="title-${e(c.id)}">
    <h2 id="title-${e(c.id)}">${e(c.name)}</h2><div class="grid">${c.items.map((item) => `<article id="${e(item.code)}" data-product-code="${e(item.code)}">
      <img src="${e(new URL(item.image).pathname)}" alt="${e(item.name)}" loading="lazy" width="600" height="450" style="object-fit:${e(item.imageFit)}">
      <div class="details"><p class="code">${e(item.code)}</p><h3>${e(item.name)}</h3><p>${e(item.description)}</p>
      <p class="price">${price(item.price)} <small>ARS</small></p>
      ${item.addons.map((addon) => `<p class="addon">${e(addon.name)} opcional: +${price(addon.price)}. Solo junto con esta tarta.</p>`).join('')}
      <a class="order" href="/#menu">Armar pedido en el menú</a></div></article>`).join('')}</div></section>`).join('');
  return `<!doctype html>
<html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Carta completa | ${e(SITE.shortName)}</title>
<meta name="description" content="Carta completa de La Colorada: pizzas grandes, empanadas y comidas caseras con precios en pesos argentinos.">
${noindex ? '<meta name="robots" content="noindex,follow">' : ''}
<link rel="canonical" href="${e(absolute(CARTA_PATH))}">
<link rel="alternate" type="application/json" href="${CATALOG_PATH}" title="Catálogo estructurado">
<script type="application/ld+json">${safeJson({ '@context': 'https://schema.org', '@graph': [restaurant, buildMenuJsonLd()] })}</script>
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{margin:0;background:#faf7f2;color:#252321;font:17px/1.55 system-ui,sans-serif}a{color:#a61922}a:focus-visible{outline:3px solid #a61922;outline-offset:4px}header{background:#a61922;color:white;padding:36px 20px}header a{color:white}header .wrap,main,footer{max-width:1180px;margin:auto}main{padding:24px 20px}h1{font-size:clamp(2rem,5vw,3rem);line-height:1.1}h2{margin:36px 0 18px;font-size:1.8rem}h3{font-size:1.15rem;margin:0 0 8px}nav{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0}nav a{padding:8px 16px;border:1px solid #dccfc3;border-radius:24px;text-decoration:none;background:white}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:22px}article{background:white;border:1px solid #e6dfd6;border-radius:18px;overflow:hidden;display:flex;flex-direction:column}article img{display:block;width:100%;height:220px;background:white}.details{padding:20px;display:flex;flex-direction:column;flex:1}.details p{margin:0 0 12px}.code{font-size:.75rem;color:#74685f}.price{font-size:1.4rem;font-weight:750;color:#a61922}.price small{font-size:.75rem}.addon{font-size:.9rem}.order{margin-top:auto;font-weight:650}footer{padding:30px 20px 40px;border-top:1px solid #dccfc3}footer a{display:inline-block;margin-right:20px}.notice{max-width:850px}section{scroll-margin-top:20px}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style></head><body>
<header><div class="wrap"><a href="/">${e(SITE.shortName)}</a><h1>Nuestra carta completa</h1><p>Pizzas, empanadas y comidas caseras · La Horqueta</p><a href="/#menu">Armar pedido</a></div></header>
<main><div class="notice"><p>Precios en pesos argentinos · Pizzas grandes.</p><p>Los platos con guarnición incluyen ensalada. Consultá disponibilidad y cambios al confirmar por WhatsApp.</p></div><nav aria-label="Categorías de la carta">${navigation}</nav>${sections}</main>
<footer><p>${e(SITE.address.streetAddress)} · ${e(SITE.address.area)}</p><a href="/#menu">Armar pedido</a><a href="${CATALOG_PATH}">Catálogo en JSON</a><a href="/">Volver al inicio</a></footer>
</body></html>`;
}
