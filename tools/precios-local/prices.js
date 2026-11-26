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
const saveOrder = document.querySelector('#save-order');
const saveOrderStatus = document.querySelector('#save-order-status');
const orderCustomer = document.querySelector('#order-customer');
const orderAddress = document.querySelector('#order-address');
const orderTime = document.querySelector('#order-time');
const orderPayment = document.querySelector('#order-payment');
const orderNotes = document.querySelector('#order-notes');
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
  saveOrder.disabled = order.size === 0;
  orderCount.textContent = `· ${units}`;
  orderTotal.textContent = pesos.format(total);
}

async function createOperationalOrder() {
  if (!order.size) return;
  const cliente = orderCustomer.value.trim();
  if (!cliente) { orderCustomer.focus(); window.alert('Poné un cliente o referencia para identificar el pedido.'); return; }
  saveOrder.disabled = true; saveOrder.textContent = 'Creando…'; saveOrderStatus.textContent = '';
  try {
    const items = [...order.values()].map(item => ({ cantidad: item.quantity, descripcion: item.name, precio_unitario: item.price }));
    const response = await fetch(SUPABASE_URL + '/functions/v1/la-colorada-crear-pedido', {
      method: 'POST', headers: { 'Content-Type':'application/json', apikey: SUPABASE_KEY },
      body: JSON.stringify({ cliente, direccion: orderAddress.value, horario_entrega: orderTime.value, forma_pago: orderPayment.value, notas: orderNotes.value, items }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'No se pudo crear.');
    order.clear();
    for (const field of [orderCustomer, orderAddress, orderTime, orderNotes]) field.value = '';
    orderPayment.value = '';
    renderOrder();
    saveOrderStatus.textContent = 'Pedido #' + result.id + ' creado · ' + pesos.format(result.total);
    await loadActiveOrders();
    document.querySelector('.active-orders')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) { saveOrderStatus.textContent = 'Error al crear el pedido.'; window.alert(e.message); }
  finally { saveOrder.textContent = 'Crear pedido'; saveOrder.disabled = order.size === 0; }
}
saveOrder.addEventListener('click', createOperationalOrder);

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


// Pedidos en curso — prueba operativa La Colorada / Supabase.
const ordersList = document.querySelector('#active-orders-list');
const ordersCount = document.querySelector('#active-orders-count');
const ordersStatus = document.querySelector('#active-orders-status');
const SUPABASE_URL = 'https://gwvaixuymtctmzrfoewl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_7N_w5yr54EyyPzs5nwfkqA_h8I5vbvl';
const ORDER_STATES = [
  ['recibido', 'Recibido'],
  ['en_preparacion', 'Preparando'],
  ['listo', 'Listo'],
  ['salio', 'Salió'],
  ['entregado', 'Entregado'],
];

async function updateOrderState(id, estado, button) {
  const previous = button?.textContent;
  if (button) { button.disabled = true; button.textContent = 'Guardando…'; }
  try {
    const response = await fetch(SUPABASE_URL + '/functions/v1/la-colorada-estado-pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY },
      body: JSON.stringify({ id, estado }),
    });
    if (!response.ok) throw new Error('No se pudo cambiar el estado.');
    await loadActiveOrders();
  } catch {
    window.alert('No se pudo cambiar el estado. Probá de nuevo.');
    if (button) { button.disabled = false; button.textContent = previous; }
  }
}

async function loadActiveOrders() {
  if (!ordersList) return;
  try {
    const headers = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY };
    const [ordersResponse, itemsResponse] = await Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/la_colorada_pedidos?select=id,cliente,direccion,horario_entrega,estado,total,forma_pago,notas,created_at,updated_at&estado=not.in.(entregado,cancelado)&order=created_at.asc', { headers, cache: 'no-store' }),
      fetch(SUPABASE_URL + '/rest/v1/la_colorada_pedido_items?select=pedido_id,cantidad,descripcion,precio_unitario,notas&order=id.asc', { headers, cache: 'no-store' }),
    ]);
    if (!ordersResponse.ok) throw new Error('No se pudieron consultar los pedidos.');
    const orders = await ordersResponse.json();
    const items = itemsResponse.ok ? await itemsResponse.json() : [];
    ordersList.replaceChildren();
    ordersCount.textContent = '· ' + orders.length;
    ordersStatus.textContent = orders.length ? 'Todos los pedidos activos permanecen acá hasta Entregado o Cancelado.' : 'No hay pedidos en curso.';
    const lanes = [
      ['recibido','Nuevos'], ['en_preparacion','Preparando'], ['listo','Listos'], ['salio','En camino']
    ];
    for (const [state,label] of lanes) {
      const lane = element('section',''); lane.className='order-lane';
      const laneOrders=orders.filter(o=>o.estado===state);
      const heading=element('h3', label + ' · ' + laneOrders.length); lane.append(heading);
      const stack=element('div',''); stack.className='order-lane-stack';
      for (const orderData of laneOrders) {
        const card=element('article',''); card.className='active-order-card state-'+state;
        const head=element('div',''); head.className='active-order-head';
        const time=element('span',orderData.horario_entrega||'Sin horario'); time.className='order-time';
        head.append(element('strong',orderData.cliente),time); card.append(head);
        if(orderData.direccion){const p=element('p',orderData.direccion);p.className='active-order-address';card.append(p)}
        const list=element('ul','');
        const lines=items.filter(x=>x.pedido_id===orderData.id);
        if(lines.length) for(const line of lines) list.append(element('li',line.cantidad+' × '+line.descripcion+' · '+pesos.format(line.precio_unitario)+' c/u · '+pesos.format(line.cantidad*line.precio_unitario)+(line.notas?' · '+line.notas:'')));
        else list.append(element('li','Sin detalle cargado'));
        card.append(list);
        if(orderData.notas){const n=element('p','Nota: '+orderData.notas);n.className='active-order-address';card.append(n)}
        const total=element('div','');total.className='active-order-total';
        total.append(element('span',orderData.forma_pago||'A cobrar'),element('strong',pesos.format(orderData.total)));card.append(total);
        const controls=element('div','');controls.className='order-state-controls';
        for(const [value,textLabel] of ORDER_STATES){const button=actionButton(textLabel,'Cambiar pedido a '+textLabel,()=>updateOrderState(orderData.id,value,button));if(value===orderData.estado){button.classList.add('current');button.setAttribute('aria-current','true')}controls.append(button)}
        const cancel=actionButton('Cancelar','Cancelar pedido',()=>updateOrderState(orderData.id,'cancelado',cancel));cancel.classList.add('cancel-order');controls.append(cancel);
        card.append(controls); stack.append(card);
      }
      if(!laneOrders.length){const empty=element('p','Sin pedidos');empty.className='lane-empty';stack.append(empty)}
      lane.append(stack);ordersList.append(lane);
    }
  } catch (error) {
    ordersStatus.textContent = 'Error cargando pedidos activos. Reintentaremos automáticamente.';
    console.error(error);
  }
}
loadActiveOrders();
setInterval(() => { if (!document.hidden) loadActiveOrders(); }, 30000);

