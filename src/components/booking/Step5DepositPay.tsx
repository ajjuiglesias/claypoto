'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { CreditCard, Lock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <h3 className="font-serif text-lg sm:text-xl text-[#2c2520] font-bold mb-1">
          Review & Secure Checkout
        </h3>
        <p className="text-xs text-[#7a6a5b] font-light">
          Lock in your shoot date. You will only be charged the amount selected below today.
        </p>
      </div>

      {/* Booking Summary Card */}
      <Card className="bg-[#fbf8f2] border-[#ebd8c0]">
        <CardContent className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Selected Session:</span>
            <span className="font-bold text-[#2c2520]">{selectedPackage.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Reserved Date & Slot:</span>
            <span className="font-bold text-[#2c2520]">
              {selectedDate} @ {selectedSlot?.time || '05:15 PM'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ebd8c0]/60">
            <span className="text-[#7a6a5b]">Client:</span>
            <span className="text-[#2c2520] font-medium">{clientInfo.name || 'Sarah Jenkins'}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-[#7a6a5b]">Total Session Fee:</span>
            <span className="font-bold text-[#2c2520] font-serif text-sm">${totalPrice}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Option Tabs */}
      <div className="space-y-2">
        <Label className="text-xs font-bold text-[#2c2520]">
          Choose Payment Schedule:
        </Label>
        <Tabs
          value={paymentOption}
          onValueChange={(val) => setPaymentOption(val as 'deposit' | 'full')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full h-14 bg-[#f5efe4] border-[#ebd8c0]">
            <TabsTrigger
              value="deposit"
              className="h-11 flex flex-col items-center justify-center data-[state=active]:bg-white data-[state=active]:text-[#2c2520] data-[state=active]:shadow-xs"
            >
              <span className="font-bold text-xs">Pay 30% Deposit Now</span>
              <span className="text-[10px] text-[#855b25] font-serif font-bold">${depositDue} today (${remainingBalance} later)</span>
            </TabsTrigger>
            <TabsTrigger
              value="full"
              className="h-11 flex flex-col items-center justify-center data-[state=active]:bg-white data-[state=active]:text-[#2c2520] data-[state=active]:shadow-xs"
            >
              <span className="font-bold text-xs">Pay Full Balance</span>
              <span className="text-[10px] text-[#2c2520] font-serif font-bold">${totalPrice} (Zero balance on shoot day)</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Simulated Credit Card Fields inside shadcn Card */}
      <Card className="bg-white border-[#ebd8c0]">
        <CardContent className="p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2c2520] flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#b88548]" />
              <span>Credit or Debit Card</span>
            </span>
            <Badge variant="secondary" className="text-[9px] gap-1">
              <Lock className="w-2.5 h-2.5 text-[#855b25]" />
              <span>Stripe 256-bit SSL</span>
            </Badge>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="card-number" className="text-[11px] text-[#5c4f44]">
              Card Number
            </Label>
            <div className="relative">
              <Input
                id="card-number"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="font-mono text-xs pr-24"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[9px] text-[#9e8976] font-bold pointer-events-none">
                <span>VISA</span> · <span>MC</span> · <span>AMEX</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="card-exp" className="text-[11px] text-[#5c4f44]">
                Expires (MM/YY)
              </Label>
              <Input
                id="card-exp"
                type="text"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="card-cvc" className="text-[11px] text-[#5c4f44]">
                CVC / CVV
              </Label>
              <Input
                id="card-cvc"
                type="text"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Guarantee Ribbon */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="leading-snug">
            Amount charged today: <strong className="font-serif font-bold text-sm">${amountToCharge}.00</strong> {paymentOption === 'deposit' && `($${futureRemaining} balance due on shoot day)`}
          </span>
        </div>
        <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
      </div>
    </div>
  );
}
