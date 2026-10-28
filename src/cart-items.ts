import type { CartItem, Dish } from '@/types';

/** The addon travels with its tart, including quantity, removal and order text. */
export function prepareCartDish(dish: Dish, withSalad = false): Dish {
  if (!withSalad || !dish.saladAddon) return dish;
  return {
    ...dish,
    id: `${dish.id}+${dish.saladAddon.code}`,
    name: `${dish.name} + ensalada`,
    price: dish.price + dish.saladAddon.price,
    saladAddon: undefined,
  };
}

export function addCartItem(items: CartItem[], dish: Dish): CartItem[] {
  const found = items.some((item) => item.dish.id === dish.id);
  return found
    ? items.map((item) => item.dish.id === dish.id ? { ...item, qty: item.qty + 1 } : item)
    : [...items, { dish, qty: 1 }];
}

export function setCartQuantity(items: CartItem[], id: string, qty: number): CartItem[] {
  return qty <= 0
    ? items.filter((item) => item.dish.id !== id)
    : items.map((item) => item.dish.id === id ? { ...item, qty } : item);
}

export function cartTotals(items: CartItem[]) {
  return items.reduce((acc, item) => ({
    count: acc.count + item.qty,
    total: acc.total + item.qty * item.dish.price,
  }), { count: 0, total: 0 });
}

export function buildOrderText(items: CartItem[]) {
  const lines = items.map((item) =>
    `• ${item.dish.name} x${item.qty} — $${(item.dish.price * item.qty).toLocaleString('es-AR')}`,
  );
  return ['Hola La Colorada! Quiero hacer este pedido:', '', ...lines, '',
    `Total: $${cartTotals(items).total.toLocaleString('es-AR')}`, '',
    'Las guarniciones incluidas son ensaladas. Si necesito algún cambio, lo aclaro por acá.', '', 'Gracias!',
  ].join('\n');
}
