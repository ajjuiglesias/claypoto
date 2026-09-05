'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PricingCards() {
  const { packages, openBookingModal } = useBooking();

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
        <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#855b25] block mb-2 sm:mb-3">
          Transparent Investment
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#2c2520] font-normal tracking-tight mb-3 sm:mb-4">
          Simple Packages. Zero Guesswork.
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[#5c4f44] font-light">
          No hidden fees or surprise print markups. Lock in your session date with a modest deposit today; pay the remainder when you step on set.
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {packages.map((pkg) => {
          const isFeatured = pkg.isPopular;
          const remaining = pkg.price - pkg.deposit;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 ${
                isFeatured
                  ? 'bg-white border-2 border-[#b88548] shadow-xl shadow-[#b88548]/15 lg:-translate-y-2'
                  : 'bg-white border border-[#ebd8c0] hover:border-[#b88548] shadow-xs hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#b88548] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Card Header */}
              <div>
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#2c2520] font-semibold mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#7a6a5b] font-medium">{pkg.duration} · {pkg.outfits}</p>
                  </div>
                </div>

                <p className="text-xs text-[#5c4f44] italic font-light mb-5 sm:mb-6 min-h-[32px] sm:min-h-[36px]">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-[#f5efe4]">
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2c2520] tracking-tight">
                      ${pkg.price}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#7a6a5b] uppercase tracking-wider font-bold">
                      Total Session Fee
                    </span>
                  </div>

                  {/* Explicit Deposit Breakdown - Cream & White */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#f5efe4] border border-[#ebd8c0] flex items-center justify-between text-xs shadow-2xs">
                    <div>
                      <span className="text-[#7a6a5b] block text-[10px] uppercase font-bold">Lock date today</span>
                      <span className="font-bold text-[#855b25] text-xs sm:text-sm">${pkg.deposit} deposit</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#7a6a5b] block text-[10px] uppercase font-bold">Due on shoot day</span>
                      <span className="font-bold text-[#2c2520] text-xs sm:text-sm">${remaining} remaining</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-2.5 mb-6 text-xs text-[#423830]">
                  <div className="flex items-center justify-between py-1 border-b border-[#fbf8f2]">
                    <span className="text-[#7a6a5b]">Deliverables:</span>
                    <span className="font-semibold text-[#2c2520]">{pkg.imageCount}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#fbf8f2]">
                    <span className="text-[#7a6a5b]">Turnaround:</span>
                    <span className="font-semibold text-[#2c2520]">{pkg.turnaround}</span>
                  </div>
                </div>

                {/* Checklist Features */}
                <ul className="space-y-3 mb-8 text-xs text-[#423830]">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#f5efe4] text-[#855b25] flex items-center justify-center shrink-0 mt-0.5 border border-[#ebd8c0]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button - No dark bg! */}
              <div>
                <button
                  onClick={() => openBookingModal(pkg.id)}
                  className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isFeatured
                      ? 'bg-[#b88548] hover:bg-[#a07136] text-white shadow-lg'
                      : 'bg-white hover:bg-[#fbf8f2] text-[#2c2520] border-2 border-[#ebd8c0] hover:border-[#b88548]'
                  }`}
                >
                  <span>Book This Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-[#7a6a5b] mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Free reschedule up to 48 hrs prior</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
