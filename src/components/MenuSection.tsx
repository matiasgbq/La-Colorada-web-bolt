import { isPublicDish } from '@/catalog';
import { useState, useMemo, useRef } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { CATEGORIES, MENU } from '@/data';
import type { CategoryId } from '../data';
import type { Dish } from '../types';
import { useCart, formatARS } from '../cart';
import { useReveal } from '../hooks';

type SearchResult = Dish & { category: string };

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-AR');

// Keep the previous layout available locally for side-by-side review.
const currentLayout = import.meta.env.DEV && new URLSearchParams(window.location.search).get('menu') === 'actual';

export function MenuSection() {
  const [cat, setCat] = useState<CategoryId>('pizzas');
  const [expanded, setExpanded] = useState(false);
  const [overview, setOverview] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const firstExtraRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');
  const [salads, setSalads] = useState<Record<string, boolean>>({});
  const { add } = useCart();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const searching = query.trim().length > 0;

  const results = useMemo<SearchResult[]>(() => {
    const q = normalizeSearchText(query.trim());
    if (!q) return [];
    const all: SearchResult[] = [];
    for (const c of CATEGORIES) {
      for (const dish of MENU[c.id].filter(isPublicDish)) {
        if (
          normalizeSearchText(dish.name).includes(q) ||
          normalizeSearchText(dish.desc).includes(q)
        ) {
          all.push({ ...dish, category: c.label });
        }
      }
    }
    return all;
  }, [query]);

  const available = MENU[cat].filter(isPublicDish);
  const featured = currentLayout ? [] : available
    .flatMap((dish) => dish.primaryOrder === undefined ? [] : [{ dish, order: dish.primaryOrder }])
    .sort((a, b) => a.order - b.order)
    .map(({ dish }) => dish);
  const remaining = available.filter((dish) => dish.primaryOrder === undefined);
  const canExpand = featured.length > 0 && remaining.length > 0;
  const browsing = overview && !searching;
  const categoryLabel = CATEGORIES.find((category) => category.id === cat)?.label.toLowerCase();
  const dishes = searching ? results : featured.length
    ? [...featured, ...(expanded ? remaining : [])] : available;

  function focusAfterRender(target: typeof gridRef | typeof firstExtraRef) {
    requestAnimationFrame(() => target.current?.focus());
  }

  function selectCategory(category: CategoryId, showAll = false) {
    setCat(category);
    setExpanded(showAll);
    setOverview(false);
    if (showAll) focusAfterRender(gridRef);
  }

  return (
    <section id="menu" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-crimson-500 font-bold uppercase tracking-widest text-sm">
            Hacé tu pedido
          </span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl text-ink-800 tracking-wide">
            Nuestro Menú
          </h2>
          <p className="mt-4 text-ink-500">
            Armá tu pedido y confirmalo por WhatsApp en segundos. Precios en pesos.
            Las pizzas son grandes. Los platos con guarnición incluyen ensalada;
            podés pedir cambios por WhatsApp.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar plato o ingrediente"
              placeholder="Buscar plato o ingrediente..."
              className="w-full pl-12 pr-12 py-3.5 rounded-full bg-ink-50 ring-1 ring-ink-200 focus:ring-2 focus:ring-crimson-400 focus:bg-white outline-none text-ink-800 placeholder:text-ink-400 transition-all"
            />
            {searching && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-crimson-500 transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs — hidden while searching */}
        {!searching && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => selectCategory(c.id)}
                aria-pressed={!browsing && cat === c.id}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  !browsing && cat === c.id
                    ? 'bg-crimson-500 text-white shadow-lg shadow-crimson-500/30'
                    : 'bg-ink-50 text-ink-800 hover:bg-crimson-50 ring-1 ring-ink-200'
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.label}
              </button>
            ))}
          </div>
        )}

        {!currentLayout && !searching && (
          <div className="text-center mb-8">
            <button
              type="button"
              aria-pressed={browsing}
              onClick={() => setOverview(!overview)}
              className="px-5 py-2.5 rounded-full font-bold text-sm text-crimson-700 ring-1 ring-crimson-300 hover:bg-crimson-50"
            >
              {browsing ? 'Volver a las categorías' : 'Ojear toda la carta'}
            </button>
          </div>
        )}

        {browsing && (
          <div className="grid md:grid-cols-2 items-start gap-6">
            {CATEGORIES.map(({ id, label }) => {
              const items = MENU[id].filter(isPublicDish);
              if (!items.length) return null;
              return (
                <section key={id} className="rounded-2xl ring-1 ring-ink-200 p-5">
                  <h3 className="font-bold text-lg text-ink-800">{label}</h3>
                  <ul className="mt-2 divide-y divide-ink-100">
                    {items.map((dish) => (
                      <li key={dish.id} className="flex justify-between gap-3 py-2 text-sm">
                        <span>{dish.name}</span>
                        <span className="shrink-0 font-semibold">{formatARS(dish.price)}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => selectCategory(id, true)}
                    className="mt-3 font-bold text-crimson-700 underline"
                  >
                    Ver platos de {label.toLowerCase()}
                  </button>
                </section>
              );
            })}
          </div>
        )}

        {/* Search results count */}
        {searching && (
          <p className="text-center text-ink-500 mb-8">
            {results.length > 0
              ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} para "${query}"`
              : `No encontramos nada para "${query}"`}
          </p>
        )}

        {!browsing && !searching && dishes.length === 0 && (
          <p className="text-center text-ink-500 mb-8">Por ahora no hay platos disponibles en esta categoría.</p>
        )}

        {!browsing && <>
        <div
          ref={gridRef}
          tabIndex={-1}
          aria-label={searching ? 'Resultados de búsqueda' : categoryLabel}
          key={searching ? 'search' : cat}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
            visible ? 'animate-floatUp' : 'opacity-0'
          }`}
        >
          {dishes.map((dish, index) => (
            <article
              key={dish.id}
              ref={!searching && canExpand && index === featured.length ? firstExtraRef : undefined}
              tabIndex={!searching && canExpand && index === featured.length ? -1 : undefined}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-ink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.name}
                  loading="lazy"
                  className={`w-full h-full ${dish.imgFit === 'contain' ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                  {dish.tag && dish.tag !== 'Veggie' && <span className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-md bg-crimson-500">{dish.tag}</span>}
                  {dish.vegetarian && <span className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-md bg-green-700">Veggie</span>}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-lg text-ink-800">{dish.name}</h3>
                <p className="mt-1.5 text-sm text-ink-500 leading-relaxed flex-1">
                  {dish.desc}
                </p>
                {dish.saladAddon && (
                  <label className="mt-3 flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(salads[dish.id])}
                      onChange={(event) => setSalads((prev) => ({ ...prev, [dish.id]: event.target.checked }))}
                      className="w-4 h-4 accent-crimson-500"
                    />
                    Sumar ensalada +{formatARS(dish.saladAddon.price)}
                  </label>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl text-crimson-500">
                    {formatARS(dish.price + (salads[dish.id] ? dish.saladAddon?.price ?? 0 : 0))}
                  </span>
                  <button
                    onClick={() => {
                      add(dish, Boolean(salads[dish.id]));
                      setSalads((prev) => ({ ...prev, [dish.id]: false }));
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink-800 text-white text-sm font-bold hover:bg-crimson-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!searching && canExpand && (
          <div className="mt-8 text-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => {
                setExpanded(!expanded);
                focusAfterRender(expanded ? gridRef : firstExtraRef);
              }}
              className="px-6 py-3 rounded-full font-bold bg-crimson-500 text-white hover:bg-crimson-600"
            >
              {expanded ? 'Ver menos' : `Ver todas las ${categoryLabel}`}
            </button>
          </div>
        )}
        </>}
      </div>
    </section>
  );
}
