'use client';

import React, { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { CheckCircle2, Calendar, Mail, Sparkles, Download, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
        particleCount: 90,
        spread: 80,
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
    <div className="text-center py-2 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-[#f5efe4] text-[#855b25] border-2 border-[#ebd8c0] flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
      </div>

      <div>
        <Badge variant="gold" className="text-[10px] mb-2 py-0.5 px-3">
          Date Secured & Confirmed
        </Badge>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#2c2520] font-bold mb-2">
          You&apos;re Booked, {clientInfo.name || 'Friend'}!
        </h3>
        <p className="text-xs text-[#7a6a5b] max-w-md mx-auto font-light leading-relaxed">
          Your reservation is officially locked in. We have emailed your session confirmation, curated styling guide, and signed agreement to{' '}
          <strong className="text-[#2c2520] font-semibold">{clientInfo.email || 'your email'}</strong>.
        </p>
      </div>

      {/* Booking Receipt Summary Card */}
      <Card className="bg-[#fbf8f2] border-[#ebd8c0] text-left max-w-md mx-auto shadow-xs">
        <CardContent className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Booking ID:</span>
            <span className="font-mono font-bold text-[#855b25]">{bookingId}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Experience:</span>
            <span className="font-bold text-[#2c2520]">{selectedPackage.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Reserved Slot:</span>
            <span className="text-[#2c2520] font-semibold">
              {selectedDate} @ {selectedSlot?.time || '05:15 PM'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Deposit Paid Today:</span>
            <span className="font-bold text-emerald-800">${depositDue}.00 (Stripe Verified)</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-[#7a6a5b]">Remaining Balance:</span>
            <span className="font-bold text-[#2c2520]">${remainingBalance}.00 (Due on shoot day)</span>
          </div>
        </CardContent>
      </Card>

      {/* Automated Next Steps */}
      <Card className="bg-white border-[#ebd8c0] max-w-md mx-auto text-left shadow-2xs">
        <CardContent className="p-4 space-y-2.5 text-xs text-[#5c4f44]">
          <div className="font-bold text-[#2c2520] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#b88548]" />
            <span>What happens next?</span>
          </div>
          <div className="flex items-start gap-2 text-[11px] font-light">
            <Mail className="w-3.5 h-3.5 text-[#b88548] shrink-0 mt-0.5" />
            <span>Check your inbox for the Curated Wardrobe & Location Guide.</span>
          </div>
          <div className="flex items-start gap-2 text-[11px] font-light">
            <Calendar className="w-3.5 h-3.5 text-[#b88548] shrink-0 mt-0.5" />
            <span>Clay will check in 48 hours prior to finalize lighting and weather.</span>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Add & Finish Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
        <Button
          asChild
          variant="outline"
          size="default"
          className="w-full sm:w-auto gap-2 border-[#ebd8c0]"
        >
          <a href={googleCalUrl} target="_blank" rel="noopener noreferrer">
            <Calendar className="w-3.5 h-3.5 text-[#b88548]" />
            <span>Add to Google Calendar</span>
          </a>
        </Button>

        <Button
          variant="default"
          size="default"
          onClick={handleFinish}
          className="w-full sm:w-auto px-8 font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-lg"
        >
          <span>Done & Return to Site</span>
        </Button>
      </div>
    </div>
  );
}
