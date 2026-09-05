'use client';

import React from 'react';
import { SERVICES } from '@/data/services';
import { useBooking } from '@/context/BookingContext';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesList() {
  const { openBookingModal } = useBooking();

  return (
    <section id="services" className="py-24 px-6 bg-[#f5efe4] border-t border-b border-[#ebd8c0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#855b25] block mb-3">
            Tailored Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2c2520] font-normal tracking-tight mb-4">
            Artistry & Transparent Offerings
          </h2>
          <p className="text-sm sm:text-base text-[#5c4f44] font-light">
            Every session is designed around unhurried comfort, natural direction, and high-fidelity archival gallery delivery.
          </p>
        </div>

        {/* Services List - Pure White & Cream Alternating Rows */}
        <div className="space-y-12">
          {SERVICES.map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 sm:p-10 rounded-3xl bg-white border border-[#ebd8c0] hover:border-[#b88548] shadow-xs hover:shadow-xl transition-all ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image */}
                <div className="w-full lg:w-1/2 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#fbf8f2] shrink-0 shadow-xs border border-[#ebd8c0]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#ebd8c0] text-xs text-[#2c2520] font-bold flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#b88548]" />
                    <span>Starting from ${service.startingPrice}</span>
                  </div>
                </div>

                {/* Information & Inclusions */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#855b25] mb-2">
                    Photography Discipline
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2c2520] font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-[#7a6a5b] mb-3 italic">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-[#5c4f44] font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Inclusions Checklist */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c2520] mb-3">
                      What&apos;s Included:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.inclusions.map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-xs text-[#423830]">
                          <span className="w-4 h-4 rounded-full bg-[#f5efe4] text-[#855b25] flex items-center justify-center shrink-0 border border-[#ebd8c0]">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual Action Buttons - No dark backgrounds */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#f5efe4]">
                    <button
                      onClick={() => openBookingModal(service.recommendedPackageId)}
                      className="px-7 py-3 rounded-full bg-[#b88548] hover:bg-[#a07136] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Book This Session</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="#pricing"
                      className="px-6 py-3 rounded-full bg-white hover:bg-[#fbf8f2] text-[#2c2520] text-xs font-bold border-2 border-[#ebd8c0] hover:border-[#b88548] transition-colors"
                    >
                      View Package Cards
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
