'use client';

import React from 'react';
import { useBooking, AVAILABLE_ADDONS } from '@/context/BookingContext';
import { Check, Sparkles } from 'lucide-react';

export default function Step1Package() {
  const {
    packages,
    selectedPackage,
    setSelectedPackage,
    selectedAddons,
    toggleAddon,
    totalPrice,
    depositDue,
  } = useBooking();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl text-[#1c1b19] font-semibold mb-1">
          Select Your Experience
        </h3>
        <p className="text-xs text-[#5e5951] font-light">
          Choose a session tier. You can customize with optional add-ons below.
        </p>
      </div>

      {/* Package Selection Cards */}
      <div className="space-y-3">
        {packages.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                isSelected
                  ? 'bg-[#fbf9f5] border-[#b8915b] shadow-md ring-1 ring-[#b8915b]'
                  : 'bg-white border-[#e8e2d5] hover:border-[#b8915b]/40 hover:bg-[#faf8f5]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected ? 'border-[#8c6734] bg-[#8c6734]' : 'border-[#d6c7b0] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h4 className="text-[#1c1b19] font-serif text-base font-bold">
                      {pkg.name}
                    </h4>
                    {pkg.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-[#faf1e3] text-[#8c6734] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider border border-[#ebd8bd]">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5e5951] mt-0.5">
                    {pkg.duration} · {pkg.outfits} · {pkg.imageCount}
                  </p>
                </div>
              </div>

              {/* Price Tag */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-8 sm:pl-0 border-t sm:border-t-0 border-[#f0ece4] pt-2 sm:pt-0">
                <div className="text-base sm:text-lg font-bold text-[#1c1b19] font-serif">
                  ${pkg.price}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#8c6734]">
                  ${pkg.deposit} deposit today
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Add-Ons */}
      <div className="pt-4 border-t border-[#ece5d8]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c1b19] mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#b8915b]" />
          <span>Tailor Your Session (Optional Add-ons)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AVAILABLE_ADDONS.map((addon) => {
            const isAdded = selectedAddons.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isAdded
                    ? 'bg-[#fbf9f5] border-[#b8915b] ring-1 ring-[#b8915b]'
                    : 'bg-white border-[#e8e2d5] hover:border-[#b8915b]/40 text-[#5e5951]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1c1b19]">+{addon.name}</span>
                  <span className={`text-[11px] font-bold ${isAdded ? 'text-[#8c6734]' : 'text-[#736c61]'}`}>
                    +${addon.price}
                  </span>
                </div>
                <p className="text-[10px] text-[#5e5951] line-clamp-2">
                  {addon.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtotal Ribbon */}
      <div className="p-3.5 rounded-xl bg-[#f7f4ed] border border-[#e8e2d5] flex items-center justify-between text-xs">
        <div>
          <span className="text-[#736c61] block text-[10px] uppercase font-bold tracking-wider">Estimated Total</span>
          <span className="text-base font-bold text-[#1c1b19] font-serif">${totalPrice}</span>
        </div>
        <div className="text-right">
          <span className="text-[#736c61] block text-[10px] uppercase font-bold tracking-wider">Deposit Required Now</span>
          <span className="text-base font-bold text-[#8c6734]">${depositDue}</span>
        </div>
      </div>
    </div>
  );
}
