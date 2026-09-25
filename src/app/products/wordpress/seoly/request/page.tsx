'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  User, 
  DollarSign, 
  Target, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    websiteUrl: '',
    targetCountry: 'United States',
    currentTraffic: '1k - 10k',
    monthlyBudget: '$2,500 - $5,000',
    serviceNeeded: 'Full Turnkey SEO',
    competitor1: '',
    competitor2: '',
    appointmentDate: '',
    projectNotes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Consultation Request</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Request Strategy Consultation
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Schedule a 1-on-1 strategy call and receive a complimentary comprehensive 24-point website SEO & architecture audit.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Request</span>
          </div>
        </div>
      </section>

      {/* Main Request Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Visual & Guarantee */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white p-2">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c4-1024x667.webp"
                    alt="Seoly Strategy Consultation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">What Happens Next?</h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#E02B2B] font-medium text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Our senior architect conducts an initial crawler diagnostic of your domain.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#E02B2B] font-medium text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>We prepare a custom competitor gap analysis with exact traffic projections.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#E02B2B] font-medium text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>We hold a 30-minute high-value strategy call to walk through actionable findings.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% Non-Disclosure Guaranteed. Your confidential domain data is never shared.</span>
              </div>
            </div>

            {/* Right Col: Comprehensive 13-Input Field Form */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Appointment Request Received!</h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. A calendar invite and discovery brief confirmation have been sent to <strong className="text-slate-900">{formData.workEmail}</strong>.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Appointment & Project Intake</h2>
                    <p className="text-xs text-slate-500 mt-1">Please fill in all details so we can prepare your custom strategy consultation.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 1: Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">1. Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Benny Quirke"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>

                    {/* Field 2: Work Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">2. Work Email *</label>
                      <input
                        type="email"
                        name="workEmail"
                        required
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 3: Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">3. Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>

                    {/* Field 4: Company Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">4. Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Acme Corporation"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 5: Website URL */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">5. Website URL *</label>
                      <input
                        type="url"
                        name="websiteUrl"
                        required
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>

                    {/* Field 6: Target Country */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">6. Target Geography</label>
                      <select
                        name="targetCountry"
                        value={formData.targetCountry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      >
                        <option value="United States">United States (Global)</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia & NZ</option>
                        <option value="Europe">Europe (Multi-lingual)</option>
                        <option value="Southeast Asia">Southeast Asia / APAC</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 7: Current Monthly Organic Traffic */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">7. Current Monthly Traffic</label>
                      <select
                        name="currentTraffic"
                        value={formData.currentTraffic}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      >
                        <option value="Under 1,000">Under 1,000 visitors/mo</option>
                        <option value="1k - 10k">1,000 – 10,000 visitors/mo</option>
                        <option value="10k - 50k">10,000 – 50,000 visitors/mo</option>
                        <option value="50k+">50,000+ visitors/mo</option>
                      </select>
                    </div>

                    {/* Field 8: Monthly Budget */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">8. Monthly Marketing Budget</label>
                      <select
                        name="monthlyBudget"
                        value={formData.monthlyBudget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      >
                        <option value="$1,000 - $2,500">$1,000 – $2,500 / mo</option>
                        <option value="$2,500 - $5,000">$2,500 – $5,000 / mo</option>
                        <option value="$5,000 - $10,000">$5,000 – $10,000 / mo</option>
                        <option value="$10,000+">$10,000+ Enterprise / mo</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 9: Desired Service Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">9. Primary Service Required</label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                    >
                      <option value="Full Turnkey SEO">Full Turnkey Search Engine Management</option>
                      <option value="Keyword & Content Strategy">Keyword Research & Content Pillar Strategy</option>
                      <option value="High Authority Backlinks">Editorial Link Building Campaign</option>
                      <option value="Technical Core Web Vitals Fixes">Technical & Core Web Vitals Optimization</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 10: Primary Competitor 1 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">10. Primary Competitor 1</label>
                      <input
                        type="text"
                        name="competitor1"
                        value={formData.competitor1}
                        onChange={handleChange}
                        placeholder="competitor-domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>

                    {/* Field 11: Primary Competitor 2 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">11. Primary Competitor 2</label>
                      <input
                        type="text"
                        name="competitor2"
                        value={formData.competitor2}
                        onChange={handleChange}
                        placeholder="another-rival.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                      />
                    </div>
                  </div>

                  {/* Field 12: Preferred Appointment Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">12. Preferred Appointment Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="appointmentDate"
                      required
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                    />
                  </div>

                  {/* Field 13: Project Objectives & Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">13. Project Objectives & Specific Goals</label>
                    <textarea
                      name="projectNotes"
                      rows={4}
                      value={formData.projectNotes}
                      onChange={handleChange}
                      placeholder="Detail your growth goals, target revenue benchmarks, or any penalty recovery history..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="metform-submit-btn"
                    className="w-full py-4 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-xl shadow-red-500/25 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
