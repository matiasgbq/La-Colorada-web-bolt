import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(source, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports, URL, require: (name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  } });
  return exports;
}
const data = readFileSync('src/data.ts', 'utf8')
  .replace(/^import .*;\n/gm, '')
  .replace(/export \{[\s\S]*?\} from '.\/site-data';/, '')
  .replace(/icon: \w+/g, 'icon: null');
const menuData = load(data);
const { MENU, TART_SALAD_ADDON } = menuData;
const { prepareCartDish, addCartItem, setCartQuantity, cartTotals, buildOrderText } =
  load(readFileSync('src/cart-items.ts', 'utf8'));
const dishes = Object.values(MENU).flat();
assert.equal(new Set(dishes.map((dish) => dish.id)).size, dishes.length);
assert.equal(new Set([...dishes.map((dish) => dish.code), TART_SALAD_ADDON.code]).size, dishes.length + 1);
for (const dish of dishes) {
  assert.match(dish.code, /^[A-Z]{3}\d{3}$/);
  assert.ok(Number.isInteger(dish.price) && dish.price > 0);
  assert.ok(existsSync(`public${dish.img}`), `Missing image: ${dish.img}`);
}
assert.equal(dishes.filter((dish) => dish.id.startsWith('medallones-')).length, 5);
assert.equal(dishes.some((dish) => dish.id === 'guarnicion-ensalada'), false);
assert.equal(dishes.find((dish) => dish.id === 'muzz-anchoas').price, 29000);
assert.equal(dishes.find((dish) => dish.id === 'muzz-rucula-huevo').price, 22000);
assert.equal(dishes.find((dish) => dish.id === 'empanada-la-colorada').price, 3000);
assert.ok(MENU.tartas.every((dish) => dish.saladAddon?.code === 'ADI001'));
assert.ok(dishes.filter((dish) => dish.saladAddon).every((dish) => MENU.tartas.includes(dish)));

const tart = MENU.tartas[0];
const saladTart = prepareCartDish(tart, true);
assert.notEqual(saladTart.id, tart.id);
assert.equal(saladTart.price, tart.price + 2500);
assert.equal(tart.price, 9000); // The shared catalog must remain unchanged.
assert.equal(prepareCartDish(MENU.pizzas[0], true), MENU.pizzas[0]);
let items = [];
items = addCartItem(items, tart);
items = addCartItem(items, saladTart);
items = addCartItem(items, saladTart);
assert.equal(items.length, 2);
assert.equal(cartTotals(items).total, 32000);
assert.equal(cartTotals(items).count, 3);
items = setCartQuantity(items, saladTart.id, 3);
assert.equal(cartTotals(items).total, 43500);
const message = decodeURIComponent(encodeURIComponent(buildOrderText(items)));
assert.ok(message.includes('Tarta de Verdura + ensalada x3 — $34.500'));
assert.ok(message.includes('Total: $43.500'));
items = setCartQuantity(items, saladTart.id, 0);
assert.equal(items.length, 1);
assert.equal(cartTotals(items).total, 9000);
assert.ok(!buildOrderText(items).includes('+ ensalada'));
items = setCartQuantity(items, tart.id, 0);
assert.equal(items.length, 0);
assert.equal(cartTotals(items).total, 0);
console.log(`✅ ${dishes.length} platos: códigos, assets, excepciones y flujo tarta con/sin ensalada (cantidades, eliminación, totales y WhatsApp).`);

// The public exports must derive from the same product source, including addon rules.
const siteData = load(readFileSync('src/site-data.ts', 'utf8'));
const catalogModule = load(readFileSync('vite/catalog.ts', 'utf8'), {
  '../src/data': menuData, '../src/site-data': siteData,
});
const catalog = catalogModule.buildCatalog();
const exported = catalog.categories.flatMap((category) => category.items);
assert.equal(exported.length, dishes.length);
for (const dish of dishes) {
  const item = exported.find((item) => item.code === dish.code);
  assert.ok(item);
  for (const key of ['id', 'code', 'name', 'price']) assert.equal(item[key], dish[key]);
  assert.equal(item.description, dish.desc);
  assert.equal(item.currency, 'ARS');
  assert.equal(item.availability, 'unknown');
  assert.equal(new URL(item.image).pathname, dish.img);
  assert.equal(item.addons.length, dish.saladAddon ? 1 : 0);
  if (dish.saladAddon) {
    assert.equal(item.addons[0].price, dish.saladAddon.price);
    assert.equal(item.addons[0].code, dish.saladAddon.code);
    assert.equal(item.addons[0].requiresParent, true);
  }
}
assert.equal(exported.some((item) => item.code === TART_SALAD_ADDON.code), false);
assert.ok(!JSON.stringify(catalog).includes('InStock'));
const dangerous = '</script><img src=x onerror="alert(1)">';
assert.equal(catalogModule.safeJson(dangerous).includes('<'), false);
assert.equal(catalogModule.escapeHtml(dangerous).includes('<'), false);
console.log(`✅ Catálogo derivado: ${exported.length} productos, precios, IDs, fotos y adicionales coherentes.`);
