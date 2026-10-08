import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Tag,
  Package,
  Layers,
  FileText,
  MapPin,
  Camera
} from 'lucide-react';

export const ProductFormModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  categories = [],
  mode = 'add' // 'add' or 'edit'
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'fruits-veg',
    price: '',
    originalPrice: '',
    unit: '1 kg',
    image: '/images/hero-produce-1.jpg',
    isOrganic: true,
    inStock: true,
    description: '',
    origin: 'Local Organic Farm'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'fruits-veg',
        price: initialData.price !== undefined ? initialData.price.toString() : '',
        originalPrice: initialData.originalPrice !== undefined ? initialData.originalPrice.toString() : '',
        unit: initialData.unit || '1 kg',
        image: initialData.image || '/images/hero-produce-1.jpg',
        isOrganic: initialData.isOrganic !== undefined ? initialData.isOrganic : true,
        inStock: initialData.inStock !== undefined ? initialData.inStock : true,
        description: initialData.description || '',
        origin: initialData.origin || 'Local Organic Farm'
      });
    } else {
      setFormData({
        name: '',
        category: 'fruits-veg',
        price: '',
        originalPrice: '',
        unit: '1 kg',
        image: '/images/hero-produce-1.jpg',
        isOrganic: true,
        inStock: true,
        description: '',
        origin: 'Local Organic Farm'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Handle local file selection from Device Gallery
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, image: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormData(prev => ({ ...prev, image: event.target.result }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const priceNum = parseFloat(formData.price) || 0;
    const origPriceNum = formData.originalPrice ? parseFloat(formData.originalPrice) : priceNum;

    onSave({
      ...formData,
      price: priceNum,
      originalPrice: origPriceNum
    });
  };

  const discountPercent = (formData.price && formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price))
    ? Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{mode === 'add' ? 'New Inventory Item' : 'Update Inventory Item'}</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-stone-900 mt-0.5">
              {mode === 'add' ? 'Add New Product' : `Edit Product`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition shadow-sm border border-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* =========================================================
              SECTION 1: DIRECT IMAGE UPLOAD
             ========================================================= */}
          <div className="space-y-2 bg-stone-50/80 p-4 sm:p-5 rounded-2xl border border-stone-200">
            <label className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5 mb-1">
              <ImageIcon className="w-4 h-4 text-orange-600" />
              <span>Upload Image</span>
            </label>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Direct Upload Dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition ${
                dragActive
                  ? 'border-orange-500 bg-orange-50/50'
                  : 'border-stone-300 hover:border-orange-400 bg-white hover:bg-stone-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Image Preview Box */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200 shadow-sm relative group">
                  <img
                    src={formData.image || '/images/hero-produce-1.jpg'}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/hero-produce-1.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-sm font-bold text-stone-900 flex items-center justify-center sm:justify-start gap-1.5">
                    <Upload className="w-4 h-4 text-orange-600" />
                    <span>Choose Image from Gallery</span>
                  </h4>
                  <p className="text-xs text-stone-500">
                    Click to browse your phone/device gallery or drop a photo here
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="mt-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Photo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              SECTION 2: PRODUCT BASICS (NAME, CATEGORY, UNIT)
             ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
                <span>Product Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fresh Organic Hass Avocados"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 font-semibold outline-none transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-orange-600" />
                <span>Category *</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 font-semibold outline-none transition"
              >
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit / Pack */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-orange-600" />
                <span>Unit / Pack Size *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1 kg, 500g box, 3 pcs, 1 Litre"
                value={formData.unit}
                onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 font-medium outline-none transition"
              />
            </div>

          </div>

          {/* =========================================================
              SECTION 3: PRICING (SELLING PRICE & MRP)
             ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-orange-50/40 p-4 rounded-2xl border border-orange-200/70">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                Selling Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-sm">₹</span>
                <input
                  type="number"
                  step="1"
                  required
                  placeholder="180"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-stone-300 focus:border-orange-500 rounded-xl text-sm font-black text-stone-900 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-stone-800">
                  Original Price (MRP) (₹)
                </label>
                {discountPercent > 0 && (
                  <span className="text-[10px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-sm">₹</span>
                <input
                  type="number"
                  step="1"
                  placeholder="240"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-stone-300 focus:border-orange-500 rounded-xl text-sm font-bold text-stone-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* =========================================================
              SECTION 4: ORIGIN & DESCRIPTION
             ========================================================= */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Origin / Sourced From</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Local Organic Farm, Himachal Orchards"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 font-medium outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-orange-600" />
                <span>Product Description</span>
              </label>
              <textarea
                rows="2"
                placeholder="Freshly harvested produce, rich in essential nutrients..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-orange-500 focus:bg-white rounded-xl text-xs sm:text-sm text-stone-900 font-medium outline-none transition resize-none"
              />
            </div>
          </div>

          {/* =========================================================
              SECTION 5: TOGGLES (IN STOCK & ORGANIC)
             ========================================================= */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <label className="flex items-center gap-3 p-3.5 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                className="w-4 h-4 accent-orange-500 rounded"
              />
              <div>
                <span className="text-xs font-bold text-stone-900 block">In Stock</span>
                <span className="text-[10px] text-stone-500">Available to purchase</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.isOrganic}
                onChange={(e) => setFormData(prev => ({ ...prev, isOrganic: e.target.checked }))}
                className="w-4 h-4 accent-orange-500 rounded"
              />
              <div>
                <span className="text-xs font-bold text-stone-900 block">100% Organic</span>
                <span className="text-[10px] text-stone-500">Certified organic produce</span>
              </div>
            </label>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition hover:scale-[1.02] flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{mode === 'add' ? 'Add Product to Catalog' : 'Save Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
