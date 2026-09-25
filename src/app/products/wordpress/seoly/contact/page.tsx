'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', website: '', message: '' });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Contact Hero Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Contact
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Connect directly with our senior SEO directors to discuss campaigns, enterprise audits, or partnerships.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Info & Interactive Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Reach Out</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-2">
              We’re here to answer your questions.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Reach out via our office addresses, direct hotlines, or through our encrypted inquiry portal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#0F172A] border-b border-slate-100 pb-4">Office Location</h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E02B2B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Headquarters</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      280 Madison Avenue, Suite 912, New York, NY 10016, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Phone & Direct Hotline</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      +1 (800) 482-9012 / +1 (212) 555-0198
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Email Dispatch</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      support@reactheme.com / contact@seoly.agency
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Operational Hours</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Monday – Friday: 9:00 AM – 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Banner */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white p-2">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c4-1024x667.webp"
                    alt="Seoly Contact Facility"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Send a Message Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-black text-[#0F172A] mb-2">Send a Message</h3>
              <p className="text-xs text-slate-500 mb-8">
                Fill in the form below and an SEO partner will reply within 2 business hours.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Thomas Bennett"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Message / Inquiry *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can our SEO agency assist your brand?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  id="metform-btn"
                  className="w-full py-4 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-xl shadow-red-500/25 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>

                {formSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold text-center">
                    Thank you! Your message has been sent successfully. We will be in touch shortly!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
