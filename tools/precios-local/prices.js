const search = document.querySelector('#search');
const refresh = document.querySelector('#refresh');
const status = document.querySelector('#status');
const catalog = document.querySelector('#catalog');
const categoryNav = document.querySelector('#categories');
const pesos = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});
const normalize = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
let categories = [];
let selectedCategory = '';

function element(tag, label) {
  const node = document.createElement(tag);
  node.textContent = label;
  return node;
}

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
  for (const category of categories) {
    if (selectedCategory && category.name !== selectedCategory) continue;
    const items = category.items.filter((item) =>
      normalize([item.name, item.code, category.name].join(' ')).includes(query));
    if (!items.length) continue;

    const section = element('section', '');
    const heading = element('h2', category.name);
    const table = element('table', '');
    table.setAttribute('aria-label', category.name);
    const header = table.createTHead().insertRow();
    for (const label of ['Plato', 'Precio', 'Atributos']) {
      const cell = element('th', label);
      cell.scope = 'col';
      header.append(cell);
    }
    const body = table.createTBody();
    for (const item of items) {
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
    }
    section.append(heading, table);
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
    if (categoryNamesChanged) renderCategories();
    const time = new Intl.DateTimeFormat('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires', dateStyle: 'short', timeStyle: 'short',
    }).format(new Date());
    status.textContent = 'Última consulta al sitio: ' + time;
  } catch {
    categories = [];
    renderCategories();
    status.textContent = 'No pudimos consultar los precios. Usá Actualizar precios para reintentar.';
  } finally {
    render();
    refresh.disabled = false;
  }
}

search.addEventListener('input', render);
refresh.addEventListener('click', loadPrices);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) loadPrices();
});
setInterval(() => {
  if (!document.hidden) loadPrices();
}, 300_000);
loadPrices();
