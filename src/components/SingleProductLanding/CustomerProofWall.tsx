import React from 'react';
import { Star, CheckCircle2, MapPin, Sparkles, Award } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';

export const CustomerProofWall: React.FC<{ onScrollToOrder: () => void }> = ({ onScrollToOrder }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#090c10] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Real Installation Showcases</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Installed In Over 1,200+ Luxury Ensuites
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Read unedited feedback from architects, builders, and homeowners across Lagos, Abuja, Port Harcourt, and beyond.
          </p>
        </div>

        {/* Customer Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div 
              key={rev.id}
              className="rounded-2xl p-6 bg-gradient-to-b from-[#131722] to-[#0c0f16] border border-white/5 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Photo */}
                {rev.photoUrl && (
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/10 mb-3">
                    <img src={rev.photoUrl} alt="Customer bathroom" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified POD Buyer
                  </span>
                </div>

                <h4 className="font-semibold text-xs text-white">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-white font-bold block">{rev.author}</span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    {rev.location}
                  </span>
                </div>
                <span className="text-[#d4af37] font-semibold text-[10px]">
                  5-Yr Warranty
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onScrollToOrder}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8912b] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-xl shadow-[#d4af37]/20"
          >
            Order Your Piano Shower Today (Pay on Delivery)
          </button>
        </div>

      </div>
    </section>
  );
};
