const WEEKDAYS_AND_SATURDAY = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const EVERY_DAY = [...WEEKDAYS_AND_SATURDAY, 'Sunday'] as const;
const SITE_URL = 'https://lacoloradacocina.com.ar';

const MAPS_QUERY_VALUE = encodeURIComponent(
  'La Colorada Pizza, Empanadas y Comidas Caseras La Horqueta, Blanco Encalada 2229, Beccar, San Isidro, Argentina',
);
const GOOGLE_PLACE_ID = 'ChIJVxbwP8i6vJURnJyqT_sTvZE';

export const SITE = {
  name: 'La Colorada Pizza, Empanadas y Comidas Caseras La Horqueta',
  shortName: 'La Colorada',
  url: SITE_URL,
  htmlTitle:
    'La Colorada | Empanadas, Pizzas y Comidas Caseras en La Horqueta',
  metaDescription:
    'Almuerzos de oficina, empanadas y pizzas premium de recetas tradicionales, y comidas caseras en La Horqueta. Pedidos programados y eventos por WhatsApp.',
  summary:
    'Cocina especializada en pizzas, empanadas y platos reales para gente real, con almuerzos de oficina y pedidos programados.',
  cuisines: ['Pizza', 'Empanadas', 'Comida casera argentina'],
  phoneDisplay: '4897-5432',
  phoneTel: '+541148975432',
  phoneSchema: '+54 11 4897-5432',
  whatsappNumber: '5491154955525',
  whatsappDisplay: '+54 9 11 5495-5525',
  instagramUrl: 'https://www.instagram.com/lacoloradapizzas/',
  instagramHandle: '@lacoloradapizzas',
  address: {
    streetAddress: 'Blanco Encalada 2229, Local 15',
    venue: 'Galería Colorada',
    area: 'La Horqueta, Beccar, San Isidro',
    locality: 'Beccar',
    region: 'Buenos Aires',
    country: 'AR',
    countryName: 'Argentina',
  },
  mapsQuery: MAPS_QUERY_VALUE,
  googlePlaceId: GOOGLE_PLACE_ID,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY_VALUE}&query_place_id=${GOOGLE_PLACE_ID}`,
  delivery: {
    area: 'Todo el Partido de San Isidro',
    immediateRadiusKm: 3,
    outsideRadius: 'Requiere coordinación previa por WhatsApp',
  },
  scheduledOrders:
    'Pedidos Programados para oficinas, almuerzos, reuniones y juntadas de mediodía y noche.',
  events: 'Para organizar eventos, contactar directamente por WhatsApp.',
  openingHours: [
    {
      days: WEEKDAYS_AND_SATURDAY,
      opens: '11:00',
      closes: '15:00',
    },
    {
      days: EVERY_DAY,
      opens: '19:00',
      closes: '23:00',
    },
  ],
} as const;

export const PHONE_DISPLAY = SITE.phoneDisplay;
export const PHONE_TEL = SITE.phoneTel;
export const WHATSAPP_NUMBER = SITE.whatsappNumber;
export const WHATSAPP_DISPLAY = SITE.whatsappDisplay;
export const INSTAGRAM_URL = SITE.instagramUrl;
export const INSTAGRAM_HANDLE = SITE.instagramHandle;
export const ADDRESS = `${SITE.address.streetAddress} (${SITE.address.venue})`;
export const ADDRESS_AREA = SITE.address.area;
export const MAPS_QUERY = SITE.mapsQuery;
export const MAPS_URL = SITE.mapsUrl;
export const OPENING_HOURS_DISPLAY =
  'Lunes a sábados · 11:00 a 15:00 · 19:00 a 23:00 | Domingos · 19:00 a 23:00';
