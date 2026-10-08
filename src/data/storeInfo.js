export const DEFAULT_STORE_CONFIG = {
  shopName: "FreshCart Market",
  tagline: "Farm-Fresh Groceries Delivered in 30 Mins",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // Numbers only for wa.me link
  email: "orders@freshcartmarket.com",
  address: "Shop #4, Green Park Avenue, Indiranagar, Bengaluru, 560038",
  operatingHours: "Open Daily: 7:00 AM - 10:00 PM",
  currency: "₹",
  deliveryFee: 40,
  freeDeliveryThreshold: 499,
  estimatedDeliveryTime: "25-35 mins",
  announcementText: "🌱 Spring Organic Fest: Use code FRESH100 for ₹100 OFF on orders above ₹500! Free express delivery over ₹499.",
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    badgeBg: "bg-orange-500",
    verified: "Verified WhatsApp Buyer",
    timeAgo: "24 mins ago",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    orderedItem: "Organic Hass Avocados & Whole Milk",
    comment: "Ordered via WhatsApp this morning and the rider arrived in just 18 minutes. The avocados are perfectly ripe and the milk bottle was ice-cold and fresh. Outstanding service!"
  },
  {
    id: 2,
    name: "Rohan Mehta",
    initials: "RM",
    badgeBg: "bg-amber-600",
    verified: "Verified WhatsApp Buyer",
    timeAgo: "1 hour ago",
    location: "Koramangala 4th Block",
    rating: 5,
    orderedItem: "Artisan Sourdough & Desi Butter",
    comment: "The sourdough loaf is blistered and fresh from this morning's bake. They confirmed my list on WhatsApp in under 30 seconds. Seamless conversational shopping."
  },
  {
    id: 3,
    name: "Ananya Iyer",
    initials: "AI",
    badgeBg: "bg-rose-600",
    verified: "Verified WhatsApp Buyer",
    timeAgo: "3 hours ago",
    location: "Whitefield, Bengaluru",
    rating: 5,
    orderedItem: "Royal Basmati Rice & Orange Juice",
    comment: "The grain quality is genuinely superior and unpolished. Delivered quickly in sturdy paper bags with zero plastic. Highly recommended for daily groceries."
  }
];

export const FAQS = [
  {
    question: "How does ordering through WhatsApp work?",
    answer: "It's super simple! 1) Browse our items and add what you need to your cart. 2) Click 'Order via WhatsApp' at checkout. 3) Fill in your delivery address. 4) Our system generates a neatly formatted message and opens WhatsApp directly to our store line where our team confirms your order immediately!"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and Card on Delivery upon arrival."
  },
  {
    question: "How fast is delivery?",
    answer: "Our ultra-local delivery riders typically reach your doorstep within 25 to 35 minutes of WhatsApp confirmation during operating hours (7:00 AM – 10:00 PM)."
  },
  {
    question: "Are all vegetables and fruits 100% organic?",
    answer: "We clearly mark all items with an 'ORGANIC' badge. Our organic produce is harvested daily from certified sustainable local farms without synthetic pesticides or chemicals."
  },
  {
    question: "What if I receive a damaged or unsatisfactory item?",
    answer: "We offer a 100% Instant Refund or Replacement Guarantee! Simply send a photo of the item to our WhatsApp support and we will replace it or refund you within 15 minutes."
  }
];

export const PROMO_COUPONS = [
  { code: "FRESH100", discount: 100, minSpend: 500, description: "₹100 OFF on orders over ₹500" },
  { code: "WELCOME50", discount: 50, minSpend: 299, description: "₹50 OFF on your first purchase over ₹299" },
  { code: "SUPERGREEN", discount: 150, minSpend: 799, description: "₹150 OFF on healthy hauls over ₹799" },
];
