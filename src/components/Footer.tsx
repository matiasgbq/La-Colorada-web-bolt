import { Flame, Instagram, MapPin } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, ADDRESS_AREA } from '../data';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-crimson-500 flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </span>
          <div className="leading-tight text-left">
            <p className="font-script text-3xl text-white font-extrabold">
              La Colorada
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-crimson-400">
              Pizzas · Empanadas · Comidas Caseras
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {ADDRESS_AREA}
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Instagram className="w-4 h-4" /> {INSTAGRAM_HANDLE}
          </a>
        </div>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} La Colorada. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
