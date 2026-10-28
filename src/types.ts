export const SITE_SECTION_IDS = [
  'inicio',
  'menu',
  'galeria',
  'opiniones',
  'ubicacion',
] as const;

export type Section = (typeof SITE_SECTION_IDS)[number];

export type Dish = {
  id: string;
  code: string;
  name: string;
  desc: string;
  price: number;
  tag?: string;
  saladAddon?: { code: string; name: string; price: number };
  img: string;
};

export type CartItem = {
  dish: Dish;
  qty: number;
};

export type Review = {
  name: string;
  initials: string;
  color: string;
  text: string;
};
