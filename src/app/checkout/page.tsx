'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function CheckoutPage() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentComplete(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-black">Secure Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">256-Bit SSL Encrypted Order Processing</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {paymentComplete ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Thank You for Your Order!</h2>
              <p className="text-xs text-slate-600">
                Your payment was processed successfully. Your license key and download link have been sent to your email.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/my-account"
                  className="px-6 py-3 !bg-[#E02B2B] !text-white font-medium text-xs rounded-xl shadow-md hover:!bg-[#c92424] transition cursor-pointer"
                >
                  Go to My Account
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-900">Customer & Billing Information</h2>

                <form onSubmit={handlePay} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                      <input type="text" required placeholder="John" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#E02B2B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                      <input type="text" required placeholder="Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#E02B2B]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input type="email" required placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#E02B2B]" />
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Payment Method</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E02B2B] bg-red-50/40 cursor-pointer">
                        <input type="radio" name="payMethod" defaultChecked className="text-[#E02B2B] focus:ring-[#E02B2B]" />
                        <CreditCard className="w-4 h-4 text-[#E02B2B]" />
                        <span className="text-xs font-bold text-slate-900">Credit / Debit Card (Stripe)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Card Number *</label>
                    <input type="text" required placeholder="•••• •••• •••• 4242" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#E02B2B]" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-sm rounded-xl shadow-lg shadow-red-500/25 transition mt-4 cursor-pointer"
                  >
                    Complete Order ($29.00 USD)
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h2>

                <div className="flex items-center gap-4 py-2">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <img src="https://reactheme.com/wp-content/uploads/2026/01/seoly.png" alt="Seoly" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-slate-900">Seoly – SEO Theme</h3>
                    <p className="text-[11px] text-slate-500">Regular License • Lifetime Updates</p>
                  </div>
                  <span className="text-sm font-black text-slate-900">$29.00</span>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>$59.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Direct Discount (50% OFF):</span>
                    <span>-$30.00</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total Due:</span>
                    <span>$29.00 USD</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Encrypted 256-bit Connection</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
