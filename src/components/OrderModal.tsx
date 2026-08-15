import { X, MessageCircle, Check } from 'lucide-react';
import type { CartItem } from '../types';
import { formatARS } from '../cart';

export function OrderModal({
  open,
  onClose,
  items,
  total,
  waUrl,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  waUrl: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-pop overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-crimson-500 px-6 py-5 text-white flex items-center justify-between">
          <h3 className="font-display text-2xl tracking-wide">
            Confirmá tu pedido
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-ink-500 mb-4">
            Revisá tu pedido antes de enviarlo por WhatsApp:
          </p>
          <ul className="space-y-2.5 mb-5">
            {items.map((i) => (
              <li
                key={i.dish.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-ink-700">
                  <span className="font-semibold text-ink-500">{i.qty}×</span>{' '}
                  {i.dish.name}
                </span>
                <span className="font-semibold text-ink-800">
                  {formatARS(i.dish.price * i.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-ink-100 pt-4 mb-5">
            <span className="font-bold text-ink-600">Total</span>
            <span className="font-display text-3xl text-crimson-500">
              {formatARS(total)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-400 mb-5">
            <Check className="w-4 h-4 text-green-600" />
            Se abrirá WhatsApp con el mensaje ya armado.
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] text-white font-bold hover:brightness-95 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar por WhatsApp
          </a>
          <button
            onClick={onClose}
            className="w-full mt-2 px-5 py-2 text-sm text-ink-400 hover:text-ink-700 font-medium"
          >
            Seguir armando el pedido
          </button>
        </div>
      </div>
    </div>
  );
}
