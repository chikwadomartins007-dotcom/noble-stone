import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Droplets, 
  Zap,
  Star
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOrderClick: () => void;
}

const RECENT_PURCHASES = [
  { name: 'Barrister Nnamdi E.', city: 'Ikoyi, Lagos', item: 'Imperial 5-Key Shower (Brushed Gold)', time: '4 mins ago' },
  { name: 'Dr. Folashade A.', city: 'Maitama, Abuja', item: 'Sovereign Smart Bidet Toilet', time: '11 mins ago' },
  { name: 'Chief Chukwuma O.', city: 'GRA, Port Harcourt', item: 'Grand 304 Nano Waterfall Sink', time: '19 mins ago' },
  { name: 'Arc. Vivian Balogun', city: 'Lekki Phase 1', item: 'Aurelia Stone Resin Bathtub', time: '32 mins ago' },
  { name: 'Alhaji Haruna S.', city: 'Kano Central', item: 'Imperial 5-Key Shower (Gunmetal)', time: '45 mins ago' },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOrderClick }) => {
  const [currentTicker, setCurrentTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTicker((prev) => (prev + 1) % RECENT_PURCHASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const purchase = RECENT_PURCHASES[currentTicker];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/5 bg-[#090c10]">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#1e3a5f]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Super Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181d26] border border-[#d4af37]/30 text-xs font-medium text-[#e5c578]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="uppercase tracking-widest text-[11px] font-semibold">
                Official Noblestone Architectural Collection
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Architectural <br />
              <span className="gold-gradient-text">Bathroom Sanctuary</span> <br />
              Engineered For Generations.
            </h1>

            {/* Sub-headline */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Experience the evolution of bathing with self-powered hydroelectric digital piano showers, intelligent radar smart WCs, and seamless stone bathtubs. Crafted with 100% solid refined brass cores.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-2 text-xs text-zinc-300 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Zero Battery Hydroelectric LED</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Piano Key One-Touch Controls</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Pay on Delivery (Inspect First)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>100% Solid Refined H59 Brass</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>5-Year Full Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Standard 1/2" Universal Plumbing</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] text-black shadow-xl shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Now (Pay on Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-4 rounded-lg font-semibold text-sm tracking-wider text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-[#d4af37]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse Fixtures</span>
              </button>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 text-center lg:text-left">
              <div>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-white">14,800+</p>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider">Homes Upgraded</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#d4af37]">5-Year</p>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider">Brass Core Warranty</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-white">36 States</p>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider">Nationwide Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card & Visual Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#d4af37]/40 via-white/10 to-transparent shadow-2xl shadow-black/80">
              <div className="relative rounded-[15px] overflow-hidden bg-[#0d1017]">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85" 
                  alt="Noblestone Imperial 5-Key Digital Piano Thermostatic Shower"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid Luxury Feature callouts */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#d4af37] border border-[#d4af37]/40 uppercase tracking-wider">
                    ★ #1 BESTSELLER IN LUXURY BATHROOMS
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                    Pay on Delivery Available Nationwide
                  </span>
                </div>

                {/* Bottom Showcase overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-left">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Featured Masterpiece
                    </span>
                    <div className="flex items-center text-amber-400 text-xs gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-zinc-400 text-[11px] ml-1">(4.9/5)</span>
                    </div>
                  </div>

                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white line-clamp-1">
                    Noblestone Imperial 5-Key Digital Piano Shower
                  </h3>

                  <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/10">
                    <div>
                      <span className="text-lg sm:text-xl font-extrabold text-[#e5c578]">
                        ₦265,000
                      </span>
                      <span className="text-xs text-zinc-400 line-through ml-2">
                        ₦420,000
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                      Save ₦155,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Verified Purchase Notification */}
            <div className="mt-4 p-3 rounded-xl bg-[#10141d] border border-[#d4af37]/30 shadow-xl flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs flex-1">
                <p className="text-zinc-200">
                  <strong className="text-white">{purchase.name}</strong> ({purchase.city}) placed order for:
                </p>
                <p className="text-[#d4af37] font-medium truncate">
                  {purchase.item} • <span className="text-zinc-400 text-[10px]">{purchase.time}</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
