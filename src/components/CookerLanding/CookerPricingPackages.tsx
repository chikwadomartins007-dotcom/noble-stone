import React from 'react';
import { 
  Check, 
  ArrowRight,
  Award
} from 'lucide-react';
import { COOKER_PACKAGES } from '../../data/cookerData';
import { formatPrice } from '../../utils/formatters';
import { trackMetaAddToCart } from '../../utils/metaPixel';

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
    const pkg = COOKER_PACKAGES.find(p => p.quantity === qty) || COOKER_PACKAGES[0];
    trackMetaAddToCart({
      quantity: pkg.quantity,
      label: pkg.label,
      price: pkg.totalPrice,
    });
    onSelectQuantity(qty);
    onScrollToOrder();
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-xs font-bold text-black">
            <Award className="w-3.5 h-3.5 text-yellow-500" />
            <span>Volume Savings &amp; Direct Factory Offers</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-wide">
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
                    ? 'bg-white border-2 border-yellow-400 ring-4 ring-yellow-400/20 shadow-2xl scale-105 z-10'
                    : 'bg-zinc-50 border border-zinc-200 hover:border-yellow-400 shadow-sm'
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  {!pkg.isPopular && (
                    <span className="text-[10px] font-black text-black uppercase tracking-widest block bg-yellow-400/30 px-2 py-0.5 rounded w-fit">
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-zinc-950">
                      {pkg.label}
                    </h3>
                    <p className="text-xs text-yellow-600 mt-1 font-bold">
                      {pkg.savingsNote}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-1 shadow-xs">
                    <div className="text-2xl font-black text-zinc-950">
                      {formatPrice(pkg.totalPrice)}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                      <span className="text-black font-black bg-yellow-400 px-2 py-0.5 rounded text-[10px]">
                        Save {formatPrice(pkg.savings)}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-2 text-xs text-zinc-700">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{pkg.quantity}x Flip-Up Double Burner Glass Cooker{pkg.quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>Smart Digital Timer &amp; Battery Display</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>90° Vertical Hinged Flip-Top Burners</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>Free Insured Nationwide Delivery</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>Pay on Delivery (Inspect First)</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-6 mt-6 border-t border-zinc-200">
                  <button
                    onClick={() => handleSelect(pkg.quantity)}
                    className={`w-full py-3 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                      pkg.isPopular
                        ? 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-yellow-500/25'
                        : 'bg-zinc-900 hover:bg-yellow-400 hover:text-black text-white'
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
