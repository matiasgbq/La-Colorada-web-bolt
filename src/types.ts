export type Section = 'inicio' | 'menu' | 'galeria' | 'opiniones' | 'ubicacion';

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  tag?: string;
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
