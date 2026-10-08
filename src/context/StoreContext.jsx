import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_CATEGORIES } from '../data/categories';
import { DEFAULT_STORE_CONFIG, PROMO_COUPONS } from '../data/storeInfo';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // 1. Products state with localStorage persistence & version sync
  const DATA_VERSION = 'v14_clean_production';

  const [products, setProducts] = useState(() => {
    try {
      const currentVersion = localStorage.getItem('freshmart_data_version');
      if (currentVersion !== DATA_VERSION) {
        localStorage.setItem('freshmart_data_version', DATA_VERSION);
        localStorage.setItem('freshmart_products', JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem('freshmart_categories', JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_PRODUCTS;
      }
      const saved = localStorage.getItem('freshmart_products');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // 2. Categories state
  const [categories, setCategories] = useState(() => {
    try {
      const currentVersion = localStorage.getItem('freshmart_data_version');
      if (currentVersion !== DATA_VERSION) {
        return INITIAL_CATEGORIES;
      }
      const saved = localStorage.getItem('freshmart_categories');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // 3. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Store Settings
  const [storeConfig, setStoreConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.currency = '₹';
        if (!parsed.shopName || parsed.shopName.includes('FreshMart') || parsed.shopName.includes('FreshCart Groceries')) {
          parsed.shopName = 'FreshCart Market';
        }
        return parsed;
      }
      return DEFAULT_STORE_CONFIG;
    } catch {
      return DEFAULT_STORE_CONFIG;
    }
  });

  // 6. Orders Log (simulated/tracked)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_orders');
      if (saved) {
        return JSON.parse(saved);
      }
      return [];
    } catch {
      return [];
    }
  });

  // 7. Enquiries
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_enquiries');
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'products' | 'cart' | 'about' | 'contact' | 'admin'
  const [adminSubTab, setAdminSubTab] = useState('overview'); // 'overview' | 'products' | 'categories' | 'orders' | 'enquiries' | 'settings'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // For Quick View Modal
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('freshmart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('freshmart_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('freshmart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('freshmart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('freshmart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('freshmart_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('freshmart_config', JSON.stringify(storeConfig));
  }, [storeConfig]);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart! 🛒`);
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast("Item removed from cart.", "info");
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`, "info");
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to your wishlist! ❤️`, "success");
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Coupon application
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = PROMO_COUPONS.find(c => c.code === cleanCode);
    if (!coupon) {
      showToast("Invalid coupon code.", "error");
      return false;
    }
    const currentSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (currentSubtotal < coupon.minSpend) {
      showToast(`Coupon requires a minimum spend of ${storeConfig.currency}${coupon.minSpend}.`, "error");
      return false;
    }
    setAppliedCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied! Saved ${storeConfig.currency}${coupon.discount} 🎉`, "success");
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.", "info");
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const isFreeDelivery = cartSubtotal >= storeConfig.freeDeliveryThreshold;
  const deliveryFee = cart.length === 0 ? 0 : (isFreeDelivery ? 0 : storeConfig.deliveryFee);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);
  const progressToFreeDelivery = Math.min(100, Math.round((cartSubtotal / storeConfig.freeDeliveryThreshold) * 100));
  const amountNeededForFreeDelivery = Math.max(0, storeConfig.freeDeliveryThreshold - cartSubtotal);

  // WhatsApp Order Submission Handler
  const placeWhatsAppOrder = (customerDetails) => {
    const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);

    // Create new order record
    const newOrder = {
      id: orderId,
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      address: customerDetails.address,
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, unit: i.unit })),
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      discount: discountAmount,
      total: cartTotal,
      paymentMethod: customerDetails.paymentMethod,
      deliverySlot: customerDetails.deliverySlot || "Earliest (30 Mins)",
      notes: customerDetails.notes || "",
      status: "Pending WhatsApp Confirmation",
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Format WhatsApp message
    let message = `🛒 *NEW GROCERY ORDER #${orderId}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Customer Details:*\n`;
    message += `• *Name:* ${customerDetails.name}\n`;
    message += `• *Phone:* ${customerDetails.phone}\n`;
    message += `• *Delivery Address:* ${customerDetails.address}\n`;
    message += `• *Preferred Slot:* ${customerDetails.deliverySlot || "Earliest"}\n`;
    message += `• *Payment:* ${customerDetails.paymentMethod}\n`;
    if (customerDetails.notes) {
      message += `• *Special Notes:* ${customerDetails.notes}\n`;
    }
    message += `\n📦 *Order Items:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.unit || ''})\n   ↳ ${item.quantity} x ${storeConfig.currency}${item.price.toFixed(2)} = *${storeConfig.currency}${(item.quantity * item.price).toFixed(2)}*\n`;
    });
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *Subtotal:* ${storeConfig.currency}${cartSubtotal.toFixed(2)}\n`;
    if (discountAmount > 0) {
      message += `🎁 *Discount (${appliedCoupon.code}):* -${storeConfig.currency}${discountAmount.toFixed(2)}\n`;
    }
    message += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `${storeConfig.currency}${deliveryFee.toFixed(2)}`}\n`;
    message += `⭐ *TOTAL PAYABLE:* *${storeConfig.currency}${cartTotal.toFixed(2)}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Please confirm my order and share delivery ETA. Thank you!_ 🌱`;

    // Construct WhatsApp link
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Clear cart and show congratulations
    clearCart();
    setIsCheckoutModalOpen(false);
    setIsCartDrawerOpen(false);
    showToast(`Order #${orderId} generated! WhatsApp opened. 🚀`, "success");

    return newOrder;
  };

  // Add customer enquiry
  const addEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: "ENQ-" + Math.floor(100 + Math.random() * 900),
      ...enquiryData,
      createdAt: new Date().toISOString(),
      status: "Pending"
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    showToast("Enquiry sent successfully! We will connect shortly.", "success");
    return newEnquiry;
  };

  // Admin Actions
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: "prod-" + Date.now(),
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 1,
      inStock: productData.inStock !== false
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully! 🍏`, "success");
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedFields } : p));
    showToast("Product updated successfully!", "success");
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast("Product deleted from store catalog.", "info");
  };

  const toggleProductStock = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const next = !p.inStock;
        showToast(`${p.name} marked as ${next ? 'In Stock' : 'Out of Stock'}.`, "info");
        return { ...p, inStock: next };
      }
      return p;
    }));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order #${orderId} status updated to: ${status}`);
  };

  const updateEnquiryStatus = (enquiryId, status) => {
    setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status } : e));
    showToast(`Enquiry #${enquiryId} marked as ${status}`);
  };

  const resetToSampleData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setStoreConfig(DEFAULT_STORE_CONFIG);
    localStorage.removeItem('freshmart_products');
    localStorage.removeItem('freshmart_categories');
    localStorage.removeItem('freshmart_config');
    showToast("Store catalog reset to default demo dataset.", "info");
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      cart,
      wishlist,
      storeConfig,
      setStoreConfig,
      orders,
      enquiries,
      activeTab,
      setActiveTab,
      adminSubTab,
      setAdminSubTab,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      selectedProduct,
      setSelectedProduct,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isCheckoutModalOpen,
      setIsCheckoutModalOpen,
      appliedCoupon,
      toast,
      showToast,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      applyCoupon,
      removeCoupon,
      cartSubtotal,
      cartItemCount,
      discountAmount,
      isFreeDelivery,
      deliveryFee,
      cartTotal,
      progressToFreeDelivery,
      amountNeededForFreeDelivery,
      placeWhatsAppOrder,
      addEnquiry,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductStock,
      updateOrderStatus,
      updateEnquiryStatus,
      resetToSampleData
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
