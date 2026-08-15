import type { Dish, Review } from './types';
import { Pizza, Flame, UtensilsCrossed, Salad, Sandwich, Soup } from 'lucide-react';

export const PHONE_DISPLAY = '4897-5432';
export const PHONE_TEL = '+541148975432';
export const WHATSAPP_NUMBER = '5491154955525';
export const WHATSAPP_DISPLAY = '+54 9 11 5495-5525';
export const INSTAGRAM_URL = 'https://www.instagram.com/lacoloradapizzas/';
export const INSTAGRAM_HANDLE = '@lacoloradapizzas';
export const ADDRESS = 'Blanco Encalada 2229, Local 15 (Galería Colorada)';
export const ADDRESS_AREA = 'La Horqueta, Beccar, San Isidro';
export const MAPS_QUERY = encodeURIComponent(
  'Galería Colorada, Blanco Encalada 2229, La Horqueta, Beccar, San Isidro, Argentina',
);
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export const FLYER_IMG = '/images/WhatsApp_Image_2026-07-30_at_10.13.29.jpeg';

export const IMG = {
  hero: 'https://images.pexels.com/photos/9685234/pexels-photo-9685234.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  muzzarella:
    'https://images.pexels.com/photos/12314142/pexels-photo-12314142.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  cuatroQuesos:
    'https://images.pexels.com/photos/33458021/pexels-photo-33458021.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  fugazzeta:
    'https://images.pexels.com/photos/31094832/pexels-photo-31094832.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  calabresa:
    'https://images.pexels.com/photos/16677742/pexels-photo-16677742.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  napolitana:
    'https://images.pexels.com/photos/6223177/pexels-photo-6223177.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  empanadaCarne:
    'https://images.pexels.com/photos/36905236/pexels-photo-36905236.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  empanadaJamon:
    'https://images.pexels.com/photos/8279711/pexels-photo-8279711.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  empanadaPollo:
    'https://images.pexels.com/photos/13689920/pexels-photo-13689920.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  empanadaQueso:
    'https://images.pexels.com/photos/13689919/pexels-photo-13689919.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  empanadaHumita:
    'https://images.pexels.com/photos/12917897/pexels-photo-12917897.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  empanadaCapresse:
    'https://images.pexels.com/photos/19711352/pexels-photo-19711352.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  ensaladaDia:
    'https://images.pexels.com/photos/31212423/pexels-photo-31212423.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  ensaladaCesar:
    'https://images.pexels.com/photos/20150371/pexels-photo-20150371.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  ensaladaMix:
    'https://images.pexels.com/photos/4553029/pexels-photo-4553029.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  tartaVerdura:
    'https://images.pexels.com/photos/288264/pexels-photo-288264.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  tartaCalabaza:
    'https://images.pexels.com/photos/9166298/pexels-photo-9166298.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  tartaCapresse:
    'https://images.pexels.com/photos/109836/pexels-photo-109836.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  milanesa:
    'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  milanesaPollo:
    'https://images.pexels.com/photos/31372332/pexels-photo-31372332.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  polloGrille:
    'https://images.pexels.com/photos/8697537/pexels-photo-8697537.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  polloPataMuslo:
    'https://images.pexels.com/photos/36936952/pexels-photo-36936952.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  lasagna:
    'https://images.pexels.com/photos/4078163/pexels-photo-4078163.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  canelones:
    'https://images.pexels.com/photos/34278827/pexels-photo-34278827.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  fideos:
    'https://images.pexels.com/photos/1438676/pexels-photo-1438676.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  pastelPapas:
    'https://images.pexels.com/photos/5724557/pexels-photo-5724557.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  omelette:
    'https://images.pexels.com/photos/26847293/pexels-photo-26847293.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  falafel:
    'https://images.pexels.com/photos/4958944/pexels-photo-4958944.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  medallones:
    'https://images.pexels.com/photos/25440682/pexels-photo-25440682.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
  gallery1:
    'https://images.pexels.com/photos/6223177/pexels-photo-6223177.jpeg?auto=compress&cs=tinysrgb&h=700&w=900',
  gallery2:
    'https://images.pexels.com/photos/12917897/pexels-photo-12917897.jpeg?auto=compress&cs=tinysrgb&h=700&w=900',
  gallery3:
    'https://images.pexels.com/photos/31372332/pexels-photo-31372332.jpeg?auto=compress&cs=tinysrgb&h=700&w=900',
  gallery4:
    'https://images.pexels.com/photos/17626467/pexels-photo-17626467.jpeg?auto=compress&cs=tinysrgb&h=700&w=900',
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
    { id: 'muzzarella', name: 'Muzzarella', desc: 'Salsa de tomate, mozzarella derretida y orégano.', price: 18000, tag: 'La más pedida', img: IMG.muzzarella },
    { id: 'muzz-albahaca', name: 'Muzzarella y Albahaca', desc: 'Mozzarella con hojas de albahaca fresca.', price: 18000, img: IMG.muzzarella },
    { id: 'muzz-rucula-huevo', name: 'Muzzarella, Rúcula y Huevo', desc: 'Mozzarella, rúcula fresca y huevo.', price: 20000, img: IMG.muzzarella },
    { id: 'muzz-jamon-huevo', name: 'Muzzarella, Jamón y Huevo', desc: 'Mozzarella, jamón cocido y huevo.', price: 23000, img: IMG.muzzarella },
    { id: 'muzz-jamon-morron', name: 'Muzzarella, Jamón y Morrón', desc: 'Mozzarella, jamón cocido y morrón asado.', price: 25000, img: IMG.muzzarella },
    { id: 'muzz-anchoas', name: 'Muzzarella y Anchoas', desc: 'Mozzarella con anchoas marinadas.', price: 25000, img: IMG.muzzarella },
    { id: '4-quesos', name: '4 Quesos', desc: 'Mozzarella, provolone, parmesano y fontina.', price: 29000, tag: 'Especialidad', img: IMG.cuatroQuesos },
    { id: 'provolone', name: 'Provolone', desc: 'Queso provolone derretido con orégano.', price: 24000, img: IMG.cuatroQuesos },
    { id: 'calabresa', name: 'Calabresa', desc: 'Longaniza calabresa, mozzarella y morrón.', price: 25000, img: IMG.calabresa },
    { id: 'napolitana', name: 'Napolitana', desc: 'Mozzarella, tomate en rodajas, ajo y perejil.', price: 24000, img: IMG.napolitana },
    { id: 'napolitana-jamon', name: 'Napolitana con Jamón', desc: 'Napolitana con jamón cocido.', price: 26000, img: IMG.napolitana },
    { id: 'jamon-crudo-rucula', name: 'Jamón Crudo y Rúcula', desc: 'Jamón crudo, rúcula y mozzarella.', price: 29000, img: IMG.napolitana },
    { id: 'palmitos', name: 'Palmitos', desc: 'Palmitos, salsa golf y mozzarella.', price: 29000, img: IMG.napolitana },
    { id: 'fugazeta', name: 'Fugazeta', desc: 'Masa rellena de mozzarella cubierta con cebolla.', price: 19000, img: IMG.fugazzeta },
    { id: 'faina', name: 'Fainá', desc: 'Clásica fainá de garbanzo al horno.', price: 2000, img: IMG.fugazzeta },
  ],
  empanadas: [
    { id: 'carne-suave', name: 'Carne Suave', desc: 'Carne picada, cebolla, morrón y especias suaves.', price: 3000, img: IMG.empanadaCarne },
    { id: 'carne-picante', name: 'Carne Picante', desc: 'Carne picada con un toque de ají molido.', price: 3000, img: IMG.empanadaCarne },
    { id: 'carne-cuchillo', name: 'Carne Cortada a Cuchillo', desc: 'Carne cortada a cuchillo, cebolla, huevo y aceituna.', price: 3000, tag: 'Favorita', img: IMG.empanadaCarne },
    { id: 'pollo', name: 'Pollo', desc: 'Pollo desmenuzado con cebolla, morrón y especias.', price: 3000, img: IMG.empanadaPollo },
    { id: 'verdura', name: 'Verdura', desc: 'Espinaca, acelga y queso. Vegetariana.', price: 3000, img: IMG.empanadaHumita },
    { id: 'humita', name: 'Humita', desc: 'Choclo cremoso con queso y especias.', price: 3000, img: IMG.empanadaHumita },
    { id: 'jamon-queso', name: 'Jamón y Queso', desc: 'Jamón cocido natural y mozzarella.', price: 3000, img: IMG.empanadaJamon },
    { id: 'roquefort', name: 'Roquefort', desc: 'Queso roquefort con mozzarella.', price: 3000, img: IMG.empanadaQueso },
    { id: 'queso-cebolla', name: 'Queso y Cebolla', desc: 'Mozzarella y cebolla blanca. Vegetariana.', price: 3000, img: IMG.empanadaQueso },
    { id: 'capresse', name: 'Capresse', desc: 'Tomate, mozzarella y albahaca.', price: 3000, tag: 'Novedad', img: IMG.empanadaCapresse },
    { id: 'crudo-queso', name: 'Crudo y Queso', desc: 'Jamón crudo y mozzarella.', price: 3000, img: IMG.empanadaJamon },
  ],
  ensaladas: [
    { id: 'ensalada-dia', name: 'Ensalada del Día', desc: 'Lechuga, rúcula, tomate, zanahoria, queso, huevo, pollo rebozado o sin rebozar.', price: 10000, tag: 'La más pedida', img: IMG.ensaladaDia },
    { id: 'ensalada-dia-veg', name: 'Ensalada del Día Vegetariana', desc: 'Lechuga, rúcula, tomate, zanahoria, queso, huevo (mila de berenjena, zucchini o choclo).', price: 9000, img: IMG.ensaladaDia },
    { id: 'mix-verdes', name: 'Mix Verdes', desc: 'Lechuga, rúcula, cherrys, zanahoria y pollo sin rebozar.', price: 9500, img: IMG.ensaladaMix },
    { id: 'cesar', name: 'César', desc: 'Lechuga, lechuga morada, queso, crutones caseros, pollo y aderezo.', price: 10000, img: IMG.ensaladaCesar },
  ],
  tartas: [
    { id: 'tarta-verdura', name: 'Tarta de Verdura', desc: 'Espinaca y acelga con queso.', price: 8000, img: IMG.tartaVerdura },
    { id: 'tarta-calabaza', name: 'Tarta de Calabaza', desc: 'Calabaza cremosa con queso.', price: 8000, img: IMG.tartaCalabaza },
    { id: 'tarta-humita', name: 'Tarta de Humita', desc: 'Choclo cremoso con queso.', price: 8000, img: IMG.tartaCalabaza },
    { id: 'tarta-zapallito', name: 'Tarta de Zapallito', desc: 'Zapallito verde con queso y especias.', price: 8000, img: IMG.tartaVerdura },
    { id: 'tarta-jamon-queso', name: 'Tarta de Jamón y Queso', desc: 'Jamón cocido y mozzarella.', price: 8500, img: IMG.tartaVerdura },
    { id: 'tarta-capresse', name: 'Tarta Capresse', desc: 'Tomate, mozzarella y albahaca.', price: 8500, tag: 'Novedad', img: IMG.tartaCapresse },
  ],
  milanesas: [
    { id: 'suprema-guarnicion', name: 'Suprema de Pollo + Guarnición', desc: 'Suprema de pollo con guarnición a elección.', price: 11000, img: IMG.milanesaPollo },
    { id: 'suprema-gratinada', name: 'Suprema de Pollo Gratinada + Guarnición', desc: 'Suprema gratinada con mozzarella y guarnición.', price: 12500, img: IMG.milanesaPollo },
    { id: 'mila-ternera', name: 'Milanesa de Ternera + Guarnición', desc: 'Milanesa de ternera con guarnición a elección.', price: 13000, tag: 'La más pedida', img: IMG.milanesa },
    { id: 'mila-gratinada', name: 'Milanesa de Ternera Gratinada + Guarnición', desc: 'Milanesa gratinada con mozzarella y guarnición.', price: 15000, img: IMG.milanesa },
    { id: 'mila-napolitana', name: 'Milanesa de Ternera a la Napolitana + Guarnición', desc: 'Con jamón, mozzarella y tomate. Guarnición a elección.', price: 17000, img: IMG.milanesa },
    { id: 'mila-muzz-albahaca', name: 'Milanesa con Muzzarella y Albahaca', desc: 'Milanesa de ternera con mozzarella y albahaca fresca.', price: 15500, img: IMG.milanesa },
    { id: 'mila-rucula-huevo', name: 'Milanesa Rúcula y Huevo', desc: 'Milanesa de ternera con rúcula y huevo.', price: 16000, img: IMG.milanesa },
    { id: 'mila-jamon-huevo', name: 'Milanesa Jamón y Huevo', desc: 'Milanesa de ternera con jamón y huevo.', price: 18000, img: IMG.milanesa },
    { id: 'mila-jamon-morron', name: 'Milanesa Jamón y Morrón', desc: 'Milanesa de ternera con jamón y morrón asado.', price: 20000, img: IMG.milanesa },
    { id: 'mila-4-quesos', name: 'Milanesa 4 Quesos', desc: 'Milanesa de ternera con cuatro quesos.', price: 23000, tag: 'Especialidad', img: IMG.milanesa },
    { id: 'mila-provolone', name: 'Milanesa con Provolone', desc: 'Milanesa de ternera con queso provolone derretido.', price: 21000, img: IMG.milanesa },
    { id: 'mila-crudo-rucula', name: 'Milanesa Jamón Crudo y Rúcula', desc: 'Milanesa de ternera con jamón crudo y rúcula.', price: 20000, img: IMG.milanesa },
    { id: 'mila-fugazeta', name: 'Milanesa a la Fugazeta', desc: 'Milanesa de ternera cubierta con cebolla y queso.', price: 16000, img: IMG.milanesa },
    { id: 'mila-berenjena-napo', name: 'Milanesa de Berenjena o Zucchini a la Napolitana + Guarnición', desc: 'Opción vegetariana con jamón, mozzarella y tomate.', price: 10000, img: IMG.milanesa },
    { id: 'mila-zucchini-gratinada', name: 'Milanesas de Zucchini Gratinadas + Guarnición', desc: 'Zucchini gratinado con mozzarella y guarnición.', price: 10000, img: IMG.milanesa },
    { id: 'pechuga-grille', name: 'Pechuga Grillé + Guarnición', desc: 'Pechuga de pollo a la plancha con guarnición.', price: 12500, img: IMG.polloGrille },
    { id: 'pata-muslo', name: 'Pata y Muslo + Guarnición', desc: 'Pata y muslo de pollo al horno con guarnición.', price: 11500, img: IMG.polloPataMuslo },
  ],
  pastas: [
    { id: 'lasagna-carne', name: 'Lasagna de Carne', desc: 'Capas de pasta, ragú de carne casero, bechamel y mozzarella.', price: 11000, tag: 'La más pedida', img: IMG.lasagna },
    { id: 'lasagna-verdura', name: 'Lasagna de Verdura', desc: 'Capas de pasta con verduras y queso gratinado.', price: 10000, img: IMG.lasagna },
    { id: 'canelones-verdura', name: 'Canelones de Verdura', desc: 'Canelones rellenos de espinaca y ricota con salsa.', price: 9500, img: IMG.canelones },
    { id: 'canelones-calabaza', name: 'Canelones de Calabaza', desc: 'Canelones rellenos de calabaza con salsa gratinada.', price: 9500, img: IMG.canelones },
    { id: 'pastel-papas', name: 'Pastel de Papas', desc: 'Pure de papas con carne y queso gratinado.', price: 10000, img: IMG.pastelPapas },
    { id: 'pastel-calabaza', name: 'Pastel de Calabaza', desc: 'Pure de calabaza con carne y queso gratinado.', price: 10000, img: IMG.pastelPapas },
    { id: 'omelette-jamon-queso', name: 'Omelette de Jamón y Queso + Guarnición', desc: 'Omelette relleno de jamón y mozzarella con guarnición.', price: 9500, img: IMG.omelette },
    { id: 'omelette-capresse', name: 'Omelette Capresse + Guarnición', desc: 'Omelette con tomate, mozzarella y albahaca con guarnición.', price: 9500, img: IMG.omelette },
    { id: 'falafel', name: 'Falafel con Salsa Tai + Guarnición', desc: 'Falafel casero con salsa tai y guarnición.', price: 9500, tag: 'Veggie', img: IMG.falafel },
    { id: 'medallones-veg', name: 'Medallones Vegetarianos Gratinados + Guarnición', desc: 'Medallones de vegetales gratinados con queso.', price: 9000, img: IMG.medallones },
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
  { img: IMG.gallery1, caption: 'Pizza de molde recién salida' },
  { img: IMG.gallery2, caption: 'Empanadas doradas al horno' },
  { img: IMG.gallery3, caption: 'Milanesas con guarnición' },
  { img: IMG.gallery4, caption: 'El rincón de la Galería' },
];
