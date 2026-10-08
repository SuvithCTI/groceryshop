import React, { useEffect } from 'react';
import { useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { NotificationToast } from './components/NotificationToast';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const { activeTab } = useStore();
  const isAdminTab = activeTab === 'admin';

  // Instant scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] selection:bg-orange-500 selection:text-white relative">
      {/* Main Sticky Header Navigation - Hidden on Admin Page */}
      {!isAdminTab && <Navbar />}

      {/* Dynamic Main Body Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'products' && <ProductsPage />}
        {activeTab === 'cart' && <CartPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Store Footer - Hidden on Admin Page */}
      {!isAdminTab && <Footer />}

      {/* Slide-over Cart Drawer */}
      {!isAdminTab && <CartDrawer />}

      {/* Slide-over Wishlist Drawer */}
      {!isAdminTab && <WishlistDrawer />}

      {/* Product Quick View Modal */}
      {!isAdminTab && <ProductModal />}

      {/* WhatsApp Checkout Flow Modal */}
      {!isAdminTab && <WhatsAppCheckoutModal />}

      {/* Floating Bottom WhatsApp Quick Chat Widget - Hidden on Admin Page */}
      {!isAdminTab && <FloatingWhatsApp />}

      {/* Instant Toast Notification Alerts */}
      <NotificationToast />
    </div>
  );
}

export default App;
