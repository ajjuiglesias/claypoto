'use client';

import React, { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { CheckCircle2, Calendar, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Step6Confirmation({ bookingId }: { bookingId: string }) {
  const {
    selectedPackage,
    selectedDate,
    selectedSlot,
    clientInfo,
    depositDue,
    remainingBalance,
    closeBookingModal,
    resetBookingForm,
  } = useBooking();

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b88548', '#ebd8c0', '#f5efe4', '#855b25'],
      });
    } catch {}
  }, []);

  const handleFinish = () => {
    resetBookingForm();
    closeBookingModal();
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Clay Photographer Session - ${selectedPackage.name}`
  )}&dates=20261015T171500Z/20261015T184500Z&details=${encodeURIComponent(
    `Photo session with Clay Photographer.\nPackage: ${selectedPackage.name}\nBooking ID: ${bookingId}`
  )}`;

  return (
    <div className="text-center py-4 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-[#f5efe4] text-[#855b25] border border-[#ebd8c0] flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
      </div>

      <div>
        <span className="text-[11px] uppercase font-bold tracking-widest text-[#855b25] block mb-1">
          Date Secured & Confirmed
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#2c2520] font-bold mb-2">
          You&apos;re Booked, {clientInfo.name || 'Friend'}!
        </h3>
        <p className="text-xs text-[#5c4f44] max-w-md mx-auto font-light">
          Your reservation is locked in. We have emailed your official confirmation, styling guide, and signed contract to{' '}
          <strong className="text-[#2c2520] font-semibold">{clientInfo.email || 'your email'}</strong>.
        </p>
      </div>

      {/* Booking Receipt Summary Card - Pure Cream & White */}
      <div className="p-5 rounded-2xl bg-[#f5efe4] border border-[#ebd8c0] text-left max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#e8dfcf]">
          <span className="text-[#7a6a5b]">Booking Reference:</span>
          <span className="font-mono font-bold text-[#855b25]">{bookingId}</span>
        </div>

        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#e8dfcf]">
          <span className="text-[#7a6a5b]">Experience:</span>
          <span className="font-bold text-[#2c2520]">{selectedPackage.name}</span>
        </div>

        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#e8dfcf]">
          <span className="text-[#7a6a5b]">Reserved Time:</span>
          <span className="text-[#2c2520] font-semibold">
            {selectedDate} @ {selectedSlot?.time || '05:15 PM'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#e8dfcf]">
          <span className="text-[#7a6a5b]">Deposit Paid Today:</span>
          <span className="font-bold text-emerald-800">${depositDue}.00 (Stripe)</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#7a6a5b]">Remaining Balance:</span>
          <span className="font-bold text-[#2c2520]">${remainingBalance}.00 (Due on shoot day)</span>
        </div>
      </div>

      {/* Automated Next Steps */}
      <div className="p-4 rounded-xl bg-white border border-[#ebd8c0] max-w-md mx-auto text-left space-y-2 text-xs text-[#524c44] shadow-2xs">
        <div className="font-bold text-[#2c2520] flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#855b25]" />
          <span>What happens next?</span>
        </div>
        <div className="flex items-start gap-2">
          <Mail className="w-3.5 h-3.5 text-[#855b25] shrink-0 mt-0.5" />
          <span>Check your inbox for the Curated Wardrobe & Location Guide.</span>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#855b25] shrink-0 mt-0.5" />
          <span>Clay will check in 48 hours prior to finalize lighting and weather.</span>
        </div>
      </div>

      {/* Calendar Add & Finish Actions - No dark bg */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#fbf8f2] text-[#2c2520] text-xs font-bold flex items-center justify-center gap-2 border-2 border-[#ebd8c0] hover:border-[#b88548] transition-colors shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-[#855b25]" />
          <span>Add to Google Calendar</span>
        </a>

        <button
          onClick={handleFinish}
          className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-[#b88548] hover:bg-[#a07136] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          <span>Done & Return to Site</span>
        </button>
      </div>
    </div>
  );
}
