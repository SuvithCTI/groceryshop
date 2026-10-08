import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  X,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  Check,
  Zap,
  Star,
  Tag,
  ChevronRight
} from 'lucide-react';

export const ProductsPage = () => {
  const {
    products,
    categories,
    storeConfig,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    addToCart,
    updateQuantity,
    cart
  } = useStore();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [flashDealsOnly, setFlashDealsOnly] = useState(false);
  const [minRating, setMinRating] = useState(0); // 0 or 4.8
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description && product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesOrigin = product.origin && product.origin.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesOrigin) return false;
      }
      // In-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Organic filter
      if (organicOnly && !product.isOrganic) {
        return false;
      }
      // Flash deals filter
      if (flashDealsOnly && !product.isFlashDeal && !(product.originalPrice > product.price)) {
        return false;
      }
      // Minimum rating filter
      if (minRating > 0 && (product.rating || 0) < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'discount') {
        const discA = a.originalPrice ? (a.originalPrice - a.price) : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) : 0;
        return discB - discA;
      }
      return 0; // default order
    });
  }, [products, selectedCategory, searchQuery, inStockOnly, organicOnly, flashDealsOnly, minRating, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setOrganicOnly(false);
    setFlashDealsOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '' || inStockOnly || organicOnly || flashDealsOnly || minRating > 0;

  return (
    <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">

      {/* 1. Header Banner & Search Bar */}
      <div className="bg-[#ede7df] rounded-3xl p-5 sm:p-8 border border-stone-300/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-stone-300 text-orange-800 text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Farm Direct Catalog • 30-Min Delivery</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
              {selectedCategory === 'all'
                ? 'All Grocery Products'
                : (categories.find(c => c.id === selectedCategory)?.name || 'Products')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> fresh products ready for WhatsApp dispatch
            </p>
          </div>

          {/* Integrated Search Input */}
          <div className="w-full md:w-80 lg:w-96 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vegetables, milk, bread..."
              className="w-full pl-10 pr-9 py-3 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm font-medium border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. Horizontal Category Switcher Bar (Quick Navigation) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all'
            ? products.length
            : products.filter(p => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 shrink-0 border ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/25 scale-102'
                  : 'bg-white hover:bg-orange-50 text-stone-700 border-stone-200 hover:border-orange-200 shadow-xs'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Quick Filter Tags & Controls Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">

        {/* Quick Attribute Filter Pills - Hidden on Mobile Alone */}
        <div className="hidden sm:flex flex-wrap items-center gap-2">

          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              organicOnly
                ? 'bg-orange-600 text-white border-orange-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 border-slate-200'
            }`}
          >
            <span>🌿 100% Organic</span>
            {organicOnly && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setFlashDealsOnly(!flashDealsOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              flashDealsOnly
                ? 'bg-rose-600 text-white border-rose-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200'
            }`}
          >
            <span>⚡ Flash Deals</span>
            {flashDealsOnly && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              inStockOnly
                ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-amber-50 border-slate-200'
            }`}
          >
            <span>📦 In-Stock Only</span>
            {inStockOnly && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              minRating === 4.8
                ? 'bg-stone-900 text-white border-stone-800 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-stone-100 border-slate-200'
            }`}
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>Top Rated (4.8+)</span>
            {minRating === 4.8 && <Check className="w-3 h-3" />}
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 ml-1 px-2 py-1 hover:bg-rose-50 rounded-lg transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}

        </div>

        {/* Sort Dropdown & View Mode Switcher */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 sm:ml-auto">
          <span className="text-xs font-medium text-slate-500 sm:hidden">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
          </span>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-orange-700 shadow-xs' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-orange-700 shadow-xs' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 4. Main Product Listing Layout (Full Width Grid) */}
      <div className="pt-2">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display font-black text-lg text-slate-900">
              No matching grocery items found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try widening your search terms or resetting category selections.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-2xl shadow transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* List View Mode */
          <div className="space-y-3">
            {filteredProducts.map(product => {
              const cartItem = cart.find(item => item.id === product.id);
              const discountPercent = product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 hover:border-orange-300 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row items-center gap-4 group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-slate-100 shrink-0 cursor-pointer group-hover:scale-105 transition"
                    onClick={() => setSelectedProduct(product)}
                  />

                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md">
                        {product.unit || 'Standard'}
                      </span>
                      {product.isOrganic && (
                        <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                          ✨ Pure Organic
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                          -{discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <h4
                      onClick={() => setSelectedProduct(product)}
                      className="font-display font-bold text-sm sm:text-base text-slate-900 hover:text-orange-600 cursor-pointer truncate"
                    >
                      {product.name}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{product.description}</p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-base sm:text-lg font-black text-slate-900 font-display">
                        {storeConfig.currency}{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through block">
                          {storeConfig.currency}{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {product.inStock ? (
                      cartItem ? (
                        <div className="flex items-center bg-orange-600 text-white rounded-xl p-1 shadow-xs">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-6 h-6 rounded-lg hover:bg-orange-700 flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold min-w-[18px] text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-6 h-6 rounded-lg hover:bg-orange-700 flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                        >
                          Add to Cart
                        </button>
                      )
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">Sold Out</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
