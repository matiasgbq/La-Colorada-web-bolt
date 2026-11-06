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
const catalogRules = load(readFileSync('src/catalog.ts', 'utf8'));
const { prepareCartDish, addCartItem, setCartQuantity, cartTotals, buildOrderText } =
  load(readFileSync('src/cart-items.ts', 'utf8'), { './catalog': catalogRules });
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
const discovery = load(readFileSync('src/discovery.ts', 'utf8'));
const catalogModule = load(readFileSync('vite/catalog.ts', 'utf8'), {
  '../src/data': menuData, '../src/site-data': siteData, '../src/catalog': catalogRules,
  '../src/discovery': discovery,
});
const siteArtifacts = load(readFileSync('vite/siteArtifacts.ts', 'utf8'), {
  './catalog': catalogModule, '../src/discovery': discovery, '../src/data': menuData,
  '../src/site-data': siteData, '../src/catalog': catalogRules,
  '../src/types': load(readFileSync('src/types.ts', 'utf8')),
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

const { isPublicDish, readOrderCatalog } = catalogRules;
assert.equal(isPublicDish({}), true);
assert.equal(isPublicDish({ active: false }), false);
assert.equal(isPublicDish({ available: false }), false);
assert.equal(isPublicDish({ active: true, available: true }), true);
const first = MENU.pizzas[0];
for (const field of ['active', 'available']) {
  first[field] = false;
  assert.equal(catalogModule.buildCatalog().categories.flatMap((c) => c.items).some((p) => p.id === first.id), false);
  assert.equal(catalogModule.buildCartaHtml({}).includes(`data-product-code="${first.code}"`), false);
  assert.equal(JSON.stringify(catalogModule.buildMenuJsonLd()).includes(first.code), false);
  const page = discovery.DISCOVERY_PAGES.find((p) => p.categories.includes('pizzas'));
  const filteredPage = catalogModule.buildCartaHtml({}, false, page);
  assert.equal(filteredPage.includes(`data-product-code="${first.code}"`), false);
  assert.equal(filteredPage.includes(first.img), false, 'Hidden preferred image must not leak into category metadata.');
  assert.equal(siteArtifacts.buildSitemapXml('full').includes(first.img), false, 'Hidden image must not leak into sitemap.');
  delete first[field];
}
assert.equal(catalogModule.buildCatalog().categories.flatMap((c) => c.items).some((p) => p.id === first.id), true);
assert.equal(readOrderCatalog(catalog).length, dishes.length);
assert.equal(discovery.DISCOVERY_PAGES.filter((p) => !p.vegetarianOnly).length, menuData.CATEGORIES.length);
for (const category of menuData.CATEGORIES) {
  assert.ok(discovery.DISCOVERY_PAGES.some((p) => !p.vegetarianOnly && p.categories.length === 1 && p.categories[0] === category.id));
}
for (const page of discovery.DISCOVERY_PAGES) {
  const html = catalogModule.buildCartaHtml({}, false, page);
  const selected = catalog.categories.filter((c) => page.categories.includes(c.id)).flatMap((c) => c.items).filter((i) => !page.vegetarianOnly || i.vegetarian);
  const codes = [...html.matchAll(/data-product-code="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(codes.sort().join(','), selected.map((item) => item.code).sort().join(','));
  assert.ok(html.includes(`href="${siteData.SITE.url}${page.path}"`));
  assert.equal(/<script type="module"/.test(html), false);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  const schemaItems = graph.find((entry) => entry['@type'] === 'Menu').hasMenuSection.flatMap((c) => c.hasMenuItem);
  assert.equal(schemaItems.length, selected.length);
  for (const item of selected) assert.equal(schemaItems.find((i) => i.identifier === item.code).offers.price, item.price);
  assert.ok(html.includes(selected.find((i) => i.code === page.preferredCode).image));
}
const veggiePage = discovery.DISCOVERY_PAGES.find((p) => p.vegetarianOnly);
const veggieCatalog = catalogModule.buildPageCatalog(veggiePage);
assert.equal(veggieCatalog.categories.length, 7);
const veggieCodes = veggieCatalog.categories.flatMap((c) => c.items.map((i) => i.code));
assert.equal(veggieCodes.length, 39);
for (const code of ['ENS002', 'MIL011', 'MIL014', 'EMP012', 'PIZ001', 'PAS008', 'TAR006']) assert.ok(veggieCodes.includes(code));
for (const code of ['MIL015', 'MIL016', 'MIL017', 'MIL020', 'PIZ007', 'PIZ019', 'ENS001', 'PAS006', 'PAS015']) assert.ok(!veggieCodes.includes(code), code);
const hiddenVeggie = MENU.medallones[0];
hiddenVeggie.available = false;
const hiddenVeggieHtml = catalogModule.buildCartaHtml({}, false, veggiePage);
assert.ok(!hiddenVeggieHtml.includes(hiddenVeggie.img));
assert.ok(!catalogModule.buildPageCatalog(veggiePage).categories.flatMap((c) => c.items).some((i) => i.code === hiddenVeggie.code));
delete hiddenVeggie.available;
assert.equal(siteArtifacts.buildSitemapXml('full').includes('placeholder-'), false);
assert.equal(siteArtifacts.buildSitemapXml('landing').includes('image:loc'), false);
assert.equal(siteArtifacts.buildSitemapXml('landing').includes('/la-colorada-veggie/'), false);
console.log('✅ Páginas de especialidades: categorías/Schema/precios, imagen preferida, sitemap y ocultación de fotos de platos no disponibles.');
assert.throws(() => readOrderCatalog({ schemaVersion: '2.0', categories: [] }));
const invalidCatalog = JSON.parse(JSON.stringify(catalog));
invalidCatalog.categories[0].items[0].price = -1;
assert.throws(() => readOrderCatalog(invalidCatalog));
const { reconcileCart } = load(readFileSync('src/cart-items.ts', 'utf8'), { './catalog': catalogRules });
const oldCart = [{ dish: prepareCartDish(tart, true), qty: 2 }];
let checked = reconcileCart(oldCart, [{ ...tart, price: 10000 }]);
assert.equal(checked.items[0].dish.price, 12500);
assert.equal(checked.items[0].qty, 2);
assert.equal(checked.changes.length, 1);
checked = reconcileCart(oldCart, [{ ...tart, available: false }]);
assert.equal(checked.items.length, 0);
assert.equal(checked.changes.length, 1);
assert.equal(reconcileCart(oldCart, [{ ...tart, saladAddon: undefined }]).items.length, 0);
assert.equal(reconcileCart(oldCart, []).items.length, 0);
assert.equal(reconcileCart(oldCart, [tart]).changes.length, 0);
console.log('✅ Estados, ocultar/restaurar, lectura de catálogo y cambios de carrito validados.');
