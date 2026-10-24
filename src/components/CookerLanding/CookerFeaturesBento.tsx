import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Maximize2,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CookerImage } from '../../data/cookerData';

interface CookerFeaturesBentoProps {
  onScrollToOrder: () => void;
  onOpenImageModal: (image: CookerImage) => void;
}

const CLEANING_SLIDES = [
  {
    url: '/images/H8aa2ffb08c2d478c9b27763db19e43fc0.jpeg',
    title: 'Flip-top burner for easier cleaning',
    desc: 'Easily solve stubborn kitchen cleaning problems in 1 second',
    badge: '90° HINGED REVOLUTION',
  },
  {
    url: '/images/Hf3fea0e1fc4e46d4ac33b8a45f21785ex.jpg',
    title: 'Ultra-Gloss Mirror Glass Surface',
    desc: 'Wipes spotless with a dry or damp towel in a single stroke',
    badge: '1-SWIPE CLEANING',
  },
  {
    url: '/images/H88c1c4f421be4a6db4d86b97ee793c5d6.jpg',
    title: 'Industrial Heavy-Duty Metal Hinges',
    desc: 'Engineered for over 100,000 continuous lifts with zero sag',
    badge: 'LIFETIME HINGE',
  },
  {
    url: '/images/H098851c272a24bc993e15b3c48011218S.jpg',
    title: 'Sealed Fluid Containment Well',
    desc: 'Prevents overflowing soups and stew from seeping into internal parts',
    badge: 'SPILL BARRIER',
  },
];

