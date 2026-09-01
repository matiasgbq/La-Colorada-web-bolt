import { MapPin, Clock, Phone, Instagram, ArrowRight, Navigation } from 'lucide-react';
import {
  ADDRESS,
  ADDRESS_AREA,
  MAPS_URL,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from '../data';
import { useReveal } from '../hooks';

export function Location() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const cards = [
    {
      icon: MapPin,
      title: 'Dónde estamos',
      lines: [ADDRESS, ADDRESS_AREA],
      action: { label: 'Cómo llegar', href: MAPS_URL, icon: Navigation },
    },
    {
      icon: Clock,
      title: 'Horarios',
      lines: ['Lunes a Domingos', '11:30 a 14:30 · 19:00 a 23:00'],
    },
    {
      icon: Phone,
      title: 'Contacto',
      lines: [`Tel: ${PHONE_DISPLAY}`, `WhatsApp: +54 9 11 5495-5525`],
      action: {
        label: 'Llamar ahora',
        href: `tel:+54${PHONE_DISPLAY.replace('-', '')}`,
        icon: Phone,
      },
    },
  ];

  return (
    <section id="ubicacion" className="py-20 sm:py-28 bg-ink-800 text-white">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-crimson-400 font-bold uppercase tracking-widest text-sm">
            Visitanos
          </span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl tracking-wide">
            Encontranos en La Horqueta
          </h2>
          <p className="mt-4 text-white/70">
            Estamos dentro de la Galería Colorada, Local 15. Pasá a retirar tu
            pedido o hacelo por WhatsApp.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-6 mb-10 ${
            visible ? 'animate-floatUp' : 'opacity-0'
          }`}
        >
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <span className="inline-flex w-12 h-12 rounded-xl bg-crimson-500 items-center justify-center mb-4">
                <c.icon className="w-6 h-6 text-white" />
              </span>
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="text-white/70 text-sm leading-relaxed">
                  {l}
                </p>
              ))}
              {c.action && (
                <a
                  href={c.action.href}
                  target={c.action.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-crimson-400 text-sm font-bold hover:text-crimson-300 transition-colors"
                >
                  {c.action.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl">
          <iframe
            title="Ubicación La Colorada"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              ADDRESS + ' ' + ADDRESS_AREA,
            )}&output=embed`}
            className="w-full h-[360px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold hover:brightness-95 transition"
          >
            <Phone className="w-5 h-5" />
            Pedir por WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 ring-1 ring-white/30 text-white font-bold hover:bg-white/20 transition"
          >
            <Instagram className="w-5 h-5" />
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </section>
  );
}
