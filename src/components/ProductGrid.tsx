import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Droplets, 
  Layers, 
  Flame, 
  RotateCcw, 
  Eye, 
  Award,
  Filter
} from 'lucide-react';
import { Product, ProductCategory, ProductFinish } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, finish: ProductFinish) => void;
  onDirectOrder: (product: Product, finish: ProductFinish) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onDirectOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.finishes.some((f) => f.name.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case 'discount':
        result.sort((a, b) => (b.originalPrice - b.salePrice) - (a.originalPrice - a.salePrice));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#090c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/30 text-xs font-semibold text-[#e5c578]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Noblestone Signature Inventory</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Architectural Sanware &amp; Fittings
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Engineered with solid H59 brass engines, micro-hydro digital displays, and titanium nano coatings. Free delivery &amp; Pay on Delivery across Nigeria.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search showers, sinks, toilets, brass..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-white/10 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="discount">Biggest Discount</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold scale-[1.02]'
                    : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                <span>{cat.name}</span>
                {cat.id !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid List */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onDirectOrder={onDirectOrder}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-zinc-900/40 border border-white/5">
            <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-cinzel text-lg font-bold text-white mb-1">
              No Fixtures Match Your Query
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              We couldn't find any bathroom fixtures matching "{searchQuery}". Try selecting another category or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-4 py-2 rounded-lg bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
