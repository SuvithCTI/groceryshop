import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  HeartHandshake,
  ShieldCheck,
  MessageCircle,
  Clock,
  Sun
} from 'lucide-react';

export const AboutPage = () => {
  const { storeConfig, setActiveTab } = useStore();

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">

      {/* 1. Hero Header - Simple, Compact & Clean */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4EFE6] via-[#FBECE0] to-transparent py-8 sm:py-12 border-b border-orange-200/60">
        <div className="w-full max-w-[96%] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5 sm:space-y-3">
          <span className="text-[11px] font-black text-orange-900 uppercase tracking-wider bg-orange-100/90 px-3 py-1 rounded-full border border-orange-200 shadow-xs inline-block">
            ✨ Our Farm-To-Table Journey
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-tight">
            Bringing Nature's Purest Harvests{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
              Straight to Your Kitchen.
            </span>
          </h1>
          <p className="text-stone-800 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Connecting regional organic farmers directly to urban households through conversational WhatsApp grocery shopping.
          </p>
        </div>
      </section>

      {/* 2. Brand Story & Visual Collage */}
      <section className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black text-orange-950 uppercase tracking-wider bg-orange-100/90 px-3.5 py-1.5 rounded-full border border-orange-200 shadow-xs inline-block">
              🌱 The FreshCart Story
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-black leading-tight tracking-tight">
              Rethinking How Fresh Food Travels From Soil to Plate
            </h2>
            <p className="text-stone-800 text-xs sm:text-sm font-medium leading-relaxed">
              We deliver farm-harvested organic vegetables, crisp greens, and seasonal fruits straight from local family farms to your doorstep in 30 minutes—free from artificial ripening, chemical waxes, and stale storage.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-4 sm:p-5 bg-orange-50/90 rounded-2xl border border-orange-200 shadow-xs">
                <span className="font-display font-black text-2xl sm:text-3xl text-orange-800 block">100+</span>
                <span className="text-xs font-bold text-black mt-0.5 block">Partner Organic Farms</span>
              </div>
              <div className="p-4 sm:p-5 bg-orange-50/90 rounded-2xl border border-orange-200 shadow-xs">
                <span className="font-display font-black text-2xl sm:text-3xl text-orange-800 block">50,000+</span>
                <span className="text-xs font-bold text-black mt-0.5 block">Happy Orders Delivered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative group rounded-3xl overflow-hidden border border-orange-100 shadow-lg">
              <img
                src="/images/hero-produce-1.jpg"
                alt="Fresh Organic Farm Harvest"
                className="object-cover w-full h-64 sm:h-72 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                🌱 Farm Fresh Harvest
              </span>
            </div>
            <div className="relative group rounded-3xl overflow-hidden border border-orange-100 shadow-lg mt-6 sm:mt-8">
              <img
                src="/images/hero-produce-2.jpg"
                alt="Organic Produce Basket"
                className="object-cover w-full h-64 sm:h-72 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                ✨ 100% Organic
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Four Core Pillars - Warm Palette */}
      <section className="bg-gradient-to-b from-[#F4EFE6] via-[#FBECE0] to-[#F4EFE6] py-14 sm:py-20 border-y border-orange-200/60">
        <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-orange-950 uppercase tracking-wider bg-orange-200/90 px-3.5 py-1.5 rounded-full border border-orange-300 shadow-xs inline-block">
              ✨ Our Core Promises
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-black">
              Why Families Choose FreshCart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Pillar 1: Daily Morning Harvest */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-100/90 via-orange-50 to-amber-100/70 rounded-3xl border border-orange-200/90 shadow-sm space-y-3.5 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-xs border border-white/80 group">
                <img
                  src="/images/spinach.jpg"
                  alt="Daily Morning Harvest"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>5:00 AM Harvest</span>
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-black">Daily Morning Harvest</h3>
                <p className="text-xs text-stone-900 font-medium leading-relaxed">
                  Vegetables and herbs picked at 5:00 AM from local sustainable greenhouse farms.
                </p>
              </div>
            </div>

            {/* Pillar 2: 30-Min Fast Dispatch */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-100/90 via-amber-50 to-yellow-100/70 rounded-3xl border border-amber-200/90 shadow-sm space-y-3.5 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-xs border border-white/80 group">
                <img
                  src="/images/hero-produce-1.jpg"
                  alt="30-Min Fast Dispatch"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>30-Min Express</span>
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-black">30-Min Fast Dispatch</h3>
                <p className="text-xs text-stone-900 font-medium leading-relaxed">
                  Our ultra-local neighborhood riders deliver to your kitchen in record time.
                </p>
              </div>
            </div>

            {/* Pillar 3: Fair Farmer Pricing */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-rose-100/90 via-rose-50 to-orange-100/70 rounded-3xl border border-rose-200/90 shadow-sm space-y-3.5 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-xs border border-white/80 group">
                <img
                  src="/images/farm-field.jpg"
                  alt="Fair Farmer Pricing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <HeartHandshake className="w-3 h-3 text-rose-400" />
                  <span>+35% Fair Pay</span>
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-black">Fair Farmer Pricing</h3>
                <p className="text-xs text-stone-900 font-medium leading-relaxed">
                  We pay our farming partners up to 35% above market rates for uncompromised organic quality.
                </p>
              </div>
            </div>

            {/* Pillar 4: 100% Refund Guarantee */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-100/90 via-amber-50 to-orange-100/70 rounded-3xl border border-orange-200/90 shadow-sm space-y-3.5 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-xs border border-white/80 group">
                <img
                  src="/images/apples.jpg"
                  alt="100% Refund Guarantee"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>100% Guaranteed</span>
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-black">100% Refund Guarantee</h3>
                <p className="text-xs text-stone-900 font-medium leading-relaxed">
                  If any produce does not meet your high standards, we replace or refund instantly.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. WhatsApp Connect CTA - Full Width & Sleek */}
      <section className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 rounded-3xl py-6 px-6 sm:px-10 lg:px-12 sm:py-7 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              Ready for Healthier, Fresher Meals?
            </h3>
            <p className="text-white/95 text-xs sm:text-sm font-medium max-w-xl">
              Order your fresh grocery haul today with code <span className="font-black bg-white/20 px-2.5 py-0.5 rounded-md text-white">WELCOME50</span> for instant discount.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white text-orange-950 rounded-2xl font-black text-xs sm:text-sm hover:bg-orange-50 transition shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Shop Groceries
            </button>
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20FreshCart!%20I%20would%20like%20to%20know%20more%20about%20your%20farm%20deliveries.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black hover:bg-stone-900 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
