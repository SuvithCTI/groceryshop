# 🥬 FreshMart - Modern Farm-Fresh Grocery Store & WhatsApp Ordering Web App

A modern, responsive, animation-rich online Grocery Shop built with **React.js**, **Tailwind CSS**, and **WhatsApp Commerce Integration**.

---

## 🌟 Key Features & Modules

### 1. 🏠 Home Page
- **Dynamic Hero Section**: High-resolution produce visuals, animated floating badges, 30-minute delivery promise, and quick CTA buttons.
- **Aisle / Category Showcase**: Interactive visual cards with counters across 7+ distinct grocery categories.
- **Flash Deals with Live Timer**: Limited-time harvest discounts with real-time countdown countdown.
- **Customer Bestsellers**: Trending organic items with nutrition specs, ratings, and instant "+ Add" steppers.
- **How WhatsApp Ordering Works**: Step-by-step roadmap showing the conversational shopping flow.
- **Customer Testimonials & FAQs**: Real customer reviews and interactive FAQ accordion.

### 2. 🥦 Products Catalog (`/products`)
- **Live Search & Filter**: Real-time keyword search, category filters, interactive price slider, 100% Organic filter, and in-stock toggles.
- **Sorting Options**: Sort by Featured/Bestsellers, Price (Low to High / High to Low), Customer Rating, and Discount Percentage.
- **View Modes**: Switch between responsive Grid view and detailed List view.
- **Quick View Modal**: Inspect nutrition facts, origin, shelf life, pack weight, and instant WhatsApp buy option.

### 3. 🛒 Cart Drawer & Dedicated Cart Page (`/cart`)
- **Free Delivery Tracker**: Dynamic progress bar calculating the amount remaining for free express delivery.
- **Cart Management**: Quantity increment/decrement, one-click item removal, and entire basket clearing.
- **Promo Coupon Engine**: Includes promo codes like `FRESH10` ($10 OFF on orders > $30), `WELCOME5`, and `SUPERGREEN`.
- **Bill Breakdown**: Itemized subtotal, discount, delivery fee, and net total.

### 4. 📱 WhatsApp Checkout Integration
- **Step-by-Step Checkout Modal**: Customer Name, Phone, Full Delivery Address, Preferred Delivery Slot (Express 30 mins, Morning, Afternoon, Evening), and Payment Method (Cash on Delivery, UPI, Card on Delivery).
- **Live Formatted Message Preview**: Real-time preview of the structured WhatsApp message.
- **Direct WhatsApp Launch**: Automatically constructs a pre-filled `https://wa.me/...` URL with your order details and celebrates with confetti fireworks!

### 5. 🧑‍💼 Comprehensive Admin Dashboard (`/admin`)
- **Overview Metrics**: Live catalog counts, simulated gross sales, active orders, low-stock warnings, and unread enquiries.
- **Product Management (CRUD)**: Add new items with image URLs, set prices/discounts, toggle In-Stock / Out-of-Stock switches, edit details, and delete items.
- **WhatsApp Orders Log**: View customer orders, update delivery status (`Pending Confirmation`, `Confirmed & Packing`, `In Transit`, `Delivered`), and click to chat with the customer directly on WhatsApp.
- **Customer Enquiries Inbox**: View customer queries from the Contact page and respond via WhatsApp with one click.
- **Store & WhatsApp Configuration**: Customize Store Name, WhatsApp phone number, standard delivery charge, free shipping minimum, and announcement banner text.
- **Data Persistence**: All changes are automatically synchronized to `localStorage`.

### 6. 🌿 About Us & 📞 Contact Pages
- **About Us**: Farm origin story, 4 core sustainability pillars, customer statistics, and quality standards.
- **Contact Us**: Customer enquiry submission form, WhatsApp helpline card, business hours, and Google Maps location placeholder.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
