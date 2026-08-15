import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  Flame,
  Phone,
  Star,
} from 'lucide-react';
import { IMG, PHONE_TEL } from '../data';
import type { Section } from '../types';

const MENU_FLYERS = [
  {
    src: '/images/WhatsApp_Image_2026-08-10_at_11.06.25_(2).jpeg',
    alt: 'Menú de pizzas y empanadas de La Colorada',
  },
  {
    src: '/images/WhatsApp_Image_2026-08-10_at_11.06.25_(1).jpeg',
    alt: 'Menú de milanesas de La Colorada',
  },
  {
    src: '/images/WhatsApp_Image_2026-08-10_at_11.06.25.jpeg',
    alt: 'Menú de comidas caseras de La Colorada',
  },
];

export function Hero({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [activeFlyer, setActiveFlyer] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveFlyer((current) => (current + 1) % MENU_FLYERS.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  const showPreviousFlyer = () => {
    setActiveFlyer((current) => (current - 1 + MENU_FLYERS.length) % MENU_FLYERS.length);
  };

  const showNextFlyer = () => {
    setActiveFlyer((current) => (current + 1) % MENU_FLYERS.length);
  };
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-ink-800"
    >
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="Pizza de molde La Colorada"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/60 to-ink-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent" />
      </div>

      <div className="absolute top-28 right-12 hidden lg:flex flex-col gap-2 opacity-50 pointer-events-none">
        {[0, 0.5, 1].map((d, i) => (
          <span
            key={i}
            className="block w-2 h-16 rounded-full bg-white/40 blur-md animate-steam"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-500/20 border border-crimson-400/40 text-crimson-200 text-xs font-bold uppercase tracking-widest animate-floatUp"
            >
              <Flame className="w-4 h-4" /> Galería Colorada · La Horqueta
            </span>
            <h1
              className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.92] animate-floatUp"
              style={{ animationDelay: '0.08s' }}
            >
              El verdadero sabor<br />
              de lo <span className="text-crimson-500">casero</span>
            </h1>
            <p
              className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed animate-floatUp"
              style={{ animationDelay: '0.16s' }}
            >
              Desde nuestra clásica pizza de molde hasta las empanadas más
              jugosas de San Isidro. Directo desde la Galería Colorada a tu
              mesa.
            </p>
            <div
              className="mt-9 flex flex-wrap gap-4 animate-floatUp"
              style={{ animationDelay: '0.24s' }}
            >
              <button
                onClick={() => onNavigate('menu')}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-crimson-500 text-white font-bold shadow-xl shadow-crimson-900/30 hover:bg-crimson-600 transition-colors"
              >
                Ver Menú / Hacer Pedido
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white font-bold hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Llamar al Local
              </a>
            </div>
            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80 animate-floatUp"
              style={{ animationDelay: '0.32s' }}
            >
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">
                Los favoritos del barrio de La Horqueta
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Bike className="w-4 h-4 text-crimson-400" />
                Pedidos para retirar y delivery
              </span>
            </div>
          </div>

          <div
            className="animate-floatUp w-full max-w-md mx-auto lg:max-w-none"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative px-3 sm:px-5 lg:px-3">
              <div className="absolute inset-0 checker-band-sm rounded-2xl opacity-80 animate-wiggle" />
              <div className="relative rounded-2xl bg-crimson-700 p-1.5 shadow-2xl ring-4 ring-white/90">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-crimson-700">
                  <img
                    key={MENU_FLYERS[activeFlyer].src}
                    src={MENU_FLYERS[activeFlyer].src}
                    alt={MENU_FLYERS[activeFlyer].alt}
                    className="h-full w-full object-contain animate-fadeIn"
                  />
                  <button
                    type="button"
                    onClick={showPreviousFlyer}
                    aria-label="Ver menú anterior"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900/70 text-white backdrop-blur-sm transition hover:bg-crimson-500"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextFlyer}
                    aria-label="Ver menú siguiente"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900/70 text-white backdrop-blur-sm transition hover:bg-crimson-500"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-ink-900/65 px-3 py-2 backdrop-blur-sm">
                    {MENU_FLYERS.map((flyer, index) => (
                      <button
                        key={flyer.src}
                        type="button"
                        onClick={() => setActiveFlyer(index)}
                        aria-label={`Ver menú ${index + 1}`}
                        aria-current={activeFlyer === index}
                        className={`h-2.5 rounded-full transition-all ${
                          activeFlyer === index
                            ? 'w-7 bg-white'
                            : 'w-2.5 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
