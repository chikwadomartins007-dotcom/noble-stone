import React from 'react';
import { 
  PackageCheck, 
  Wrench, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Layers,
  Cpu,
  Droplets
} from 'lucide-react';

export const AnatomySection: React.FC = () => {
  const parts = [
    {
      num: '01',
      title: '320x200mm Aerospace Rain Canopy',
      desc: 'Air-injection technology blends water with micro-air bubbles to create an expansive tropical rainfall sensation while using 30% less water.',
      icon: Droplets
    },
    {
      num: '02',
      title: 'Self-Powered Micro Hydro Generator',
      desc: 'Internal hydro turbine turns water flow into safe electrical charge for the LED display. Zero batteries to replace, 100% waterproof.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'H59-1 Refined Brass Valve Block',
      desc: 'Cast from heavy refined copper-brass alloy. Withstands 1.6 MPa (16 Bar) pressure spikes from high-pressure booster pumps.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: '4-Key Independent Piano Switches',
      desc: 'Mechanical spring-damped piano keys with Sedal ceramic discs tested over 500,000 presses for butter-smooth tactile engagement.',
      icon: Layers
    },
    {
      num: '05',
      title: '400mm Tempered Glass Storage Shelf',
      desc: 'Sleek, heat-tempered black glass surface offers ample space for body washes, luxury soaps, and haircare bottles.',
      icon: Sparkles
    },
    {
      num: '06',
      title: '850mm - 1250mm Telescopic Riser Rail',
      desc: 'Adjustable height allows tall homeowners and family members to shower comfortably without ducking.',
      icon: Wrench
    }
  ];

  const packageContents = [
    '1x Main H59 Refined Brass Piano Manifold with Hydro LED Display',
    '1x 320mm x 200mm Ultra-Slim Air-Injection Rain Showerhead',
    '1x 3-Function Pressurized Hand Shower Wand',
    '1x Solid Brass High-Pressure Bidet Spray Gun',
    '1x Height-Adjustable 304 Stainless Steel Telescopic Riser Tube',
    '1x 1.5m Anti-Burst PVC Flexible Tangle-Free Shower Hose',
    '1x High-Flex Coiled Bidet Gun Supply Hose',
    '2x Heavy-Duty Solid Brass Eccentric Wall S-Unions & Decorative Flanges',
    'Full Set of High-Grade EPDM Rubber Gasket Seals & Plumber Teflon Tape',
    'Comprehensive Illustrated Installation & Plumber Setup Manual'
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0c0f16] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anatomy Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
            <Wrench className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Architectural Engineering &amp; Anatomy</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Precision Built From Solid Brass Core
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Every component of the Noblestone Imperial Shower is engineered for durability, safety, and acoustic dampening.
          </p>
        </div>

        {/* 6 Anatomy Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {parts.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#131722] to-[#0c0f16] border border-white/5 hover:border-[#d4af37]/40 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-black text-[#d4af37]/60">
                    {p.num}
                  </span>
                </div>

                <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#e5c578] transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Unboxing / Package Manifest */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#151a25] to-[#0d1017] border border-[#d4af37]/30 shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest flex items-center justify-center gap-1.5">
                <PackageCheck className="w-4 h-4" />
                Complete Master Installation Kit
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                What's Inside Your Insured Delivery Crate
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                No extra parts to purchase. Comes pre-packaged with all brass S-unions, seals, and universal 1/2" adapters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
              {packageContents.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-center text-xs text-zinc-300">
              ⚡ <strong>Plumber Guarantee:</strong> Compatible with all standard 150mm center-to-center hot &amp; cold water supply wall points across Nigeria.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
