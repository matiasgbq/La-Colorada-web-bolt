const search = document.querySelector('#search');
const refresh = document.querySelector('#refresh');
const status = document.querySelector('#status');
const catalog = document.querySelector('#catalog');
const categoryNav = document.querySelector('#categories');
const orderItems = document.querySelector('#order-items');
const orderEmpty = document.querySelector('#order-empty');
const orderCount = document.querySelector('#order-count');
const orderTotal = document.querySelector('#order-total');
const clearOrder = document.querySelector('#clear-order');
const order = new Map();
const pesos = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});
const normalize = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
let categories = [];
let selectedCategory = '';
const expandedCategories = new Map();
let defaultCategoryOpen = true;

function categoryOpen(name) {
  return expandedCategories.get(name) ?? defaultCategoryOpen;
}
function setAllCategoriesOpen(open) {
  defaultCategoryOpen = open;
  expandedCategories.clear();
  for (const category of categories) expandedCategories.set(category.name, open);
  render();
}


function element(tag, label) {
  const node = document.createElement(tag);
  node.textContent = label;
  return node;
}

function actionButton(label, accessibleLabel, onClick) {
  const button = element('button', label);
  button.type = 'button';
  button.setAttribute('aria-label', accessibleLabel);
  button.addEventListener('click', onClick);
  return button;
}

const halfPizza = document.querySelector('#half-pizza');
const pizzaFirst = document.querySelector('#pizza-first');
const pizzaSecond = document.querySelector('#pizza-second');
const halfPizzaPrice = document.querySelector('#half-pizza-price');
const addHalfPizza = document.querySelector('#add-half-pizza');

// Promo Google: descuento individual, sin modificar el catálogo ni otras líneas.
function isPizza(item) {
  return /^PIZ\d{3}$/.test(item.code ?? '') && item.code !== 'PIZ016' && Number.isFinite(item.price);
}

function googlePromo(item) {
  return {
    ...item,
    code: `${item.code}:GOOGLE20`,
    name: `${item.name} (Promo Google −20%)`,
    price: Math.round(item.price * 0.8),
  };
}

function getPizzas() {
  return categories.filter(({ name }) => normalize(name).includes('pizza'))
    .flatMap(({ items }) => items.filter(isPizza));
}

const addHalfPizzaPromo = actionButton('Promo Google −20%', 'Agregar pizza mitad y mitad con promo Google del 20%', () => {
  const pizza = chosenHalfPizza();
  if (pizza) changeQuantity(googlePromo(pizza), 1);
});
addHalfPizzaPromo.style.marginTop = '.35rem';
addHalfPizzaPromo.style.background = '#60433d';
addHalfPizza.after(addHalfPizzaPromo);

function chosenHalfPizza() {
  const pizzas = getPizzas();
  const first = pizzas.find(({ code }) => code === pizzaFirst.value);
  const second = pizzas.find(({ code }) => code === pizzaSecond.value);
  if (!first || !second) return null;
  const price = (first.price + second.price) / 2;
  return {
    code: `HALF:${[first.code, second.code].sort().join(':')}`,
    name: `½ ${first.name} + ½ ${second.name}`,
    price: Math.round(price),
  };
}

function updateHalfPizzaPrice() {
  const pizza = chosenHalfPizza();
  halfPizzaPrice.textContent = pizza
    ? `Lista: ${pesos.format(pizza.price)} · Promo Google −20%: ${pesos.format(googlePromo(pizza).price)}`
    : 'Seleccioná dos gustos.';
  addHalfPizza.disabled = !pizza;
  addHalfPizzaPromo.disabled = !pizza;
}

function renderHalfPizza() {
  const pizzas = getPizzas();
  halfPizza.hidden = pizzas.length === 0;
  if (!pizzas.length) return;
  const previousFirst = pizzaFirst.value;
  const previousSecond = pizzaSecond.value;
  for (const select of [pizzaFirst, pizzaSecond]) {
    select.replaceChildren();
    for (const pizza of pizzas) {
      const option = element('option', `${pizza.name} — ${pesos.format(pizza.price)}`);
      option.value = pizza.code;
      select.append(option);
    }
  }
  pizzaFirst.value = pizzas.some(({ code }) => code === previousFirst) ? previousFirst : pizzas[0].code;
  pizzaSecond.value = pizzas.some(({ code }) => code === previousSecond) ? previousSecond : (pizzas[1] ?? pizzas[0]).code;
  updateHalfPizzaPrice();
}

