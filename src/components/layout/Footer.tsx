'use client';

import React from 'react';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { ArrowUpRight, Camera, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { openBookingModal } = useBooking();

  return (
    <footer className="bg-[#f5efe4] border-t border-[#ebd8c0] pt-20 pb-12 px-6 text-sm text-[#5c4f44]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl tracking-[0.2em] font-bold text-[#2c2520] block">
              CLAY
            </span>
            <span className="text-[11px] tracking-[0.35em] text-[#855b25] uppercase font-bold block">
              Photographer
            </span>
          </Link>
          <p className="text-xs text-[#5c4f44] max-w-sm font-light leading-relaxed">
            Capturing organic, editorial, and intimate moments across the West Coast and worldwide destinations. Intentional imagery crafted to stand the test of time.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-[#7a6a5b]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Encrypted Stripe Checkout · Pixieset Client Delivery</span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c2520] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <a href="#portfolio" className="hover:text-[#855b25] transition-colors">Curated Portfolio</a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#855b25] transition-colors">Services & Disciplines</a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-[#855b25] transition-colors">Transparent Investment</a>
            </li>
            <li>
              <a href="#experience" className="hover:text-[#855b25] transition-colors">The 4-Step Experience</a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#855b25] transition-colors">Questions & Answers</a>
            </li>
            <li>
              <Link href="/admin" className="text-[#855b25] hover:underline flex items-center gap-1 font-bold mt-2">
                <span>Photographer Admin Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Reserve Session Direct */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c2520] mb-4">
            Instant Reservation
          </h4>
          <p className="text-xs text-[#5c4f44] font-light mb-4">
            Ready to secure your session date? The online booking process takes under two minutes.
          </p>
          <button
            onClick={() => openBookingModal('pkg-signature')}
            className="w-full py-3.5 rounded-full bg-[#b88548] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a07136] transition-colors shadow-md cursor-pointer"
          >
            Check Available Dates
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#ebd8c0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7a6a5b]">
        <div>
          &copy; {new Date().getFullYear()} Clay Photographer. All rights reserved.
        </div>
        <div className="flex items-center gap-6 font-medium">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span className="flex items-center gap-1 text-[#855b25] font-bold">
            <Camera className="w-3.5 h-3.5" /> High-Converting Architecture
          </span>
        </div>
      </div>
    </footer>
  );
}
