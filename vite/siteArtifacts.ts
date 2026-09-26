import type { Plugin } from 'vite';
import { CATEGORIES, MENU } from '../src/data';
import { SITE } from '../src/site-data';
import type { SiteMode } from '../src/site-mode';
import { SITE_SECTION_IDS, type Section } from '../src/types';

const SITE_SECTIONS: ReadonlyArray<{
  id: Section;
  label: string;
  description: string;
}> = [
  { id: 'inicio', label: 'Inicio', description: 'Presentación y acceso rápido al menú.' },
  { id: 'menu', label: 'Menú', description: 'Carta completa organizada por categorías.' },
  { id: 'galeria', label: 'Galería', description: 'Fotos de pizzas, empanadas y platos caseros.' },
  { id: 'opiniones', label: 'Opiniones', description: 'Reseñas de clientes sobre el local y sus platos.' },
  { id: 'ubicacion', label: 'Ubicación', description: 'Dirección, horarios y canales de contacto.' },
] as const;

function formatHours() {
  return 'lunes a viernes de 10:30 a 15:00 y de 19:00 a 23:00; sábados de 11:00 a 15:00 y de 19:00 a 23:00; domingos de 19:00 a 23:00';
}

function buildPriceRange() {
  const prices = Object.values(MENU).flatMap((category) =>
    category.map((dish) => dish.price),
  );
  return prices.length === 0
    ? 'Consultar'
    : `$${Math.min(...prices)}–$${Math.max(...prices)} ARS`;
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;
}

export function buildSitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE.url}/</loc>\n  </url>\n</urlset>\n`;
}

export function buildRestaurantJsonLd(siteMode: SiteMode) {
  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE.url}/#restaurant`,
    name: SITE.name,
    description: SITE.metaDescription,
    url: `${SITE.url}/`,
    image: SITE.socialImage,
    hasMap: SITE.mapsUrl,
    telephone: SITE.phones.map((phone) => phone.schema),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.whatsappDisplay,
      contactType: 'Pedidos por WhatsApp',
      availableLanguage: 'Spanish',
    },
    priceRange: buildPriceRange(),
    servesCuisine: SITE.cuisines,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: SITE.delivery.structuredArea,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: SITE.openingHours.map((schedule) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...schedule.days],
      opens: schedule.opens,
      closes: schedule.closes,
    })),
    sameAs: [SITE.instagramUrl],
  };

  return siteMode === 'full'
    ? { ...restaurant, menu: `${SITE.url}/#menu` }
    : restaurant;
}

export function buildLlmsTxt(siteMode: SiteMode) {
  const categorySummary = CATEGORIES.map(
    (category) => `${category.label} (${MENU[category.id].length} variedades)`,
  ).join('; ');

  const menuSummary = siteMode === 'full'
    ? `El menú interactivo se organiza en: ${categorySummary}. Los precios y la disponibilidad se consultan en la web.`
    : 'La versión pública actual es una landing informativa. El menú interactivo todavía no está publicado; la disponibilidad y los pedidos se coordinan por WhatsApp.';

  const sections = SITE_SECTIONS
    .filter((section) => siteMode === 'full' || section.id !== 'menu')
    .map((section) => `- [${section.label}](/#${section.id}): ${section.description}`)
    .join('\n');

  return `# ${SITE.name}

> ${SITE.summary}

${SITE.shortName} ofrece pizzas, empanadas y comidas caseras para retirar o pedir por WhatsApp. También prepara opciones vegetarianas y veganas, ensaladas a medida, almuerzos de oficina y pedidos programados.

- Sitio oficial: ${SITE.url}/.
- Dirección: ${SITE.address.streetAddress} (${SITE.address.venue}), ${SITE.address.area}.
- Horarios: ${formatHours()}.
- Teléfonos: ${SITE.phones.map((phone) => phone.display).join(' y ')}.
- WhatsApp: ${SITE.whatsappDisplay}.
- Cobertura: delivery sin cargo en la zona de cobertura. Envíos a todo el Partido de San Isidro; los envíos inmediatos cubren un radio de ${SITE.delivery.immediateRadiusKm} km y fuera de ese radio requieren coordinación previa.
- Pedidos Programados: para oficinas, almuerzos, reuniones y juntadas de mediodía y noche.
- Eventos: contactar directamente por WhatsApp.

${menuSummary}

## Secciones del sitio

${sections}

## Canales oficiales

- [Instagram](${SITE.instagramUrl}): ${SITE.instagramHandle}.
- [Cómo llegar](${SITE.mapsUrl}): mapa de Google con la ubicación del local.
- [WhatsApp](https://wa.me/${SITE.whatsappNumber}): canal público para consultar disponibilidad y hacer pedidos.
`;
}

export function siteArtifactsPlugin(siteMode: SiteMode): Plugin {
  const getArtifact = (pathname: string) => {
    if (pathname === '/llms.txt') {
      return { content: buildLlmsTxt(siteMode), type: 'text/markdown; charset=utf-8' };
    }
    if (pathname === '/robots.txt') {
      return { content: buildRobotsTxt(), type: 'text/plain; charset=utf-8' };
    }
    if (pathname === '/sitemap.xml') {
      return { content: buildSitemapXml(), type: 'application/xml; charset=utf-8' };
    }
    return undefined;
  };

  return {
    name: 'la-colorada-site-artifacts',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const artifact = getArtifact((request.url ?? '/').split('?')[0]);
        if (!artifact) {
          next();
          return;
        }
        response.statusCode = 200;
        response.setHeader('Content-Type', artifact.type);
        response.setHeader('Cache-Control', 'no-cache');
        response.end(artifact.content);
      });
    },
    transformIndexHtml() {
      return {
        title: SITE.htmlTitle,
        tags: [
          { tag: 'meta', attrs: { name: 'description', content: SITE.metaDescription }, injectTo: 'head' },
          {
            tag: 'meta',
            attrs: {
              name: 'la-colorada:sections',
              content: SITE_SECTION_IDS.filter((section) => siteMode === 'full' || section !== 'menu').join(' '),
            },
            injectTo: 'head',
          },
          { tag: 'link', attrs: { rel: 'canonical', href: `${SITE.url}/` }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'describedby', type: 'text/markdown', href: '/llms.txt' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:locale', content: 'es_AR' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${SITE.url}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:title', content: SITE.htmlTitle }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:description', content: SITE.metaDescription }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: SITE.socialImage }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:alt', content: 'La Colorada: pizzas, empanadas y comidas caseras' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:title', content: SITE.htmlTitle }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:description', content: SITE.metaDescription }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: SITE.socialImage }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'La Colorada: pizzas, empanadas y comidas caseras' }, injectTo: 'head' },
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(buildRestaurantJsonLd(siteMode), null, 2),
            injectTo: 'head',
          },
        ],
      };
    },
    generateBundle() {
      const artifacts = {
        'llms.txt': buildLlmsTxt(siteMode),
        'robots.txt': buildRobotsTxt(),
        'sitemap.xml': buildSitemapXml(),
      };
      Object.entries(artifacts).forEach(([fileName, source]) => {
        this.emitFile({ type: 'asset', fileName, source });
      });
    },
  };
}
