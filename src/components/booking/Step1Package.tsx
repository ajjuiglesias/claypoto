'use client';

import React from 'react';
import { useBooking, AVAILABLE_ADDONS } from '@/context/BookingContext';
import { Check, Sparkles, Plus, Clock, Camera, Sparkle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

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
        <h3 className="font-serif text-lg sm:text-xl text-[#2c2520] font-bold mb-1">
          Choose Your Session Tier
        </h3>
        <p className="text-xs text-[#7a6a5b] font-light">
          Transparent rates with no hidden fees. Each tier includes professional color grading and high-res gallery release.
        </p>
      </div>

      {/* Package Selection Cards */}
      <div className="space-y-3">
        {packages.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;

          return (
            <Card
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#fbf9f5] border-[#b88548] shadow-md ring-2 ring-[#b88548]/30'
                  : 'bg-white border-[#ebd8c0] hover:border-[#b88548]/50 hover:bg-[#faf8f5]'
              }`}
            >
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-[#b88548] bg-[#b88548]'
                        : 'border-[#ebd8c0] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-[#2c2520] font-serif text-base font-bold">
                        {pkg.name}
                      </h4>
                      {pkg.isPopular && (
                        <Badge variant="gold" className="text-[9px] py-0">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#7a6a5b] mt-0.5 font-light">
                      {pkg.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#5c4f44]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b88548]" />
                        <span>{pkg.duration}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-[#b88548]" />
                        <span>{pkg.imageCount}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price block */}
                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#f5efe4] shrink-0">
                  <div className="text-xl font-serif font-bold text-[#2c2520]">
                    ${pkg.price}
                  </div>
                  <div className="text-[10px] text-[#7a6a5b] font-medium">
                    ${pkg.deposit} deposit to reserve
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Optional Add-ons Section */}
      <div className="pt-3 border-t border-[#ebd8c0]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2c2520] flex items-center gap-1.5">
            <Sparkle className="w-3.5 h-3.5 text-[#b88548]" />
            <span>Curated Creative Add-ons</span>
          </span>
          <span className="text-[10px] text-[#7a6a5b]">Optional additions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {AVAILABLE_ADDONS.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);

            return (
              <Card
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`transition-all cursor-pointer border ${
                  isChecked
                    ? 'bg-[#faf1e3]/60 border-[#b88548] shadow-2xs'
                    : 'bg-white border-[#ebd8c0] hover:border-[#b88548]/40 hover:bg-[#faf8f5]'
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#2c2520] leading-tight">
                      {addon.name}
                    </span>
                    <Switch
                      checked={isChecked}
                      onCheckedChange={() => toggleAddon(addon.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="scale-75"
                    />
                  </div>
                  <p className="text-[11px] text-[#7a6a5b] mt-1 font-light line-clamp-2">
                    {addon.description}
                  </p>
                  <div className="mt-2 text-xs font-serif font-bold text-[#855b25]">
                    +${addon.price}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Real-time Order Subtotal Pill */}
      <div className="p-3.5 rounded-xl bg-[#fbf8f2] border border-[#ebd8c0] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#b88548]" />
          <span className="text-[#5c4f44]">
            Total Experience: <strong className="text-[#2c2520] font-bold">${totalPrice}</strong>
          </span>
        </div>
        <Badge variant="gold" className="text-[10px]">
          Deposit Due Today: ${depositDue}
        </Badge>
      </div>
    </div>
  );
}
