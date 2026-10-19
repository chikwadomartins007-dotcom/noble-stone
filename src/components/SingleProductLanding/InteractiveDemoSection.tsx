import React, { useState } from 'react';
import { 
  Droplets, 
  Sparkles, 
  Layers, 
  Wind, 
  Flame, 
  CheckCircle2, 
  Cpu, 
  Maximize2 
} from 'lucide-react';

export const InteractiveDemoSection: React.FC<{ onScrollToOrder: () => void }> = ({ onScrollToOrder }) => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const keys = [
    {
      id: 0,
      name: 'Rainfall Canopy',
      icon: Droplets,
      badge: 'Air-Injection 320mm',
      title: 'Full-Body Tropical Rain Immersion',
      description: 'Air-injection technology draws surrounding oxygen into the internal water chamber, infusing each water droplet with micro-bubbles. Creates a gentle, expansive rain sheet that wraps your shoulders and back in restorative warmth.',
      features: [
        'Large 320mm x 200mm aerospace rain canopy',
        'Anti-clog liquid silicone nozzles (rub with finger to clear limescale)',
        'Conserves 30% water while increasing effective skin coverage pressure'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Press Piano Key 1'
    },
    {
      id: 1,
      name: 'Cascade Waterfall',
      icon: Wind,
      badge: 'Concealed Lower Spout',
      title: 'Gentle Architectural Waterfall Flow',
      description: 'Hidden beneath the main control manifold, an open-chute aerated waterfall stream pours directly downward. Ideal for filling buckets, washing feet without wetting your hair, or testing bath water temperature.',
      features: [
        'Integrated anti-splash honeycomb aerator',
        'High flow rate fills foot soaks and tubs rapidly',
        'Sleek concealed spout prevents bumped shins and elbows'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Press Piano Key 2'
    },
    {
      id: 2,
      name: '3-Mode Hand Wand',
      icon: Sparkles,
      badge: 'High-Pressure Booster',
      title: 'Pressurized Multi-Spray Handheld Wand',
      description: 'Switch effortlessly between Rain Mode for gentle body cleansing, Pulse Mode for targeted muscle massage, and Power Rinse for rapid shampoo washing. Engineered with laser-perforated micro-nozzles.',
      features: [
        '3 distinctive spray patterns via one-click thumb toggle',
        'Ergonomic lightweight brass-finish wand',
        'Includes 1.5m anti-twist explosion-proof PVC flexible hose'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Press Piano Key 3'
    },
    {
      id: 3,
      name: 'Bidet Spray Gun',
      icon: Flame,
      badge: 'High-Velocity Jet',
      title: 'Concealed High-Pressure Bidet Washer',
      description: 'A powerful utility spray gun with an intense directional jet stream. Cleans bathroom corners, glass shower screens, mops, toilet bowls, and pet washing in seconds with zero backflow.',
      features: [
        'High-density solid brass trigger gun with lock mechanism',
        'Blasts away soap scum and tile grime effortlessly',
        'Flexible coiled anti-tangle hose included'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
      actionLabel: 'Press Piano Key 4'
    }
  ];

  const current = keys[activeKey];

  return (
    <section className="py-16 lg:py-24 bg-[#0c0f16] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
            <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive Multi-Function Simulation</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Test The 4 Mechanical Piano Keys
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Click on any piano key button below to preview how each dedicated water outlet transforms your shower experience.
          </p>
        </div>

        {/* The Piano Key Control Simulator Bar */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-gradient-to-b from-[#181d28] to-[#0e121a] border border-[#d4af37]/40 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Noblestone Control Manifold: Click to activate key
            </span>
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-lg border border-white/10 font-mono text-emerald-400 font-bold">
              <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Hydro LED: 38.5°C | 04:18</span>
            </div>
          </div>

          {/* 4 Interactive Piano Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {keys.map((k) => {
              const Icon = k.icon;
              const isSelected = activeKey === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setActiveKey(k.id)}
                  className={`relative p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#d4af37] via-[#e5c578] to-[#b8912b] text-black border-white shadow-xl shadow-[#d4af37]/30 scale-105 font-bold'
                      : 'bg-[#121620] border-white/10 text-zinc-300 hover:border-zinc-500 hover:bg-[#181d2a]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-black' : 'text-[#d4af37]'}`} />
                    <span className="text-xs uppercase tracking-wider block font-bold">
                      {k.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-black/20 text-black font-semibold' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      Key {k.id + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Key Feature Showcase */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#111520] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Photo */}
            <div className="md:col-span-6 relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10">
              <img 
                src={current.photoUrl} 
                alt={current.title} 
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[#d4af37] text-[10px] font-bold border border-[#d4af37]/30 uppercase">
                Active Outlet: {current.name}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <span className="font-bold text-emerald-400">{current.badge}</span>
              </div>
            </div>

            {/* Content & Details */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-widest">
                  Mechanical Piano Key #{current.id + 1}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {current.title}
                </h3>
              </div>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                {current.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onScrollToOrder}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8912b] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
                >
                  Order This 4-in-1 Piano Shower (Pay on Delivery)
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
