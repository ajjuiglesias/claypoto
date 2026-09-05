'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { Sparkles, Calendar, PenTool, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProcessTimeline() {
  const { openBookingModal } = useBooking();

  const steps = [
    {
      num: '01',
      title: 'Select Your Experience',
      desc: 'Pick your preferred tier (Mini, Signature, or Editorial) with clear pricing and deliverables.',
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Choose Live Date & Lighting',
      desc: 'Browse actual live calendar openings. Select golden hour, morning glow, or studio time.',
      icon: Calendar,
    },
    {
      num: '03',
      title: 'Sign Agreement Online',
      desc: 'Review standard photography terms and sign electronically on your phone in 15 seconds.',
      icon: PenTool,
    },
    {
      num: '04',
      title: 'Pay Deposit & Celebrate',
      desc: 'Secure your date instantly with a small Stripe deposit. Remaining balance is due on shoot day.',
      icon: CreditCard,
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#f5efe4] border-t border-[#ebd8c0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#855b25] block mb-2 sm:mb-3">
            The Frictionless Journey
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#2c2520] font-normal tracking-tight mb-3 sm:mb-4">
            From Inspiration to Booked in 2 Minutes.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#5c4f44] font-light">
            No endless emails, no phone tag, and no PDF attachments. We respect your time with a modern booking experience you can complete from your phone.
          </p>
        </div>

        {/* 4 Connected Step Cards - White on Cream */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#ebd8c0] flex flex-col justify-between hover:border-[#b88548] hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#dfc8a8] group-hover:text-[#b88548] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#f5efe4] flex items-center justify-center text-[#855b25] border border-[#ebd8c0]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg text-[#2c2520] font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5c4f44] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#f5efe4] flex items-center gap-1.5 text-[11px] text-[#855b25] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={() => openBookingModal('pkg-signature')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#b88548] hover:bg-[#a07136] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <span>Experience The Booking Flow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
