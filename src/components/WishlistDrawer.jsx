import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setIsCartDrawerOpen,
    setSelectedProduct,
    setActiveTab,
    storeConfig,
    showToast
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    let addedCount = 0;
    wishlist.forEach((item) => {
      if (item.inStock !== false) {
        addToCart(item, 1);
        addedCount++;
      }
    });
    if (addedCount > 0) {
      showToast(`Added ${addedCount} wishlist items to your basket!`, 'success');
      setIsWishlistOpen(false);
      setIsCartDrawerOpen(true);
    } else {
      showToast('Items in your wishlist are currently out of stock.', 'info');
    }
  };

  const totalWishlistValue = wishlist.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in-up">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0" 
        onClick={() => setIsWishlistOpen(false)} 
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-md flex">
        <div className="w-full bg-white shadow-2xl flex flex-col z-10">

          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50/70 via-orange-50/40 to-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shadow-sm">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <span>Saved Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {wishlist.length === 0
                    ? 'No saved items yet'
                    : `${wishlist.length} saved ${wishlist.length === 1 ? 'favourite item' : 'favourite items'}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-9 h-9 rounded-xl hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                aria-label="Close wishlist drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center animate-bounce-soft shadow-inner">
                  <Heart className="w-10 h-10 text-rose-400 fill-rose-100" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Your wishlist is empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                    Tap the heart icon on any product to save it here for quick re-ordering!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActiveTab('products');
                  }}
                  className="mt-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-600/25 transition hover:scale-105 active:scale-95"
                >
                  Explore Fresh Groceries
                </button>
              </div>
            ) : (
              wishlist.map((item) => {
                const discount = item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 0;

                return (
                  <div key={item.id} className="py-3.5 flex items-center gap-3.5 group">
                    {/* Item Thumbnail */}
                    <div 
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsWishlistOpen(false);
                      }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 cursor-pointer shadow-xs group-hover:border-orange-200 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                      {discount > 0 && (
                        <div className="absolute top-1 left-1 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                          {discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <p className="text-[10px] uppercase font-extrabold tracking-wider text-orange-600">
                            {item.category}
                          </p>
                          <h4 
                            onClick={() => {
                              setSelectedProduct(item);
                              setIsWishlistOpen(false);
                            }}
                            className="font-bold text-sm text-slate-900 truncate hover:text-orange-600 cursor-pointer transition"
                            title={item.name}
                          >
                            {item.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition flex-shrink-0"
                          title="Remove from wishlist"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 font-medium">
                          {item.unit}
                        </span>
                        <span className="text-slate-300">•</span>
                        {item.inStock !== false ? (
                          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
                            <CheckCircle2 className="w-3 h-3 mr-0.5" /> In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-bold text-rose-500">
                            <AlertCircle className="w-3 h-3 mr-0.5" /> Out of stock
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-sm text-slate-950">
                            {storeConfig.currency}{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-slate-400 line-through">
                              {storeConfig.currency}{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={item.inStock === false}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm ${
                            item.inStock === false
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-orange-600 hover:bg-orange-700 text-white active:scale-95 shadow-orange-600/20'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Basket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium px-1">
                <span>Total Items: <strong className="text-slate-900">{wishlist.length}</strong></span>
                <span>Est. Value: <strong className="text-slate-900">{storeConfig.currency}{totalWishlistValue.toFixed(2)}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddAllToCart}
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/20 flex items-center justify-center gap-1.5 transition hover:scale-[1.02] active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All to Basket</span>
                </button>

                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActiveTab('products');
                  }}
                  className="w-full py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <span>Explore More</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
