import type { Dish, Review } from './types';
import { Pizza, Flame, UtensilsCrossed, Salad, Sandwich, Soup } from 'lucide-react';

export {
  ADDRESS,
  ADDRESS_AREA,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_QUERY,
  MAPS_URL,
  OPENING_HOURS_DISPLAY,
  PHONES,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from './site-data';

export const FLYER_IMG = '/images/WhatsApp_Image_2026-07-30_at_10.13.29.jpeg';

export const IMG = {
  hero: 'https://images.pexels.com/photos/9685234/pexels-photo-9685234.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  placeholderPizza: '/images/menu/placeholder-pizza.svg',
  placeholderEmpanada: '/images/menu/placeholder-empanada.svg',
  placeholderPlato: '/images/menu/placeholder-plato.svg',
  gallery1: '/images/gallery/pizzas.webp',
  gallery2: '/images/gallery/empanadas.webp',
  gallery3: '/images/gallery/comidas-caseras.webp',
  gallery4: '/images/gallery/el-rincon-de-la-galeria.webp',
};

export const CATEGORIES = [
  { id: 'pizzas', label: 'Pizzas', icon: Pizza },
  { id: 'empanadas', label: 'Empanadas', icon: Flame },
  { id: 'ensaladas', label: 'Ensaladas', icon: Salad },
  { id: 'tartas', label: 'Tartas', icon: Sandwich },
  { id: 'milanesas', label: 'Milanesas y Pollo', icon: UtensilsCrossed },
  { id: 'pastas', label: 'Pastas y Más', icon: Soup },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const MENU: Record<CategoryId, Dish[]> = {
  pizzas: [
    { id: 'muzzarella', name: 'Muzzarella', desc: 'Salsa de tomate, mozzarella y orégano.', price: 20000, tag: 'La más pedida', img: '/images/menu/pizzas/01-pizza-de-muzzarella.webp' },
    { id: 'muzz-albahaca', name: 'Muzzarella y Albahaca', desc: 'Mozzarella con albahaca.', price: 22000, img: '/images/menu/pizzas/02-pizza-de-muzza-y-albahaca.webp' },
    { id: 'muzz-rucula-huevo', name: 'Muzzarella, Rúcula y Huevo', desc: 'Mozzarella, rúcula y huevo.', price: 22000, img: '/images/menu/pizzas/03-pizza-de-muzza-y-rucula.webp' },
    { id: 'muzz-jamon-huevo', name: 'Muzzarella, Jamón y Huevo', desc: 'Mozzarella, jamón y huevo.', price: 25000, img: '/images/menu/pizzas/06-pizza-de-muzza-jamon-y-huevo.webp' },
    { id: 'muzz-jamon-morron', name: 'Muzzarella, Jamón y Morrón', desc: 'Mozzarella, jamón y morrón.', price: 28000, img: '/images/menu/pizzas/07-pizza-de-muzza-jamon-y-morron.webp' },
    { id: 'muzz-anchoas', name: 'Muzzarella y Anchoas', desc: 'Mozzarella y anchoas.', price: 29000, img: IMG.placeholderPizza },
    { id: '4-quesos', name: '4 Quesos', desc: 'Pizza de cuatro quesos.', price: 29000, tag: 'Especialidad', img: '/images/menu/pizzas/08-pizza-4-quesos.webp' },
    { id: 'provolone', name: 'Provolone', desc: 'Mozzarella y provolone.', price: 27000, img: '/images/menu/pizzas/09-pizza-de-provolone.webp' },
    { id: 'calabresa', name: 'Calabresa', desc: 'Mozzarella y longaniza calabresa.', price: 26000, img: IMG.placeholderPizza },
    { id: 'napolitana', name: 'Napolitana', desc: 'Mozzarella, tomate, ajo y perejil.', price: 25000, img: IMG.placeholderPizza },
    { id: 'napolitana-jamon', name: 'Napolitana con Jamón', desc: 'Napolitana con jamón.', price: 28000, img: IMG.placeholderPizza },
    { id: 'jamon-crudo-rucula', name: 'Jamón Crudo y Rúcula', desc: 'Mozzarella, jamón crudo y rúcula.', price: 28000, img: IMG.placeholderPizza },
    { id: 'palmitos', name: 'Palmitos', desc: 'Mozzarella, palmitos y salsa golf.', price: 29000, img: IMG.placeholderPizza },
    { id: 'fugazeta', name: 'Fugazeta', desc: 'Pizza rellena de mozzarella y cebolla.', price: 22000, img: IMG.placeholderPizza },
    { id: 'faina', name: 'Fainá', desc: 'Fainá de garbanzo al horno.', price: 2000, img: IMG.placeholderPizza },
  ],
  empanadas: [
    { id: 'carne-suave', name: 'Carne Suave', desc: 'Carne, cebolla, morrón y especias suaves.', price: 3000, img: '/images/menu/01-empanada-de-carne-suave.webp' },
    { id: 'carne-picante', name: 'Carne Picante', desc: 'Carne con un toque picante.', price: 3000, img: '/images/menu/02-empanada-de-carne-picante.webp' },
    { id: 'carne-cuchillo', name: 'Carne Cortada a Cuchillo', desc: 'Carne cortada a cuchillo.', price: 3500, tag: 'Especial', img: IMG.placeholderEmpanada },
    { id: 'pollo', name: 'Pollo', desc: 'Pollo, cebolla, morrón y especias.', price: 3000, img: '/images/menu/03-empanada-de-pollo.webp' },
    { id: 'verdura', name: 'Verdura', desc: 'Verdura y queso.', price: 3000, img: '/images/menu/04-empanada-de-verdura.webp' },
    { id: 'humita', name: 'Humita', desc: 'Choclo cremoso y queso.', price: 3000, img: '/images/menu/05-empanada-de-humita.webp' },
    { id: 'jamon-queso', name: 'Jamón y Queso', desc: 'Jamón y mozzarella.', price: 3000, img: '/images/menu/06-empanada-de-jamon-y-queso.webp' },
    { id: 'roquefort', name: 'Roquefort', desc: 'Roquefort y mozzarella.', price: 3000, img: '/images/menu/10-empanada-de-roquefort.webp' },
    { id: 'queso-cebolla', name: 'Queso y Cebolla', desc: 'Mozzarella y cebolla.', price: 3000, img: '/images/menu/07-empanada-de-queso-y-cebolla.webp' },
    { id: 'capresse', name: 'Capresse', desc: 'Tomate, mozzarella y albahaca.', price: 3000, img: '/images/menu/08-empanada-capresce.webp' },
    { id: 'crudo-queso', name: 'Crudo y Queso', desc: 'Jamón crudo y mozzarella.', price: 3000, img: '/images/menu/09-empanadas-de-crudo-y-queso.webp' },
  ],
  ensaladas: [
    { id: 'ensalada-dia', name: 'Ensalada del Día', desc: 'Lechuga, rúcula, tomate, zanahoria, queso, huevo y pollo grillé.', price: 10000, tag: 'La más pedida', img: '/images/menu/ensaladas/02-ensalada-del-dia.webp' },
    { id: 'ensalada-dia-veg', name: 'Ensalada del Día Vegetariana', desc: 'Con berenjena, zucchini o choclo.', price: 9000, img: '/images/menu/ensaladas/04-ensalada-vegetariana.webp' },
    { id: 'mix-verdes', name: 'Mix Verdes', desc: 'Lechuga, rúcula, tomates cherry, zanahoria, huevo y pollo grillé.', price: 10000, img: '/images/menu/ensaladas/01-ensalada.webp' },
    { id: 'cesar', name: 'César', desc: 'Lechuga, lechuga morada, queso, croutones caseros, pollo grillé y aderezo.', price: 10000, img: '/images/menu/ensaladas/03-ensalada-cesar.webp' },
  ],
  tartas: [
    { id: 'tarta-verdura', name: 'Tarta de Verdura', desc: 'Porción de tarta casera de verdura.', price: 8500, img: '/images/menu/tartas-comidas-caseras/04-tarta-de-verdura.webp' },
    { id: 'tarta-calabaza', name: 'Tarta de Calabaza', desc: 'Porción de tarta casera de calabaza.', price: 8500, img: '/images/menu/tartas-comidas-caseras/02-tarta-de-calabaza.webp' },
    { id: 'tarta-humita', name: 'Tarta de Humita', desc: 'Porción de tarta casera de humita.', price: 8500, img: '/images/menu/tartas-comidas-caseras/03-tarta-de-humita.webp' },
    { id: 'tarta-zapallito', name: 'Tarta de Zapallito', desc: 'Porción de tarta casera de zapallito.', price: 8500, img: '/images/menu/tartas-comidas-caseras/01-tarta-de-zapallitos.webp' },
    { id: 'tarta-jamon-queso', name: 'Tarta de Jamón y Queso', desc: 'Porción de tarta casera de jamón y queso.', price: 9000, img: '/images/menu/tartas-comidas-caseras/05-tarta-de-jamon-y-queso.webp' },
    { id: 'tarta-capresse', name: 'Tarta Capresse', desc: 'Porción de tarta casera capresse.', price: 9000, img: IMG.placeholderPlato },
    { id: 'guarnicion-ensalada', name: 'Guarnición de Ensalada para Tarta', desc: 'Opcional para acompañar una porción de tarta.', price: 2500, img: '/images/menu/ensaladas/01-ensalada.webp' },
  ],
  milanesas: [
    { id: 'mila-ternera', name: 'Milanesa de Ternera al Horno', desc: 'Milanesa de ternera.', price: 13000, tag: 'La más pedida', img: '/images/menu/milanesas/07-milanesa-de-ternera.webp' },
    { id: 'mila-gratinada', name: 'Milanesa con Muzzarella', desc: 'Milanesa de ternera con mozzarella.', price: 15000, img: '/images/menu/milanesas/04-milanesa-de-ternera-gratinada.webp' },
    { id: 'mila-muzz-albahaca', name: 'Milanesa con Muzzarella y Albahaca', desc: 'Milanesa de ternera con mozzarella y albahaca.', price: 15500, img: IMG.placeholderPlato },
    { id: 'mila-rucula-huevo', name: 'Milanesa con Muzzarella, Rúcula y Huevo', desc: 'Milanesa con mozzarella, rúcula y huevo.', price: 16000, img: IMG.placeholderPlato },
    { id: 'mila-napolitana', name: 'Milanesa a la Napolitana', desc: 'Milanesa napolitana.', price: 17000, img: '/images/menu/milanesas/06-milanesa-de-ternera-napolitana.webp' },
    { id: 'mila-napolitana-jamon', name: 'Milanesa Napolitana con Jamón', desc: 'Milanesa napolitana con jamón.', price: 18500, img: IMG.placeholderPlato },
    { id: 'mila-crudo-rucula', name: 'Milanesa con Jamón Crudo y Rúcula', desc: 'Milanesa con jamón crudo y rúcula.', price: 20000, img: IMG.placeholderPlato },
    { id: 'mila-jamon-morron', name: 'Milanesa con Muzzarella, Jamón y Morrón', desc: 'Milanesa con mozzarella, jamón y morrón.', price: 20000, img: IMG.placeholderPlato },
    { id: 'mila-provolone', name: 'Milanesa al Provolone', desc: 'Milanesa con provolone.', price: 21000, img: IMG.placeholderPlato },
    { id: 'mila-4-quesos', name: 'Milanesa 4 Quesos', desc: 'Milanesa con cuatro quesos.', price: 23000, tag: 'Especialidad', img: IMG.placeholderPlato },
    { id: 'veg-fugazetta', name: 'Berenjena o Zucchini Fugazetta', desc: 'Milanesa vegetariana al horno estilo fugazetta.', price: 9500, img: '/images/menu/milanesas/08-mlanesas-de-berenjena-fuga.webp' },
    { id: 'veg-muzzarella', name: 'Berenjena o Zucchini con Muzzarella', desc: 'Milanesa vegetariana con mozzarella.', price: 10000, img: '/images/menu/milanesas/01-milanesa-de-zucchini-gratinada.webp' },
    { id: 'veg-napolitana', name: 'Berenjena o Zucchini a la Napolitana', desc: 'Milanesa vegetariana a la napolitana.', price: 10000, img: IMG.placeholderPlato },
    { id: 'veg-rucula-huevo', name: 'Berenjena o Zucchini con Muzzarella, Rúcula y Huevo', desc: 'Con mozzarella, rúcula y huevo.', price: 11000, img: IMG.placeholderPlato },
    { id: 'veg-napolitana-jamon', name: 'Berenjena o Zucchini Napolitana con Jamón', desc: 'Napolitana con jamón.', price: 13000, img: IMG.placeholderPlato },
    { id: 'veg-jamon-huevo', name: 'Berenjena o Zucchini con Muzzarella, Jamón y Huevo', desc: 'Con mozzarella, jamón y huevo.', price: 13000, img: IMG.placeholderPlato },
    { id: 'veg-jamon-morron', name: 'Berenjena o Zucchini con Muzzarella, Jamón y Morrón', desc: 'Con mozzarella, jamón y morrón.', price: 15000, img: IMG.placeholderPlato },
    { id: 'veg-provolone', name: 'Berenjena o Zucchini al Provolone', desc: 'Milanesa vegetariana con provolone.', price: 16000, img: IMG.placeholderPlato },
    { id: 'veg-4-quesos', name: 'Berenjena o Zucchini 4 Quesos', desc: 'Milanesa vegetariana con cuatro quesos.', price: 17000, img: IMG.placeholderPlato },
    { id: 'veg-crudo-rucula', name: 'Berenjena o Zucchini con Jamón Crudo y Rúcula', desc: 'Con jamón crudo y rúcula.', price: 17000, img: IMG.placeholderPlato },
    { id: 'suprema-pollo', name: 'Suprema de Pollo', desc: 'Suprema de pollo al horno.', price: 11000, img: '/images/menu/milanesas/03-suprema-de-pollo.webp' },
    { id: 'suprema-gratinada', name: 'Suprema de Pollo Gratinada', desc: 'Suprema de pollo gratinada.', price: 12500, img: '/images/menu/milanesas/05-suprema-de-pollo-gratinada.webp' },
    { id: 'pechuga-grille', name: 'Pechuga Grillé', desc: 'Pechuga de pollo grillada.', price: 12500, img: IMG.placeholderPlato },
    { id: 'grille-gratinado', name: 'Grillé Gratinado', desc: 'Pechuga grillada y gratinada.', price: 14000, img: IMG.placeholderPlato },
  ],
  pastas: [
    { id: 'lasagna-carne', name: 'Lasagna de Carne', desc: 'Lasagna casera de carne.', price: 12000, tag: 'La más pedida', img: '/images/menu/pastas/01-lasagna-de-carne.webp' },
    { id: 'lasagna-verdura', name: 'Lasagna de Verdura', desc: 'Lasagna casera de verdura.', price: 10000, img: '/images/menu/pastas/02-lasagna-de-verdura.webp' },
    { id: 'lasagna-carne-verdura', name: 'Lasagna de Carne y Verdura', desc: 'Lasagna casera mixta.', price: 11000, img: IMG.placeholderPlato },
    { id: 'canelones-verdura', name: 'Canelones de Verdura', desc: 'Canelones caseros de verdura.', price: 10000, img: '/images/menu/pastas/02-canelones-de-verdura.webp' },
    { id: 'canelones-calabaza', name: 'Canelones de Calabaza', desc: 'Canelones caseros de calabaza.', price: 10000, img: '/images/menu/pastas/01-canelones-de-calabaza.webp' },
    { id: 'pastel-papas', name: 'Pastel de Papas', desc: 'Pastel de papas casero.', price: 10000, img: '/images/menu/pastas/05-pastel-de-papa.webp' },
    { id: 'omelette-jamon-queso', name: 'Omelette de Jamón y Queso', desc: 'Omelette de jamón y queso.', price: 10000, img: '/images/menu/omelettes/01-omelette-de-jamon-y-queso.webp' },
    { id: 'omelette-capresse', name: 'Omelette Capresse', desc: 'Omelette de tomate, mozzarella y albahaca.', price: 9500, img: '/images/menu/omelettes/02-omelette-caprese.webp' },
    { id: 'falafel', name: 'Falafel con Salsa Tai', desc: 'Falafel casero con salsa tai.', price: 10000, tag: 'Veggie', img: IMG.placeholderPlato },
    { id: 'medallones-veg', name: 'Medallones Vegetarianos Gratinados', desc: 'De lentejas, garbanzos, quinoa al curry, porotos colorados o mijo.', price: 10000, img: IMG.placeholderPlato },
  ],
};

export const REVIEWS: Review[] = [
  {
    name: 'Mariano G.',
    initials: 'MG',
    color: '#D32F2F',
    text: 'Excelente atención de los dueños en la Galería Colorada. Las empanadas de carne a cuchillo son una locura de ricas y jugosas. La verdadera pizza de molde de San Isidro.',
  },
  {
    name: 'Laura M.',
    initials: 'LM',
    color: '#1565C0',
    text: 'Pedimos milanesas con papas fritas y pizza de muzzarella para un cumpleaños familiar. Llegó todo súper rápido, bien caliente y con ese sabor casero espectacular que se extrañaba en el barrio.',
  },
  {
    name: 'Santiago F.',
    initials: 'SF',
    color: '#2E7D32',
    text: 'El local de La Horqueta es un clásico absoluto. Los ingredientes son de primera calidad y la fugazzeta rellena es insuperable. Excelente relación precio-calidad.',
  },
  {
    name: 'Valeria B.',
    initials: 'VB',
    color: '#6A1B9A',
    text: 'Me encanta pedir para llevar los fines de semana. Las porciones son enormes, la comida es casera real y la atención telefónica siempre es impecable y súper amable.',
  },
];

export const GALLERY = [
  { img: IMG.gallery1, caption: 'Pizzas de La Colorada' },
  { img: IMG.gallery2, caption: 'Empanadas doradas al horno' },
  { img: IMG.gallery3, caption: 'Comidas Caseras' },
  { img: IMG.gallery4, caption: 'El rincón de la Galería' },
];
