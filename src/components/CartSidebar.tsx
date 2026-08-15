import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart, formatARS } from '../cart';
import { WHATSAPP_NUMBER } from '../data';
import { OrderModal } from './OrderModal';

export function CartSidebar() {
  const { items, total, count, isOpen, setOpen, setQty, remove, clear } = useCart();
  const [showModal, setShowModal] = useState(false);

  const buildOrderText = () => {
    let text = 'Hola La Colorada! Quiero hacer este pedido:%0A%0A';
    items.forEach((i) => {
      text += `• ${i.dish.name} x${i.qty} — ${formatARS(i.dish.price * i.qty)}%0A`;
    });
    text += `%0ATotal: ${formatARS(total)}%0A%0AGracias!`;
    return text;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm z-[60] animate-fadeIn"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-crimson-500" />
            <h2 className="font-display text-2xl tracking-wide text-ink-800">
              Tu Pedido
            </h2>
            {count > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-crimson-50 text-crimson-600 text-xs font-bold">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-600"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <span className="w-16 h-16 rounded-full bg-ink-50 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-ink-300" />
              </span>
              <p className="font-semibold text-ink-700">Tu carrito está vacío</p>
              <p className="text-sm text-ink-400">
                Agregá pizzas, empanadas o comidas caseras del menú.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.dish.id}
                  className="flex gap-3 p-3 rounded-xl ring-1 ring-ink-100 bg-ink-50/40"
                >
                  <img
                    src={i.dish.img}
                    alt={i.dish.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-ink-800 truncate">
                      {i.dish.name}
                    </p>
                    <p className="text-xs text-ink-400">
                      {formatARS(i.dish.price)} c/u
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-full ring-1 ring-ink-200">
                        <button
                          onClick={() => setQty(i.dish.id, i.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-ink-600 hover:text-crimson-500"
                          aria-label="Restar"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">
                          {i.qty}
                        </span>
                        <button
                          onClick={() => setQty(i.dish.id, i.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-ink-600 hover:text-crimson-500"
                          aria-label="Sumar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.dish.id)}
                        className="w-7 h-7 flex items-center justify-center text-ink-300 hover:text-crimson-500"
                        aria-label="Quitar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <span className="font-display text-lg text-crimson-500 whitespace-nowrap">
                    {formatARS(i.dish.price * i.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-ink-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-ink-500 text-sm">Total</span>
              <span className="font-display text-3xl text-ink-800">
                {formatARS(total)}
              </span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] text-white font-bold hover:brightness-95 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Confirmar Pedido por WhatsApp
            </button>
            <button
              onClick={clear}
              className="w-full mt-2 px-5 py-2 text-sm text-ink-400 hover:text-crimson-500 font-medium"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>

      <OrderModal
        open={showModal}
        onClose={() => setShowModal(false)}
        items={items}
        total={total}
        waUrl={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildOrderText()}`}
      />
    </>
  );
}
