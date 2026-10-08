import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  ShieldCheck,
  FileText,
  X,
  Lock,
  CheckCircle2
} from 'lucide-react';

export const Footer = () => {
  const { storeConfig, setActiveTab, categories, setSelectedCategory, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null

  const tapTimerRef = React.useRef(null);
  const clickCountRef = React.useRef(0);

  const handleLogoClick = (e) => {
    e.preventDefault();
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      tapTimerRef.current = setTimeout(() => {
        // Single tap -> Navigate to Home
        clickCountRef.current = 0;
        setActiveTab('home');
        window.scrollTo(0, 0);
      }, 260);
    } else if (clickCountRef.current >= 2) {
      // Double tap -> Instant Admin Portal
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }
      clickCountRef.current = 0;
      setActiveTab('admin');
      window.scrollTo(0, 0);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast("Thank you for subscribing to FreshCart weekly farm updates! 🥕");
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0f0d0c] text-stone-300 pt-12 pb-10 border-t border-stone-800">
      <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10">

          {/* 1. Brand & Contact Details (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={handleLogoClick}
              title="Double tap for Admin Portal"
              className="flex items-center gap-3 cursor-pointer group inline-flex select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-orange-500/20 overflow-hidden shrink-0 group-hover:scale-105 transition active:scale-90">
                <img src="/images/logo.png" alt="FreshCart Market Logo" className="w-full h-full object-contain pointer-events-none" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                FreshCart <span className="text-orange-500 font-bold">Market</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Farm-fresh organic groceries delivered to your kitchen in under 30 minutes via WhatsApp ordering.
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{storeConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{storeConfig.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{storeConfig.phone}</span>
              </div>
            </div>
          </div>

          {/* 2. Popular Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display text-orange-400">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {categories.slice(1, 7).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-orange-400 transition hover:translate-x-1 inline-block"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Navigation & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition hover:translate-x-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition hover:translate-x-1"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition hover:translate-x-1"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition hover:translate-x-1"
                >
                  Contact & Help
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-orange-400 transition hover:translate-x-1"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-orange-400 transition hover:translate-x-1"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter Subscribe (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display text-orange-400">
              Newsletter
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe for seasonal harvest alerts and secret discount coupons.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 focus:border-orange-500 rounded-xl text-xs text-white placeholder-stone-500 outline-none transition"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 active:scale-98"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {storeConfig.shopName}. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-stone-300 transition"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-stone-300 transition"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <span>WhatsApp Fast Delivery</span>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-800 max-h-[85vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-600" />
                <h3 className="font-display font-black text-xl text-stone-900">Privacy Policy</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <p>
                At <strong>{storeConfig.shopName}</strong>, we are committed to safeguarding your privacy and ensuring your personal details remain safe and confidential.
              </p>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">1. Information We Collect</h4>
                <p>When placing orders through our website or WhatsApp, we collect basic details such as your name, delivery address, and phone number to fulfill your grocery delivery.</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">2. How We Use Your Information</h4>
                <p>We use your information exclusively to dispatch orders, send status updates via WhatsApp, and provide customer support. We never sell, rent, or trade your personal data to third parties.</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">3. Payment & Security</h4>
                <p>All payments are handled securely upon delivery (Cash, UPI, Card) or via verified payment channels. We do not store sensitive payment card information on our servers.</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">4. Contact Us</h4>
                <p>If you have any questions regarding your data or privacy, reach out to us at <strong>{storeConfig.email}</strong> or on WhatsApp at <strong>{storeConfig.phone}</strong>.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {activeModal === 'terms' && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-800 max-h-[85vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                <h3 className="font-display font-black text-xl text-stone-900">Terms & Conditions</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <p>
                Welcome to <strong>{storeConfig.shopName}</strong>. By using our website and placing orders, you agree to comply with the following terms:
              </p>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">1. Ordering & WhatsApp Confirmation</h4>
                <p>Orders are generated through our online catalog and confirmed directly on WhatsApp with our store representative. Pricing and stock availability are verified upon message receipt.</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">2. 30-Minute Delivery Promise</h4>
                <p>We strive to deliver orders within 25–35 minutes during our standard operating hours ({storeConfig.operatingHours}). Delivery times may slightly vary during peak weather or high traffic conditions.</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">3. 100% Freshness Guarantee & Returns</h4>
                <p>If any fruit, vegetable, or perishable item does not meet your quality expectations, notify us on WhatsApp with a photo within 2 hours of delivery for an instant replacement or refund.</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">4. Payment Terms</h4>
                <p>We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and major credit/debit cards on arrival.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
