import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Quote, 
  Award, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#090c10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/30 text-xs font-semibold text-[#e5c578]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Verified Sanctuary Transformations</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Installed In Nigeria's Finest Residences
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1 text-sm text-zinc-300">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">4.9 / 5.0 Rating</span>
            <span className="text-zinc-500">• Over 1,200+ Verified Installations Nationwide</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#131722] to-[#0c0f16] border border-white/5 hover:border-[#d4af37]/30 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Review Header: Author & Location */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-[#e5c578] transition-colors">
                      {review.author}
                    </h4>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#d4af37]" />
                      <span>{review.location}</span>
                    </p>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified POD Buyer
                  </span>
                </div>

                {/* Stars & Date */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-zinc-500 text-[11px]">{review.date}</span>
                </div>

                {/* Review Title */}
                <h5 className="font-semibold text-xs text-zinc-200">
                  "{review.title}"
                </h5>

                {/* Comment */}
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Product Tag & Photo Preview */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-3">
                {review.photoUrl && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                    <img 
                      src={review.photoUrl} 
                      alt="Verified installation" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1 text-[11px]">
                  <span className="text-zinc-500 block">Fixture Installed:</span>
                  <span className="text-[#e5c578] font-medium line-clamp-1">
                    {review.productTitle}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#171206] via-[#1d1608] to-[#171206] border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-white">
                Inspect First. Pay On Arrival.
              </h4>
              <p className="text-xs text-zinc-300 font-light">
                Join over 14,000 satisfied Nigerian homeowners. We deliver with insured white-glove transport directly to your building site.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="https://wa.me/2348140008921?text=Hello%20Noblestone%2C%20I%20would%20like%20to%20see%20more%20installation%20videos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#2fe671] transition-colors"
            >
              Request Video Demonstrations
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
