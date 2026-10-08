import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ArrowRight,
  Truck,
  Check,
  Sparkles,
  ShoppingBasket,
  Percent
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    setIsCheckoutModalOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
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
    setActiveTab
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in-up">
      <div className="absolute inset-0" onClick={() => setIsCartDrawerOpen(false)} />

      <div className="fixed inset-y-0 right-0 w-full max-w-md flex">
        <div className="w-full bg-white shadow-2xl flex flex-col z-10">

          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900">
                  Your Basket
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in cart
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-500 font-semibold px-2 py-1 transition"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-9 h-9 rounded-xl hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-orange-50/80 p-4 border-b border-orange-100/60">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1.5 font-bold text-orange-950">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>
                  {isFreeDelivery
                    ? "🎉 You unlocked FREE Express Delivery!"
                    : `Add ${storeConfig.currency}${amountNeededForFreeDelivery.toFixed(2)} more for FREE Delivery`}
                </span>
              </div>
              <span className="font-black text-orange-700">{progressToFreeDelivery}%</span>
            </div>
            <div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center animate-bounce-soft">
                  <ShoppingBasket className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-800">Your basket is empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explore farm-fresh groceries, fruits, milk and pantry staples!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActiveTab('products');
                  }}
                  className="mt-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-600/30 transition hover:scale-105"
                >
                  Explore Groceries
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center gap-3.5 group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-2xl border border-slate-100 bg-slate-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate leading-snug">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-slate-500">{item.unit}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-orange-700 font-display">
                        {storeConfig.currency}{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({storeConfig.currency}{item.price.toFixed(2)} ea)
                      </span>
                    </div>
                  </div>

                  {/* Stepper + Delete */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-50/90 border-t border-slate-200 space-y-4">

              {/* Promo Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-orange-100/80 border border-orange-300/80 px-3.5 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-orange-950 font-bold">
                      <Tag className="w-3.5 h-3.5 text-orange-700" />
                      <span>{appliedCoupon.code} applied (-{storeConfig.currency}{appliedCoupon.discount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. WELCOME50)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 uppercase font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{storeConfig.currency}{cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-orange-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{storeConfig.currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={`font-semibold ${isFreeDelivery ? 'text-orange-700' : 'text-slate-900'}`}>
                    {isFreeDelivery ? 'FREE' : `${storeConfig.currency}${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200 font-display">
                  <span>Total Amount</span>
                  <span className="text-orange-800">{storeConfig.currency}{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:scale-[1.01] active:scale-[0.99] transition duration-200"
              >
                <span>Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                🔒 Safe & Verified Grocery Order via Shop WhatsApp Line
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
