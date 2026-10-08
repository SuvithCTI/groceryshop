import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { TESTIMONIALS } from '../data/storeInfo';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Flame,
  Star,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  ShoppingBag,
  Percent,
  CheckCircle2
} from 'lucide-react';

const EDITORIAL_SHOWCASES = [
  {
    id: 'produce',
    category: 'fruits-veg',
    badge: 'Fresh Fruits & Veg',
    bgClass: 'bg-[#ece5dc] text-stone-900 border-stone-300/80',
    topNavLeft: 'DAILY HARVEST / 5:00 AM',
    brandName: 'FRESHCART MARKET',
    topNavRight: 'ORGANIC / 30 MINS',
    imageTopLeft: '/images/hero-produce-1.jpg',
    imageBottomLeft: '/images/hero-produce-2.jpg',
    imageRight: '/images/hero-produce-3.jpg',
    title: 'FRESHCART PRODUCE',
    est: 'EST. 2024',
    subtitleLines: ['FARM-FRESH PRODUCE FOR —', 'EVERYDAY LIFE.'],
    ctaText: 'SHOP HARVEST',
    hours: 'DAILY: 6:00 AM – 10:00 PM',
    location: 'DIRECT LOCAL FARMS • 30-MIN WHATSAPP DISPATCH'
  },
  {
    id: 'dairy',
    category: 'dairy-eggs',
    badge: 'Dairy, Eggs & Cheese',
    bgClass: 'bg-[#ded8d0] text-stone-900 border-stone-300/80',
    topNavLeft: 'PURE FARMS / A2 MILK',
    brandName: 'PASTURE & RANCH',
    topNavRight: 'BUTTER / EGGS',
    imageTopLeft: '/images/milk.jpg',
    imageBottomLeft: '/images/butter.jpg',
    imageRight: '/images/eggs.jpg',
    title: 'PASTURE & DAIRY',
    est: 'EST. 2024',
    subtitleLines: ['100% GRASS-FED ESSENTIALS FOR —', 'EVERYDAY LIFE.'],
    ctaText: 'DISCOVER DAIRY',
    hours: 'MORNING BATCH: 5:00 AM',
    location: '100% HORMONE-FREE • DIRECT COLD-CHAIN DELIVERY'
  },
  {
    id: 'bakery',
    category: 'bakery',
    badge: 'Bakery & Fresh Breads',
    bgClass: 'bg-[#e2dcd5] text-stone-900 border-stone-300/80',
    topNavLeft: 'MILK BREAD / PUFFS',
    brandName: 'FRESH OVEN BAKES',
    topNavRight: 'BISCUITS & BUNS',
    imageTopLeft: '/images/milk-bread.jpg',
    imageBottomLeft: '/images/masala-bun.jpg',
    imageRight: '/images/veg-puff.jpg',
    title: 'FRESH OVEN BAKES',
    est: 'EST. 2024',
    subtitleLines: ['MILK BREAD, CRISPY PUFFS & BUNS FOR —', 'EVERYDAY LIFE.'],
    ctaText: 'EXPLORE BAKERY',
    hours: 'BAKED FRESH: 5:00 AM',
    location: 'WARM WOOD-FIRED OVENS • FRESH DAILY'
  },
  {
    id: 'staples',
    category: 'grains-staples',
    badge: 'Rice, Pulses & Staples',
    bgClass: 'bg-[#e7e1d8] text-stone-900 border-stone-300/80',
    topNavLeft: 'BASMATI / SONA MASOORI',
    brandName: 'RICE & PULSES',
    topNavRight: 'TOOR & CHANA DAL',
    imageTopLeft: '/images/basmati-rice.jpg',
    imageBottomLeft: '/images/toor-dal.webp',
    imageRight: '/images/chana-dal.webp',
    title: 'HERITAGE RICE & DALS',
    est: 'EST. 2024',
    subtitleLines: ['AROMATIC RICE & TRADITIONAL DALS FOR —', 'EVERYDAY LIFE.'],
    ctaText: 'BROWSE STAPLES',
    hours: 'MILL FRESH: 6:00 AM',
    location: '100% PURE UNPOLISHED • UNADULTERATED'
  },
  {
    id: 'beverages',
    category: 'beverages',
    badge: 'Beverages & Cold Juices',
    bgClass: 'bg-[#ded7ce] text-stone-900 border-stone-300/80',
    topNavLeft: 'MANGO LASSI / JUICES',
    brandName: 'FRESH JUICE BAR',
    topNavRight: '100% BLENDED FRESH',
    imageTopLeft: '/images/mango-lassi.jpg',
    imageBottomLeft: '/images/pineapple-juice.jpg',
    imageRight: '/images/watermelon-juice.jpg',
    title: 'FRESH JUICE BOTANICALS',
    est: 'EST. 2024',
    subtitleLines: ['MANGO LASSI & CHILLED JUICES FOR —', 'EVERYDAY LIFE.'],
    ctaText: 'DISCOVER DRINKS',
    hours: 'BLENDED FRESH: 5:30 AM',
    location: '100% NATURAL • ZERO PRESERVATIVES'
  },
  {
    id: 'snacks',
    category: 'snacks',
    badge: 'Snacks & Munchies',
    bgClass: 'bg-[#e5dfd6] text-stone-900 border-stone-300/80',
    topNavLeft: 'SLOW-ROASTED / ARTISAN',
    brandName: 'PANTRY MUNCHIES',
    topNavRight: 'ROASTED NUTS & CRISPS',
    imageTopLeft: '/images/almonds.jpg',
    imageBottomLeft: '/images/root-crisps.jpg',
    imageRight: '/images/chocolate.jpg',
    title: 'HEALTHY MUNCHIES',
    est: 'EST. 2024',
    subtitleLines: ['GUILT-FREE CLEAN SNACKS FOR —', 'EVERYDAY LIFE.'],
    ctaText: 'EXPLORE SNACKS',
    hours: 'ROASTED FRESH WEEKLY',
    location: 'GLUTEN FREE • ZERO PALM OIL • FAIRTRADE'
  }
];

