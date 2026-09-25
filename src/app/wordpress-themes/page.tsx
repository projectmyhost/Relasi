'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  Eye, 
  ShoppingCart, 
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function WordPressThemesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', count: 62 },
    { name: 'Business', count: 16 },
    { name: 'Education', count: 5 },
    { name: 'Automotive', count: 3 },
    { name: 'Blog Magazine', count: 2 },
    { name: 'eCommerce', count: 2 }
  ];

  const themes = [
    {
      title: 'Seoly – SEO & Digital Marketing WordPress Theme',
      price: 29,
      originalPrice: 59,
      category: 'Business',
      image: 'https://reactheme.com/wp-content/uploads/2026/01/seoly.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
      demoLink: '/products/wordpress/seoly',
      featured: true,
    },
    {
      title: 'Dishora – Modern Restaurant WordPress Theme',
      price: 29,
      originalPrice: 49,
      category: 'Business',
      image: 'https://reactheme.com/wp-content/uploads/2026/09/preview.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
      demoLink: '/products/wordpress/seoly',
      featured: false,
    },
    {
      title: 'Renovast – Home Renovation & Remodeling Services Theme',
      price: 34,
      originalPrice: 59,
      category: 'Business',
      image: 'https://reactheme.com/wp-content/uploads/2026/08/renovast__large_preview.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
      demoLink: '/products/wordpress/seoly',
      featured: false,
    },
    {
      title: 'Techlix – IT Solutions & Technology WordPress Theme',
      price: 29,
      originalPrice: 49,
      category: 'Business',
      image: 'https://reactheme.com/wp-content/uploads/2026/08/techlix__large_preview.jpg',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
      demoLink: '/products/wordpress/seoly',
      featured: false,
    },
    {
      title: 'Almaris – Hotel Booking WordPress Theme',
      price: 39,
      originalPrice: 69,
      category: 'eCommerce',
      image: 'https://reactheme.com/wp-content/uploads/2026/06/almaris__large_preview.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
      demoLink: '/products/wordpress/seoly',
      featured: false,
    },
    {
      title: 'Invena – Business Consulting WordPress Theme',
      price: 29,
      originalPrice: 59,
      category: 'Business',
      image: 'https://reactheme.com/wp-content/uploads/2025/08/preview-1024x521.jpg',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
      demoLink: '/products/wordpress/seoly',
      featured: false,
    }
  ];

  const filteredThemes = themes.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Banner Notice */}
      <div className="bg-[#0F172A] text-white py-2.5 px-4 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p className="text-slate-300">
            Now available — get our themes directly at <strong className="text-white">reactheme.com</strong>. Pay less, get supported longer, update in one click.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/html-templates" className="text-slate-400 hover:text-white transition">HTML Templates</Link>
            <Link href="/my-account" className="text-slate-400 hover:text-white transition">My Account</Link>
          </div>
        </div>
      </div>

      {/* Catalog Header */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            Our All Themes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3">
            Explore Reacthemes complete collection of premium themes and templates for every project.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <input
              type="text"
              placeholder="Search WordPress themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B] shadow-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-3.5" />
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.name
                    ? 'bg-[#E02B2B] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredThemes.map((theme, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={theme.image}
                      alt={theme.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {theme.featured && (
                      <span className="absolute top-3 left-3 bg-[#E02B2B] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                        Best Seller
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{theme.category}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#0F172A]">${theme.price}</span>
                        <span className="text-xs text-slate-400 line-through">${theme.originalPrice}</span>
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[#E02B2B] transition leading-snug mb-3">
                      <Link href={theme.link}>{theme.title}</Link>
                    </h2>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-2">
                  <Link
                    href={theme.link}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Purchase
                  </Link>
                  <Link
                    href={theme.demoLink}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
