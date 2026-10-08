import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { storeConfig } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const messageToSend = msg.trim() || "Hi FreshCart! I have a question about grocery delivery.";
    const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(messageToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMsg('');
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                🛒
              </div>
              <div>
                <h5 className="font-bold text-sm leading-tight">{storeConfig.shopName}</h5>
                <span className="text-[11px] text-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-300 inline-block animate-ping"></span>
                  Online • Replies in seconds
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-xs text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Hello! 👋 How can we help you today?</p>
              <p>Ask about item availability, order tracking, bulk requests, or custom grocery orders.</p>
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message here..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl shadow-md transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button (Compact Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Order on WhatsApp"
        aria-label="Order on WhatsApp"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-xl shadow-orange-500/35 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none group-hover:rotate-12 transition duration-300" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    </div>
  );
};
