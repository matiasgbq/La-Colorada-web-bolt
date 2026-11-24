import {createOrder, transition, nextStatus, isClosed, labels} from './order-model.js';
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

function getPizzas() {
  return categories.filter(({ name }) => normalize(name).includes('pizza'))
    .flatMap(({ items }) => items.filter(({ code, price }) => /^PIZ\d{3}$/.test(code ?? '') && code !== 'PIZ016' && Number.isFinite(price)));
}

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
    ? `Total: ${pesos.format(pizza.price)} · 50 % del precio de cada gusto`
    : 'Seleccioná dos gustos.';
  addHalfPizza.disabled = !pizza;
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
  document.querySelector('#jump-total').textContent = pesos.format(total);
  document.querySelector('#save-order').disabled = !order.size;
}

clearOrder.addEventListener('click', () => {
  if (!window.confirm('¿Vaciar el pedido de mostrador?')) return;
  order.clear();
  orderForm.reset();
  syncAddress();
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
        actions.append(actionButton('Agregar', `Agregar ${item.name} al pedido`, () => changeQuantity(item, 1)));
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

// El almacén de demostración vive exclusivamente en memoria de la pestaña.
// No usar datos reales hasta incorporar autenticación y almacenamiento compartido.
const savedOrders = new Map();
let orderSequence = 0;
const orderForm = document.querySelector('#order-form');
const fulfillment = document.querySelector('#fulfillment');
const addressField = document.querySelector('#address-field');
const addressInput = document.querySelector('#delivery-address');
const feedback = document.querySelector('#central-feedback');
const filter = document.querySelector('#queue-filter');
const orderList = document.querySelector('#orders-list');
function syncAddress() {
  const delivery = fulfillment.value === 'delivery';
  addressField.hidden = !delivery;
  addressInput.required = delivery;
  if (!delivery) addressInput.value = '';
}
fulfillment.addEventListener('change', syncAddress);
function setView(view) {
  document.body.dataset.view = view;
  document.querySelector('#catalog-view').hidden = view === 'active';
  document.querySelector('#orders-view').hidden = view !== 'active';
  for (const button of document.querySelectorAll('[data-view-target]')) {
    button.setAttribute('aria-pressed', String(button.dataset.viewTarget === view));
  }
  if (view === 'active') renderQueue();
  else search.focus({preventScroll:true});
}
for (const button of document.querySelectorAll('[data-view-target]')) {
  button.addEventListener('click', () => setView(button.dataset.viewTarget));
}
document.querySelector('#new-from-queue').addEventListener('click', () => setView('new'));
filter.addEventListener('change', renderQueue);
orderForm.addEventListener('submit', event => {
  event.preventDefault();
  try {
    const id = 'LC-' + String(orderSequence + 1).padStart(3,'0');
    const record = createOrder({id,items:[...order.values()],fields:Object.fromEntries(new FormData(orderForm))});
    orderSequence++;
    savedOrders.set(id,record);
    order.clear();
    orderForm.reset();
    syncAddress();
    renderOrder();
    filter.value = 'active';
    feedback.textContent = 'Pedido de prueba ' + id + ' registrado.';
    setView('active');
  } catch (error) { feedback.textContent = error.message; }
});
function changeStatus(id, state) {
  try {
    savedOrders.set(id,transition(savedOrders.get(id),state));
    feedback.textContent = id + ': ' + labels.status[state] + '.';
    renderQueue();
  } catch (error) { feedback.textContent = error.message; }
}
function renderQueue() {
  const records = [...savedOrders.values()];
  const active = records.filter(record => !isClosed(record));
  document.querySelector('#active-count').textContent = String(active.length);
  const summary = document.querySelector('#queue-summary');
  summary.replaceChildren();
  for (const [label,count] of [
    ['Nuevos',active.filter(r=>r.status==='new').length],
    ['Preparación',active.filter(r=>['confirmed','preparing'].includes(r.status)).length],
    ['Listos / en camino',active.filter(r=>['ready','dispatched'].includes(r.status)).length]
  ]) {
    const stat = element('div','');
    stat.append(element('strong',String(count)),element('span',label));
    summary.append(stat);
  }
  orderList.replaceChildren();
  const shown = records.filter(r=>filter.value==='all'||(filter.value==='closed'?isClosed(r):!isClosed(r)));
  if (!shown.length) {
    const empty = element('p', 'No hay pedidos en esta vista. Creá un pedido de prueba desde Nuevo pedido.');
    empty.className = 'queue-empty'; orderList.append(empty);
  }
  for (const record of shown.reverse()) {
    const card = element('article',''); card.className='queue-card';
    const heading = element('div',''); heading.className='queue-card-heading';
    const state = element('span',labels.status[record.status]); state.className='order-state'; state.dataset.status=record.status;
    heading.append(element('h3',record.id+' · '+(record.customer.name||'Sin nombre')),state);
    const items = element('ul','');
    for (const line of record.items) items.append(element('li',line.quantity+' × '+line.name+' — '+pesos.format(line.subtotal)));
    const actions = element('div',''); actions.className='queue-actions';
    const next = nextStatus(record);
    if(next) actions.append(actionButton('Pasar a '+labels.status[next],record.id+': '+labels.status[next],()=>changeStatus(record.id,next)));
    if(!isClosed(record)){
      if(record.paymentStatus==='pending' && record.paymentMethod!=='unknown') actions.append(actionButton('Marcar pagado',record.id+': marcar pagado',()=>{
        savedOrders.set(record.id,{...savedOrders.get(record.id),paymentStatus:'paid',updatedAt:new Date().toISOString()}); renderQueue();
      }));
      actions.append(actionButton('Cancelar', 'Cancelar '+record.id,()=>{if(window.confirm('¿Cancelar '+record.id+'?'))changeStatus(record.id,'cancelled')}));
    }
    card.append(heading,element('p',labels.channel[record.channel]+' · '+labels.fulfillment[record.fulfillment]+' · '+new Date(record.createdAt).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})),items,
      element('p','Pago: '+labels.paymentMethod[record.paymentMethod]+' · '+labels.paymentStatus[record.paymentStatus]));
    if(record.customer.phone) card.append(element('p','Tel.: '+record.customer.phone));
    if(record.address) card.append(element('p','Dirección: '+record.address));
    if(record.notes) card.append(element('p','Notas: '+record.notes));
    card.append(element('strong','Total: '+pesos.format(record.total)),actions);
    orderList.append(card);
  }
}
syncAddress();
renderQueue();

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
