import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  Flame, 
  Clock, 
  Maximize2, 
  Banknote,
  ChevronLeft,
  ChevronRight,
  Play, 
  Pause
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
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const filteredImages = activeCategory === 'all' 
    ? COOKER_IMAGES 
    : COOKER_IMAGES.filter(img => img.category === activeCategory);

  const currentImage = COOKER_IMAGES[activeImageIdx] || COOKER_IMAGES[0];

  // Auto-slide effect every 3.2 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % COOKER_IMAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev + 1) % COOKER_IMAGES.length);
  };

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev - 1 + COOKER_IMAGES.length) % COOKER_IMAGES.length);
  };

  const originalPrice = 250000;
  const salePrice = 170000;
  const savings = originalPrice - salePrice;

  return (
    <section id="overview" className="pt-8 pb-14 bg-white border-b border-zinc-200 relative overflow-hidden text-zinc-900">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Social Proof */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-black font-extrabold uppercase tracking-wider">NOBLESTONE KITCHEN COLLECTION</span>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-800 font-semibold">Smart Flip-Up Glass Cooktop</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-yellow-400 text-black font-black text-[11px] uppercase tracking-wider">
              Nationwide Delivery
            </span>
            <span className="text-zinc-700 text-[11px] font-bold">Pay On Delivery Available</span>
          </div>
        </div>

        {/* Main Grid: Gallery on Left, Product Details & CTAs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Viewport & All 15 Product Images */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Image Viewport with Auto-Slide */}
            <div 
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-zinc-950 border-2 border-yellow-400/40 shadow-xl group"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              <img 
                key={currentImage.id}
                src={currentImage.url} 
                alt={currentImage.title}
                className="w-full h-full object-cover object-center transition-all duration-700 animate-fade-in group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="px-3 py-1 rounded bg-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow-lg">
                  ★ BEST SELLER • 32% OFF
                </span>
                <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-[11px] font-bold text-yellow-300 border border-yellow-400/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping inline-block" />
                  Auto-Sliding • {activeImageIdx + 1} of {COOKER_IMAGES.length}
                </span>
              </div>

              {/* Top Right Controls: Auto-Play toggle & Zoom Trigger */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-2 rounded-xl bg-black/80 hover:bg-black text-yellow-400 border border-yellow-400/30 transition-all cursor-pointer"
                  title={isAutoPlay ? "Pause Auto-Slide" : "Resume Auto-Slide"}
                >
                  {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onOpenImageModal(currentImage)}
                  className="p-2 rounded-xl bg-black/80 hover:bg-black text-white border border-yellow-400/30 transition-all cursor-pointer opacity-80 hover:opacity-100"
                  title="Click to view full image in high-definition"
                >
                  <Maximize2 className="w-4 h-4 text-yellow-400" />
                </button>
              </div>

              {/* Previous Slide Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-yellow-400 text-white hover:text-black border border-yellow-400/40 transition-all cursor-pointer z-10 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Slide Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-yellow-400 text-white hover:text-black border border-yellow-400/40 transition-all cursor-pointer z-10 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-yellow-400/30 text-white z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">
                      {currentImage.badge}
                    </span>
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-white truncate">
                      {currentImage.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onOpenImageModal(currentImage)}
                    className="text-xs text-yellow-400 hover:text-yellow-300 font-bold underline shrink-0 cursor-pointer"
                  >
                    Inspect HD
                  </button>
                </div>
                <p className="text-xs text-zinc-300 font-normal line-clamp-1 mt-0.5">
                  {currentImage.description}
                </p>
              </div>
            </div>

            {/* Quick Angle Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {[
                { id: 'all', label: 'All 15 Angles' },
                { id: 'overview', label: 'Overview' },
                { id: 'components', label: 'Parts Guide' },
                { id: 'cleaning', label: '90° Flip' },
                { id: 'controls', label: 'Controls' },
                { id: 'burners', label: 'Burners' },
                { id: 'lifestyle', label: 'Lifestyle' },
                { id: 'dimensions', label: 'Cutout' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id !== 'all') {
                      const firstMatch = COOKER_IMAGES.findIndex(img => img.category === cat.id);
                      if (firstMatch !== -1) setActiveImageIdx(firstMatch);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-yellow-400 text-black shadow-md font-black'
                      : 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  {cat.label}
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
                        ? 'border-yellow-400 scale-105 shadow-md shadow-yellow-400/30 ring-2 ring-yellow-400/40' 
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
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-xs flex flex-col items-center justify-center">
                <Banknote className="w-5 h-5 text-yellow-500 mb-1" />
                <span className="font-bold text-zinc-900">Pay On Delivery</span>
                <span className="text-[10px] text-zinc-500">Inspect before paying</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-xs flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-yellow-500 mb-1" />
                <span className="font-bold text-zinc-900">2-Year Warranty</span>
                <span className="text-[10px] text-zinc-500">Burner &amp; Glass protection</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-xs flex flex-col items-center justify-center">
                <Truck className="w-5 h-5 text-yellow-500 mb-1" />
                <span className="font-bold text-zinc-900">Fast Nationwide</span>
                <span className="text-[10px] text-zinc-500">All 36 States Covered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Action Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-xs font-bold text-black">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                <span>Next-Gen Kitchen Cooking Technology</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-zinc-950 leading-tight">
                Premium 2-Burner Flip-Up Glass Gas Cooker
              </h1>

              <p className="text-zinc-600 text-xs sm:text-sm font-normal leading-relaxed">
                Double-Burner Crystal Tempered Glass Cooktop with revolutionary 90° Hinged Flip-Up Burners for effortless cleaning, smart digital cooking timer, and real-time battery indicator display.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-yellow-400 shadow-lg space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider block">Special Promotional Price:</span>
                  <div className="text-3xl font-black text-zinc-950">
                    {formatPrice(salePrice)}
                  </div>
                  <div className="text-xs text-zinc-400 line-through mt-0.5">
                    Regular Market Price: {formatPrice(originalPrice)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-black text-black bg-yellow-400 shadow-sm">
                    SAVE {formatPrice(savings)}
                  </span>
                  <p className="text-[11px] text-zinc-700 font-bold mt-1">
                    Free Insured Delivery
                  </p>
                </div>
              </div>

              {/* Scarcity / Stock Alert */}
              <div className="pt-3 border-t border-zinc-200 flex items-center gap-2 text-xs text-zinc-800 bg-amber-50 p-2.5 rounded-lg border border-yellow-300">
                <Clock className="w-4 h-4 text-yellow-600 shrink-0 animate-pulse" />
                <span><strong>High Demand:</strong> Only 6 units remaining in our central dispatch depot for this batch!</span>
              </div>
            </div>

            {/* Core Innovations Bullets */}
            <div className="space-y-2.5 text-xs text-zinc-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <span><strong className="text-zinc-950">90° Hinged Flip-Top Burners:</strong> Lift both burners upward to wipe away burnt oil and soup spills underneath in one second.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <span><strong className="text-zinc-950">Smart Center Digital LED Display:</strong> Displays precise cooking countdown timer (0-99 min) and 4-bar ignition battery status.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <span><strong className="text-zinc-950">Tabletop &amp; Built-in Dual Use:</strong> Use immediately on your kitchen table with 4 rubber feet, or drop into a 650×350mm cutout.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <span><strong className="text-zinc-950">Multi-Jet Vortex High-Heat Burners:</strong> Powerful 5.2kW circular flame delivers even heat distribution for rapid frying and boiling.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <span><strong className="text-zinc-950">Flame-Failure Thermocouple:</strong> Automatically shuts off gas flow within 3 seconds if wind or soup extinguishes the flame.</span>
              </div>
            </div>

            {/* Primary Order Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={onScrollToOrder}
                className="w-full py-4 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-widest shadow-xl shadow-yellow-500/25 transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>ORDER NOW — PAY ON DELIVERY</span>
              </button>

              <p className="text-center text-[11px] text-zinc-500">
                🔒 Zero financial risk. Inspect, test, and verify at your doorstep before making payment!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
