'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { Sparkles, LayoutDashboard, Eye, Zap, ShieldCheck } from 'lucide-react';

export default function DemoSwitcherBar() {
  const pathname = usePathname();
  const { openBookingModal } = useBooking();
  const isAdmin = pathname === '/admin';

  return (
    <aside aria-label="Demo Prototype Controls" className="sticky top-0 z-50 bg-[#f5efe4] border-b border-[#e8dfcf] px-4 py-2 text-xs text-[#5c4f44] flex flex-wrap items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#855b25] font-semibold text-[11px] uppercase tracking-wider border border-[#ebd8c0]">
          <Sparkles className="w-3 h-3 text-[#b88548]" /> Live Prototype
        </span>
        <span className="hidden sm:inline text-[#7a6a5b]">
          Crafted for <strong>Clay Photographer</strong>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => openBookingModal()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#b88548] text-white font-semibold hover:bg-[#a07136] transition-colors shadow-xs cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Launch Booking Engine</span>
        </button>

        {isAdmin ? (
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#fbf8f2] text-[#2c2520] border border-[#e8dfcf] transition-colors font-semibold"
          >
            <Eye className="w-3.5 h-3.5 text-[#b88548]" />
            <span>Switch to Client Website</span>
          </Link>
        ) : (
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#fbf8f2] text-[#2c2520] border border-[#e8dfcf] transition-colors font-semibold"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#b88548]" />
            <span>Open Photographer Admin</span>
          </Link>
        )}

        <div className="hidden lg:flex items-center gap-1 text-[11px] text-[#7a6a5b] pl-2 border-l border-[#ebd8c0]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Pixieset & Stripe Ready</span>
        </div>
      </div>
    </aside>
  );
}
