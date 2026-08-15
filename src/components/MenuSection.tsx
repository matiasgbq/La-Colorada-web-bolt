import { useState, useMemo } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { CATEGORIES, MENU } from '../data';
import type { CategoryId } from '../data';
import type { Dish } from '../types';
import { useCart, formatARS } from '../cart';
import { useReveal } from '../hooks';

type SearchResult = Dish & { category: string };

export function MenuSection() {
  const [cat, setCat] = useState<CategoryId>('pizzas');
  const [query, setQuery] = useState('');
  const { add } = useCart();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const searching = query.trim().length > 0;

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const all: SearchResult[] = [];
    for (const c of CATEGORIES) {
      for (const dish of MENU[c.id]) {
        if (
          dish.name.toLowerCase().includes(q) ||
          dish.desc.toLowerCase().includes(q)
        ) {
          all.push({ ...dish, category: c.label });
        }
      }
    }
    return all;
  }, [query]);

  const dishes = searching ? results : MENU[cat];

  return (
    <section id="menu" className="py-20 sm:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-crimson-500 font-bold uppercase tracking-widest text-sm">
            Hacé tu pedido
          </span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl text-ink-800 tracking-wide">
            Nuestro Menú
          </h2>
          <p className="mt-4 text-ink-500">
            Armá tu pedido y confirmalo por WhatsApp en segundos. Precios en pesos.
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
          <div className="flex justify-start sm:justify-center gap-3 mb-12 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  cat === c.id
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

        {/* Search results count */}
        {searching && (
          <p className="text-center text-ink-500 mb-8">
            {results.length > 0
              ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} para "${query}"`
              : `No encontramos nada para "${query}"`}
          </p>
        )}

        <div
          key={searching ? 'search' : cat}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
            visible ? 'animate-floatUp' : 'opacity-0'
          }`}
        >
          {dishes.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-ink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {dish.tag && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-crimson-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {dish.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-lg text-ink-800">{dish.name}</h3>
                <p className="mt-1.5 text-sm text-ink-500 leading-relaxed flex-1">
                  {dish.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl text-crimson-500">
                    {formatARS(dish.price)}
                  </span>
                  <button
                    onClick={() => add(dish)}
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
      </div>
    </section>
  );
}
