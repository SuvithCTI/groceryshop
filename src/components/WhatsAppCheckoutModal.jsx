import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  X,
  MessageCircle,
  MapPin,
  Phone,
  User,
  Clock,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  FileText,
  AlertCircle
} from 'lucide-react';

export const WhatsAppCheckoutModal = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    storeConfig,
    cartSubtotal,
    discountAmount,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    placeWhatsAppOrder
  } = useStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliverySlot: 'Fastest 25-35 Mins (Express)',
    paymentMethod: 'Cash on Delivery (COD)',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isCheckoutModalOpen) return null;

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Please enter your full name';
    if (!form.phone.trim() || form.phone.trim().length < 7) errors.phone = 'Please provide a valid phone number';
    if (!form.address.trim()) errors.address = 'Please enter complete delivery address';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    placeWhatsAppOrder(form);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in-up">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
              <MessageCircle className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white">
                Place Order via WhatsApp
              </h3>
              <p className="text-xs text-orange-100">
                Instant confirmed order to {storeConfig.shopName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">

          {/* Order Summary Pill */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-orange-700" />
              <span className="font-bold text-slate-900">
                {cart.length} unique items ({storeConfig.currency}{cartTotal.toFixed(2)} Total)
              </span>
            </div>
            <span className="text-orange-800 font-bold bg-white px-3 py-1 rounded-full border border-orange-200 shadow-xs">
              Delivery: {deliveryFee === 0 ? 'FREE' : `${storeConfig.currency}${deliveryFee.toFixed(2)}`}
            </span>
          </div>

          {/* Delivery & Customer Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              1. Delivery Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm outline-none focus:bg-white transition ${
                      formErrors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-orange-500'
                    }`}
                  />
                </div>
                {formErrors.name && <p className="text-[11px] text-rose-500 mt-1">{formErrors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm outline-none focus:bg-white transition ${
                      formErrors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-orange-500'
                    }`}
                  />
                </div>
                {formErrors.phone && <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Delivery Address & Landmark <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  required
                  rows={2}
                  placeholder="Flat No, Building, Street, Landmark, Area, City..."
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm outline-none focus:bg-white transition resize-none ${
                    formErrors.address ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-orange-500'
                  }`}
                />
              </div>
              {formErrors.address && <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>}
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. Slot & Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Delivery Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Slot
                </label>
                <select
                  value={form.deliverySlot}
                  onChange={(e) => setForm({ ...form, deliverySlot: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                >
                  <option value="Fastest 25-35 Mins (Express)">⚡ Fastest 25-35 Mins (Express)</option>
                  <option value="Today Morning (8:00 AM - 11:00 AM)">🌅 Morning Slot (8 AM - 11 AM)</option>
                  <option value="Today Afternoon (12:00 PM - 3:00 PM)">☀️ Afternoon Slot (12 PM - 3 PM)</option>
                  <option value="Today Evening (5:00 PM - 8:00 PM)">🌆 Evening Slot (5 PM - 8 PM)</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                >
                  <option value="Cash on Delivery (COD)">💵 Cash on Delivery (COD)</option>
                  <option value="UPI / Instant Mobile Pay">📱 UPI / QR Transfer on Delivery</option>
                  <option value="Card on Delivery">💳 Card on Delivery (POS Machine)</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Order Notes / Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Please pick fresh items, ring bell twice..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500"
              />
            </div>
          </div>

          {/* WhatsApp Message Live Preview Box */}
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-sans font-bold text-[11px] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live WhatsApp Message Preview</span>
            </div>
            <p className="text-orange-300">🛒 *NEW FRESHCART ORDER*</p>
            <p className="truncate">👤 Name: {form.name || '[Your Name]'}</p>
            <p className="truncate">📍 Address: {form.address || '[Delivery Address]'}</p>
            <p>📦 Items: {cart.length} products ({storeConfig.currency}{cartTotal.toFixed(2)})</p>
            <p className="text-amber-400">💵 Total: {storeConfig.currency}{cartTotal.toFixed(2)} ({form.paymentMethod})</p>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-display font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/25 hover:scale-[1.01] active:scale-[0.99] transition duration-200"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            <span>Send Order via WhatsApp ({storeConfig.currency}{cartTotal.toFixed(2)})</span>
          </button>

          <p className="text-xs text-center text-slate-400">
            Clicking this will generate the structured order message and launch your WhatsApp directly to connect with our store manager.
          </p>

        </form>
      </div>
    </div>
  );
};
