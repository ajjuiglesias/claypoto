'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';

export default function Step5DepositPay() {
  const {
    selectedPackage,
    selectedDate,
    selectedSlot,
    totalPrice,
    depositDue,
    remainingBalance,
    clientInfo,
  } = useBooking();

  const [paymentOption, setPaymentOption] = useState<'deposit' | 'full'>('deposit');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('890');

  const amountToCharge = paymentOption === 'deposit' ? depositDue : totalPrice;
  const futureRemaining = paymentOption === 'deposit' ? remainingBalance : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl text-[#1c1b19] font-semibold mb-1">
          Review & Secure Checkout
        </h3>
        <p className="text-xs text-[#5e5951] font-light">
          Lock in your date. You will only be charged the amount selected below today.
        </p>
      </div>

      {/* Booking Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f7f4ed] border border-[#e8e2d5] space-y-3">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#ece5d8]">
          <span className="text-[#736c61]">Selected Session:</span>
          <span className="font-bold text-[#1c1b19]">{selectedPackage.name}</span>
        </div>

        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#ece5d8]">
          <span className="text-[#736c61]">Reserved Date & Slot:</span>
          <span className="font-bold text-[#1c1b19]">
            {selectedDate} @ {selectedSlot?.time || '05:15 PM'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#ece5d8]">
          <span className="text-[#736c61]">Client:</span>
          <span className="text-[#1c1b19] font-medium">{clientInfo.name || 'Sarah Jenkins'}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#736c61]">Total Session Fee:</span>
          <span className="font-bold text-[#1c1b19] text-sm">${totalPrice}</span>
        </div>
      </div>

      {/* Payment Option Toggle: Deposit vs Full */}
      <div>
        <label className="block text-xs font-bold text-[#1c1b19] mb-2">
          Choose How to Pay:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setPaymentOption('deposit')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              paymentOption === 'deposit'
                ? 'bg-[#fbf9f5] border-[#b8915b] ring-1 ring-[#b8915b] shadow-xs'
                : 'bg-white border-[#e8e2d5] text-[#5e5951] hover:border-[#b8915b]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#1c1b19]">Pay Deposit Only</span>
              <span className="text-sm font-bold text-[#8c6734]">${depositDue}</span>
            </div>
            <p className="text-[11px] text-[#736c61]">
              Remaining ${remainingBalance} due on shoot day.
            </p>
          </div>

          <div
            onClick={() => setPaymentOption('full')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              paymentOption === 'full'
                ? 'bg-[#fbf9f5] border-[#b8915b] ring-1 ring-[#b8915b] shadow-xs'
                : 'bg-white border-[#e8e2d5] text-[#5e5951] hover:border-[#b8915b]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#1c1b19]">Pay in Full</span>
              <span className="text-sm font-bold text-[#1c1b19]">${totalPrice}</span>
            </div>
            <p className="text-[11px] text-[#736c61]">
              All set! Zero balance on shoot day.
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Stripe Credit Card Fields */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e8e2d5] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1c1b19] flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#8c6734]" />
            <span>Credit / Debit Card</span>
          </span>
          <span className="text-[10px] text-[#736c61] font-medium">Powered by Stripe</span>
        </div>

        <div>
          <label className="block text-[11px] text-[#524c44] font-medium mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full pl-3.5 pr-28 py-2.5 rounded-xl bg-[#fbf9f5] border border-[#e8e2d5] text-[#1c1b19] text-xs font-mono focus:outline-none focus:border-[#8c6734]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[9px] sm:text-[10px] text-[#736c61] font-bold pointer-events-none">
              <span>VISA</span> · <span>MC</span> · <span>AMEX</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-[#524c44] font-medium mb-1">Expires (MM/YY)</label>
            <input
              type="text"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#fbf9f5] border border-[#e8e2d5] text-[#1c1b19] text-xs font-mono focus:outline-none focus:border-[#8c6734]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#524c44] font-medium mb-1">CVC / CVV</label>
            <input
              type="text"
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#fbf9f5] border border-[#e8e2d5] text-[#1c1b19] text-xs font-mono focus:outline-none focus:border-[#8c6734]"
            />
          </div>
        </div>
      </div>

      {/* Trust Guarantee Ribbon */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="leading-snug">Due today: <strong>${amountToCharge}.00</strong> {paymentOption === 'deposit' && `($${futureRemaining} balance due later)`}</span>
        </div>
        <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
      </div>
    </div>
  );
}
