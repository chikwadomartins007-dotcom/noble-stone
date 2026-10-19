import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Maximize2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CookerImage } from '../../data/cookerData';

interface CookerFeaturesBentoProps {
  onScrollToOrder: () => void;
  onOpenImageModal: (image: CookerImage) => void;
}

export const CookerFeaturesBento: React.FC<CookerFeaturesBentoProps> = ({
  onScrollToOrder,
  onOpenImageModal,
}) => {
  return (
    <section id="flip-feature" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>Patented Kitchen Engineering</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-wide">
            Designed To Eliminate Kitchen Cleaning Headaches
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Discover why the 90° flip-top burner and intelligent digital timer make this the most sought-after gas hob in modern Nigerian homes.
          </p>
        </div>

        {/* Feature 1: The 90° Flip-Up Burner Showcase */}
        <div className="mb-14 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-md p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Image */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200 group">
              <img 
                src="/images/H8aa2ffb08c2d478c9b27763db19e43fc0.jpeg" 
                alt="Flip-top burner for easier cleaning" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider shadow">
                90° HINGED REVOLUTION
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-black/75 backdrop-blur-md p-2.5 rounded-lg border border-white/10">
                <p className="font-bold text-[#e5c578]">Flip-top burner for easier cleaning</p>
                <p className="text-[11px] text-zinc-300">Easily solve stubborn kitchen cleaning problems in 1 second</p>
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-bold text-[#b8860b] uppercase tracking-widest">
                Zero Scrubbing Required
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-zinc-900">
                Never Struggle Cleaning Under Burners Again
              </h3>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Traditional gas stoves trap spilled soup, palm oil, stew, and burnt sauce underneath fixed burner rings, creating toxic crusts and cockroach magnets. With the Noblestone Flip-Up Burner, you simply tilt the burner 90° upward and wipe the mirror-smooth tempered glass in a single swipe.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-900">Heavy-Duty Metal Hinges:</strong> Tested for over 100,000 smooth flip cycles with zero looseness.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-900">8mm Toughened Crystal Glass:</strong> Thermal shock resistant up to 800°C, scratch-proof, and oil-repellent.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-900">No Loose Parts to Reassemble:</strong> No tedious disassembling of heavy grates or burner caps after every cooking session.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onScrollToOrder}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer shadow-md"
                >
                  Order With Flip-Top Tech (Pay on Delivery)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Feature 2: Component Guide Diagram */}
        <div id="components" className="mb-14 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-md p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-[#b8860b] uppercase tracking-widest">
              Engineered Precision Anatomy
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-zinc-900">
              Cooker Parts &amp; Component Guide
            </h3>
            <p className="text-xs text-zinc-600 font-normal">
              Detailed technical diagram showing every key component of the Premium 2-Burner Glass Cooker.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-white border border-zinc-200 mb-8 max-w-4xl mx-auto group p-2 shadow-inner">
            <img 
              src="/images/11bb45a3-5549-4fdd-9bc1-7023275b3a13.png" 
              alt="Cooker Parts & Component Diagram" 
              className="w-full h-auto object-contain mx-auto"
            />
          </div>

          {/* Breakdown cards for each component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1.5">
              <span className="text-xs font-bold text-zinc-900">Pan Support / Pot Stand</span>
              <p className="text-[11px] text-zinc-600">Strong and stable support for your pots, woks, and frying pans.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1.5">
              <span className="text-xs font-bold text-zinc-900">Dual High-Efficiency Burners</span>
              <p className="text-[11px] text-zinc-600">Left and right multi-jet burners engineered for fast, uniform cooking.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1.5">
              <span className="text-xs font-bold text-zinc-900">Smart Digital Display</span>
              <p className="text-[11px] text-zinc-600">Shows countdown cooking timer and 4-bar battery level for easy monitoring.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1.5">
              <span className="text-xs font-bold text-zinc-900">Non-Slip Feet &amp; Dual Mount</span>
              <p className="text-[11px] text-zinc-600">Keeps cooker stable on tabletop or drops seamlessly into countertop cutouts.</p>
            </div>
          </div>
        </div>

        {/* 3-Column Highlights: Controls + Burner Crown + Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card A: Controls */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200">
              <img 
                src="/images/H6452756b08ba47fea9e256a8e5ff398eo.jpg" 
                alt="Smart Control Interface" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#b8860b] uppercase tracking-wider block">
                SMART CONTROL INTERFACE
              </span>
              <h4 className="font-cinzel text-base font-bold text-zinc-900">
                Precise Power Levels &amp; Timer
              </h4>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Adjust flame power from gentle simmer to roaring sear. The digital timer lets you set cook times up to 99 minutes so pots never burn dry while you attend to other chores.
              </p>
            </div>
          </div>

          {/* Card B: Burner Cap */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200">
              <img 
                src="/images/Hb703478da96c4d06ac439666db478fb5s.jpg" 
                alt="Burner Cap Heat Distribution" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#b8860b] uppercase tracking-wider block">
                REVOLUTIONARY BURNER CAP
              </span>
              <h4 className="font-cinzel text-base font-bold text-zinc-900">
                Unmatched Vortex Heat Distribution
              </h4>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Circular multi-ring burner crown with 8 vortex jets delivers pure blue combustion, saving up to 28% gas while boiling water 35% faster than standard single-ring gas stoves.
              </p>
            </div>
          </div>

          {/* Card C: Dimensions */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200">
              <img 
                src="/images/H137f07cc70424452ada679ac752fcf43l.jpg" 
                alt="Install Dimensions" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#b8860b] uppercase tracking-wider block">
                VERSATILE INSTALLATION
              </span>
              <h4 className="font-cinzel text-base font-bold text-zinc-900">
                750×450mm Surface / 650×350mm Cutout
              </h4>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Fits standard Nigerian kitchen countertop cutouts (630-660mm × 330-360mm). Can also be used directly on tabletops without any carpentry modifications.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
