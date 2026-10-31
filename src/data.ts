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
  { id: 'milanesas', label: 'Milanesas', icon: UtensilsCrossed },
  { id: 'pastas', label: 'Pastas y Más', icon: Soup },
  { id: 'medallones', label: 'Medallones', icon: Salad },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

// Fuente provisional aprobada: flyer con precios al 20/10/2026. Ver MENU-UPDATE.md.
export const TART_SALAD_ADDON = { code: 'ADI001', name: 'Ensalada para tarta', price: 2500 };

export const MENU: Record<CategoryId, Dish[]> = {
  pizzas: [
    { id: 'muzzarella', code: 'PIZ001', name: 'Muzzarella', desc: 'Salsa de tomate, mozzarella y orégano.', price: 20000, tag: 'La más pedida', img: '/images/menu/pizzas/01-pizza-de-muzzarella.webp' },
    { id: 'muzz-albahaca', code: 'PIZ002', name: 'Muzzarella y Albahaca', desc: 'Mozzarella con albahaca.', price: 22000, img: '/images/menu/pizzas/02-pizza-de-muzza-y-albahaca.webp' },
    { id: 'muzz-rucula', code: 'PIZ003', name: 'Muzzarella y Rúcula', desc: 'Mozzarella y rúcula.', price: 22500, img: '/images/menu/pizzas/03-pizza-de-muzza-y-rucula.webp' },
    { id: 'muzz-rucula-huevo', code: 'PIZ004', name: 'Muzzarella, Rúcula y Huevo', desc: 'Mozzarella, rúcula y huevo.', price: 22000, img: '/images/menu/pizzas/03b-pizza-de-muzza-rucula-y-huevo.webp' },
    { id: 'muzz-jamon-huevo', code: 'PIZ005', name: 'Muzzarella, Jamón y Huevo', desc: 'Mozzarella, jamón y huevo.', price: 25000, img: '/images/menu/pizzas/06-pizza-de-muzza-jamon-y-huevo.webp' },
    { id: 'muzz-jamon-morron', code: 'PIZ006', name: 'Muzzarella, Jamón y Morrón', desc: 'Mozzarella, jamón y morrón.', price: 28000, img: '/images/menu/pizzas/07-pizza-de-muzza-jamon-y-morron.webp' },
    { id: 'muzz-anchoas', code: 'PIZ007', name: 'Anchoas', desc: 'Salsa de tomate, ajo, orégano y anchoas.', price: 29000, img: '/images/menu/pizzas/07b-pizza-de-anchoas.webp' },
    { id: '4-quesos', code: 'PIZ008', name: '4 Quesos', desc: 'Pizza de cuatro quesos.', price: 31000, tag: 'Especialidad', img: '/images/menu/pizzas/08-pizza-4-quesos.webp' },
    { id: 'provolone', code: 'PIZ009', name: 'Provolone', desc: 'Mozzarella y provolone.', price: 28000, img: '/images/menu/pizzas/09-pizza-de-provolone.webp' },
    { id: 'calabresa', code: 'PIZ010', name: 'Calabresa', desc: 'Mozzarella y longaniza calabresa.', price: 26000, img: '/images/menu/pizzas/10-pizza-calabresa.webp' },
    { id: 'napolitana', code: 'PIZ011', name: 'Napolitana', desc: 'Mozzarella, tomate, ajo y perejil.', price: 25000, img: '/images/menu/pizzas/11-pizza-napolitana.webp' },
    { id: 'napolitana-jamon', code: 'PIZ012', name: 'Napolitana con Jamón', desc: 'Napolitana con jamón.', price: 28000, img: '/images/menu/pizzas/12-pizza-napolitana-con-jamon.webp' },
    { id: 'jamon-crudo-rucula', code: 'PIZ013', name: 'Jamón Crudo y Rúcula', desc: 'Mozzarella, jamón crudo y rúcula.', price: 29000, img: '/images/menu/pizzas/13-pizza-jamon-crudo-y-rucula.webp' },
    { id: 'palmitos', code: 'PIZ014', name: 'Palmitos', desc: 'Mozzarella, palmitos y salsa golf.', price: 29000, img: '/images/menu/pizzas/14-pizza-palmitos.webp' },
    { id: 'fugazeta', code: 'PIZ015', name: 'Fugazeta', desc: 'Pizza rellena de mozzarella y cebolla.', price: 22000, img: '/images/menu/pizzas/15-pizza-fugazeta.webp' },
    { id: 'faina', code: 'PIZ016', name: 'Fainá', desc: 'Fainá de garbanzo al horno.', price: 2000, img: IMG.placeholderPizza },
    { id: 'muzz-huevo', code: 'PIZ017', name: 'Muzzarella y Huevo', desc: 'Mozzarella y huevo.', price: 23000, img: IMG.placeholderPizza },
    { id: 'muzz-jamon', code: 'PIZ018', name: 'Muzzarella y Jamón', desc: 'Mozzarella y jamón.', price: 24000, img: IMG.placeholderPizza },
    { id: 'muzzarella-anchoas', code: 'PIZ019', name: 'Muzzarella y Anchoas', desc: 'Mozzarella y anchoas.', price: 28000, img: IMG.placeholderPizza },
  ],
  empanadas: [
    { id: 'carne-suave', code: 'EMP001', name: 'Carne Suave', desc: 'Carne, cebolla, morrón y especias suaves.', price: 3000, img: '/images/menu/01-empanada-de-carne-suave.webp' },
    { id: 'carne-picante', code: 'EMP002', name: 'Carne Picante', desc: 'Carne con un toque picante.', price: 3000, img: '/images/menu/02-empanada-de-carne-picante.webp' },
    { id: 'carne-cuchillo', code: 'EMP003', name: 'Carne Cortada a Cuchillo', desc: 'Carne cortada a cuchillo.', price: 3500, tag: 'Especial', img: '/images/menu/11-empanada-de-carne-cortada-a-cuchillo.webp' },
    { id: 'pollo', code: 'EMP004', name: 'Pollo', desc: 'Pollo, cebolla, morrón y especias.', price: 3000, img: '/images/menu/03-empanada-de-pollo.webp' },
    { id: 'verdura', code: 'EMP005', name: 'Verdura', desc: 'Verdura y queso.', price: 3000, img: '/images/menu/04-empanada-de-verdura.webp' },
    { id: 'humita', code: 'EMP006', name: 'Humita', desc: 'Choclo cremoso y queso.', price: 3000, img: '/images/menu/05-empanada-de-humita.webp' },
    { id: 'jamon-queso', code: 'EMP007', name: 'Jamón y Queso', desc: 'Jamón y mozzarella.', price: 3000, img: '/images/menu/06-empanada-de-jamon-y-queso.webp' },
    { id: 'roquefort', code: 'EMP008', name: 'Roquefort', desc: 'Roquefort y mozzarella.', price: 3000, img: '/images/menu/10-empanada-de-roquefort.webp' },
    { id: 'queso-cebolla', code: 'EMP009', name: 'Queso y Cebolla', desc: 'Mozzarella y cebolla.', price: 3000, img: '/images/menu/07-empanada-de-queso-y-cebolla.webp' },
    { id: 'capresse', code: 'EMP010', name: 'Capresse', desc: 'Tomate, mozzarella y albahaca.', price: 3000, img: '/images/menu/08-empanada-capresce.webp' },
    { id: 'crudo-queso', code: 'EMP011', name: 'Crudo y Queso', desc: 'Jamón crudo y mozzarella.', price: 3000, img: '/images/menu/09-empanadas-de-crudo-y-queso.webp' },
    { id: 'empanada-la-colorada', code: 'EMP012', name: 'La Colorada (de la Casa)', desc: 'Tomates secos, albahaca, queso provolone y un toque de nuestra receta especial.', price: 3000, tag: 'De la casa', img: '/images/menu/12-empanada-la-colorada-oro.webp', imgFit: 'contain' },
  ],
  ensaladas: [
    { id: 'ensalada-dia', code: 'ENS001', name: 'Ensalada del Día', desc: 'Lechuga, rúcula, tomate, zanahoria, queso, huevo y pollo grillé.', price: 12000, tag: 'La más pedida', img: '/images/menu/ensaladas/peya/02-ensalada-del-dia.webp' },
    { id: 'ensalada-dia-veg', code: 'ENS002', name: 'Ensalada del Día Vegetariana', desc: 'Con berenjena, zucchini o choclo.', price: 10000, img: '/images/menu/ensaladas/peya/04-ensalada-vegetariana.webp' },
    { id: 'mix-verdes', code: 'ENS003', name: 'Mix Verdes', desc: 'Lechuga, rúcula, tomates cherry, zanahoria, huevo y pollo grillé.', price: 11000, img: '/images/menu/ensaladas/peya/01-mix-verdes.webp' },
    { id: 'cesar', code: 'ENS004', name: 'César', desc: 'Lechuga, lechuga morada, queso, croutones caseros, pollo grillé y aderezo.', price: 12000, img: '/images/menu/ensaladas/peya/03-ensalada-cesar.webp' },
  ],
  tartas: [
    { id: 'tarta-verdura', code: 'TAR001', name: 'Tarta de Verdura', desc: 'Porción de tarta casera de verdura.', price: 9000, saladAddon: TART_SALAD_ADDON, img: '/images/menu/tartas-comidas-caseras/04-tarta-de-verdura.webp' },
    { id: 'tarta-calabaza', code: 'TAR002', name: 'Tarta de Calabaza', desc: 'Porción de tarta casera de calabaza.', price: 9000, saladAddon: TART_SALAD_ADDON, img: '/images/menu/tartas-comidas-caseras/02-tarta-de-calabaza.webp' },
    { id: 'tarta-humita', code: 'TAR003', name: 'Tarta de Humita', desc: 'Porción de tarta casera de humita.', price: 9500, saladAddon: TART_SALAD_ADDON, img: '/images/menu/tartas-comidas-caseras/03-tarta-de-humita.webp' },
    { id: 'tarta-zapallito', code: 'TAR004', name: 'Tarta de Zapallito', desc: 'Porción de tarta casera de zapallito.', price: 9000, saladAddon: TART_SALAD_ADDON, img: '/images/menu/tartas-comidas-caseras/01-tarta-de-zapallitos.webp' },
    { id: 'tarta-jamon-queso', code: 'TAR005', name: 'Tarta de Jamón y Queso', desc: 'Porción de tarta casera de jamón y queso.', price: 9500, saladAddon: TART_SALAD_ADDON, img: '/images/menu/tartas-comidas-caseras/05-tarta-de-jamon-y-queso.webp' },
    { id: 'tarta-capresse', code: 'TAR006', name: 'Tarta Capresse', desc: 'Porción de tarta casera capresse.', price: 9500, saladAddon: TART_SALAD_ADDON, img: '/images/menu/tartas-comidas-caseras/06-tarta-capresse.webp' },
  ],
  milanesas: [
    { id: 'mila-ternera', code: 'MIL001', name: 'Milanesa de Ternera al Horno', desc: 'Milanesa de ternera. Con ensalada.', price: 13000, tag: 'La más pedida', img: '/images/menu/milanesas/peya/01-milanesa-de-ternera.webp' },
    { id: 'mila-gratinada', code: 'MIL002', name: 'Milanesa con Muzzarella', desc: 'Milanesa de ternera con mozzarella. Con ensalada.', price: 15000, img: '/images/menu/milanesas/peya/02-milanesa-con-muzzarella.webp' },
    { id: 'mila-muzz-albahaca', code: 'MIL003', name: 'Milanesa con Muzzarella y Albahaca', desc: 'Milanesa de ternera con mozzarella y albahaca. Con ensalada.', price: 15500, img: '/images/menu/milanesas/gold/03-milanesa-muzzarella-albahaca.webp' },
    { id: 'mila-rucula-huevo', code: 'MIL004', name: 'Milanesa con Muzzarella, Rúcula y Huevo', desc: 'Milanesa con mozzarella, rúcula y huevo. Con ensalada.', price: 16000, img: '/images/menu/milanesas/gold/04-milanesa-muzzarella-rucula-huevo.webp' },
    { id: 'mila-napolitana', code: 'MIL005', name: 'Milanesa a la Napolitana', desc: 'Milanesa napolitana. Con ensalada.', price: 17000, img: '/images/menu/milanesas/gold/05-milanesa-napolitana.webp' },
    { id: 'mila-napolitana-jamon', code: 'MIL006', name: 'Milanesa Napolitana con Jamón', desc: 'Milanesa napolitana con jamón. Con ensalada.', price: 18500, img: '/images/menu/milanesas/peya/06-milanesa-napolitana-con-jamon.webp' },
    { id: 'mila-crudo-rucula', code: 'MIL007', name: 'Milanesa con Jamón Crudo y Rúcula', desc: 'Milanesa con jamón crudo y rúcula. Con ensalada.', price: 20000, img: '/images/menu/milanesas/gold/07-milanesa-jamon-crudo-rucula.webp' },
    { id: 'mila-jamon-morron', code: 'MIL008', name: 'Milanesa con Muzzarella, Jamón y Morrón', desc: 'Milanesa con mozzarella, jamón y morrón. Con ensalada.', price: 20000, img: '/images/menu/milanesas/gold/08-milanesa-muzzarella-jamon-morron-v2.webp' },
    { id: 'mila-provolone', code: 'MIL009', name: 'Milanesa al Provolone', desc: 'Milanesa con provolone. Con ensalada.', price: 21000, img: '/images/menu/milanesas/gold/09-milanesa-provolone.webp' },
    { id: 'mila-4-quesos', code: 'MIL010', name: 'Milanesa 4 Quesos', desc: 'Milanesa con cuatro quesos. Con ensalada.', price: 23000, tag: 'Especialidad', img: '/images/menu/milanesas/gold/10-milanesa-cuatro-quesos.webp' },
    { id: 'veg-fugazetta', code: 'MIL011', name: 'Berenjena o Zucchini Fugazetta', desc: 'Milanesa vegetariana al horno estilo fugazetta. Con ensalada.', price: 12000, img: '/images/menu/milanesas/peya/11-berenjena-zucchini-fugazetta.webp' },
    { id: 'veg-muzzarella', code: 'MIL012', name: 'Berenjena o Zucchini con Muzzarella', desc: 'Milanesa vegetariana con mozzarella. Con ensalada.', price: 11000, img: '/images/menu/milanesas/gold/12-berenjena-zucchini-muzzarella.webp' },
    { id: 'veg-napolitana', code: 'MIL013', name: 'Berenjena o Zucchini a la Napolitana', desc: 'Milanesa vegetariana a la napolitana. Con ensalada.', price: 11000, img: '/images/menu/milanesas/gold/13-berenjena-zucchini-napolitana.webp' },
    { id: 'veg-rucula-huevo', code: 'MIL014', name: 'Berenjena o Zucchini con Muzzarella, Rúcula y Huevo', desc: 'Con mozzarella, rúcula y huevo. Con ensalada.', price: 12000, img: '/images/menu/milanesas/gold/14-berenjena-zucchini-rucula-huevo.webp' },
    { id: 'veg-napolitana-jamon', code: 'MIL015', name: 'Berenjena o Zucchini Napolitana con Jamón', desc: 'Napolitana con jamón. Con ensalada.', price: 14000, img: '/images/menu/milanesas/gold/15-berenjena-zucchini-napolitana-jamon.webp' },
    { id: 'veg-jamon-huevo', code: 'MIL016', name: 'Berenjena o Zucchini con Muzzarella, Jamón y Huevo', desc: 'Con mozzarella, jamón y huevo. Con ensalada.', price: 14000, img: '/images/menu/milanesas/gold/16-berenjena-zucchini-muzzarella-jamon-huevo.webp' },
    { id: 'veg-jamon-morron', code: 'MIL017', name: 'Berenjena o Zucchini con Muzzarella, Jamón y Morrón', desc: 'Con mozzarella, jamón y morrón. Con ensalada.', price: 16000, img: '/images/menu/milanesas/gold/17-berenjena-zucchini-muzzarella-jamon-morron-v2.webp' },
    { id: 'veg-provolone', code: 'MIL018', name: 'Berenjena o Zucchini al Provolone', desc: 'Milanesa vegetariana con provolone. Con ensalada.', price: 17000, img: '/images/menu/milanesas/gold/18-berenjena-zucchini-provolone.webp' },
    { id: 'veg-4-quesos', code: 'MIL019', name: 'Berenjena o Zucchini 4 Quesos', desc: 'Milanesa vegetariana con cuatro quesos. Con ensalada.', price: 18000, img: '/images/menu/milanesas/gold/19-berenjena-zucchini-cuatro-quesos.webp' },
    { id: 'veg-crudo-rucula', code: 'MIL020', name: 'Berenjena o Zucchini con Jamón Crudo y Rúcula', desc: 'Con jamón crudo y rúcula. Con ensalada.', price: 18000, img: '/images/menu/milanesas/gold/20-berenjena-zucchini-jamon-crudo-rucula.webp' },
    { id: 'suprema-pollo', code: 'MIL021', name: 'Suprema de Pollo', desc: 'Suprema de pollo al horno. Con ensalada.', price: 12000, img: '/images/menu/milanesas/peya/21-suprema-de-pollo.webp' },
    { id: 'suprema-gratinada', code: 'MIL022', name: 'Suprema de Pollo Gratinada', desc: 'Suprema de pollo gratinada. Con ensalada.', price: 13000, img: '/images/menu/milanesas/peya/22-suprema-de-pollo-gratinada.webp' },
    { id: 'pechuga-grille', code: 'MIL023', name: 'Pechuga Grillé', desc: 'Pechuga de pollo grillada. Con ensalada.', price: 13500, img: '/images/menu/milanesas/peya/23-pechuga-grille.webp' },
    { id: 'grille-gratinado', code: 'MIL024', name: 'Grillé Gratinado', desc: 'Pechuga grillada y gratinada. Con ensalada.', price: 15000, img: '/images/menu/milanesas/peya/24-grille-gratinado.webp' },
  ],
  pastas: [
    { id: 'lasagna-carne', code: 'PAS001', name: 'Lasagna de Carne', desc: 'Lasagna casera de carne.', price: 12000, tag: 'La más pedida', img: '/images/menu/pastas/01-lasagna-de-carne.webp' },
    { id: 'lasagna-verdura', code: 'PAS002', name: 'Lasagna de Verdura', desc: 'Lasagna casera de verdura.', price: 11000, img: '/images/menu/pastas/02-lasagna-de-verdura.webp' },
    { id: 'lasagna-carne-verdura', code: 'PAS003', name: 'Lasagna de Carne y Verdura', desc: 'Lasagna casera mixta.', price: 11000, img: '/images/menu/pastas/09-lasagna-carne-y-verdura.webp' },
    { id: 'canelones-verdura', code: 'PAS004', name: 'Canelones de Verdura', desc: 'Canelones caseros de verdura.', price: 12000, img: '/images/menu/pastas/04-canelones-de-verdura.webp' },
    { id: 'canelones-calabaza', code: 'PAS005', name: 'Canelones de Calabaza', desc: 'Canelones caseros de calabaza.', price: 12000, img: '/images/menu/pastas/03-canelones-de-calabaza.webp' },
    { id: 'pastel-papas', code: 'PAS006', name: 'Pastel de Papas', desc: 'Pastel de papas casero.', price: 12000, img: '/images/menu/pastas/05-pastel-de-papas.webp' },
    { id: 'omelette-jamon-queso', code: 'PAS007', name: 'Omelette de Jamón y Queso', desc: 'Omelette de jamón y queso.', price: 10000, img: '/images/menu/omelettes/peya/01-omelette-de-jamon-y-queso.webp' },
    { id: 'omelette-capresse', code: 'PAS008', name: 'Omelette Capresse', desc: 'Omelette de tomate, mozzarella y albahaca.', price: 10000, img: '/images/menu/omelettes/peya/02-omelette-caprese.webp' },
    { id: 'falafel', code: 'PAS009', name: 'Falafel con Salsa Tai', desc: 'Falafel casero con salsa tai. Con ensalada.', price: 10000, tag: 'Veggie', img: IMG.placeholderPlato },
    { id: 'pastel-calabaza', code: 'PAS015', name: 'Pastel de Calabaza', desc: 'Pastel de calabaza casero.', price: 12000, img: IMG.placeholderPlato },
  ],
  medallones: [
    { id: 'medallones-lentejas', code: 'MED001', name: 'Medallones de Lentejas Gratinados', desc: 'Dos medallones de lentejas, zanahoria, repollo blanco y morrón rojo, con un toque de paprika. Gratinados con queso, orégano y una aceituna en cada uno. Con ensalada.', price: 10000, tag: 'Veggie', img: '/images/menu/medallones/lentejas-gratinados-ensalada.webp' },
    { id: 'medallones-garbanzos', code: 'MED002', name: 'Medallones de Garbanzos Gratinados', desc: 'Dos medallones de garbanzos, zanahoria y apio, con un toque de paprika. Gratinados con queso, orégano y una aceituna en cada uno. Con ensalada.', price: 10000, tag: 'Veggie', img: '/images/menu/medallones/garbanzos-gratinados-ensalada.webp' },
    { id: 'medallones-quinoa-curry', code: 'MED003', name: 'Medallones de Quinoa al Curry Gratinados', desc: 'Dos medallones de quinoa, arvejas partidas y zanahoria, con curry. Gratinados con queso, orégano y una aceituna en cada uno. Con ensalada.', price: 10000, tag: 'Veggie', img: '/images/menu/medallones/quinoa-curry-gratinados-ensalada.webp' },
    { id: 'medallones-porotos-colorados', code: 'MED004', name: 'Medallones de Porotos Colorados Gratinados', desc: 'Dos medallones de porotos colorados, zanahoria, hinojo y morrón rojo, con un toque de paprika. Gratinados con queso, orégano y una aceituna en cada uno. Con ensalada.', price: 10000, tag: 'Veggie', img: '/images/menu/medallones/porotos-colorados-gratinados-ensalada.webp' },
    { id: 'medallones-mijo', code: 'MED005', name: 'Medallones de Mijo y Calabaza Gratinados', desc: 'Dos medallones de mijo y calabaza, con semillas de girasol y sésamo, cúrcuma y nuez moscada. Gratinados con queso, orégano y una aceituna en cada uno. Con ensalada.', price: 10000, tag: 'Veggie', img: '/images/menu/medallones/mijo-gratinados-ensalada.webp' },
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
