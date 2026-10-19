import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { COOKER_PACKAGES } from '../../data/cookerData';
import { formatPrice } from '../../utils/formatters';

interface CookerPricingPackagesProps {
  selectedQuantity: number;
  onSelectQuantity: (qty: number) => void;
  onScrollToOrder: () => void;
}

export const CookerPricingPackages: React.FC<CookerPricingPackagesProps> = ({
  selectedQuantity,
  onSelectQuantity,
  onScrollToOrder,
}) => {
  const handleSelect = (qty: number) => {
    onSelectQuantity(qty);
    onScrollToOrder();
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
            <Award className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>Volume Savings &amp; Direct Factory Offers</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-wide">
            Select Your Cooker Quantity
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Special bulk rates for multi-unit apartments, rental homes, family gifts, and catering businesses. Free Nationwide Delivery &amp; Pay on Delivery for all packages.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
          {COOKER_PACKAGES.map((pkg) => {
            const isSelected = selectedQuantity === pkg.quantity;
            return (
              <div
                key={pkg.quantity}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.isPopular
                    ? 'bg-gradient-to-b from-amber-50/80 via-white to-white border-2 border-[#d4af37] shadow-xl scale-105 z-10'
                    : 'bg-zinc-50 border border-zinc-200 hover:border-zinc-400 shadow-sm'
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  {!pkg.isPopular && (
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-zinc-900">
                      {pkg.label}
                    </h3>
                    <p className="text-xs text-emerald-700 mt-1 font-bold">
                      {pkg.savingsNote}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
                    <div className="text-2xl font-black text-zinc-900">
                      {formatPrice(pkg.totalPrice)}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                      <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 text-[10px]">
                        Save {formatPrice(pkg.savings)}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-2 text-xs text-zinc-700">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>{pkg.quantity}x Flip-Up Double Burner Glass Cooker{pkg.quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>Smart Digital Timer &amp; Battery Display</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>90° Vertical Hinged Flip-Top Burners</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>Free Insured Nationwide Delivery</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>Pay on Delivery (Inspect First)</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-6 mt-6 border-t border-zinc-200">
                  <button
                    onClick={() => handleSelect(pkg.quantity)}
                    className={`w-full py-3 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] text-black shadow-lg shadow-[#d4af37]/25 hover:opacity-95'
                        : 'bg-zinc-900 hover:bg-black text-white'
                    }`}
                  >
                    <span>Select {pkg.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-zinc-500 text-center mt-2 font-medium">
                    Pay on Delivery Available Nationwide
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
