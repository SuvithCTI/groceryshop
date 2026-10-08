import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  Clock,
  MapPin,
  Share2
} from 'lucide-react';

export const ProductModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    storeConfig,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);
  const discountAmount = selectedProduct.originalPrice > selectedProduct.price
    ? (selectedProduct.originalPrice - selectedProduct.price)
    : 0;
  const discountPercent = selectedProduct.originalPrice > selectedProduct.price
    ? Math.round((discountAmount / selectedProduct.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  const handleInstantWhatsApp = () => {
    const text = `Hi ${storeConfig.shopName}! 🥬\nI would like to order *${quantity}x ${selectedProduct.name}* (${selectedProduct.unit}).\nTotal Price: *${storeConfig.currency}${(selectedProduct.price * quantity).toFixed(2)}*.\nPlease confirm availability and delivery time!`;
    const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Check out ${selectedProduct.name} on ${storeConfig.shopName}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  const formatCategory = (cat) => {
    const map = {
      'fruits-veg': 'Fruits & Vegetables',
      'dairy-eggs': 'Dairy & Eggs',
      'bakery': 'Bakery & Breads',
      'grains-staples': 'Rice & Staples',
      'beverages': 'Beverages & Juices',
      'snacks': 'Snacks & Munchies'
    };
    return map[cat] || cat;
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-fade-in-up"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-[#faf7f2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-stone-200/90 flex flex-col md:flex-row max-h-[92vh] sm:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-stone-900 hover:text-white text-stone-700 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-sm border border-stone-200 active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left / Top Showcase: Seamless Product Visual Frame */}
        <div className="md:w-5/12 bg-gradient-to-b from-[#f8f4ee] via-[#f3ebe0] to-[#eae0d2] p-4 sm:p-6 flex flex-col justify-between shrink-0 md:border-r border-stone-200/80">
          
          {/* Top Quick Actions (Category & Action Icons) */}
          <div className="flex items-center justify-between pr-10 sm:pr-0">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-900 text-white shadow-xs">
              {formatCategory(selectedProduct.category)}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-orange-600 flex items-center justify-center shadow-xs border border-stone-200/80 transition hover:scale-105 active:scale-95"
                title="Share product link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500 flex items-center justify-center shadow-xs border border-stone-200/80 transition hover:scale-105 active:scale-95"
                title="Save to Wishlist"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Product Image Frame */}
          <div className="py-2.5 sm:py-4 my-auto flex items-center justify-center">
            <div className="w-36 h-36 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-stone-300/70 bg-white p-2 flex items-center justify-center group">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Micro Trust Indicators Row */}
          <div className="grid grid-cols-3 gap-1 text-center text-[10px] text-stone-600 bg-white/80 backdrop-blur-sm py-1.5 px-2 rounded-xl border border-stone-200/90 shadow-xs">
            <div className="flex flex-col items-center gap-0.5">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              <span className="font-bold leading-tight">30 Min Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 border-x border-stone-200 px-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold leading-tight">100% Organic</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
              <span className="font-bold leading-tight">Free Returns</span>
            </div>
          </div>

        </div>

        {/* Right / Bottom Info Panel: Elevated Card Layer */}
        <div className="md:w-7/12 bg-white rounded-t-[28px] md:rounded-none -mt-3 md:mt-0 p-4 sm:p-7 sm:pr-14 overflow-y-auto flex flex-col justify-between space-y-3.5 sm:space-y-5 shadow-lg md:shadow-none border-t md:border-t-0 border-stone-200/90">
          
          <div className="space-y-3 sm:space-y-3.5">
            
            {/* Top Rating & Verified Row */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-bold text-xs text-stone-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{selectedProduct.rating ? selectedProduct.rating.toFixed(1) : '4.9'}</span>
              </div>
              <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                ({selectedProduct.reviewsCount || 64} verified orders)
              </span>
            </div>

            {/* Product Title & Unit */}
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-stone-900 font-display tracking-tight leading-snug">
                {selectedProduct.name}
              </h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-bold text-orange-800 bg-orange-100/80 border border-orange-300/70 px-2 py-0.5 rounded-md">
                  Pack Size: {selectedProduct.unit}
                </span>
                {selectedProduct.inStock ? (
                  <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    In Stock (Ready to dispatch)
                  </span>
                ) : (
                  <span className="text-[10px] sm:text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-[#f8f5f0] rounded-2xl border border-stone-200/90">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-3xl font-black text-stone-900 font-display">
                  {storeConfig.currency}{selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-xs sm:text-base text-stone-400 line-through font-semibold">
                    {storeConfig.currency}{selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {discountAmount > 0 && (
                <span className="text-[10px] sm:text-xs font-black text-orange-800 bg-orange-100 border border-orange-200 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs">
                  Save {storeConfig.currency}{discountAmount.toFixed(2)} ({discountPercent}% OFF)
                </span>
              )}
            </div>

            {/* Overview / Description */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-stone-400 block mb-0.5 sm:mb-1">
                Description
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {selectedProduct.description}
              </p>
            </div>

            {/* Origin & Shelf Life Cards */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              {selectedProduct.origin && (
                <div className="p-2 sm:p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold tracking-wider">Origin</span>
                    <span className="font-bold text-stone-800 text-[11px] sm:text-xs truncate block">{selectedProduct.origin}</span>
                  </div>
                </div>
              )}
              {selectedProduct.shelfLife && (
                <div className="p-2 sm:p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold tracking-wider">Shelf Life</span>
                    <span className="font-bold text-stone-800 text-[11px] sm:text-xs truncate block">{selectedProduct.shelfLife}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Actions Row: Quantity & Dual Checkout Buttons */}
          <div className="pt-3 border-t border-stone-200 space-y-2.5 sm:space-y-3">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold text-stone-800">
                Quantity:
              </span>
              <div className="flex items-center bg-stone-100 rounded-xl p-0.5 sm:p-1 border border-stone-300/80">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold shadow-xs transition active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <span className="px-3 sm:px-4 text-xs sm:text-sm font-black text-stone-900 min-w-[32px] sm:min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold shadow-xs transition active:scale-95"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

            {/* Two Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className={`py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition duration-200 ${
                  selectedProduct.inStock
                    ? 'bg-stone-900 hover:bg-orange-600 text-white shadow-stone-900/20 active:scale-98'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({storeConfig.currency}{(selectedProduct.price * quantity).toFixed(2)})</span>
              </button>

              <button
                onClick={handleInstantWhatsApp}
                className="py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/25 active:scale-98 transition duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
