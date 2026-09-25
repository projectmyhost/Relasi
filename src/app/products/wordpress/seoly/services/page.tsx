'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Search, 
  Layers, 
  TrendingUp, 
  Zap, 
  FileText, 
  MapPin, 
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';

export default function ServicesPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', website: '', message: '' });
  };

  const services = [
    {
      title: 'Keyword Research',
      desc: 'In-depth search volume, intent categorization, and keyword difficulty analysis for strategic targeting.',
      link: '/products/wordpress/seoly/keyword-research',
      icon: Search,
      color: 'text-[#E02B2B] bg-red-50'
    },
    {
      title: 'On-Page SEO Optimization',
      desc: 'Complete architectural restructuring of headings, title tags, schema markup, and internal link routing.',
      link: '/products/wordpress/seoly/on-page-seo-strategies-to-boost-rankings',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Off-Page Link Acquisition',
      desc: 'High-authority digital PR, contextual niche editorial mentions, and white-hat domain authority elevation.',
      link: '/products/wordpress/seoly/case-studies',
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      title: 'Technical Core Web Vitals Audit',
      desc: 'Eliminating rendering blocks, server latency, CLS shifts, and ensuring 100% crawl budget efficiency.',
      link: '/products/wordpress/seoly/request',
      icon: Zap,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      title: 'Content Strategy & SEO Copywriting',
      desc: 'Semantic topic clusters and helpful content generation tailored for both users and generative search AI.',
      link: '/products/wordpress/seoly/blog',
      icon: FileText,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Local SEO & Google Maps Dominance',
      desc: 'Hyper-local citation building, Google Business Profile optimization, and local review acceleration.',
      link: '/products/wordpress/seoly/contact',
      icon: MapPin,
      color: 'text-rose-600 bg-rose-50'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Services Hero Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Spectrum Search Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Services
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Engineered search solutions designed to outrank competitors and capture sustained market share.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Services</span>
          </div>
        </div>
      </section>

      {/* Services Showcase Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#E02B2B]/40 hover:shadow-xl transition group flex flex-col justify-between">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl ${srv.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3">{srv.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>
                  <Link 
                    href={srv.link} 
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#E02B2B] hover:gap-2 transition-all pt-4 border-t border-slate-200/60"
                  >
                    Explore Service <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Elevate Presence Showcase */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/service-banner-img-1024x707.webp"
                    alt="Seoly Services Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Sustainable Growth</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">
                Elevate Your Brand’s Online Presence with Expert SEO for Sustainable Growth
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need turnkey search engine management or specialized technical consulting, our deliverables are grounded in transparent reporting and measurable ranking increases.
              </p>
              <div className="pt-2">
                <Link
                  href="/products/wordpress/seoly/request"
                  className="px-6 py-3.5 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-lg shadow-red-500/25 transition inline-flex items-center gap-2"
                >
                  Start Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
              Get In Touch With Us Today
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
                />
              </div>
              <input
                type="url"
                placeholder="Domain to Optimize"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
              />
              <textarea
                placeholder="Which SEO services does your business require?"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
              ></textarea>
              <button
                type="submit"
                id="metform-btn"
                className="w-full py-4 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-xl shadow-red-500/25 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
              {formSubmitted && (
                <div className="p-4 bg-emerald-900/50 border border-emerald-500 text-emerald-200 rounded-xl text-xs text-center font-semibold">
                  Thank you! Your service inquiry has been received.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