const historyToggle=document.querySelector('#toggle-history'),historySection=document.querySelector('#history-section'),historyList=document.querySelector('#history-list'),historyStatus=document.querySelector('#history-status');
async function loadHistory(){
  try{
    const headers={apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY};
    const [a,b]=await Promise.all([
      fetch(SUPABASE_URL+'/rest/v1/la_colorada_pedidos?select=id,cliente,direccion,horario_entrega,estado,total,created_at,updated_at&order=created_at.desc&limit=200',{headers,cache:'no-store'}),
      fetch(SUPABASE_URL+'/rest/v1/la_colorada_pedido_eventos?select=pedido_id,estado,actor,created_at&order=created_at.asc',{headers,cache:'no-store'})
    ]);
    if(!a.ok) throw new Error('pedidos');
    const orders=await a.json(), events=b.ok?await b.json():[];
    historyList.replaceChildren();
    historyStatus.textContent=orders.length?orders.length+' pedidos registrados':'Sin historial';
    const fmtDate=d=>new Intl.DateTimeFormat('es-AR',{timeZone:'America/Argentina/Buenos_Aires',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(d));
    const fmtTime=d=>new Intl.DateTimeFormat('es-AR',{timeZone:'America/Argentina/Buenos_Aires',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(d));
    const labels={recibido:'Recibido',en_preparacion:'Preparando',listo:'Listo',salio:'En camino',entregado:'Entregado',cancelado:'Cancelado'};
    let lastDate='';
    for(const o of orders){
      const date=fmtDate(o.created_at);
      if(date!==lastDate){const day=element('h3',date);day.className='history-day';historyList.append(day);lastDate=date}
      const row=element('article','');row.className='history-row';
      const main=element('div','');main.className='history-row-main';
      const title=element('strong',o.cliente);const meta=element('span',fmtTime(o.created_at)+(o.horario_entrega?' · entrega '+o.horario_entrega:''));
      main.append(title,meta);
      const right=element('div','');right.className='history-row-right';
      const state=element('span',labels[o.estado]||o.estado);state.className='history-state history-state-'+o.estado;
      right.append(state,element('strong',pesos.format(o.total)));
      row.append(main,right);
      const timeline=events.filter(e=>e.pedido_id===o.id);
      if(timeline.length){
        const detail=element('div','');detail.className='history-timeline';
        detail.textContent=timeline.map(e=>(labels[e.estado]||e.estado)+' '+fmtTime(e.created_at)).join(' → ');
        row.append(detail);
      }
      historyList.append(row);
    }
  }catch{historyStatus.textContent='No se pudo cargar el historial'}
}
historyToggle?.addEventListener('click',()=>{historySection.hidden=!historySection.hidden;if(!historySection.hidden)loadHistory()});
