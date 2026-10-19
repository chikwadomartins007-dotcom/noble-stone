import React, { useState } from 'react';
import { 
  Droplets, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Flame, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';

export const FeatureShowcase: React.FC<{ onOrderClick: () => void }> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'piano' | 'hydro' | 'brass' | 'nano'>('piano');

  const comparisons = {
    piano: {
      title: 'Piano Key Instant Control System',
      subtitle: 'Why architects and master plumbers are ditching rotary turn-knobs',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      noblestoneFeatures: [
        'One-touch responsive mechanical piano keys for independent outlet activation',
        'Run rainfall and handheld simultaneously with balanced water distribution',
        'Tactile haptic click lets you select modes with soapy or wet hands effortlessly',
        'Piano buttons conceal ultra-durable Sedal ceramic disc valves tested to 500,000 presses'
      ],
      traditionalDrawbacks: [
        'Slippery round knobs that are frustrating to turn when hands are soapy',
        'Cannot easily run multiple shower outlets at the same time',
        'Cheap plastic diverters wear loose and leak inside walls after 6-12 months',
        'Unpredictable water jumps between hot and cold during switching'
      ]
    },
    hydro: {
      title: 'Self-Powered Micro-Hydroelectric LED',
      subtitle: 'Zero electricity. Zero batteries. 100% powered by your water stream.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80',
      noblestoneFeatures: [
        'Internal micro-water turbine spins instantly with natural water pressure',
        'Crystal clear digital Celsius display prevents accidental scalds and burns',
        'Displays real-time bath duration timer to track water conservation',
        'Completely sealed waterproof chamber — zero shock hazard and zero battery replacements'
      ],
      traditionalDrawbacks: [
        'Dangerous temperature guesswork, especially for toddlers, elderly, and guests',
        'Battery-operated displays corrode, leak acid, and require frequent wall dismantling',
        'Hardwired electrical displays require dangerous bathroom wiring and high installation fees',
        'Lack of real-time monitoring leads to thermal shock when someone flushes another toilet'
      ]
    },
    brass: {
      title: 'Monolithic Refined H59 Brass Manifold',
      subtitle: 'The heavy-duty heart of every Noblestone fixture.',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
      noblestoneFeatures: [
        'Cast from 59-1 refined virgin copper-brass alloy weighing over 3.8kg in raw metal',
        'Burst pressure tested up to 1.6 MPa (16 Bar) — impervious to water hammer surges',
        'Precision French Vernet thermostatic wax element maintains accurate 38°C core warmth',
        '5-Year unconditional leak-proof and crack-proof replacement guarantee'
      ],
      traditionalDrawbacks: [
        'Constructed from cheap recycled zinc alloy (pot metal) that corrodes internally',
        'Brittle walls crack under high booster pump pressure, causing catastrophic wall leaks',
        'Low-grade brass leaches heavy metals and unpleasant metallic taste into water',
        'No manufacturer warranty or technical service support available'
      ]
    },
    nano: {
      title: 'Bionic 304 Honeycomb Nano Coating',
      subtitle: 'Lotus leaf anti-adhesion technology applied to food-grade stainless steel.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      noblestoneFeatures: [
        'Micro-embossed honeycomb hexagonal matrix lifts pots and utensils above contact surface',
        'Oil, red stew, and curry grease slide off with a single spray of water',
        'Flying Rain sheet waterfall rinses delicate fruits without bruising them',
        'Integrated cup washer rinses deep glassware and blender jugs in 3 seconds'
      ],
      traditionalDrawbacks: [
        'Standard smooth sinks get scratched within days of washing heavy pots and cutlery',
        'Grease stains and water marks bake in, requiring harsh abrasive chemical cleansers',
        'Thin 0.6mm sheet metal that drums loudly and flexes when filled with water',
        'Single center faucet lacks specialized preparation accessories'
      ]
    }
  };

  const current = comparisons[activeTab];

  return (
    <section className="py-16 lg:py-24 bg-[#0a0d14] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/30 text-xs font-semibold text-[#e5c578]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>The Noblestone Architectural Edge</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Engineering Beyond Ordinary Fixtures
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Compare why high-end architects, estate builders, and discerning homeowners choose Noblestone Bathrooms.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          <button
            onClick={() => setActiveTab('piano')}
            className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'piano'
                ? 'bg-gradient-to-b from-[#1c2230] to-[#121622] border-[#d4af37] shadow-lg shadow-[#d4af37]/15'
                : 'bg-zinc-900/50 border-white/5 hover:border-white/20 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Layers className={`w-4 h-4 ${activeTab === 'piano' ? 'text-[#d4af37]' : 'text-zinc-500'}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'piano' ? 'text-white' : 'text-zinc-400'}`}>
                Piano Keys
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Independent flow control</p>
          </button>

          <button
            onClick={() => setActiveTab('hydro')}
            className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'hydro'
                ? 'bg-gradient-to-b from-[#1c2230] to-[#121622] border-[#d4af37] shadow-lg shadow-[#d4af37]/15'
                : 'bg-zinc-900/50 border-white/5 hover:border-white/20 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Cpu className={`w-4 h-4 ${activeTab === 'hydro' ? 'text-[#d4af37]' : 'text-zinc-500'}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'hydro' ? 'text-white' : 'text-zinc-400'}`}>
                Hydro Turbine
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Self-powered LED display</p>
          </button>

          <button
            onClick={() => setActiveTab('brass')}
            className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'brass'
                ? 'bg-gradient-to-b from-[#1c2230] to-[#121622] border-[#d4af37] shadow-lg shadow-[#d4af37]/15'
                : 'bg-zinc-900/50 border-white/5 hover:border-white/20 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className={`w-4 h-4 ${activeTab === 'brass' ? 'text-[#d4af37]' : 'text-zinc-500'}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'brass' ? 'text-white' : 'text-zinc-400'}`}>
                H59 Brass Engine
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Heavy burst-proof core</p>
          </button>

          <button
            onClick={() => setActiveTab('nano')}
            className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'nano'
                ? 'bg-gradient-to-b from-[#1c2230] to-[#121622] border-[#d4af37] shadow-lg shadow-[#d4af37]/15'
                : 'bg-zinc-900/50 border-white/5 hover:border-white/20 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Flame className={`w-4 h-4 ${activeTab === 'nano' ? 'text-[#d4af37]' : 'text-zinc-500'}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'nano' ? 'text-white' : 'text-zinc-400'}`}>
                Honeycomb Nano
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Scratch-proof sink matrix</p>
          </button>
        </div>

        {/* Feature Comparison Display Card */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-[#121622] to-[#0c0f16] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Photo */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
                <span className="font-cinzel font-bold text-[#e5c578]">{current.title}</span>
              </div>
            </div>

            {/* Comparison Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {current.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {current.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Noblestone Column */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Noblestone Standard</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-200">
                    {current.noblestoneFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Market Fixtures Column */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>Ordinary Fixtures</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    {current.traditionalDrawbacks.map((draw, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span className="leading-relaxed">{draw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Callout Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-400 text-center sm:text-left">
                  All Noblestone models come pre-tested under 12-bar hydraulic pressure before shipping.
                </span>

                <button
                  onClick={onOrderClick}
                  className="px-5 py-2.5 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e5c578] transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Order with Pay on Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
