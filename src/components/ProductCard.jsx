import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, Plus, Minus, Heart, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    storeConfig,
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct
  } = useStore();

  const cartItem = cart.find(item => item.id === product.id);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-100/80 hover:border-orange-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5">

      {/* Top Image Container */}
      <div className="relative aspect-[16/11] bg-gradient-to-b from-slate-50 to-slate-100/50 overflow-hidden flex items-center justify-center p-2.5">

        {/* Wishlist & Quick View floating actions */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 transition duration-300 opacity-90 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-rose-500 transition hover:scale-110 active:scale-95"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            title="Quick View Details"
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-orange-600 transition hover:scale-110 active:scale-95 sm:opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-108 transition-transform duration-500 ease-out cursor-pointer"
          onClick={() => setSelectedProduct(product)}
          loading="lazy"
        />

        {/* Stock Status Pill if out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3.5 py-1 bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Unit */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-orange-800 bg-orange-50 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] truncate max-w-[80px] sm:max-w-none">
              {product.unit || 'Standard'}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 font-bold text-slate-700 text-[11px] sm:text-xs">
              <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '4.9'}</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal hidden xs:inline">({product.reviewsCount || 42})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-display font-bold text-xs sm:text-sm md:text-[15px] text-slate-900 group-hover:text-orange-600 transition cursor-pointer line-clamp-2 leading-snug min-h-[32px] sm:min-h-[38px]"
          >
            {product.name}
          </h3>

          {/* Short description / Origin */}
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {product.origin ? `Origin: ${product.origin}` : product.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1 sm:gap-2">
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-baseline flex-wrap gap-x-1 gap-y-0 leading-tight">
              <span className="text-sm sm:text-base md:text-lg font-black text-slate-900 font-display shrink-0 whitespace-nowrap">
                {storeConfig.currency}{product.price.toFixed(0)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through shrink-0 whitespace-nowrap">
                  {storeConfig.currency}{product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
            {product.shelfLife && (
              <span className="text-[9px] sm:text-[10px] text-slate-400 block truncate mt-0.5">
                Fresh: {product.shelfLife}
              </span>
            )}
          </div>

          {/* Add / Quantity Stepper Button */}
          {product.inStock ? (
            cartItem ? (
              <div className="flex items-center bg-orange-600 text-white rounded-xl sm:rounded-2xl p-0.5 sm:p-1 shadow-sm shrink-0">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="w-5 sm:w-7 h-5 sm:h-7 rounded-lg sm:rounded-xl hover:bg-orange-700 flex items-center justify-center transition active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </button>
                <span className="px-1 sm:px-2 text-[11px] sm:text-xs font-black min-w-[14px] sm:min-w-[20px] text-center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="w-5 sm:w-7 h-5 sm:h-7 rounded-lg sm:rounded-xl hover:bg-orange-700 flex items-center justify-center transition active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center gap-0.5 sm:gap-1 bg-orange-50 hover:bg-orange-600 text-orange-800 hover:text-white font-extrabold text-[11px] sm:text-xs px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-orange-200/80 hover:border-transparent transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 shrink-0"
              >
                <Plus className="w-3 sm:w-4 h-3 sm:h-4 stroke-[2.5]" />
                <span>Add</span>
              </button>
            )
          ) : (
            <button
              disabled
              className="text-[10px] sm:text-[11px] font-bold text-slate-400 bg-slate-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl cursor-not-allowed shrink-0"
            >
              Out
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
