import type { Plugin } from 'vite';
import { CATEGORIES, MENU } from '../src/data';
import { SITE } from '../src/site-data';
import { SITE_SECTION_IDS, type Section } from '../src/types';

const SITE_SECTIONS: ReadonlyArray<{
  id: Section;
  label: string;
  description: string;
}> = [
  { id: 'inicio', label: 'Inicio', description: 'Presentación y acceso rápido al menú.' },
  { id: 'menu', label: 'Menú', description: 'Carta completa organizada por categorías.' },
  { id: 'galeria', label: 'Galería', description: 'Fotos de pizzas, empanadas y platos caseros.' },
  {
    id: 'opiniones',
    label: 'Opiniones',
    description: 'Reseñas de clientes sobre el local y sus platos.',
  },
  {
    id: 'ubicacion',
    label: 'Ubicación',
    description: 'Dirección, horarios y canales de contacto.',
  },
] as const;

function formatHours() {
  return 'lunes a sábados de 11:00 a 15:00 y de 19:00 a 23:00; domingos de 19:00 a 23:00';
}

function buildPriceRange() {
  const prices = Object.values(MENU).flatMap((category) =>
    category.map((dish) => dish.price),
  );

  if (prices.length === 0) return 'Consultar';
  return `$${Math.min(...prices)}–$${Math.max(...prices)} ARS`;
}

export function buildRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment'],
    '@id': `${SITE.url}/#restaurant`,
    name: SITE.name,
    description: SITE.metaDescription,
    url: `${SITE.url}/`,
    menu: `${SITE.url}/#menu`,
    hasMap: SITE.mapsUrl,
    telephone: SITE.phones.map((phone) => phone.schema),
    priceRange: buildPriceRange(),
    servesCuisine: SITE.cuisines,
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
}

export function buildLlmsTxt() {
  const categorySummary = CATEGORIES.map(
    (category) => `${category.label} (${MENU[category.id].length} variedades)`,
  ).join('; ');

  return `# ${SITE.name}

> ${SITE.summary}

${SITE.shortName} ofrece almuerzos de oficina, pizzas y empanadas premium de recetas tradicionales, y comidas caseras para retirar o pedir por WhatsApp.

- Sitio oficial: ${SITE.url}/.
- Dirección: ${SITE.address.streetAddress} (${SITE.address.venue}), ${SITE.address.area}.
- Horarios: ${formatHours()}.
- Teléfonos: ${SITE.phones.map((phone) => phone.display).join(' y ')}.
- WhatsApp: ${SITE.whatsappDisplay}.
- Cobertura: envíos a todo el Partido de San Isidro. Los envíos inmediatos cubren un radio de ${SITE.delivery.immediateRadiusKm} km; fuera de ese radio requieren coordinación previa.
- Pedidos Programados: para oficinas, almuerzos, reuniones y juntadas de mediodía y noche.
- Eventos: contactar directamente por WhatsApp.

El menú publicado se organiza en: ${categorySummary}. Los precios y la disponibilidad se consultan en la web.

## Secciones del sitio

${SITE_SECTIONS.map(
  (section) =>
    `- [${section.label}](/#${section.id}): ${section.description}`,
).join('\n')}

## Canales oficiales

- [Instagram](${SITE.instagramUrl}): ${SITE.instagramHandle}.
- [Cómo llegar](${SITE.mapsUrl}): mapa de Google con la ubicación del local.
- [WhatsApp](https://wa.me/${SITE.whatsappNumber}): canal público para consultar disponibilidad y hacer pedidos.
`;
}

export function llmsTxtPlugin(): Plugin {
  return {
    name: 'la-colorada-llms-txt',
    configureServer(server) {
      const content = buildLlmsTxt();

      server.middlewares.use((request, response, next) => {
        const pathname = (request.url ?? '/').split('?')[0];
        if (pathname !== '/llms.txt') {
          next();
          return;
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        response.setHeader('Cache-Control', 'no-cache');
        response.end(content);
      });
    },
    transformIndexHtml() {
      return {
        title: SITE.htmlTitle,
        tags: [
          {
            tag: 'meta',
            attrs: {
              name: 'description',
              content: SITE.metaDescription,
            },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: {
              name: 'la-colorada:sections',
              content: SITE_SECTION_IDS.join(' '),
            },
            injectTo: 'head',
          },
          {
            tag: 'link',
            attrs: {
              rel: 'canonical',
              href: `${SITE.url}/`,
            },
            injectTo: 'head',
          },
          {
            tag: 'link',
            attrs: {
              rel: 'describedby',
              type: 'text/markdown',
              href: '/llms.txt',
            },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:type', content: 'website' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:locale', content: 'es_AR' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:site_name', content: SITE.name },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:url', content: `${SITE.url}/` },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:title', content: SITE.htmlTitle },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: {
              property: 'og:description',
              content: SITE.metaDescription,
            },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:card', content: 'summary' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:title', content: SITE.htmlTitle },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: {
              name: 'twitter:description',
              content: SITE.metaDescription,
            },
            injectTo: 'head',
          },
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(buildRestaurantJsonLd(), null, 2),
            injectTo: 'head',
          },
        ],
      };
    },
    generateBundle(_options, bundle) {
      const content = buildLlmsTxt();
      const existingFile = bundle['llms.txt'];

      if (existingFile?.type === 'asset') {
        existingFile.source = content;
        return;
      }

      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: content,
      });
    },
  };
}
