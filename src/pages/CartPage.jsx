import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  ShoppingBasket,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle2
} from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    products,
    storeConfig,
    cartSubtotal,
    cartItemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    isFreeDelivery,
    deliveryFee,
    cartTotal,
    progressToFreeDelivery,
    amountNeededForFreeDelivery,
    updateQuantity,
    removeFromCart,
    clearCart,
    setActiveTab,
    placeWhatsAppOrder
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliverySlot: 'Fastest 25-35 Mins (Express)',
    paymentMethod: 'Cash on Delivery (COD)',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!form.phone.trim()) newErrors.phone = 'Please enter your WhatsApp phone number';
    if (!form.address.trim()) newErrors.address = 'Please enter full delivery address';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch {}

    placeWhatsAppOrder(form);
  };

  // Recommended products (impulse additions)
  const recommendedProducts = products
    .filter(p => !cart.some(c => c.id === p.id))
    .slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="w-24 h-24 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto animate-bounce-soft">
            <ShoppingBasket className="w-12 h-12" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              Your Grocery Basket is Empty
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mt-2">
              Looks like you haven't added any fresh groceries yet. Explore crisp greens, juicy orchard fruits, farm milk and bakery items!
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-orange-600/30 transition hover:scale-105"
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">

      {/* Title */}
      <div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
          Shopping Basket ({cartItemCount} Items)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your items, apply vouchers, and send your WhatsApp order for 30-min express delivery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Items List */}
        <div className="lg:col-span-7 space-y-6">

          {/* Free Delivery Bar */}
          <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-orange-950">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                {isFreeDelivery
                  ? "🎉 You qualified for FREE Express Delivery!"
                  : `Add ${storeConfig.currency}${amountNeededForFreeDelivery.toFixed(2)} more for FREE Delivery`}
              </span>
              <span>{progressToFreeDelivery}%</span>
            </div>
            <div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>

          {/* Cart Items Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-slate-100 bg-slate-50 shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500">{item.unit}</p>
                    <span className="text-xs font-bold text-orange-700 font-display">
                      {storeConfig.currency}{item.price.toFixed(2)} each
                    </span>
                  </div>
                </div>

                {/* Actions (Quantity + Subtotal + Remove) */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-xl bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-xl bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 font-display block">
                      {storeConfig.currency}{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-slate-400 hover:text-rose-500 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs font-bold text-orange-700 hover:underline"
            >
              ← Continue Shopping Groceries
            </button>
            <button
              onClick={clearCart}
              className="text-xs font-bold text-rose-500 hover:underline"
            >
              Clear Entire Basket
            </button>
          </div>

        </div>

        {/* Right Column: Checkout Details & Bill Breakdown */}
        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">

            <h3 className="font-display font-black text-lg text-slate-900">
              Delivery Details & Checkout
            </h3>

            {/* Form */}
            <form onSubmit={handleCheckout} className="space-y-4">

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-500 mt-0.5">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500"
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="Flat/House No, Building, Street, Landmark, Area..."
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500 resize-none"
                  />
                </div>
                {errors.address && <p className="text-[11px] text-rose-500 mt-0.5">{errors.address}</p>}
              </div>

              {/* Slot & Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Slot</label>
                  <select
                    value={form.deliverySlot}
                    onChange={(e) => setForm({ ...form, deliverySlot: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Fastest 25-35 Mins">⚡ Fastest (30 Mins)</option>
                    <option value="Morning (8 AM - 11 AM)">🌅 Morning</option>
                    <option value="Evening (5 PM - 8 PM)">🌆 Evening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={form.paymentMethod}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Cash on Delivery (COD)">💵 Cash on Delivery</option>
                    <option value="UPI / Mobile Pay">📱 UPI / QR Code</option>
                    <option value="Card on Delivery">💳 Card on Delivery</option>
                  </select>
                </div>
              </div>

              {/* Coupon input */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-orange-50 border border-orange-200 p-2.5 rounded-xl text-xs">
                    <span className="font-bold text-orange-800">Coupon {appliedCoupon.code} applied (-{storeConfig.currency}{appliedCoupon.discount})</span>
                    <button type="button" onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. WELCOME50)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none uppercase font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{storeConfig.currency}{cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-orange-700 font-bold">
                    <span>Discount</span>
                    <span>-{storeConfig.currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={`font-bold ${isFreeDelivery ? 'text-orange-700' : 'text-slate-900'}`}>
                    {isFreeDelivery ? 'FREE' : `${storeConfig.currency}${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-200 font-display">
                  <span>Total Payable</span>
                  <span className="text-orange-800">{storeConfig.currency}{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-amber-600 text-white font-display font-black text-base rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2.5 transition hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                <span>Place Order on WhatsApp ({storeConfig.currency}{cartTotal.toFixed(2)})</span>
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* Recommended Additions */}
      {recommendedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h3 className="font-display font-extrabold text-xl text-slate-900 mb-6">
            Frequently Bought Together
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
