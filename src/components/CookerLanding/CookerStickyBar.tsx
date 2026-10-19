import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

interface CookerStickyBarProps {
  onScrollToOrder: () => void;
}

export const CookerStickyBar: React.FC<CookerStickyBarProps> = ({ onScrollToOrder }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-white/95 backdrop-blur-md border-t border-zinc-200 shadow-xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-zinc-900">
              {formatPrice(170000)}
            </span>
            <span className="text-[10px] text-zinc-400 line-through">
              {formatPrice(250000)}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            Free Delivery • Pay on Delivery
          </span>
        </div>

        <button
          onClick={onScrollToOrder}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>Order Now (POD)</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>
    </div>
  );
};
