const OPENING_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const MAPS_QUERY_VALUE = encodeURIComponent(
  'Galería Colorada, Blanco Encalada 2229, La Horqueta, Beccar, San Isidro, Argentina',
);

export const SITE = {
  name: 'La Colorada',
  htmlTitle:
    'La Colorada — Pizzas, Empanadas & Comidas Caseras | La Horqueta, San Isidro',
  metaDescription:
    'La Colorada: pizza de molde, empanadas cruzadas y comida casera en la Galería Colorada, La Horqueta, Beccar, San Isidro. Hacé tu pedido por WhatsApp.',
  summary:
    'Pizza de molde, empanadas cruzadas y comida casera en la Galería Colorada, La Horqueta, San Isidro.',
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
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY_VALUE}`,
  openingHours: [
    {
      days: OPENING_DAYS,
      opens: '11:30',
      closes: '14:30',
    },
    {
      days: OPENING_DAYS,
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
export const OPENING_HOURS_DISPLAY = `Lunes a domingos · ${SITE.openingHours
  .map((schedule) => `${schedule.opens} a ${schedule.closes}`)
  .join(' · ')}`;
