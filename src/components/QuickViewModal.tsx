import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  PackageCheck, 
  Wrench,
  Droplets,
  Layers,
  Flame,
  Award
} from 'lucide-react';
import { Product, ProductFinish } from '../types';
import { formatPrice } from '../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: ProductFinish) => void;
  onDirectOrder: (product: Product, finish: ProductFinish) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs' | 'boxContents'>('highlights');

  const savings = product.originalPrice - product.salePrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#0c0f16] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between bg-[#080a0e] border-b md:border-b-0 md:border-r border-white/10">
            <div>
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-4">
                <img 
                  src={product.images[activeImageIdx] || product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    5-Year Guarantee
                  </span>
                  <span>Pay on Delivery</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx ? 'border-[#d4af37] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plumber & Installation Note */}
            <div className="mt-6 p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-400 flex items-center gap-3">
              <Wrench className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Standard 1/2" plumbing connection. Straightforward retrofit without breaking existing tiles.</span>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Controls */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#d4af37] font-semibold uppercase tracking-widest text-[10px]">
                  Noblestone Luxury sanware
                </span>
                <div className="flex items-center text-amber-400 gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {product.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Pricing Block */}
              <div className="p-3.5 rounded-xl bg-[#131822] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-[#e5c578]">
                    {formatPrice(product.salePrice, product.currency)}
                  </div>
                  <div className="text-xs text-zinc-500 line-through">
                    Standard Retail: {formatPrice(product.originalPrice, product.currency)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                    Save {formatPrice(savings, product.currency)}
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Free Insured Delivery</p>
                </div>
              </div>

              {/* Color Finish Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-400 font-medium">Select Architectural Finish:</span>
                  <span className="text-[#e5c578] font-bold">{selectedFinish.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinish(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                        selectedFinish.id === f.id
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white font-bold'
                          : 'border-white/10 bg-zinc-900/80 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: f.hex }} />
                      <span>{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Navigation (Highlights / Specs / Box Contents) */}
              <div className="border-b border-white/10 flex gap-4 text-xs font-semibold pt-2">
                <button
                  onClick={() => setActiveTab('highlights')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'highlights' ? 'border-[#d4af37] text-[#e5c578]' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Key Innovations
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'specs' ? 'border-[#d4af37] text-[#e5c578]' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setActiveTab('boxContents')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'boxContents' ? 'border-[#d4af37] text-[#e5c578]' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  In The Box
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-zinc-300 min-h-[140px]">
                {activeTab === 'highlights' && (
                  <ul className="space-y-2">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#d4af37] mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-1.5 divide-y divide-white/5">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="pt-1.5 flex justify-between gap-4">
                        <span className="text-zinc-400">{spec.label}:</span>
                        <span className="text-white font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                    <div className="pt-1.5 flex justify-between gap-4">
                      <span className="text-zinc-400">Dimensions:</span>
                      <span className="text-white font-medium text-right">{product.dimensions}</span>
                    </div>
                    <div className="pt-1.5 flex justify-between gap-4">
                      <span className="text-zinc-400">Material Core:</span>
                      <span className="text-white font-medium text-right">{product.material}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'boxContents' && (
                  <ul className="space-y-2">
                    {product.boxContents.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <PackageCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-5 mt-4 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onDirectOrder(product, selectedFinish);
                  }}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Order on Delivery</span>
                </button>

                <button
                  onClick={() => {
                    onAddToCart(product, selectedFinish);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Direct WhatsApp Consultation */}
              <a
                href={`https://wa.me/2348140008921?text=Hello%20Noblestone%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.title)}%20(${encodeURIComponent(selectedFinish.name)}).%20Please%20share%20more%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat with Product Specialist on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