for (const control of [pizzaFirst, pizzaSecond]) {
  control.addEventListener('change', updateHalfPizzaPrice);
}
addHalfPizza.addEventListener('click', () => {
  const pizza = chosenHalfPizza();
  if (!pizza) return;
  changeQuantity(pizza, 1);
});

function changeQuantity(item, delta, control) {
  const line = order.get(item.code);
  const quantity = (line?.quantity ?? 0) + delta;
  if (quantity > 0) {
    order.set(item.code, { ...(line ?? item), quantity });
  } else {
    order.delete(item.code);
  }
  renderOrder();
  if (control) {
    const buttons = [...orderItems.querySelectorAll('button')];
    const next = buttons.find((button) => button.getAttribute('aria-label') ===
      `${control} ${item.name}`);
    (next ?? buttons[0] ?? catalog.querySelector('button') ?? search).focus();
  }
}

function renderOrder() {
  orderItems.replaceChildren();
  let total = 0;
  let units = 0;
  for (const item of order.values()) {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    units += item.quantity;
    const row = element('li', '');
    const title = element('strong', item.name);
    const controls = element('div', '');
    controls.className = 'quantity';
    controls.append(
      actionButton('−', `Quitar una unidad de ${item.name}`, () =>
        changeQuantity(item, -1, 'Quitar una unidad de')),
      element('span', String(item.quantity)),
      actionButton('+', `Sumar una unidad de ${item.name}`, () =>
        changeQuantity(item, 1, 'Sumar una unidad de')),
      element('strong', pesos.format(subtotal)),
    );
    row.append(title, controls);
    orderItems.append(row);
  }
  orderEmpty.hidden = order.size > 0;
  clearOrder.disabled = order.size === 0;
  orderCount.textContent = `· ${units}`;
  orderTotal.textContent = pesos.format(total);
}

clearOrder.addEventListener('click', () => {
  if (!window.confirm('¿Vaciar el pedido de mostrador?')) return;
  order.clear();
  renderOrder();
  (catalog.querySelector('button') ?? search).focus();
});

function renderCategories() {
  categoryNav.hidden = !categories.length;
  categoryNav.replaceChildren();
  if (!categories.some(({ name }) => name === selectedCategory)) selectedCategory = '';
  if (!categories.length) return;
  for (const name of ['', ...categories.map((category) => category.name)]) {
    const button = element('button', name || 'Todo');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(name === selectedCategory));
    button.addEventListener('click', () => {
      selectedCategory = name;
      for (const option of categoryNav.querySelectorAll('button')) {
        option.setAttribute('aria-pressed', String(option === button));
      }
      render();
      if (catalog.getBoundingClientRect().top < categoryNav.getBoundingClientRect().bottom) {
        window.scrollTo(0, 0);
      }
    });
    categoryNav.append(button);
  }
}

