import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Flame, 
  Droplets, 
  Cpu, 
  CheckCircle2, 
  Clock,
  Eye,
  MessageCircle,
  Banknote
} from 'lucide-react';
import { ProductFinish } from '../../types';
import { LUXURY_FINISHES } from '../../data/products';
import { formatPrice } from '../../utils/formatters';

interface ProductHeroProps {
  selectedFinish: ProductFinish;
  onSelectFinish: (finish: ProductFinish) => void;
  onScrollToOrder: () => void;
}

const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    title: 'Noblestone Imperial Piano Shower System Installed',
    caption: 'Luxury ensuite wet-room installation with overhead tropical rainfall'
  },
  {
    url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85',
    title: '4 Mechanical Piano Key Controls & Tempered Glass Shelf',
    caption: 'Effortless one-touch switching with wide shampoo storage tray'
  },
  {
    url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85',
    title: 'Micro-Hydro Turbine Self-Powered LED Temperature Display',
    caption: 'Displays real-time water heat & timer with zero batteries required'
  },
  {
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
    title: '3-Mode Pressurized Hand Wand & Concealed Bidet Sprayer',
    caption: 'High-pressure wash for hair rinsing, bathroom corners, and hygiene'
  }
];

export const ProductHero: React.FC<ProductHeroProps> = ({
  selectedFinish,
  onSelectFinish,
  onScrollToOrder,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const originalPrice = 420000;
  const salePrice = 265000;
  const savings = originalPrice - salePrice;

  return (
    <section className="pt-8 pb-14 bg-[#090c10] border-b border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1f304d]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Breadcrumb & Social Proof Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-[#d4af37] font-semibold">NOBLESTONE ARCHITECTURAL</span>
            <span>/</span>
            <span className="text-white">Digital Piano Thermostatic Series</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">4.9 / 5.0</span>
            <span className="text-zinc-500">(342 Verified Nigerian Homeowners)</span>
          </div>
        </div>

        {/* Main Grid: Gallery on Left, Conversion Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Image Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#0d1017] border border-white/10 shadow-2xl group">
              <img 
                src={GALLERY_IMAGES[activeImageIdx].url} 
                alt={GALLERY_IMAGES[activeImageIdx].title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded bg-[#d4af37] text-black text-xs font-black uppercase tracking-wider shadow-lg">
                  ★ BEST SELLER • 37% OFF
                </span>
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                  Pay on Delivery Available Nationwide
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-left">
                <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white">
                  {GALLERY_IMAGES[activeImageIdx].title}
                </h4>
                <p className="text-[11px] text-zinc-300 font-light mt-0.5">
                  {GALLERY_IMAGES[activeImageIdx].caption}
                </p>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {GALLERY_IMAGES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx 
                      ? 'border-[#d4af37] scale-105 shadow-lg shadow-[#d4af37]/20 ring-2 ring-[#d4af37]/30' 
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-zinc-500'
                  }`}
                >
                  <img src={item.url} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Quick Guarantees Row */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center justify-center">
                <Banknote className="w-5 h-5 text-[#d4af37] mb-1" />
                <span className="font-bold text-white">Pay On Delivery</span>
                <span className="text-[10px] text-zinc-400">Inspect before paying</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="font-bold text-white">5-Year Warranty</span>
                <span className="text-[10px] text-zinc-400">Brass core &amp; valve</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center justify-center">
                <Truck className="w-5 h-5 text-[#d4af37] mb-1" />
                <span className="font-bold text-white">Fast Nationwide</span>
                <span className="text-[10px] text-zinc-400">All 36 States</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Product Narrative & Action Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Next-Gen Thermostatic Sanitaryware</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Noblestone Imperial 5-Key Digital Piano Thermostatic Shower Set
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                Step into 7-star resort luxury every morning. Features an internal micro-hydro turbine that powers the digital temperature LED display without batteries or electrical cords. Controlled by 4 mechanical piano switches and a French Vernet anti-scald thermostatic brass core.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#181d28] to-[#0e121a] border border-[#d4af37]/50 shadow-xl space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider block">Special Promotional Price:</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#e5c578]">
                    {formatPrice(salePrice)}
                  </div>
                  <div className="text-xs text-zinc-400 line-through mt-0.5">
                    Regular Market Price: {formatPrice(originalPrice)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-black text-emerald-400 bg-emerald-950/70 border border-emerald-500/30">
                    SAVE {formatPrice(savings)}
                  </span>
                  <p className="text-[10px] text-[#e5c578] font-semibold mt-1">
                    Free Insured Delivery
                  </p>
                </div>
              </div>

              {/* Scarcity / Stock Alert */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <span><strong>High Demand:</strong> Only 4 sets remaining in our Lagos depot for this promotional batch!</span>
              </div>
            </div>

            {/* Finish Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-bold uppercase tracking-wider">
                  Select Architectural Finish:
                </span>
                <span className="text-[#e5c578] font-bold">
                  {selectedFinish.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  LUXURY_FINISHES.gunmetal,
                  LUXURY_FINISHES.brushedGold,
                  LUXURY_FINISHES.matteBlack,
                  LUXURY_FINISHES.chromeSilver,
                ].map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => onSelectFinish(finish)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      selectedFinish.id === finish.id
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-md'
                        : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-black/40 shrink-0" 
                      style={{ backgroundColor: finish.hex }} 
                    />
                    <div className="text-xs truncate">
                      <p className="font-semibold text-white leading-none">{finish.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Innovations Bullets */}
            <div className="space-y-2 text-xs text-zinc-300 pt-1">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Hydroelectric Micro-Turbine:</strong> 100% self-powered LED screen displays water heat in real-time. Zero batteries, zero wiring.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Mechanical Piano Keys:</strong> One-touch independent switches for Rainfall, Waterfall, Hand Wand, and Bidet Gun.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Solid H59 Brass Engine:</strong> Burst-proof, explosion-proof, and anti-corrosion for over 15+ years of flawless service.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Tempered Glass Storage Shelf:</strong> Broad 40cm shelf for bath wash, body scrubs, and shampoos.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Universal 1/2" Plumbing:</strong> Installs into any standard hot/cold wall inlet without breaking tiles.</span>
              </div>
            </div>

            {/* Main Primary Order Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={onScrollToOrder}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#d4af37]/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>ORDER NOW — PAY ON DELIVERY</span>
              </button>

              <p className="text-center text-[11px] text-zinc-400">
                🔒 No upfront card or bank transfer required. Inspect and verify in your bathroom before paying!
              </p>

              {/* Direct WhatsApp Consultation */}
              <a
                href={`https://wa.me/2348140008921?text=Hello%20Noblestone%20Bathrooms%2C%20I%20am%20interested%20in%20the%20Digital%20Piano%20Shower%20in%20${encodeURIComponent(selectedFinish.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Senior Plumber / Consultant on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
