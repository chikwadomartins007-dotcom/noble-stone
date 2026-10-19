import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Flame, 
  Clock, 
  Maximize2, 
  MessageCircle, 
  Banknote,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { COOKER_IMAGES, CookerImage } from '../../data/cookerData';
import { formatPrice } from '../../utils/formatters';

interface CookerHeroProps {
  onScrollToOrder: () => void;
  onOpenImageModal: (image: CookerImage) => void;
  hasPlacedOrder?: boolean;
}

export const CookerHero: React.FC<CookerHeroProps> = ({
  onScrollToOrder,
  onOpenImageModal,
  hasPlacedOrder = false,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredImages = activeCategory === 'all' 
    ? COOKER_IMAGES 
    : COOKER_IMAGES.filter(img => img.category === activeCategory);

  const currentImage = COOKER_IMAGES[activeImageIdx] || COOKER_IMAGES[0];

  const originalPrice = 250000;
  const salePrice = 170000;
  const savings = originalPrice - salePrice;

  return (
    <section id="overview" className="pt-8 pb-14 bg-white border-b border-zinc-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-50/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Social Proof */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-[#b8860b] font-bold">NOBLESTONE KITCHEN COLLECTION</span>
            <span>/</span>
            <span className="text-zinc-900 font-medium">Smart Flip-Up Glass Cooktop</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4af37]/15 text-[#946c07] font-bold border border-[#d4af37]/40 text-[11px] uppercase tracking-wider">
              Nationwide Delivery
            </span>
            <span className="text-zinc-600 text-[11px] font-medium">Pay On Delivery Available</span>
          </div>
        </div>

        {/* Main Grid: Gallery on Left, Product Details & CTAs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Viewport & All 15 Product Images */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Image Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-xl group">
              <img 
                src={currentImage.url} 
                alt={currentImage.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded bg-[#d4af37] text-black text-xs font-black uppercase tracking-wider shadow-lg">
                  ★ BEST SELLER • 32% OFF
                </span>
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                  Pay on Delivery Available Nationwide
                </span>
              </div>

              {/* Zoom Trigger Button */}
              <button
                onClick={() => onOpenImageModal(currentImage)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer opacity-80 hover:opacity-100"
                title="Click to view full image in high-definition"
              >
                <Maximize2 className="w-4 h-4 text-[#d4af37]" />
              </button>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white">
                    {currentImage.title}
                  </h4>
                  <span className="text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30 uppercase">
                    {currentImage.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 font-light mt-0.5 line-clamp-2">
                  {currentImage.description}
                </p>
              </div>
            </div>

            {/* Gallery Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {[
                { id: 'all', label: 'All 15 Photos' },
                { id: 'overview', label: 'Cooktop Overview' },
                { id: 'components', label: 'Component Guide' },
                { id: 'cleaning', label: '90° Flip Cleaning' },
                { id: 'controls', label: 'Controls & Timer' },
                { id: 'burners', label: 'Burners & Heat' },
                { id: 'dimensions', label: 'Dimensions' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#d4af37] text-black font-bold shadow'
                      : 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Thumbnails Grid (showing all images in category) */}
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {filteredImages.map((item) => {
                const originalIndex = COOKER_IMAGES.findIndex(img => img.id === item.id);
                const isSelected = activeImageIdx === originalIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveImageIdx(originalIndex)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-[#d4af37] scale-105 shadow-md shadow-[#d4af37]/30 ring-2 ring-[#d4af37]/40' 
                        : 'border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400'
                    }`}
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>

            {/* Trust Points Row */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col items-center justify-center">
                <Banknote className="w-5 h-5 text-[#b8860b] mb-1" />
                <span className="font-bold text-zinc-900">Pay On Delivery</span>
                <span className="text-[10px] text-zinc-500">Inspect before paying</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-zinc-900">2-Year Warranty</span>
                <span className="text-[10px] text-zinc-500">Burner &amp; Glass protection</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col items-center justify-center">
                <Truck className="w-5 h-5 text-[#b8860b] mb-1" />
                <span className="font-bold text-zinc-900">Fast Nationwide</span>
                <span className="text-[10px] text-zinc-500">All 36 States Covered</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Product Narrative & Action Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
                <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Next-Gen Kitchen Cooking Technology</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight">
                Premium 2-Burner Flip-Up Glass Gas Cooker
              </h1>

              <p className="text-zinc-600 text-xs sm:text-sm font-normal leading-relaxed">
                Double-Burner Crystal Tempered Glass Cooktop with revolutionary 90° Hinged Flip-Up Burners for effortless cleaning, smart digital cooking timer, and real-time battery indicator display.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border border-[#d4af37]/50 shadow-md space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider block">Special Promotional Price:</span>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-900">
                    {formatPrice(salePrice)}
                  </div>
                  <div className="text-xs text-zinc-400 line-through mt-0.5">
                    Regular Market Price: {formatPrice(originalPrice)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300">
                    SAVE {formatPrice(savings)}
                  </span>
                  <p className="text-[10px] text-[#946c07] font-bold mt-1">
                    Free Insured Delivery
                  </p>
                </div>
              </div>

              {/* Scarcity / Stock Alert */}
              <div className="pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs text-amber-900 bg-amber-100/60 p-2.5 rounded-lg border border-amber-300">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
                <span><strong>High Demand:</strong> Only 6 units remaining in our Lagos warehouse for this promo batch!</span>
              </div>
            </div>

            {/* Core Innovations Bullets */}
            <div className="space-y-2.5 text-xs text-zinc-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#b8860b] mt-0.5 shrink-0" />
                <span><strong className="text-zinc-900">90° Hinged Flip-Top Burners:</strong> Lift both burners upward to wipe away burnt oil and soup spills underneath in one second.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#b8860b] mt-0.5 shrink-0" />
                <span><strong className="text-zinc-900">Smart Center Digital LED Display:</strong> Displays precise cooking countdown timer (0-99 min) and 4-bar ignition battery status.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#b8860b] mt-0.5 shrink-0" />
                <span><strong className="text-zinc-900">Tabletop &amp; Built-in Dual Use:</strong> Use immediately on your kitchen table with 4 rubber feet, or drop into a 650×350mm cutout.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#b8860b] mt-0.5 shrink-0" />
                <span><strong className="text-zinc-900">Multi-Jet Vortex High-Heat Burners:</strong> Powerful 5.2kW circular flame delivers even heat distribution for rapid frying and boiling.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#b8860b] mt-0.5 shrink-0" />
                <span><strong className="text-zinc-900">Flame-Failure Thermocouple:</strong> Automatically shuts off gas flow within 3 seconds if wind or soup extinguishes the flame.</span>
              </div>
            </div>

            {/* Primary Order Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={onScrollToOrder}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-black text-sm uppercase tracking-widest shadow-xl shadow-[#d4af37]/25 transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>ORDER NOW — PAY ON DELIVERY</span>
              </button>

              <p className="text-center text-[11px] text-zinc-500">
                🔒 Zero financial risk. Inspect, test, and verify at your doorstep before making payment!
              </p>

              {/* Direct WhatsApp Consultation (Shown only after customer places an order) */}
              {hasPlacedOrder && (
                <a
                  href="https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20want%20to%20follow%20up%20on%20my%20order%20for%20the%202-Burner%20Flip-Up%20Glass%20Cooker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Dispatch Desk on WhatsApp (09117446764)</span>
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
