'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Users, 
  Award, 
  Globe, 
  Send,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react';

export default function AboutUsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', website: '', message: '' });
  };

  const team = [
    {
      name: 'Benny Quirke',
      role: 'Chief SEO Strategist & Founder',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/team-1.webp',
      bio: '12+ years directing global search campaigns and enterprise algorithmic recovery programs.'
    },
    {
      name: 'Thomas Bennett',
      role: 'Head of Technical Architecture',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/team-2.webp',
      bio: 'Former search crawler engineer specialized in Core Web Vitals, headless CMS, and structured data.'
    },
    {
      name: 'Sophia Reynolds',
      role: 'Director of Editorial & Digital PR',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/team-3.webp',
      bio: 'Leads high-tier media outreach and high-authority editorial placements in Tier-1 publications.'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Hero Banner: About US */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Who We Are</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            About US
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            We are an elite search marketing collective obsessed with engineering market dominance for ambitious brands worldwide.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">About Us</span>
          </div>
        </div>
      </section>

      {/* Vision & Growth Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Our Vision & Purpose</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">
                Grow Traffic & Increase Revenue Through Ethical, Lasting Search Leadership
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded on the conviction that search optimization should be measurable, transparent, and built on sound technical engineering, Seoly transforms obscure websites into industry reference leaders.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Our Vision</h3>
                  <p className="text-xs text-slate-600">
                    To make search engines the most profitable and predictable customer acquisition channel for modern businesses.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Our Mission</h3>
                  <p className="text-xs text-slate-600">
                    Empower clients with transparent metrics, robust technical foundations, and evergreen high-authority backlinks.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c6-1024x892.webp"
                    alt="Seoly Team & Strategic Vision"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Leadership & Specialists</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-2">
              Meet the SEO Team
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Certified practitioners with battle-tested track records navigating hundreds of Google algorithm updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition group">
                <div className="aspect-[4/4.5] overflow-hidden bg-slate-100 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0F172A]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#E02B2B] mt-0.5">{member.role}</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{member.bio}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 text-slate-400">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="mailto:info@reactheme.com" className="hover:text-red-500 transition">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Form */}
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
                  placeholder="Your Name"
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
                placeholder="Company Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B]"
              />
              <textarea
                placeholder="How can we assist your business?"
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
                  Thank you! Your message has been routed to our leadership team.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
