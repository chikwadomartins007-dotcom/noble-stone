import React from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, finishId: string, delta: number) => void;
  onRemoveItem: (productId: string, finishId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.salePrice * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#0c0f16] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[#090b10] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h3 className="font-cinzel text-base font-bold text-white">
                Your Sanctuary Cart ({totalItems})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-emerald-950/60 to-zinc-900 border-b border-emerald-500/20 text-xs flex items-center gap-2 text-emerald-300">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Eligible for <strong>FREE Insured Nationwide Delivery &amp; POD</strong></span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-cinzel text-base font-bold text-white">Your Cart is Empty</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Select any digital piano shower, smart WC, or waterfall sink to begin.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedFinish.id}`}
                  className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-white line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-[#e5c578] font-medium flex items-center gap-1.5 mt-0.5">
                        <span 
                          className="w-2 h-2 rounded-full inline-block" 
                          style={{ backgroundColor: item.selectedFinish.hex }} 
                        />
                        {item.selectedFinish.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-black/40 border border-white/10 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedFinish.id, -1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedFinish.id, 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line price */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#e5c578]">
                          {formatPrice(item.product.salePrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedFinish.id)}
                    className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Section */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#090b10] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Nationwide Courier:</span>
                  <span className="text-emerald-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Payment Terms:</span>
                  <span className="text-[#e5c578] font-medium">Pay on Delivery</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="font-bold text-white text-sm">Total Due on Arrival:</span>
                  <span className="text-lg font-black text-[#e5c578]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Complete Pay-on-Delivery Order</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Empty Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
