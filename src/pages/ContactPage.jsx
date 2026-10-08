import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQS } from '../data/storeInfo';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Store,
  ShieldCheck
} from 'lucide-react';

export const ContactPage = () => {
  const { storeConfig, addEnquiry } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Grocery Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;

    addEnquiry(form);
    setIsSubmitted(true);

    // Also offer direct WhatsApp enquiry
    const text = `Hi ${storeConfig.shopName}! 📝\n*New Customer Enquiry:*\n• *Name:* ${form.name}\n• *Phone:* ${form.phone}\n• *Subject:* ${form.subject}\n• *Message:* ${form.message}`;
    const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(url, '_blank');
    }, 800);

    setForm({
      name: '',
      email: '',
      phone: '',
      subject: 'General Grocery Inquiry',
      message: ''
    });
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#F4EFE6] via-[#FBECE0] to-[#F4EFE6] py-10 sm:py-16">
      <div className="w-full max-w-[96%] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">

        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black text-orange-950 uppercase tracking-widest bg-orange-200/90 px-4 py-1.5 rounded-full border border-orange-300 shadow-xs inline-block">
            ✨ We're Here For You
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">
            Contact FreshCart Store & Support
          </h1>
          <p className="text-stone-900 text-xs sm:text-sm font-medium leading-relaxed">
            Have questions about bulk orders, organic certifications, deliveries or custom fruit baskets? Send us an inquiry or reach us on WhatsApp.
          </p>
        </div>

        {/* Main Grid: Contact Info + Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* Left Column: Quick Contact Cards */}
        <div className="lg:col-span-5 space-y-6">

          {/* WhatsApp Direct Help Card */}
          <div className="p-6 bg-gradient-to-br from-orange-600 via-amber-600 to-rose-600 rounded-3xl text-white shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">
                Instant WhatsApp Helpline
              </h3>
              <p className="text-xs text-white font-semibold mt-1">
                Our support desk responds within 2-5 minutes during shop operating hours.
              </p>
            </div>
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20FreshCart,%20I%20need%20help%20with%20my%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-black hover:bg-stone-900 text-white rounded-2xl font-black text-xs transition shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Chat on WhatsApp: {storeConfig.phone}</span>
            </a>
          </div>

          {/* Contact Details List */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-300 shadow-sm space-y-5">

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-900 flex items-center justify-center shrink-0 border border-orange-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-black">Store Address</h4>
                <p className="text-xs text-black font-semibold mt-0.5">{storeConfig.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-black">Operating Hours</h4>
                <p className="text-xs text-black font-semibold mt-0.5">{storeConfig.operatingHours}</p>
                <span className="text-[11px] text-orange-950 font-black block mt-0.5">Delivery available 7 days a week</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center shrink-0 border border-rose-200">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-black">Email Inquiries</h4>
                <p className="text-xs text-black font-semibold mt-0.5">{storeConfig.email}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Customer Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-300 shadow-sm space-y-6">

            <div>
              <h3 className="font-display font-black text-2xl text-black">
                Send Customer Enquiry
              </h3>
              <p className="text-xs text-black font-semibold mt-1">
                Fill out the form below. Your message will be logged in our store admin panel and sent to our WhatsApp team.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-orange-100 rounded-2xl border border-orange-300 text-center space-y-3 animate-fade-in-up">
                <CheckCircle2 className="w-12 h-12 text-orange-700 mx-auto" />
                <h4 className="font-display font-black text-lg text-black">Thank You! Your Enquiry Was Sent</h4>
                <p className="text-xs text-black font-medium max-w-sm mx-auto">
                  Our manager has received your message and will reach out to your phone / WhatsApp shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500 transition font-bold text-black placeholder:text-stone-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500 transition font-bold text-black placeholder:text-stone-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500 transition font-bold text-black placeholder:text-stone-500"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500 transition font-bold text-black"
                    >
                      <option value="General Grocery Inquiry">General Grocery Inquiry</option>
                      <option value="Bulk / Event Fruit Order">Bulk / Event Fruit Order</option>
                      <option value="Organic Farmer Collaboration">Organic Farmer Collaboration</option>
                      <option value="Feedback / Quality Support">Feedback / Quality Support</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-black text-black mb-1">
                    Your Message / Requirement <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you're looking for or any questions you have..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500 transition font-bold text-black placeholder:text-stone-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Open WhatsApp</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="pt-8 border-t border-stone-300">
        <h3 className="font-display font-black text-2xl text-black text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-stone-300 shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-black text-sm hover:bg-stone-50 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-black transition-transform ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-black font-medium leading-relaxed border-t border-stone-200 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  </div>
  );
};
