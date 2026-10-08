import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  Phone,
  ShoppingBasket,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const {
    storeConfig,
    cartItemCount,
    cartSubtotal,
    wishlist,
    activeTab,
    setActiveTab,
    setIsCartDrawerOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    products,
    setSelectedProduct
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Filtered preview items for search dropdown
  const searchSuggestions = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search suggestion on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">

          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink min-w-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white p-1 border border-orange-200/80 shadow-xs flex items-center justify-center group-hover:scale-105 transition duration-300 shrink-0 overflow-hidden">
              <img
                src="/images/logo.png"
                alt="FreshCart Market Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent truncate">
                  FreshCart <span className="text-orange-600 font-bold">Market</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden md:block">
                Farm to Doorstep in 30 Mins
              </p>
            </div>
          </div>

          {/* Desktop Search Bar with Live Suggestions */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-lg relative mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search fresh vegetables, organic milk, sourdough, fruits..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl text-sm text-slate-800 placeholder-slate-400 transition outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Suggestion Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in-up">
                <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Product Suggestions</span>
                  <span>{searchSuggestions.length} found</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchSuggestions.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 hover:bg-orange-50/60 cursor-pointer flex items-center gap-3 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-orange-700">{storeConfig.currency}{item.price.toFixed(2)}</p>
                        {item.originalPrice > item.price && (
                          <p className="text-[11px] text-slate-400 line-through">{storeConfig.currency}{item.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => {
                    setActiveTab('products');
                    setIsSearchFocused(false);
                  }}
                  className="p-2.5 bg-orange-50 hover:bg-orange-100 text-center text-xs font-bold text-orange-800 cursor-pointer flex items-center justify-center gap-1.5 transition"
                >
                  <span>View all search results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'home'
                  ? 'bg-orange-50 text-orange-700 font-bold'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'about'
                  ? 'bg-orange-50 text-orange-700 font-bold'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-slate-100/70'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-orange-50 text-orange-700 font-bold'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-slate-100/70'
              }`}
            >
              <ShoppingBasket className="w-4 h-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'contact'
                  ? 'bg-orange-50 text-orange-700 font-bold'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-slate-100/70'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Header Action Buttons (Wishlist & Cart & Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              title="Your Saved Items"
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/50 transition shadow-xs flex items-center justify-center shrink-0"
              aria-label="View Saved Wishlist Items"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-5 px-1 bg-rose-500 text-white text-[10px] sm:text-[11px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative h-10 sm:h-11 px-2.5 sm:px-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
              aria-label="View Shopping Basket"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 sm:-top-2 sm:-right-2 bg-slate-900 text-white text-[10px] sm:text-[11px] font-extrabold px-1 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-orange-100 font-semibold uppercase tracking-wider">Cart</span>
                <span className="text-xs font-black tracking-tight">
                  {storeConfig.currency}{cartSubtotal.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-fade-in-up">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
              activeTab === 'home' ? 'bg-orange-50 text-orange-800' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
            <Sparkles className="w-4 h-4 text-orange-600" />
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
              activeTab === 'about' ? 'bg-orange-50 text-orange-800' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>About Our Store</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
              activeTab === 'products' ? 'bg-orange-50 text-orange-800' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Shop Groceries ({products.length})</span>
            <ShoppingBasket className="w-4 h-4 text-orange-600" />
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
              activeTab === 'contact' ? 'bg-orange-50 text-orange-800' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Contact & Enquiries</span>
            <Phone className="w-4 h-4 text-orange-600" />
          </button>
        </div>
      )}
    </header>
  );
};
