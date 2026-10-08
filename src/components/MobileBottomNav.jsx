import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Home,
  ShoppingBasket,
  Heart,
  ShoppingBag,
  MessageCircle
} from 'lucide-react';

export const MobileBottomNav = () => {
  const {
    activeTab,
    setActiveTab,
    wishlist,
    cartItemCount,
    cartTotal,
    storeConfig,
    setIsCartDrawerOpen,
    setIsWishlistOpen
  } = useStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5 transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">

        {/* 1. Home Tab */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-orange-600 font-extrabold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${activeTab === 'home' ? 'bg-orange-50' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* 2. Shop / Products Tab */}
        <button
          onClick={() => handleTabClick('products')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'products'
              ? 'text-orange-600 font-extrabold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${activeTab === 'products' ? 'bg-orange-50' : ''}`}>
            <ShoppingBasket className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">Shop</span>
        </button>

        {/* 3. Wishlist Tab */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-stone-500 hover:text-rose-500 font-medium transition-all"
        >
          <div className="relative p-1 rounded-xl">
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Wishlist</span>
        </button>

        {/* 4. Cart / Basket Tab */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-stone-700 hover:text-orange-600 font-medium transition-all"
        >
          <div className="relative p-1 rounded-xl">
            <ShoppingBag className={`w-5 h-5 ${cartItemCount > 0 ? 'text-orange-600 stroke-[2.5]' : ''}`} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-orange-600 text-white text-[9px] font-black px-1 min-w-[16px] h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold">
            {cartItemCount > 0 ? `${storeConfig.currency}${Math.round(cartTotal)}` : 'Basket'}
          </span>
        </button>

        {/* 5. Direct WhatsApp Chat */}
        <a
          href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent("Hi FreshCart! I'd like to order groceries.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-emerald-600 hover:text-emerald-700 font-medium transition-all"
        >
          <div className="p-1 rounded-xl bg-emerald-50">
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold">WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
