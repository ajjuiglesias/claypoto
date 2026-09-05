'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { ArrowRight, Calendar, Lock, Clock, Sparkles } from 'lucide-react';

export default function Hero() {
  const { openBookingModal } = useBooking();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10 pb-20 px-6">
      {/* Editorial High-Key Photography Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2200&auto=format&fit=crop')`,
        }}
      >
        {/* Soft luminous cream overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2] via-[#fbf8f2]/92 to-[#fbf8f2]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf8f2] via-transparent to-[#fbf8f2]/45" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Pre-header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ebd8c0] text-xs font-semibold text-[#855b25] mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#b88548]" />
          <span className="tracking-wider uppercase">Editorial & Intimate Story Photography</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#2c2520] leading-[1.1] mb-6 max-w-4xl">
          Capturing moments that feel{' '}
          <span className="italic text-[#b88548] font-normal">timeless</span>, not posed.
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-[#5c4f44] max-w-2xl font-light leading-relaxed mb-10">
          Elevated portraiture, couples, and creative brand photography crafted with natural light and intentional direction. Transparent packages, real-time availability, and frictionless 2-minute booking.
        </p>

        {/* High-Converting CTAs - White and Cream / Honey Gold */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
          <button
            onClick={() => openBookingModal('pkg-signature')}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#b88548] hover:bg-[#a07136] text-white font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Book Your Session</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#portfolio"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#fbf8f2] text-[#2c2520] border-2 border-[#ebd8c0] hover:border-[#b88548] text-base font-semibold transition-all shadow-xs"
          >
            <span>View Editorial Portfolio</span>
          </a>
        </div>

        {/* Trust Badges - Pure White & Cream Cards */}
        <div className="pt-8 border-t border-[#ebd8c0] grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#5c4f44]">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#ebd8c0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#f5efe4] flex items-center justify-center text-[#855b25] shrink-0 border border-[#ebd8c0]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#2c2520] text-xs uppercase tracking-wider">Live Calendar</div>
              <div className="text-xs text-[#7a6a5b]">Real-time golden hour slots</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#ebd8c0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#f5efe4] flex items-center justify-center text-[#855b25] shrink-0 border border-[#ebd8c0]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#2c2520] text-xs uppercase tracking-wider">Secure Deposit</div>
              <div className="text-xs text-[#7a6a5b]">Pay deposit today via Stripe</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#ebd8c0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#f5efe4] flex items-center justify-center text-[#855b25] shrink-0 border border-[#ebd8c0]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#2c2520] text-xs uppercase tracking-wider">2-Minute Checkout</div>
              <div className="text-xs text-[#7a6a5b]">Select, e-sign & confirm</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
