import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Sparkles
} from 'lucide-react';
import { COOKER_IMAGES, CookerImage } from '../../data/cookerData';

interface CookerGalleryShowcaseProps {
  onOpenImageModal: (image: CookerImage) => void;
}

export const CookerGalleryShowcase: React.FC<CookerGalleryShowcaseProps> = ({
  onOpenImageModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const filtered = activeFilter === 'all'
    ? COOKER_IMAGES
    : COOKER_IMAGES.filter((img) => img.category === activeFilter);

  // Reset index if filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Auto-slide effect every 2.8 seconds
  useEffect(() => {
    if (!isAutoPlay || filtered.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [isAutoPlay, filtered.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const currentItem = filtered[currentIndex] || filtered[0] || COOKER_IMAGES[0];

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative overflow-hidden text-zinc-900">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-xs font-bold text-black">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>Interactive Auto-Sliding Gallery</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-wide">
            Official Product Photography &amp; Angles
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Every angle of the Premium 2-Burner Flip-Up Cooker automatically cycling in high definition. Click any image to view in full resolution.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          {[
            { id: 'all', label: `All Photos (${COOKER_IMAGES.length})` },
            { id: 'overview', label: 'Overview & Layout' },
            { id: 'components', label: 'Parts Diagram' },
            { id: 'cleaning', label: '90° Flip Cleaning' },
            { id: 'controls', label: 'Controls & Display' },
            { id: 'burners', label: 'Burner Crowns' },
            { id: 'lifestyle', label: 'Kitchen Lifestyle' },
            { id: 'dimensions', label: 'Dimensions & Cutout' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-yellow-400 text-black shadow-md font-black'
                  : 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FEATURE 1: Main Large Auto-Slider Viewport */}
        <div 
          className="relative max-w-4xl mx-auto mb-12 rounded-2xl bg-[#0e1017] border border-yellow-400/40 shadow-2xl overflow-hidden group"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Active Image Box */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
            <img
              key={currentItem.id}
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-contain md:object-cover transition-all duration-700 animate-fade-in group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="px-3 py-1 rounded bg-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow">
                {currentItem.badge}
              </span>
              <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold text-yellow-300 border border-yellow-400/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping inline-block" />
                Auto-Slide • Photo {currentIndex + 1} of {filtered.length}
              </span>
            </div>

            {/* Top Right Controls: Pause/Play & Zoom */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-2 rounded-xl bg-black/80 hover:bg-black text-yellow-400 border border-yellow-400/30 transition-all cursor-pointer"
                title={isAutoPlay ? "Pause Auto-Slide" : "Resume Auto-Slide"}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onOpenImageModal(currentItem)}
                className="p-2 rounded-xl bg-black/80 hover:bg-black text-white border border-yellow-400/30 transition-all cursor-pointer opacity-90 hover:opacity-100"
                title="View full resolution in lightbox"
              >
                <Maximize2 className="w-4 h-4 text-yellow-400" />
              </button>
            </div>

            {/* Left / Right Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-yellow-400 text-white hover:text-black border border-yellow-400/40 opacity-80 hover:opacity-100 transition-all cursor-pointer z-10 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-yellow-400 text-white hover:text-black border border-yellow-400/40 opacity-80 hover:opacity-100 transition-all cursor-pointer z-10 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-yellow-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-zinc-300 font-normal line-clamp-1">
                  {currentItem.description}
                </p>
              </div>

              <button
                onClick={() => onOpenImageModal(currentItem)}
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider shrink-0 cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect HD</span>
              </button>
            </div>
          </div>

          {/* Thumbnail Strip / Slide Progress Indicators */}
          <div className="p-3 bg-[#0a0a0e] border-t border-yellow-400/20 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 mx-auto">
              {filtered.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    currentIndex === idx
                      ? 'border-yellow-400 scale-105 shadow-md shadow-yellow-500/30 w-12 sm:w-16 h-8 sm:h-10'
                      : 'border-zinc-800 opacity-50 hover:opacity-100 w-10 sm:w-12 h-6 sm:h-8'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                >
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                  {currentIndex === idx && (
                    <span className="absolute inset-0 bg-yellow-400/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURE 2: Continuous Infinite Auto-Sliding Marquee Track */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-950 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping inline-block" />
              Continuous Auto-Sliding Photo Stream (All 15 Photos)
            </span>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              Hover to pause • Click to inspect
            </span>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200 p-4 py-6 shadow-xs">
            {/* Left and right fade gradients */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-infinite gap-5">
              {/* Render items twice to ensure a seamless infinite auto-slide loop */}
              {[...COOKER_IMAGES, ...COOKER_IMAGES].map((img, idx) => (
                <div
                  key={`${img.id}-${idx}`}
                  onClick={() => onOpenImageModal(img)}
                  className="w-56 sm:w-64 shrink-0 rounded-xl bg-white border border-zinc-200 hover:border-yellow-400 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-sm group flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-yellow-400 text-black text-[9px] font-black uppercase tracking-wider shadow">
                      {img.badge}
                    </span>
                    <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/80 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity border border-yellow-400/40">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <h5 className="text-[11px] font-bold text-zinc-950 group-hover:text-black transition-colors line-clamp-1">
                      {img.title}
                    </h5>
                    <p className="text-[10px] text-zinc-600 line-clamp-1 mt-0.5">
                      {img.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
