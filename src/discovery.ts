import type { CategoryId } from './data';

export type DiscoveryPage = {
  path: string;
  label: string;
  heading: string;
  description: string;
  intro: string;
  categories: readonly CategoryId[];
  preferredCode: string;
  vegetarianOnly?: boolean;
};

/** Editorial context only: dishes, prices, photos and availability remain in MENU. */
export const DISCOVERY_PAGES: readonly DiscoveryPage[] = [
  {
    path: '/pizzas/', label: 'Pizzas', heading: 'Pizzas en La Horqueta',
    description: 'Pizzas grandes de La Colorada en La Horqueta, San Isidro. Conocé las variedades, fotos y precios del menú y armá tu pedido por WhatsApp.',
    intro: 'Nuestras pizzas son grandes. Encontrá muzzarella, napolitana, cuatro quesos, fugazeta y las demás variedades del menú de La Colorada. Estamos en la Galería Colorada de La Horqueta, San Isidro.',
    categories: ['pizzas'], preferredCode: 'PIZ001',
  },
  {
    path: '/empanadas/', label: 'Empanadas', heading: 'Empanadas en La Horqueta',
    description: 'Empanadas de La Colorada en La Horqueta, San Isidro: carne, pollo, jamón y queso y La Colorada de la casa. Fotos, variedades y precios del menú.',
    intro: 'Conocé los gustos de nuestras empanadas, desde carne suave y carne cortada a cuchillo hasta La Colorada, la de la casa, con tomates secos, albahaca y queso provolone. Consultá las variedades y armá tu pedido en el menú.',
    categories: ['empanadas'], preferredCode: 'EMP012',
  },
  {
    path: '/milanesas/', label: 'Milanesas', heading: 'Milanesas en La Horqueta',
    description: 'Milanesas de La Colorada en La Horqueta, San Isidro. Variedades de carne, pollo, berenjena y zucchini con ensalada. Mirá fotos y precios del menú.',
    intro: 'Milanesas de carne, supremas de pollo y opciones de berenjena o zucchini, con distintas terminaciones del menú. Los platos con guarnición incluyen ensalada; podés consultar cambios al confirmar por WhatsApp.',
    categories: ['milanesas'], preferredCode: 'MIL001',
  },
  {
    path: '/tartas/', label: 'Tartas', heading: 'Tartas caseras en La Horqueta',
    description: 'Tartas caseras de La Colorada en La Horqueta, San Isidro: verdura, calabaza, humita y más. Porciones, fotos, precios y ensalada opcional con tu tarta.',
    intro: 'Porciones de tartas caseras de verdura, calabaza, humita, zapallito, jamón y queso o capresse. Podés sumar la ensalada opcional junto con tu tarta; el adicional se elige al armar el pedido.',
    categories: ['tartas'], preferredCode: 'TAR001',
  },
  {
    path: '/la-colorada-veggie/', label: 'La Colorada Veggie',
    heading: 'La Colorada Veggie: opciones vegetarianas en La Horqueta',
    description: 'La Colorada Veggie en La Horqueta, San Isidro. Pizzas, empanadas, milanesas de berenjena o zucchini, tartas, ensaladas, pastas y medallones vegetarianos. Fotos y precios.',
    intro: 'Opciones vegetarianas de La Colorada, organizadas por las mismas secciones de nuestra carta: pizzas, empanadas, ensaladas, tartas, milanesas de berenjena o zucchini y pastas, además de nuestros medallones. Los medallones vienen de lentejas, garbanzos, quinoa al curry, porotos colorados o mijo con calabaza; cada plato de medallones incluye dos unidades gratinadas con queso, orégano y una aceituna por unidad, con ensalada. Las opciones pueden llevar queso o huevo: vegetariano no significa vegano.',
    categories: ['pizzas', 'empanadas', 'ensaladas', 'tartas', 'milanesas', 'pastas', 'medallones'], preferredCode: 'MED001', vegetarianOnly: true,
  },
];
