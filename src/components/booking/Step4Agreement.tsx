'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { Check, ShieldCheck, PenLine } from 'lucide-react';

export default function Step4Agreement() {
  const { clientInfo, signature, setSignature, selectedPackage, depositDue, totalPrice } = useBooking();

  const handleAgreeClick = () => {
    if (!signature && clientInfo.name) {
      setSignature(clientInfo.name);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl text-[#1c1b19] font-semibold mb-1">
          Photography Service Agreement
        </h3>
        <p className="text-xs text-[#5e5951] font-light">
          Review standard shoot terms and electronic signature.
        </p>
      </div>

      {/* Contract Terms Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f7f4ed] border border-[#e8e2d5] max-h-48 overflow-y-auto space-y-3 text-xs text-[#524c44] leading-relaxed font-light">
        <p>
          <strong className="text-[#1c1b19] font-bold">1. Services & Deliverables:</strong> Clay Photographer agrees to perform professional photography services for the selected tier ({selectedPackage.name}). The client will receive the stated count of hand-retouched, high-resolution master digital files via a secure private online Pixieset gallery within standard turnaround timelines.
        </p>
        <p>
          <strong className="text-[#1c1b19] font-bold">2. Deposit & Balance:</strong> A non-refundable reservation deposit of ${depositDue} is required to secure the selected date and time. The remaining balance (${totalPrice - depositDue}) is due on or before the session date.
        </p>
        <p>
          <strong className="text-[#1c1b19] font-bold">3. Weather & Rescheduling:</strong> In the event of inclement weather (severe rain, extreme wind) or emergency, the session may be rescheduled up to 48 hours prior with no penalty.
        </p>
        <p>
          <strong className="text-[#1c1b19] font-bold">4. Rights & Usage:</strong> The client is granted an unrestricted, perpetual personal print and social media release. Commercial sessions include standard commercial licensing.
        </p>
      </div>

      {/* Electronic Signature Field */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#1c1b19]">
          Type Full Legal Name to e-Sign: <span className="text-[#8c6734]">*</span>
        </label>

        <div className="relative">
          <PenLine className="w-4 h-4 text-[#736c61] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder={clientInfo.name || 'e.g. Sarah Jenkins'}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#e8e2d5] text-[#1c1b19] text-sm focus:outline-none focus:border-[#8c6734] focus:ring-1 focus:ring-[#8c6734] transition-colors"
          />
        </div>

        {/* Dynamic Signature Visual Preview */}
        {signature && (
          <div className="p-4 rounded-xl bg-[#faf1e3] border border-dashed border-[#b8915b] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-[#736c61] font-bold block mb-1">Generated Signature:</span>
              <span className="font-serif italic text-2xl text-[#8c6734] tracking-wide">
                {signature}
              </span>
            </div>
            <div className="text-right text-[10px] text-emerald-800 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Timestamped & Verified</span>
            </div>
          </div>
        )}

        {/* Quick Consent */}
        <div
          onClick={handleAgreeClick}
          className="flex items-start gap-2.5 pt-2 cursor-pointer text-xs text-[#423e38]"
        >
          <div className="w-4 h-4 rounded border border-[#8c6734] bg-[#faf1e3] flex items-center justify-center shrink-0 mt-0.5">
            {signature ? <Check className="w-3 h-3 text-[#8c6734] stroke-[3]" /> : null}
          </div>
          <span className="text-[11px] leading-tight font-medium">
            I confirm that I have reviewed and agree to the Clay Photography Service Agreement terms above.
          </span>
        </div>
      </div>
    </div>
  );
}
