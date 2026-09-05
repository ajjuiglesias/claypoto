'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
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

  if (!isModalOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#362e26]/35 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border-2 border-[#ebd8c0] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Cream & White */}
        <div className="px-6 py-4 border-b border-[#ebd8c0] flex items-center justify-between bg-[#fbf8f2]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#855b25]">
              Clay Photographer · Instant Booking Engine
            </div>
            <h2 className="font-serif text-lg text-[#2c2520] font-bold">
              {currentStep === 6 ? 'Reservation Confirmed' : 'Reserve Your Photography Session'}
            </h2>
          </div>

          <button
            onClick={closeBookingModal}
            className="w-8 h-8 rounded-full bg-[#f5efe4] hover:bg-[#ebd8c0] flex items-center justify-center text-[#5c4f44] hover:text-[#2c2520] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Bar (Steps 1-5 only) */}
        {currentStep <= 5 && (
          <div className="px-6 py-3 bg-[#f5efe4] border-b border-[#ebd8c0] flex items-center justify-between">
            {steps.map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <div key={s.num} className="flex items-center gap-1.5 text-xs">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                      isActive
                        ? 'bg-[#b88548] text-white shadow-xs'
                        : isPast
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-[#7a6a5b] border border-[#ebd8c0]'
                    }`}
                  >
                    {isPast ? '✓' : s.num}
                  </div>
                  <span
                    className={`hidden sm:inline text-[11px] font-bold ${
                      isActive ? 'text-[#2c2520]' : isPast ? 'text-emerald-800' : 'text-[#7a6a5b]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="px-6 py-6 overflow-y-auto flex-grow bg-white">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium animate-shake">
              {errorMsg}
            </div>
          )}

          {currentStep === 1 && <Step1Package />}
          {currentStep === 2 && <Step2DateTime />}
          {currentStep === 3 && <Step3ClientInfo />}
          {currentStep === 4 && <Step4Agreement />}
          {currentStep === 5 && <Step5DepositPay />}
          {currentStep === 6 && <Step6Confirmation bookingId={confirmedBookingId} />}
        </div>

        {/* Modal Footer Controls (Steps 1-5 only) */}
        {currentStep <= 5 && (
          <div className="px-6 py-4 bg-[#fbf8f2] border-t border-[#ebd8c0] flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#5c4f44] hover:text-[#2c2520] transition-colors cursor-pointer ${
                currentStep === 1 ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#b88548] hover:bg-[#a07136] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>
                {currentStep === 1 && 'Continue to Date & Time'}
                {currentStep === 2 && 'Continue to Details'}
                {currentStep === 3 && 'Review Agreement'}
                {currentStep === 4 && `Proceed to Deposit ($${depositDue})`}
                {currentStep === 5 && `Pay $${depositDue} Deposit & Confirm`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
