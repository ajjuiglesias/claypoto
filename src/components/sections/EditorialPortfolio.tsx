'use client';

import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '@/data/portfolio';
import { useBooking } from '@/context/BookingContext';
import { ArrowUpRight, Sparkles, MapPin } from 'lucide-react';

type FilterCategory = 'all' | 'portraits' | 'couples' | 'branding' | 'weddings' | 'families';

export default function EditorialPortfolio() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const { openBookingModal } = useBooking();

  const categories: { label: string; key: FilterCategory }[] = [
    { label: 'All Curated Works', key: 'all' },
    { label: 'Portraits', key: 'portraits' },
    { label: 'Couples & Stories', key: 'couples' },
    { label: 'Creative Branding', key: 'branding' },
    { label: 'Elopements & Weddings', key: 'weddings' },
    { label: 'Families', key: 'families' },
  ];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#855b25] block mb-2 sm:mb-3">
            Curated Visual Archive
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#2c2520] font-normal tracking-tight">
            Intentional, Not Overwhelming.
          </h2>
        </div>
        <p className="text-[#5c4f44] max-w-md text-xs sm:text-sm lg:text-base font-light">
          Every session is bespoke. Browse our recent stories below—each collection directly connects to available dates and packages with zero dead ends.
        </p>
      </div>

      {/* Category Pills - White and Cream */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-[#b88548] text-white shadow-md'
                : 'bg-white text-[#5c4f44] hover:text-[#2c2520] border border-[#ebd8c0] hover:border-[#b88548]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="editorial-card group relative bg-white rounded-3xl overflow-hidden border border-[#ebd8c0] flex flex-col justify-between transition-all duration-300 hover:border-[#b88548] hover:shadow-xl hover:-translate-y-1"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f5efe4]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="editorial-img w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Category Badge - Cream & White */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#855b25] uppercase tracking-wider border border-[#ebd8c0] shadow-xs">
                {item.category}
              </div>
              {/* Location Tag - Cream & White (No dark background!) */}
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] text-[#2c2520] font-semibold flex items-center gap-1.5 border border-[#ebd8c0] shadow-xs">
                <MapPin className="w-3 h-3 text-[#b88548]" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Content & Actionable CTA */}
            <div className="p-6 flex flex-col justify-between flex-grow bg-white">
              <div>
                <h3 className="font-serif text-xl text-[#2c2520] font-medium mb-2 group-hover:text-[#855b25] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5c4f44] line-clamp-2 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Contextual Link to Booking (Zero Dead Ends) */}
              <div className="pt-4 border-t border-[#f5efe4] flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#7a6a5b]">
                  Ready to shoot this style?
                </span>
                <button
                  onClick={() => openBookingModal(item.recommendedPackageId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855b25] hover:text-[#5c401b] group/btn transition-colors cursor-pointer"
                >
                  <span>Book This Vibe</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bridge Banner */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-[#f5efe4] border border-[#ebd8c0] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#ebd8c0] flex items-center justify-center text-[#855b25] shrink-0 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[#2c2520] font-serif text-lg font-semibold">Looking for something distinctive?</h4>
            <p className="text-xs sm:text-sm text-[#5c4f44] font-light mt-1">
              We offer bespoke commercial productions, multi-day weddings, and studio rentals.
            </p>
          </div>
        </div>
        <button
          onClick={() => openBookingModal('pkg-editorial')}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#b88548] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a07136] transition-colors shrink-0 shadow-md cursor-pointer"
        >
          Check Date Availability
        </button>
      </div>
    </section>
  );
}
