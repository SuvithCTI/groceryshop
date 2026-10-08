import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductFormModal } from '../components/ProductFormModal';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  TrendingUp,
  AlertTriangle,
  Phone,
  Sparkles,
  Lock,
  User,
  Mail,
  KeyRound,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const AdminPage = () => {
  const {
    products,
    categories,
    orders,
    enquiries,
    storeConfig,
    adminSubTab,
    setAdminSubTab,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    updateOrderStatus,
    updateEnquiryStatus,
    showToast,
    setActiveTab
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('freshcart_admin_auth') === 'true';
  });
  const [authForm, setAuthForm] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtered products for admin table
  const adminProducts = products.filter(p => {
    const matchesCat = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const outOfStockCount = products.filter(p => !p.inStock).length;
  const pendingOrdersCount = orders.filter(o => o.status.includes('Pending')).length;
  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'Pending').length;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authForm.username.trim() || !authForm.password.trim()) {
      showToast("Please enter both username and password!", "error");
      return;
    }
    localStorage.setItem('freshcart_admin_auth', 'true');
    setIsAuthenticated(true);
    showToast(`Welcome ${authForm.username}! Signed in to Admin Portal.`, "success");
  };

  const handleLogout = () => {
    localStorage.removeItem('freshcart_admin_auth');
    setIsAuthenticated(false);
    setAuthForm({ username: '', password: '' });
    showToast("Logged out of Admin Portal.", "info");
    setActiveTab('home');
  };

  const handleSaveNewProduct = (newProductData) => {
    addProduct(newProductData);
    setIsAddModalOpen(false);
  };

  const handleSaveEditProduct = (updatedProductData) => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, updatedProductData);
    setEditingProduct(null);
  };

  // If not authenticated, render the Clean Sign In Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100">
        <div className="w-full max-w-md bg-white rounded-[28px] sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200/90 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-stone-900 to-stone-800 text-white flex items-center justify-center mx-auto shadow-lg shadow-stone-900/20">
              <Lock className="w-7 h-7 text-orange-500" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 font-display tracking-tight">
              Admin Sign In
            </h2>
            <p className="text-xs text-stone-500">
              Enter your store manager credentials to access inventory & WhatsApp orders.
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 outline-none transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 outline-none transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-500/25 transition active:scale-98 flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In to Admin Portal</span>
            </button>
          </form>

          {/* Back to Storefront */}
          <div className="pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="w-full text-center text-xs text-stone-500 hover:text-stone-800 transition flex items-center justify-center gap-1.5 py-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-4 sm:space-y-6">

      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Store Administration Portal</span>
          </div>
          <h1 className="font-display font-black text-xl sm:text-3xl text-white">
            {storeConfig.shopName} Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">
            Manage live inventory, categories, price updates, WhatsApp orders and customer queries
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <button
            onClick={() => setActiveTab('home')}
            className="flex-1 sm:flex-initial justify-center px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl sm:rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition"
            title="Return to customer storefront"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial justify-center px-3.5 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl sm:rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-orange-500/30 transition hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 sm:px-3.5 sm:py-2.5 bg-rose-600/90 hover:bg-rose-700 text-white rounded-xl sm:rounded-2xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            title="Log out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Log Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'overview', name: 'Overview', icon: LayoutDashboard },
          { id: 'products', name: `Products (${products.length})`, icon: Package },
          { id: 'orders', name: `WhatsApp Orders (${orders.length})`, icon: ShoppingBag, badge: pendingOrdersCount },
          { id: 'enquiries', name: `Enquiries (${enquiries.length})`, icon: MessageSquare, badge: pendingEnquiriesCount }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminSubTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
                isActive
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-white text-orange-950' : 'bg-rose-500 text-white'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: OVERVIEW METRICS
         ========================================================= */}
      {adminSubTab === 'overview' && (
        <div className="space-y-4 sm:space-y-8 animate-fade-in-up">
          {/* Metric Tiles (2-columns on mobile, 4 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block truncate">Live Products</span>
                <span className="font-display font-black text-xl sm:text-3xl text-slate-900 mt-0.5 sm:mt-1 block">
                  {products.length}
                </span>
                <span className="text-[10px] sm:text-xs text-orange-600 font-semibold truncate block">{products.filter(p => p.isOrganic).length} Organic</span>
              </div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block truncate">Total Sales</span>
                <span className="font-display font-black text-xl sm:text-3xl text-slate-900 mt-0.5 sm:mt-1 block">
                  {storeConfig.currency}{totalRevenue.toFixed(0)}
                </span>
                <span className="text-[10px] sm:text-xs text-amber-600 font-semibold truncate block">{orders.length} orders logged</span>
              </div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block truncate">Pending Orders</span>
                <span className="font-display font-black text-xl sm:text-3xl text-slate-900 mt-0.5 sm:mt-1 block">
                  {pendingOrdersCount}
                </span>
                <span className="text-[10px] sm:text-xs text-rose-500 font-semibold truncate block">Needs confirmation</span>
              </div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider block truncate">Stock Alerts</span>
                <span className="font-display font-black text-xl sm:text-3xl text-slate-900 mt-0.5 sm:mt-1 block">
                  {outOfStockCount}
                </span>
                <span className="text-[10px] sm:text-xs text-rose-500 font-semibold truncate block">Out-of-Stock</span>
              </div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

          </div>

          {/* Quick Shortcuts & Activity Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">

            {/* Recent Orders Preview */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900">
                  Recent WhatsApp Orders
                </h3>
                <button
                  onClick={() => setAdminSubTab('orders')}
                  className="text-xs font-bold text-orange-700 hover:underline"
                >
                  View all ({orders.length})
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {orders.slice(0, 4).map(order => (
                  <div key={order.id} className="py-2.5 sm:py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-900">{order.id}</span>
                        <span className="text-xs text-slate-600 truncate">• {order.customerName}</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{order.items.length} items • {order.paymentMethod}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-black text-orange-800 font-display block">
                        {storeConfig.currency}{order.total.toFixed(0)}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        order.status === 'Delivered' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status.replace('WhatsApp ', '')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Customer Enquiries Preview */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900">
                  Latest Customer Inquiries
                </h3>
                <button
                  onClick={() => setAdminSubTab('enquiries')}
                  className="text-xs font-bold text-orange-700 hover:underline"
                >
                  View all ({enquiries.length})
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {enquiries.slice(0, 4).map(enq => (
                  <div key={enq.id} className="py-2.5 sm:py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{enq.name}</span>
                      <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        enq.status === 'Replied' ? 'bg-orange-100 text-orange-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{enq.message}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: PRODUCTS MANAGER (Add, Edit, Delete, Stock Toggle)
         ========================================================= */}
      {adminSubTab === 'products' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-in-up">

          {/* Controls Bar */}
          <div className="p-3.5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500"
              />
            </div>

            {/* Category selector filter & Add button */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="flex-1 sm:flex-initial px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
              >
                <option value="all">All Categories ({products.length})</option>
                {categories.slice(1).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm transition active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>

          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price / Unit</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4">Badges</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {adminProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl border border-slate-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.origin || 'Farm harvest'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                        {categories.find(c => c.id === p.category)?.name || p.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-black text-slate-900 font-display text-sm">
                        {storeConfig.currency}{p.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{p.unit}</span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleProductStock(p.id)}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1.5 transition ${
                          p.inStock
                            ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-orange-600' : 'bg-rose-600'}`}></span>
                        <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isOrganic && (
                          <span className="bg-orange-50 text-orange-800 border border-orange-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            Organic
                          </span>
                        )}
                        {p.badge && (
                          <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-2 hover:bg-orange-50 text-slate-600 hover:text-orange-700 rounded-xl transition"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${p.name}" from catalog?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View (Clean & Touch-friendly without table scroll) */}
          <div className="md:hidden divide-y divide-slate-100">
            {adminProducts.map((p) => (
              <div key={p.id} className="p-3.5 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-xl border border-slate-100 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{p.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                          {categories.find(c => c.id === p.category)?.name || p.category}
                        </span>
                        <span className="text-[11px] text-slate-400">• {p.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-2 bg-orange-50 text-orange-700 rounded-xl transition active:scale-95"
                      title="Edit Product"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${p.name}" from catalog?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-2 bg-rose-50 text-rose-600 rounded-xl transition active:scale-95"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-slate-900 font-display text-base">
                      {storeConfig.currency}{p.price.toFixed(0)}
                    </span>
                    {p.originalPrice > p.price && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {storeConfig.currency}{p.originalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleProductStock(p.id)}
                    className={`px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1.5 transition active:scale-95 ${
                      p.inStock
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-orange-600' : 'bg-rose-600'}`}></span>
                    <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================
          TAB 3: ORDERS & WHATSAPP LOGS
         ========================================================= */}
      {adminSubTab === 'orders' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-in-up space-y-3 sm:space-y-4 p-3.5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                Customer Orders Log
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Orders placed via website and forwarded to WhatsApp</p>
            </div>
            <span className="text-[11px] sm:text-xs font-bold bg-orange-50 text-orange-800 px-3 py-1 rounded-full border border-orange-200 self-start sm:self-auto">
              {orders.length} Total Orders
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-mono font-black text-xs sm:text-sm text-slate-900 bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200">
                      {ord.id}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{ord.customerName}</span>
                    <span className="text-[11px] text-slate-400">({ord.phone})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Dropdown */}
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="flex-1 sm:flex-initial px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="Pending WhatsApp Confirmation">⏳ Pending Confirmation</option>
                      <option value="Confirmed & Packing">📦 Confirmed & Packing</option>
                      <option value="In Transit">🚚 In Transit</option>
                      <option value="Delivered">✅ Delivered</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>

                    {/* WhatsApp Reply Button */}
                    <a
                      href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(ord.customerName)}!%20This%20is%20${encodeURIComponent(storeConfig.shopName)}%20regarding%20order%20${ord.id}.%20Your%20delivery%20status%20is:%20${encodeURIComponent(ord.status)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm hover:bg-black transition shrink-0 active:scale-95"
                      title="Chat with Customer on WhatsApp"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Address:</span> {ord.address}
                </div>

                {/* Items chips */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {ord.items.map((item, i) => (
                    <span key={i} className="bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200 text-[11px] sm:text-xs font-medium text-slate-700">
                      {item.quantity}x {item.name} ({storeConfig.currency}{(item.price * item.quantity).toFixed(0)})
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 font-semibold text-slate-700">
                  <span className="text-[11px] sm:text-xs">Pay: {ord.paymentMethod}</span>
                  <span className="text-xs sm:text-sm font-black text-orange-800 font-display">
                    Total: {storeConfig.currency}{ord.total.toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: CUSTOMER ENQUIRIES
         ========================================================= */}
      {adminSubTab === 'enquiries' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-in-up p-3.5 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                Customer Enquiries Inbox
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Messages sent via the Contact page form</p>
            </div>
            <span className="text-[11px] sm:text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
              {enquiries.length} Enquiries
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {enquiries.map((enq) => (
              <div key={enq.id} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{enq.name}</h4>
                    <p className="text-[11px] text-slate-500">{enq.phone} • {enq.email || 'No email'}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                      className="flex-1 sm:flex-initial px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Replied">✅ Replied</option>
                      <option value="Archived">📁 Archived</option>
                    </select>

                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)}!%20Thank%20you%20for%20contacting%20${encodeURIComponent(storeConfig.shopName)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm hover:bg-black transition shrink-0 active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">WhatsApp Reply</span>
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <p className="font-bold text-slate-900 mb-0.5">Subject: {enq.subject}</p>
                  <p className="text-slate-600">{enq.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      <ProductFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewProduct}
        categories={categories}
        mode="add"
      />

      {/* Modal: Edit Product */}
      <ProductFormModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEditProduct}
        initialData={editingProduct}
        categories={categories}
        mode="edit"
      />

    </div>
  );
};
