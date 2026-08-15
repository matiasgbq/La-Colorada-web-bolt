import { ImageIcon } from 'lucide-react';
import { GALLERY } from '../data';
import { useReveal } from '../hooks';

export function Gallery() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="galeria" className="py-20 sm:py-28 bg-ink-50">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-crimson-500 font-bold uppercase tracking-widest text-sm">
            Galería
          </span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl text-ink-800 tracking-wide">
            Desde Nuestra Cocina
          </h2>
        </div>
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${
            visible ? 'animate-floatUp' : 'opacity-0'
          }`}
        >
          {GALLERY.map((g, i) => (
            <figure
              key={i}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] ring-1 ring-ink-200 shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={g.img}
                alt={g.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-4 h-4 text-crimson-500" />
                </span>
                <span className="text-white text-sm font-semibold drop-shadow">
                  {g.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
