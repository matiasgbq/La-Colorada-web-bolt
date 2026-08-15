import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../cart';
import type { Section } from '../types';

const LINKS: { id: Section; label: string }[] = [
  { id: 'menu', label: 'Menú' },
  { id: 'galeria', label: 'Galería' },
  { id: 'opiniones', label: 'Opiniones' },
  { id: 'ubicacion', label: 'Ubicación' },
];

export function Navbar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (s: Section) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (s: Section) => {
    onNavigate(s);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        <button
          onClick={() => go('inicio')}
          className="flex items-center gap-2.5 group"
          aria-label="La Colorada"
        >
          <span className="font-script text-3xl sm:text-4xl font-extrabold text-crimson-500 leading-none group-hover:scale-105 transition-transform drop-shadow-sm">
            La Colorada
          </span>
          <span className="hidden sm:inline text-[9px] uppercase tracking-[0.25em] text-ink-400 font-bold border-l border-ink-200 pl-2.5 ml-1">
            Pizzas · Empanadas
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                active === l.id
                  ? 'text-crimson-500 bg-crimson-50'
                  : 'text-ink-800 hover:text-crimson-500 hover:bg-crimson-50/60'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-11 h-11 rounded-full bg-ink-800 text-white flex items-center justify-center hover:bg-crimson-500 transition-colors"
            aria-label="Carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-crimson-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white animate-pop">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden w-11 h-11 rounded-full bg-ink-800 text-white flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="h-1 checker-band-sm" />

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="bg-white px-5 pb-6 pt-2 flex flex-col gap-1 shadow-lg">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                active === l.id
                  ? 'text-crimson-500 bg-crimson-50'
                  : 'text-ink-800 hover:bg-crimson-50/60'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
