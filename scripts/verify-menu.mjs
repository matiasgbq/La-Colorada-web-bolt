import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(source) {
  const exports = {};
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports });
  return exports;
}
const data = readFileSync('src/data.ts', 'utf8')
  .replace(/^import .*;\n/gm, '')
  .replace(/export \{[\s\S]*?\} from '.\/site-data';/, '')
  .replace(/icon: \w+/g, 'icon: null');
const { MENU, TART_SALAD_ADDON } = load(data);
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