export const HomePage = () => {
  const {
    products,
    categories,
    storeConfig,
    setActiveTab,
    setSelectedCategory,
    setSelectedProduct,
    setIsCartDrawerOpen
  } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 19 });

  // Auto rotate hero slides every 5.5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % EDITORIAL_SHOWCASES.length);
    }, 5500);
    return () => clearInterval(slideTimer);
  }, []);

  // Auto rotate reviews on mobile every 4 seconds
  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(reviewTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDeals = products.filter(p => p.isFlashDeal || (p.originalPrice > p.price)).slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);

  const prevSlideIndex = (activeSlide - 1 + EDITORIAL_SHOWCASES.length) % EDITORIAL_SHOWCASES.length;
  const nextSlideIndex = (activeSlide + 1) % EDITORIAL_SHOWCASES.length;

  const currentShowcase = EDITORIAL_SHOWCASES[activeSlide];
  const prevShowcase = EDITORIAL_SHOWCASES[prevSlideIndex];
  const nextShowcase = EDITORIAL_SHOWCASES[nextSlideIndex];

  const renderEditorialCard = (item, isCenter = false) => {
    return (
      <div
        className={`w-full max-w-[840px] rounded-[24px] sm:rounded-[32px] p-3.5 sm:p-5 md:p-6 shadow-2xl border transition-all duration-500 select-none ${item.bgClass}`}
      >
        {/* Top Micro Navigation Header */}
        <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] pb-2.5 sm:pb-3.5 border-b border-stone-400/30 text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
            <span>{item.topNavLeft}</span>
          </div>
          <div className="font-extrabold tracking-[0.25em] text-center px-2">
            {item.brandName}
          </div>
          <div className="flex items-center gap-1">
            <span>{item.topNavRight}</span>
          </div>
        </div>

        {/* Main Editorial Grid Body */}
        <div className="grid grid-cols-12 gap-3 sm:gap-5 items-center my-3.5 sm:my-4">

          {/* Left Column: 2 Staggered Imagery Frames */}
          <div className="col-span-3 sm:col-span-3 space-y-2.5 sm:space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md bg-stone-900/10 group">
              <img
                src={item.imageTopLeft}
                alt="Harvest produce"
                onError={(e) => { e.currentTarget.src = '/images/hero-produce-1.jpg'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-stone-900/10 group">
              <img
                src={item.imageBottomLeft}
                alt="Farm details"
                onError={(e) => { e.currentTarget.src = '/images/hero-produce-2.jpg'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Center Column: Editorial Typography & Action */}
          <div className="col-span-6 sm:col-span-6 px-1 sm:px-3 text-center space-y-2 sm:space-y-3">
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-orange-700">
              {item.title}
            </div>

            <div className="italic font-serif text-xs sm:text-sm text-stone-500">
              {item.est}
            </div>

            <h2 className="font-display font-black text-sm sm:text-xl md:text-2xl lg:text-[25px] leading-tight tracking-tight uppercase text-stone-900">
              {item.subtitleLines[0]} <br />
              {item.subtitleLines[1]}
            </h2>

            <div className="pt-1 sm:pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(item.category);
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md bg-stone-900 text-white hover:bg-orange-600 hover:text-white"
              >
                <span>{item.ctaText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Portrait Atmosphere Imagery */}
          <div className="col-span-3 sm:col-span-3">
            <div className="aspect-[3/4.2] rounded-2xl overflow-hidden shadow-lg bg-stone-900/10 group">
              <img
                src={item.imageRight}
                alt="Atmospheric harvest"
                onError={(e) => { e.currentTarget.src = '/images/hero-produce-3.jpg'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[10px] font-bold tracking-wider pt-2.5 sm:pt-3.5 border-t border-stone-400/30 text-stone-600 gap-1.5">
          <div>{item.hours}</div>
          <div className="text-center">{item.location}</div>
        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-10 pb-16">

      {/* 1. EDITORIAL 3D SHOWCASE HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0c] via-[#121216] to-[#0a0a0c] pt-2 sm:pt-4 pb-8 sm:pb-12 border-b border-stone-800/80">

        {/* Ambient Warm Spotlight Behind Canvas */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[350px] bg-orange-600/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-6 left-1/4 w-[350px] h-[200px] bg-amber-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[98%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 relative z-10">

          {/* Top Carousel Navigation Arrows */}
          <div className="flex items-center justify-between mb-2 sm:mb-3 px-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-stone-400">
                FreshCart Curated Collections
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveSlide(prev => (prev - 1 + EDITORIAL_SHOWCASES.length) % EDITORIAL_SHOWCASES.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-600 text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition active:scale-95"
                aria-label="Previous Showcase"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveSlide(prev => (prev + 1) % EDITORIAL_SHOWCASES.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-600 text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition active:scale-95"
                aria-label="Next Showcase"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3D Perspective Stage */}
          <div className="perspective-stage relative min-h-[300px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center overflow-visible">

            {/* Left Angled Card (Previous Slide Preview) */}
            <div
              onClick={() => setActiveSlide(prevSlideIndex)}
              className="hidden lg:block absolute left-0 w-full max-w-[720px] showcase-card showcase-card-left"
            >
              {renderEditorialCard(prevShowcase, false)}
            </div>

            {/* Center Focal Card (Active Slide) */}
            <div className="relative w-full max-w-[840px] showcase-card showcase-card-center z-30">
              {renderEditorialCard(currentShowcase, true)}
            </div>

            {/* Right Angled Card (Next Slide Preview) */}
            <div
              onClick={() => setActiveSlide(nextSlideIndex)}
              className="hidden lg:block absolute right-0 w-full max-w-[720px] showcase-card showcase-card-right"
            >
              {renderEditorialCard(nextShowcase, false)}
            </div>

          </div>

          {/* Bottom Indicators & Subtitle Section */}
          <div className="mt-5 sm:mt-7 text-center max-w-3xl mx-auto space-y-4">

            {/* 6 Category Interactive Selector Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {EDITORIAL_SHOWCASES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                    activeSlide === idx
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/30 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {item.badge}
                </button>
              ))}
            </div>

            {/* Editorial Subtitle statement matching Squarespace reference layout */}
            <p className="text-stone-300 text-sm sm:text-base font-medium tracking-wide">
              Join thousands of healthy families who get 100% farm-fresh groceries delivered on WhatsApp.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Fresh Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20FreshCart!%20I%20want%20to%20place%20a%20grocery%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 backdrop-blur-md hover:scale-105 active:scale-95 transition"
              >
                <MessageCircle className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Trust Micro Indicators */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>30-Min Instant Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>100% Farm Organic Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-orange-400" />
                <span>Direct Harvest Prices</span>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* 3. FLASH DEALS & LIMITED-TIME DISCOUNTS */}
      <section className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#282422] via-[#322822] to-[#22201e] rounded-3xl p-4 sm:p-6 md:p-7 text-white shadow-xl border border-orange-400/20 relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Flash Deals Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-white/10 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>Today's Flash Deals</span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white mt-0.5">
                Save Big on Daily Harvests
              </h2>
              <p className="text-xs sm:text-sm text-orange-200/80 mt-0.5">
                Special discounted prices valid for today's orders only!
              </p>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-orange-200">Ends In:</span>
              <div className="flex items-center gap-1.5 font-mono font-black text-sm text-white">
                <span className="bg-orange-600 px-2 py-0.5 rounded-lg">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-orange-600 px-2 py-0.5 rounded-lg">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-orange-600 px-2 py-0.5 rounded-lg">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Flash Deals Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 pt-4 sm:pt-5 relative z-10">
            {flashDeals.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#ede7df] rounded-3xl p-4 sm:p-10 border border-stone-300/70 shadow-sm">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[11px] font-black text-orange-800 uppercase tracking-widest bg-white/80 px-3.5 py-1 rounded-full border border-stone-300 shadow-xs inline-block">
              Customer Favorites
            </span>
            <h2 className="font-display font-black text-xl sm:text-3xl text-stone-900 mt-2">
              Most Popular Groceries This Week
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Hand-picked customer bestsellers delivered fresh every single day
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {featuredProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Bottom Action Button */}
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-extrabold text-sm inline-flex items-center gap-2 shadow-lg shadow-orange-600/25 transition hover:scale-105 active:scale-95"
            >
              <span>Explore All {products.length} Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. HOW WHATSAPP ORDERING WORKS (Step-by-step) */}
      <section className="bg-gradient-to-r from-orange-100/70 via-amber-50/90 to-rose-100/70 border-y border-orange-200/80 py-8 sm:py-10">
        <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-[11px] font-black text-orange-800 uppercase tracking-widest bg-white/90 px-3.5 py-1 rounded-full border border-orange-200 shadow-xs inline-block">
              Simple 3-Step Process
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1.5">
              How WhatsApp Grocery Ordering Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              No complex app registrations or passwords. Just simple, friendly conversational shopping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">

            {/* Step 1 - Soft Tangerine / Orange Tint */}
            <div className="bg-gradient-to-br from-orange-100/95 via-orange-50/80 to-amber-100/70 p-5 sm:p-6 rounded-3xl border-2 border-orange-200/90 shadow-md hover:shadow-xl hover:border-orange-300 hover:-translate-y-1.5 transition duration-300 relative flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-display font-black text-xl flex items-center justify-center mb-3.5 shadow-lg shadow-orange-600/30 group-hover:scale-110 transition">
                1
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-slate-900 mb-1.5">
                Browse & Add to Cart
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Choose your farm-fresh vegetables, dairy, bakery loaves and snacks from our full live catalog.
              </p>
            </div>

            {/* Step 2 - Soft Amber / Honey Gold Tint */}
            <div className="bg-gradient-to-br from-amber-100/95 via-amber-50/80 to-orange-100/70 p-5 sm:p-6 rounded-3xl border-2 border-amber-200/90 shadow-md hover:shadow-xl hover:border-amber-300 hover:-translate-y-1.5 transition duration-300 relative flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white font-display font-black text-xl flex items-center justify-center mb-3.5 shadow-lg shadow-amber-600/30 group-hover:scale-110 transition">
                2
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-slate-900 mb-1.5">
                1-Click WhatsApp Checkout
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Click "Order via WhatsApp". Enter your address and a formatted list is automatically generated for you.
              </p>
            </div>

            {/* Step 3 - Soft Coral Rose Tint */}
            <div className="bg-gradient-to-br from-rose-100/95 via-rose-50/80 to-orange-100/70 p-5 sm:p-6 rounded-3xl border-2 border-rose-200/90 shadow-md hover:shadow-xl hover:border-rose-300 hover:-translate-y-1.5 transition duration-300 relative flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white font-display font-black text-xl flex items-center justify-center mb-3.5 shadow-lg shadow-rose-600/30 group-hover:scale-110 transition">
                3
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-slate-900 mb-1.5">
                Doorstep Delivery in 30 Mins
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Our shop confirms instantly on WhatsApp and your order is packed and delivered fresh to your door!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. REALTIME CUSTOMER REVIEWS */}
      <section className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#f6f0e8] via-[#fbf7f1] to-[#f2eae0] rounded-3xl p-6 sm:p-10 border border-stone-300/80 shadow-sm relative overflow-hidden">
          
          {/* Subtle warm ambient glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-stone-300/80 text-orange-800 text-[11px] font-black uppercase tracking-wider mb-2 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Live Verified Feedback</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-stone-900 mt-1">
              Realtime Customer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Recent verified WhatsApp grocery deliveries from customers in your area
            </p>
          </div>

          {/* Mobile View: 1 Col 1 Row Auto-Moving Reviews Carousel */}
          <div className="md:hidden relative z-10">
            <div className="relative overflow-hidden">
              {(() => {
                const t = TESTIMONIALS[activeReviewIndex];
                return (
                  <div
                    key={t.id}
                    className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm transition-all duration-500 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      {/* Rating Stars & Timestamp */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200/70 px-2 py-0.5 rounded-full">
                          {t.timeAgo}
                        </span>
                      </div>

                      {/* Review Comment */}
                      <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal not-italic">
                        {t.comment}
                      </p>

                      {/* Ordered Item Tag */}
                      {t.orderedItem && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          <span className="font-semibold text-slate-700">Ordered:</span>
                          <span className="truncate">{t.orderedItem}</span>
                        </div>
                      )}
                    </div>

                    {/* Customer Identity & Prev/Next Arrows */}
                    <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-2xl ${t.badgeBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm font-sans tracking-wide`}>
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{t.name}</h4>
                            <span className="inline-flex items-center text-[10px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200 shrink-0">
                              Verified
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{t.location}</p>
                        </div>
                      </div>

                      {/* Manual Next / Prev Buttons */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={() => setActiveReviewIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 active:scale-95 transition"
                          aria-label="Previous review"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveReviewIndex(prev => (prev + 1) % TESTIMONIALS.length)}
                          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 active:scale-95 transition"
                          aria-label="Next review"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeReviewIndex === idx ? 'w-6 bg-orange-600' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop View: 3-Column Reviews Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Timestamp */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200/70 px-2 py-0.5 rounded-full">
                      {t.timeAgo}
                    </span>
                  </div>

                  {/* Normal Clean Review Body Text */}
                  <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal not-italic">
                    {t.comment}
                  </p>

                  {/* Ordered Item Tag */}
                  {t.orderedItem && (
                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span className="font-semibold text-slate-700">Ordered:</span>
                      <span className="truncate">{t.orderedItem}</span>
                    </div>
                  )}
                </div>

                {/* User Identity with Initials Monogram (No Face Images) */}
                <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-slate-100">
                  <div className={`w-9 h-9 rounded-2xl ${t.badgeBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm font-sans tracking-wide`}>
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{t.name}</h4>
                      <span className="inline-flex items-center text-[10px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200 shrink-0">
                        Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
