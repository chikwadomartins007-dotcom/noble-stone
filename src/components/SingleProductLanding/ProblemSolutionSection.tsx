import React from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const ProblemSolutionSection: React.FC<{ onScrollToOrder: () => void }> = ({ onScrollToOrder }) => {
  const problems = [
    'Slippery round knobs that are impossible to turn with soapy hands',
    'Sudden burns & thermal shocks whenever someone flushes a toilet in the house',
    'Cheap zinc/plastic mixers that leak, crack, and drip within 6 to 12 months',
    'Cluttered shower stalls with shampoo bottles falling on the floor',
    'No temperature display, forcing you to guess and risk scalding children or guests'
  ];

  const solutions = [
    'One-touch piano keys that click effortlessly even with soapy, wet fingers',
    'French Vernet thermostatic valve cartridge locks temperature at steady 38°C',
    'Solid refined H59 brass manifold tested to withstand 1.6 MPa high water pressure',
    'Generous 400mm tempered glass storage shelf keeps all bath toiletries organized',
    'Patented self-powered hydroelectric LED display shows real-time temperature (°C)'
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#090c10] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
            <Flame className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Why Millions Are Upgrading Their Bathrooms</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Old Frustrating Showers vs. Noblestone Piano Tech
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            See the undeniable difference between conventional market shower mixers and our architect-certified system.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Old Traditional Showers */}
          <div className="p-6 sm:p-8 rounded-2xl bg-red-950/15 border border-red-500/25 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-red-200">
                    Conventional Shower Mixers
                  </h3>
                  <p className="text-[11px] text-red-400/80">Outdated, dangerous, and prone to internal wall leaks</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {problems.map((prob, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/20 text-center text-xs text-red-300">
              ⚠️ Result: Frequent plumber callouts, ruined wall tiles, and frustrating morning routines.
            </div>
          </div>

          {/* Noblestone Digital Piano Shower */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#161c28] to-[#0f131c] border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/15 flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 right-6 bg-[#d4af37] text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider shadow-md">
              ARCHITECTURAL EXCELLENCE
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white">
                    Noblestone Imperial System
                  </h3>
                  <p className="text-[11px] text-[#e5c578]">5-Year Warranty • 100% Solid Brass Engine</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {solutions.map((sol, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{sol}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onScrollToOrder}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8912b] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Upgrade To Noblestone Today (Pay on Delivery)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
