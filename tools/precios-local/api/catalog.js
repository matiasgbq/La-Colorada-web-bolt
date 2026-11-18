const source = process.env.PRICE_CATALOG_URL ?? 'https://lacoloradacocina.com.ar/catalogo.json';

function toPriceRow(item) {
  if (typeof item.name !== 'string' || !Number.isFinite(item.price) || item.currency !== 'ARS') {
    throw new Error('El catálogo contiene un precio inválido.');
  }
  return {
    name: item.name,
    code: item.code,
    price: item.price,
    attributes: [
      ...(item.vegetarian === true ? ['Veggie'] : []),
      ...(item.primary === true ? ['Primaria'] : []),
    ],
  };
}

export default async function handler(_request, response) {
  response.setHeader('Cache-Control', 'no-store');
  try {
    const result = await fetch(source, {
      headers: { 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(8_000),
    });
    if (!result.ok) throw new Error('El catálogo no está disponible.');
    const { categories } = await result.json();
    const addons = new Map();
    const prices = categories.map(({ name, items }) => ({
      name,
      items: items.filter((item) => item.active !== false && item.available !== false)
        .map((item) => {
          for (const addon of item.addons ?? []) addons.set(addon.code, addon);
          return toPriceRow(item);
        }),
    })).filter(({ items }) => items.length > 0);
    if (addons.size) {
      prices.push({ name: 'Adicionales', items: Array.from(addons.values(), toPriceRow) });
    }
    response.status(200).json(prices);
  } catch {
    response.status(502).json({ error: 'No se pueden consultar los precios publicados.' });
  }
}
