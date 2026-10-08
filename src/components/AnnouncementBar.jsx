import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Phone, Clock, ShieldCheck, X } from 'lucide-react';

export const AnnouncementBar = () => {
  const { storeConfig } = useStore();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-emerald-100 text-xs sm:text-sm py-2 px-4 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-medium tracking-wide">
            {storeConfig.announcementText}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-emerald-200">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Delivery in 25-35 mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Quality Guaranteed</span>
          </div>
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20FreshMart,%20I%20have%20a%20question`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-300 hover:text-white font-semibold transition"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Order Helpline: {storeConfig.phone}</span>
          </a>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-2 sm:static text-emerald-300 hover:text-white transition p-1"
          aria-label="Close banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
