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
import { formatPrice } from '../../utils/formatters';

interface BundlePricingCardsProps {
  selectedQuantity: number;
  onSelectQuantity: (qty: number) => void;
  onScrollToOrder: () => void;
}

export const BundlePricingCards: React.FC<BundlePricingCardsProps> = ({
  selectedQuantity,
  onSelectQuantity,
  onScrollToOrder,
}) => {
  const packages = [
    {
      qty: 1,
      badge: 'STANDARD SANCTUARY',
      title: '1x Complete Piano Shower Set',
      subtitle: 'Perfect for upgrading master or guest bathroom ensuite',
      price: 265000,
      originalPrice: 420000,
      savings: 155000,
      bonus: null,
      isPopular: false,
      features: [
        '1x Imperial 5-Key Piano Shower System',
        'Hydroelectric Self-Powered LED Display',
        '5-Year Complete Brass Core Warranty',
        'Free Insured Nationwide Delivery',
        'Pay on Delivery (Inspect First)'
      ]
    },
    {
      qty: 2,
      badge: '★ MOST POPULAR • SAVE EXTRA ₦40,000',
      title: '2x Complete Piano Shower Sets',
      subtitle: 'Ideal for Master Bedroom + Guest / Children Ensuite',
      price: 490000,
      originalPrice: 840000,
      savings: 350000,
      bonus: 'FREE Bonus: 1x Noblestone Waterfall Basin Mixer Tap included!',
      isPopular: true,
      features: [
        '2x Imperial 5-Key Piano Shower Systems',
        'Mix or Match Any Architectural Finishes',
        '1x Free Sculptural Waterfall Basin Tap',
        '5-Year Comprehensive Guarantee on both units',
        'Free Priority Insured Nationwide Delivery',
        'Pay on Delivery (Inspect Both Units Before Paying)'
      ]
    },
    {
      qty: 3,
      badge: 'ARCHITECT & VILLA SPECIAL',
      title: '3x Complete Piano Shower Sets',
      subtitle: 'Complete luxury overhaul for duplexes and luxury apartments',
      price: 710000,
      originalPrice: 1260000,
      savings: 550000,
      bonus: 'FREE Bonus: 2x Noblestone Waterfall Basin Mixers included!',
      isPopular: false,
      features: [
        '3x Imperial 5-Key Piano Shower Systems',
        '2x Free Solid Brass Waterfall Basin Taps',
        'Mix or Match Finishes (Gunmetal, Gold, Black)',
        'Priority Direct Courier Vehicle Dispatch',
        'Dedicated VIP Master Plumber Video Support',
        'Pay on Delivery (Inspect All 3 Units On Arrival)'
      ]
    }
  ];

  const handleChoose = (qty: number) => {
    onSelectQuantity(qty);
    onScrollToOrder();
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-[#090c10] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Exclusive Promotional Packages</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Select Your Noblestone Package
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            All packages include 100% Free Nationwide Delivery and Pay on Delivery. Choose 2 or 3 sets to claim complimentary luxury waterfall basin mixers!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {packages.map((pkg) => {
            const isSelected = selectedQuantity === pkg.qty;
            return (
              <div
                key={pkg.qty}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.isPopular
                    ? 'bg-gradient-to-b from-[#1c2232] via-[#121622] to-[#0d1017] border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/20 scale-105 z-10'
                    : 'bg-[#111520] border border-white/10 hover:border-zinc-500'
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d4af37] text-black text-[11px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  {!pkg.isPopular && (
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-light">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-[#e5c578]">
                      {formatPrice(pkg.price)}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                      <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        Save {formatPrice(pkg.savings)}
                      </span>
                    </div>
                  </div>

                  {/* Free Gift Bonus */}
                  {pkg.bonus && (
                    <div className="p-3 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs text-[#e5c578] font-bold flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{pkg.bonus}</span>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-2.5 pt-2 text-xs text-zinc-300">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Package CTA */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => handleChoose(pkg.qty)}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] text-black shadow-lg shadow-[#d4af37]/30 hover:opacity-95'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10'
                    }`}
                  >
                    <span>Select Package ({pkg.qty} Set{pkg.qty > 1 ? 's' : ''})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center mt-2">
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
