import React, { useState } from 'react';
import { 
  Star, 
  Eye, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { Product, ProductFinish } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, finish: ProductFinish) => void;
  onDirectOrder: (product: Product, finish: ProductFinish) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onDirectOrder,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const savings = product.originalPrice - product.salePrice;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  return (
    <div 
      className="group relative rounded-2xl bg-gradient-to-b from-[#131722] to-[#0c0f16] border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#090b10]">
        <img 
          src={product.images[currentImageIdx] || product.images[0]} 
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.badge && (
              <span className="px-2.5 py-1 rounded bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                {product.badge}
              </span>
            )}
            {product.stockLeft <= 5 && (
              <span className="px-2 py-0.5 rounded bg-red-950/90 text-red-300 text-[10px] font-bold border border-red-500/30 backdrop-blur-sm">
                Only {product.stockLeft} Left in Stock
              </span>
            )}
          </div>

          <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-semibold text-zinc-300 border border-white/10">
            Pay on Delivery
          </span>
        </div>

        {/* Hover Quick Action - Quick View */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 px-3 rounded-lg bg-black/85 backdrop-blur-md text-white text-xs font-semibold hover:bg-black border border-white/20 hover:border-[#d4af37] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>View Full Specs</span>
          </button>
        </div>

        {/* Image thumbnail indicators if multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            {product.images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIdx(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIdx === idx ? 'bg-[#d4af37] w-4' : 'bg-white/40'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating & Verified Tag */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <div className="flex items-center text-amber-400 gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-zinc-100">{product.rating}</span>
              <span className="text-zinc-500 text-[11px]">({product.reviewsCount} reviews)</span>
            </div>
            <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              5-Yr Warranty
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-cinzel text-base font-bold text-white group-hover:text-[#e5c578] transition-colors cursor-pointer line-clamp-1"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Subtitle / Key Spec */}
          <p className="text-xs text-zinc-400 line-clamp-1 font-light mt-1">
            {product.subtitle}
          </p>

          {/* Color Finish Selector */}
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-zinc-400">Finish:</span>
              <span className="text-[#e5c578] font-medium">{selectedFinish.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {product.finishes.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish)}
                  className={`w-5 h-5 rounded-full border-2 transition-all p-0.5 cursor-pointer relative ${
                    selectedFinish.id === finish.id 
                      ? 'border-[#d4af37] scale-110 shadow-md shadow-[#d4af37]/20' 
                      : 'border-zinc-700 hover:border-zinc-500'
                  }`}
                  title={finish.name}
                >
                  <span 
                    className="block w-full h-full rounded-full" 
                    style={{ backgroundColor: finish.hex }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Order CTAs */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-[#e5c578]">
                {formatPrice(product.salePrice, product.currency)}
              </span>
              <span className="text-xs text-zinc-500 line-through ml-2 font-medium">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
              Save {formatPrice(savings, product.currency)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {/* Quick Pay-on-Delivery Order Button (Primary conversion) */}
            <button
              onClick={() => onDirectOrder(product, selectedFinish)}
              className="col-span-4 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Order on Delivery</span>
            </button>

            {/* Add to Cart button */}
            <button
              onClick={() => onAddToCart(product, selectedFinish)}
              className="col-span-1 p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
