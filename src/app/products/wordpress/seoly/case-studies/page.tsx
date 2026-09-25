'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  TrendingUp, 
  BarChart3, 
  ExternalLink, 
  Send,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function CaseStudiesPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', website: '', message: '' });
  };

  const caseStudies = [
    {
      client: 'Google Ecosystem Enterprise',
      logo: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/google.png',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/project-7.webp',
      lift: '+450%',
      metric: 'Organic Traffic Lift',
      desc: "We'll explore how our tailored strategies transformed business online visibility, driving increased targeted traffic and revenue.",
      tags: ['Enterprise SEO', 'Technical Overhaul', 'Schema Architecture']
    },
    {
      client: 'Honda Automotive Network',
      logo: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/meta-business-partner.webp',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c3-1024x846.webp',
      lift: '+320%',
      metric: 'Dealer Inbound Inquiries',
      desc: "We'll explore how our tailored strategies transformed business online visibility, driving increased targeted traffic and revenue.",
      tags: ['Local Map Pack', 'Entity Matching', 'Conversion Funnel']
    },
    {
      client: 'Global SaaS Analytics Suite',
      logo: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/hubspot-certified-partner.webp',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c5-1024x685.webp',
      lift: '+620%',
      metric: 'Commercial Signups Lift',
      desc: "We'll explore how our tailored strategies transformed business online visibility, driving increased targeted traffic and revenue.",
      tags: ['Product-Led SEO', 'Keyword Clustering', 'High DA Backlinks']
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Client Results</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Real data, verifiable organic growth metrics, and tangible ROI generated for forward-thinking partners.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Case Studies</span>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {caseStudies.map((study, idx) => (
            <div 
              key={idx} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl border border-slate-200/80 bg-[#F8FAFC] shadow-sm hover:shadow-xl transition`}
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={study.image}
                      alt={study.client}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3">
                  <img src={study.logo} alt="brand-logo" className="h-7 w-auto object-contain" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">• Client Spotlight</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-[#E02B2B]">{study.lift}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">{study.metric}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight">
                  {study.client}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {study.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {study.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/products/wordpress/seoly/request"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-md"
                  >
                    View Project <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainable Growth Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c5-1024x685.webp"
                    alt="Elevate Online Presence"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Proven Track Record</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">
                Elevate Your Brand’s Online Presence with Expert SEO for Sustainable Growth
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Every strategy is engineered to compound over quarters, not just days. Let us deliver the same predictable ranking trajectory for your company.
              </p>
              <div className="pt-2">
                <Link
                  href="/products/wordpress/seoly/request"
                  className="px-8 py-4 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-xl shadow-red-500/25 transition inline-flex items-center gap-2"
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
                  placeholder="Corporate Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
                />
              </div>
              <input
                type="url"
                placeholder="Domain to Scale"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
              />
              <textarea
                placeholder="Share your organic search performance targets..."
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
                  Thank you! Your case study inquiry has been logged.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
