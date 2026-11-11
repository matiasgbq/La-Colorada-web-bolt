import type { Dish } from './types';

/** Missing availability means unknown, not hidden. Explicit false hides the dish. */
export function isPublicDish(dish: Pick<Dish, 'active' | 'available'>) {
  return dish.active !== false && dish.available !== false;
}

export function readOrderCatalog(value: unknown): Dish[] {
  if (!value || typeof value !== 'object') throw new Error('Catálogo inválido');
  const root = value as Record<string, unknown>;
  if (root.schemaVersion !== '1.0' || root.currency !== 'ARS' || !Array.isArray(root.categories)) {
    throw new Error('Formato de catálogo no compatible');
  }
  const dishes: Dish[] = [];
  const validPrice = (n: unknown): n is number => typeof n === 'number' && Number.isSafeInteger(n) && n > 0;
  const ids = new Set<string>();
  const codes = new Set<string>();
  for (const category of root.categories) {
    if (!category || !Array.isArray(category.items)) throw new Error('Categoría inválida');
    for (const item of category.items) {
      if (!item || typeof item.id !== 'string' || !item.id || item.id.includes('+') ||
          typeof item.code !== 'string' || !/^[A-Z]{3}\d{3}$/.test(item.code) ||
          typeof item.name !== 'string' || typeof item.description !== 'string' ||
          typeof item.image !== 'string' || !validPrice(item.price) || item.currency !== 'ARS' ||
          !Array.isArray(item.addons) || item.addons.length > 1 || ids.has(item.id) || codes.has(item.code) ||
          (item.includesSalad !== undefined && typeof item.includesSalad !== 'boolean') ||
          (item.active !== undefined && typeof item.active !== 'boolean') ||
          (item.available !== undefined && item.available !== null && typeof item.available !== 'boolean')) {
        throw new Error('Producto inválido');
      }
      ids.add(item.id); codes.add(item.code);
      const addon = item.addons[0];
      if (addon && (typeof addon.code !== 'string' || !/^[A-Z]{3}\d{3}$/.test(addon.code) ||
          typeof addon.name !== 'string' || !validPrice(addon.price) || addon.currency !== 'ARS' ||
          addon.requiresParent !== true || addon.optional !== true)) throw new Error('Adicional inválido');
      dishes.push({
        id: item.id, code: item.code, name: item.name, desc: item.description,
        price: item.price, img: item.image, active: item.active,
        available: item.available ?? undefined,
        includesSalad: item.includesSalad === true,
        ...(addon ? { saladAddon: { code: addon.code, name: addon.name, price: addon.price } } : {}),
      });
    }
  }
  return dishes.filter(isPublicDish);
}