function render() {
  catalog.replaceChildren();
  const query = normalize(search.value.trim());
  if (!query && !selectedCategory && categories.length > 1) {
    const controls = element('div', '');
    controls.className = 'section-controls';
    controls.append(
      actionButton('Expandir todas', 'Expandir todas las categorías', () => setAllCategoriesOpen(true)),
      actionButton('Contraer todas', 'Contraer todas las categorías', () => setAllCategoriesOpen(false)),
    );
    catalog.append(controls);
  }
  for (const category of categories) {
    if (selectedCategory && category.name !== selectedCategory) continue;
    const items = category.items.filter((item) =>
      normalize([item.name, item.code, category.name].join(' ')).includes(query));
    if (!items.length) continue;

    const section = element('section', '');
    const details = element('details', '');
    details.className = 'catalog-category';
    // A search always opens matching groups; otherwise preserve the operator's choice.
    details.open = Boolean(query) || Boolean(selectedCategory) || categoryOpen(category.name);
    const summary = element('summary', '');
    const heading = element('h2', category.name);
    heading.append(element('span', ` · ${items.length}`));
    summary.append(heading);
    details.append(summary);
    details.addEventListener('toggle', () => {
      // Search/filter temporarily overrides collapse state without overwriting it.
      if (details.isConnected && !search.value.trim() && !selectedCategory) {
        expandedCategories.set(category.name, details.open);
      }
    });
    const table = element('table', '');
    table.setAttribute('aria-label', category.name);
    const header = table.createTHead().insertRow();
    const canOrder = category.name !== 'Adicionales';
    const columns = canOrder ? ['Plato', 'Precio', 'Atributos', 'Pedido'] : ['Plato', 'Precio', 'Atributos'];
    for (const label of columns) {
      const cell = element('th', label);
      cell.scope = 'col';
      header.append(cell);
    }
    const body = table.createTBody();
    // Primarias al comienzo, conservando el orden del catálogo dentro de cada grupo.
    const orderedItems = [...items].sort((a, b) =>
      Number((b.attributes ?? []).includes('Primaria')) -
      Number((a.attributes ?? []).includes('Primaria')));
    for (const item of orderedItems) {
      const row = body.insertRow();
      const name = row.insertCell();
      name.textContent = item.name;
      if (item.code) name.append(element('small', item.code));
      row.insertCell().textContent = pesos.format(item.price);
      const attributes = row.insertCell();
      for (const attribute of item.attributes ?? []) {
        const badge = element('span', attribute);
        badge.className = attribute === 'Veggie' ? 'badge veggie' : 'badge';
        attributes.append(badge);
      }
      if (!attributes.childElementCount) attributes.textContent = '—';
      if (canOrder) {
        const actions = row.insertCell();
        actions.className = 'order-actions';
        const promoEligible = normalize(category.name).includes('pizza') && isPizza(item);
        actions.append(actionButton(promoEligible ? 'Lista' : 'Agregar', `Agregar ${item.name} al pedido`, () => changeQuantity(item, 1)));
        if (promoEligible) {
          const promo = googlePromo(item);
          actions.append(actionButton(`Google −20% · ${pesos.format(promo.price)}`,
            `Agregar ${item.name} con promo Google del 20% a ${pesos.format(promo.price)}`,
            () => changeQuantity(promo, 1)));
        }
        for (const addon of item.addons ?? []) {
          const withAddon = {
            code: `${item.code}:${addon.code}`,
            name: `${item.name} + ${addon.name.toLocaleLowerCase('es-AR')}`,
            price: item.price + addon.price,
          };
          actions.append(actionButton('Con ensalada', `Agregar ${item.name} con ensalada al pedido`,
            () => changeQuantity(withAddon, 1)));
        }
      }
    }
    details.append(table);
    section.append(details);
    catalog.append(section);
  }
  if (categories.length && !catalog.childElementCount) {
    catalog.append(element('p', 'No encontramos platos con esa búsqueda.'));
  }
}

async function loadPrices() {
  if (refresh.disabled) return;
  refresh.disabled = true;
  status.textContent = 'Cargando precios…';
  try {
    const response = await fetch('/api/catalog', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo consultar el catálogo.');
    const nextCategories = await response.json();
    const categoryNamesChanged = categories.map(({ name }) => name).join('|') !==
      nextCategories.map(({ name }) => name).join('|');
    categories = nextCategories;
    renderHalfPizza();
    if (categoryNamesChanged) renderCategories();
    const time = new Intl.DateTimeFormat('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires', dateStyle: 'short', timeStyle: 'short',
    }).format(new Date());
    status.textContent = 'Última consulta al sitio: ' + time;
  } catch {
    categories = [];
    halfPizza.hidden = true;
    renderCategories();
    status.textContent = 'No pudimos consultar los precios. Usá Actualizar precios para reintentar.';
  } finally {
    render();
    refresh.disabled = false;
  }
}

const lookup = document.querySelector('.lookup');
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--lookup-height', `${lookup.offsetHeight + 8}px`);
}).observe(lookup);

search.addEventListener('input', render);
refresh.addEventListener('click', loadPrices);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) loadPrices();
});
setInterval(() => {
  if (!document.hidden) loadPrices();
}, 300_000);
loadPrices();
