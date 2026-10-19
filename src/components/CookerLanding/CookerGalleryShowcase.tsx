import React, { useState } from 'react';
import { Maximize2, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { COOKER_IMAGES, CookerImage } from '../../data/cookerData';

interface CookerGalleryShowcaseProps {
  onOpenImageModal: (image: CookerImage) => void;
}

export const CookerGalleryShowcase: React.FC<CookerGalleryShowcaseProps> = ({
  onOpenImageModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? COOKER_IMAGES
    : COOKER_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
            <Eye className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>High-Definition Visual Inspection</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-wide">
            Official Product Photography &amp; Diagrams
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Every angle of the Premium 2-Burner Flip-Up Cooker, including internal burner mechanisms, control interface, and dimensional blueprints.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Photos (15)' },
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
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#d4af37] text-black shadow-md font-bold'
                  : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-100 border border-zinc-200 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenImageModal(item)}
              className="group rounded-2xl bg-white border border-zinc-200 hover:border-[#d4af37] overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/80 text-[#d4af37] text-[10px] font-bold border border-[#d4af37]/30 uppercase tracking-wider">
                  {item.badge}
                </span>

                <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-4 space-y-1">
                <h4 className="font-cinzel text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-600 font-normal line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