export const CookerFeaturesBento: React.FC<CookerFeaturesBentoProps> = ({
  onScrollToOrder,
  onOpenImageModal,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide effect every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CLEANING_SLIDES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % CLEANING_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + CLEANING_SLIDES.length) % CLEANING_SLIDES.length);

  const currentCleaningSlide = CLEANING_SLIDES[activeSlide];

  return (
    <section id="flip-feature" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-xs font-bold text-black">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>Patented Kitchen Engineering</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-wide">
            Designed To Eliminate Kitchen Cleaning Headaches
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Discover why the 90° flip-top burner and intelligent digital timer make this the most sought-after gas hob in modern Nigerian homes.
          </p>
        </div>

        {/* Feature 1: The 90° Flip-Up Burner Showcase with Auto-Slide */}
        <div className="mb-14 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-md p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Auto-Sliding Image Viewport */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-black border border-yellow-400/30 group">
              <img 
                key={currentCleaningSlide.url}
                src={currentCleaningSlide.url} 
                alt={currentCleaningSlide.title} 
                className="w-full h-full object-cover transition-transform duration-700 animate-fade-in group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <span className="px-3 py-1 rounded bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider shadow">
                  {currentCleaningSlide.badge}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] text-yellow-300 font-bold border border-yellow-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping inline-block" />
                  Auto-Sliding • {activeSlide + 1} of {CLEANING_SLIDES.length}
                </span>
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 hover:bg-yellow-400 text-white hover:text-black border border-yellow-400/40 transition-colors z-10 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 hover:bg-yellow-400 text-white hover:text-black border border-yellow-400/40 transition-colors z-10 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-black/85 backdrop-blur-md p-2.5 rounded-lg border border-yellow-400/30 z-10">
                <p className="font-bold text-yellow-400">{currentCleaningSlide.title}</p>
                <p className="text-[11px] text-zinc-300">{currentCleaningSlide.desc}</p>
              </div>

              {/* Progress Dots */}
              <div className="absolute top-3 right-3 flex items-center gap-1 z-10 bg-black/70 px-2 py-1 rounded-full border border-yellow-400/20">
                {CLEANING_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx ? 'bg-yellow-400 w-4' : 'bg-zinc-600'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-black text-black uppercase tracking-widest bg-yellow-400 px-2.5 py-0.5 rounded">
                Zero Scrubbing Required
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-zinc-950">
                Never Struggle Cleaning Under Burners Again
              </h3>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Traditional gas stoves trap spilled soup, palm oil, stew, and burnt sauce underneath fixed burner rings, creating toxic crusts and cockroach magnets. With the Noblestone Flip-Up Burner, you simply tilt the burner 90° upward and wipe the mirror-smooth tempered glass in a single swipe.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-950">Heavy-Duty Metal Hinges:</strong> Tested for over 100,000 smooth flip cycles with zero looseness.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-950">8mm Toughened Crystal Glass:</strong> Thermal shock resistant up to 800°C, scratch-proof, and oil-repellent.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-950">No Loose Parts to Reassemble:</strong> No tedious disassembling of heavy grates or burner caps after every cooking session.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onScrollToOrder}
                  className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-yellow-500/25"
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
            <span className="text-xs font-black text-black uppercase tracking-widest bg-yellow-400 px-2.5 py-0.5 rounded">
              Engineered Precision Anatomy
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-zinc-950">
              Cooker Parts &amp; Component Guide
            </h3>
            <p className="text-xs text-zinc-600 font-normal">
              Detailed technical diagram showing every key component of the Premium 2-Burner Glass Cooker.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-white border border-zinc-200 mb-8 max-w-4xl mx-auto group p-2 shadow-xs">
            <img 
              src="/images/11bb45a3-5549-4fdd-9bc1-7023275b3a13.png" 
              alt="Cooker Parts & Component Diagram" 
              className="w-full h-auto object-contain mx-auto"
            />
          </div>

          {/* Breakdown cards for each component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
              <span className="text-xs font-bold text-zinc-950">Pan Support / Pot Stand</span>
              <p className="text-[11px] text-zinc-600">Strong and stable support for your pots, woks, and frying pans.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
              <span className="text-xs font-bold text-zinc-950">Dual High-Efficiency Burners</span>
              <p className="text-[11px] text-zinc-600">Left and right multi-jet burners engineered for fast, uniform cooking.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
              <span className="text-xs font-bold text-zinc-950">Smart Digital Display</span>
              <p className="text-[11px] text-zinc-600">Shows countdown cooking timer and 4-bar battery level for easy monitoring.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
              <span className="text-xs font-bold text-zinc-950">Non-Slip Feet &amp; Dual Mount</span>
              <p className="text-[11px] text-zinc-600">Keeps cooker stable on tabletop or drops seamlessly into countertop cutouts.</p>
            </div>
          </div>
        </div>

        {/* 3-Column Highlights: Controls + Burner Crown + Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card A: Controls */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200">
              <img 
                src="/images/H6452756b08ba47fea9e256a8e5ff398eo.jpg" 
                alt="Smart Control Interface" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-black uppercase tracking-wider block bg-yellow-400 w-fit px-2 py-0.5 rounded">
                SMART CONTROL INTERFACE
              </span>
              <h4 className="font-cinzel text-base font-bold text-zinc-950">
                Precise Power Levels &amp; Timer
              </h4>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Adjust flame power from gentle simmer to roaring sear. The digital timer lets you set cook times up to 99 minutes so pots never burn dry while you attend to other chores.
              </p>
            </div>
          </div>

          {/* Card B: Burner Cap */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200">
              <img 
                src="/images/Hb703478da96c4d06ac439666db478fb5s.jpg" 
                alt="Burner Cap Heat Distribution" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-black uppercase tracking-wider block bg-yellow-400 w-fit px-2 py-0.5 rounded">
                REVOLUTIONARY BURNER CAP
              </span>
              <h4 className="font-cinzel text-base font-bold text-zinc-950">
                Unmatched Vortex Heat Distribution
              </h4>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Circular multi-ring burner crown with 8 vortex jets delivers pure blue combustion, saving up to 28% gas while boiling water 35% faster than standard single-ring gas stoves.
              </p>
            </div>
          </div>

          {/* Card C: Dimensions */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-200">
              <img 
                src="/images/H137f07cc70424452ada679ac752fcf43l.jpg" 
                alt="Install Dimensions" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-black uppercase tracking-wider block bg-yellow-400 w-fit px-2 py-0.5 rounded">
                VERSATILE INSTALLATION
              </span>
              <h4 className="font-cinzel text-base font-bold text-zinc-950">
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
