'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { ArrowRight, ArrowLeft, AlertCircle, Sparkles, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

import Step1Package from './Step1Package';
import Step2DateTime from './Step2DateTime';
import Step3ClientInfo from './Step3ClientInfo';
import Step4Agreement from './Step4Agreement';
import Step5DepositPay from './Step5DepositPay';
import Step6Confirmation from './Step6Confirmation';

export default function BookingModal() {
  const {
    isModalOpen,
    closeBookingModal,
    currentStep,
    setCurrentStep,
    selectedPackage,
    selectedDate,
    selectedSlot,
    clientInfo,
    signature,
    totalPrice,
    depositDue,
    remainingBalance,
    addBooking,
  } = useBooking();

  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const steps = [
    { num: 1, label: 'Package' },
    { num: 2, label: 'Date & Time' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Agreement' },
    { num: 5, label: 'Deposit' },
  ];

  const handleNext = () => {
    setErrorMsg('');

    if (currentStep === 3) {
      if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) {
        setErrorMsg('Please complete your name, email, and mobile phone before proceeding.');
        return;
      }
    }

    if (currentStep === 4) {
      if (!signature) {
        setErrorMsg('Please type your legal name above to e-sign the photography agreement.');
        return;
      }
    }

    if (currentStep === 5) {
      const newBooking = addBooking({
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        totalPrice: totalPrice,
        depositPaid: depositDue,
        remainingBalance: remainingBalance,
        date: selectedDate || 'Upcoming Weekend',
        timeSlot: selectedSlot?.time || '05:15 PM (Golden Hour Sunset)',
        clientName: clientInfo.name || 'Sarah Jenkins',
        clientEmail: clientInfo.email || 'sarah@example.com',
        clientPhone: clientInfo.phone || '(415) 349-2041',
        notes: clientInfo.notes,
        signature: signature || clientInfo.name,
        status: 'confirmed',
      });
      setConfirmedBookingId(newBooking.id);
      setCurrentStep(6);
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercent = Math.min(100, Math.round((currentStep / 5) * 100));

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeBookingModal()}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden border-2 border-[#ebd8c0] bg-white shadow-2xl">
        {/* Modal Top Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-[#ebd8c0] bg-[#fbf8f2]">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="gold" className="text-[9px] py-0.5 px-2">
              <Sparkles className="w-3 h-3 text-[#b88548]" />
              <span>Clay Photographer Booking</span>
            </Badge>
            {currentStep <= 5 && (
              <span className="text-[11px] font-bold text-[#7a6a5b]">
                Step {currentStep} of 5
              </span>
            )}
          </div>

          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-[#2c2520]">
              {currentStep === 6 ? 'Reservation Confirmed' : 'Reserve Your Photography Session'}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#7a6a5b]">
              {currentStep === 1 && 'Select your preferred photography tier and optional creative add-ons.'}
              {currentStep === 2 && 'Choose your date and optimal natural lighting time slot.'}
              {currentStep === 3 && 'Provide your contact info for shoot preparation and styling guide.'}
              {currentStep === 4 && 'Review standard shoot terms and complete electronic signature.'}
              {currentStep === 5 && 'Secure your booking date with a 30% reservation deposit.'}
              {currentStep === 6 && 'Your session is officially locked in. Calendar invite and styling guide are ready.'}
            </DialogDescription>
          </DialogHeader>

          {/* Stepper Progress Bar */}
          {currentStep <= 5 && (
            <div className="mt-3.5 space-y-2">
              <Progress value={progressPercent} className="h-1.5 bg-[#ebd8c0]" />
              <div className="flex items-center justify-between text-[11px] text-[#7a6a5b] font-medium">
                {steps.map((s) => {
                  const isActive = currentStep === s.num;
                  const isPast = currentStep > s.num;
                  return (
                    <span
                      key={s.num}
                      className={`flex items-center gap-1 transition-colors ${
                        isActive
                          ? 'text-[#855b25] font-bold'
                          : isPast
                          ? 'text-emerald-700 font-semibold'
                          : 'text-[#9e8976]'
                      }`}
                    >
                      {isPast ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                      <span className="hidden sm:inline">{s.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-5 sm:px-7 py-5 overflow-y-auto flex-grow bg-white max-h-[62vh]">
          {errorMsg && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          {currentStep === 1 && <Step1Package />}
          {currentStep === 2 && <Step2DateTime />}
          {currentStep === 3 && <Step3ClientInfo />}
          {currentStep === 4 && <Step4Agreement />}
          {currentStep === 5 && <Step5DepositPay />}
          {currentStep === 6 && <Step6Confirmation bookingId={confirmedBookingId} />}
        </div>

        {/* Modal Footer Controls */}
        {currentStep <= 5 && (
          <div className="px-5 sm:px-7 py-3.5 bg-[#fbf8f2] border-t border-[#ebd8c0] flex items-center justify-between gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`gap-1.5 text-xs text-[#5c4f44] border-[#ebd8c0] ${
                currentStep === 1 ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Button>

            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] uppercase font-bold text-[#7a6a5b]">Deposit Today</div>
                <div className="text-xs font-serif font-bold text-[#2c2520]">${depositDue}</div>
              </div>

              <Button
                variant="default"
                size="default"
                onClick={handleNext}
                className="gap-2 px-6 py-2.5 font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-lg"
              >
                <span>
                  {currentStep === 1 && 'Continue to Schedule'}
                  {currentStep === 2 && 'Continue to Details'}
                  {currentStep === 3 && 'Review Agreement'}
                  {currentStep === 4 && `Proceed to Deposit ($${depositDue})`}
                  {currentStep === 5 && `Pay $${depositDue} Deposit & Confirm`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
