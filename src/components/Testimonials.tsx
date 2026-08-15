import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { REVIEWS } from '../data';
import { useReveal } from '../hooks';

const GOOGLE_G = (
  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black">
    <span className="text-[#4285F4]">G</span>
  </span>
);

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <article className="bg-white rounded-2xl p-6 ring-1 ring-ink-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: r.color }}
        >
          {r.initials}
        </span>
        <div className="min-w-0">
          <p className="font-bold text-ink-800 truncate">{r.name}</p>
          <div className="flex items-center gap-1.5">
            {GOOGLE_G}
            <span className="text-xs text-ink-400">Google Reviews</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-0.5 mb-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-ink-600 leading-relaxed flex-1">"{r.text}"</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-semibold">
        <BadgeCheck className="w-4 h-4" />
        Comprador verificado
      </div>
    </article>
  );
}

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const max = Math.max(0, REVIEWS.length - perView);

  const next = () => setIndex((i) => (i >= max ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? max : i - 1));

  // Build a padded list so we can translate smoothly
  const slides = REVIEWS;

  return (
    <section id="opiniones" className="py-20 sm:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-crimson-500 font-bold uppercase tracking-widest text-sm">
            Opiniones
          </span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl text-ink-800 tracking-wide">
            Lo que dicen nuestros vecinos de San Isidro
          </h2>
        </div>

        <div
          className={`relative ${visible ? 'animate-floatUp' : 'opacity-0'}`}
        >
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white ring-1 ring-ink-200 shadow-md flex items-center justify-center text-ink-700 hover:bg-crimson-500 hover:text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white ring-1 ring-ink-200 shadow-md flex items-center justify-center text-ink-700 hover:bg-crimson-500 hover:text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * (100 / perView)}%)`,
              }}
            >
              {slides.map((r, i) => (
                <div
                  key={i}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <ReviewCard r={r} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-7 bg-crimson-500' : 'w-2 bg-ink-200'
                }`}
                aria-label={`Ir a ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
