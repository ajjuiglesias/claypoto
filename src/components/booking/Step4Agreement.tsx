'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { Check, ShieldCheck, PenLine, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
        <h3 className="font-serif text-lg sm:text-xl text-[#2c2520] font-bold mb-1">
          Photography Service Agreement
        </h3>
        <p className="text-xs text-[#7a6a5b] font-light">
          Review standard shoot terms, rescheduling policies, and electronic signature.
        </p>
      </div>

      {/* Contract Terms Box inside shadcn Card with ScrollArea */}
      <Card className="bg-[#fbf8f2] border-[#ebd8c0]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#ebd8c0] text-[11px] font-bold text-[#5c4f44]">
            <FileText className="w-3.5 h-3.5 text-[#b88548]" />
            <span>Standard Photography Terms ({selectedPackage.name})</span>
          </div>

          <ScrollArea className="max-h-44 pr-2 space-y-3 text-xs text-[#5c4f44] leading-relaxed font-light">
            <p>
              <strong className="text-[#2c2520] font-bold">1. Services & Deliverables:</strong> Clay Photographer agrees to perform professional photography services for the selected tier ({selectedPackage.name}). The client will receive the stated count of hand-retouched, high-resolution master digital files via a secure private online Pixieset gallery within standard turnaround timelines.
            </p>
            <p>
              <strong className="text-[#2c2520] font-bold">2. Reservation Deposit & Balance:</strong> A non-refundable reservation deposit of ${depositDue} is required to secure the selected date and time on the photographer&apos;s schedule. The remaining balance (${totalPrice - depositDue}) is due on or before the session date.
            </p>
            <p>
              <strong className="text-[#2c2520] font-bold">3. Weather & Rescheduling:</strong> In the event of inclement weather (severe rain, extreme wind) or emergency, the session may be rescheduled up to 48 hours prior with no penalty.
            </p>
            <p>
              <strong className="text-[#2c2520] font-bold">4. Rights & Usage:</strong> The client is granted an unrestricted, perpetual personal print and social media release. Commercial sessions include standard commercial licensing.
            </p>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Electronic Signature Field */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="sig-input" className="flex items-center gap-1">
            <span>Type Full Legal Name to e-Sign</span>
            <span className="text-[#b88548]">*</span>
          </Label>

          <div className="relative">
            <PenLine className="w-4 h-4 text-[#9e8976] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              id="sig-input"
              type="text"
              required
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder={clientInfo.name || 'e.g. Sarah Jenkins'}
              className="pl-10"
            />
          </div>
        </div>

        {/* Dynamic Signature Visual Preview */}
        {signature && (
          <Card className="bg-[#faf1e3]/60 border-dashed border-[#b88548]">
            <CardContent className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="text-[10px] uppercase text-[#7a6a5b] font-bold block mb-1">
                  Generated Signature:
                </span>
                <span className="font-serif italic text-xl sm:text-2xl text-[#855b25] tracking-wide break-words">
                  {signature}
                </span>
              </div>
              <Badge variant="success" className="gap-1 text-[10px] self-start sm:self-center">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Timestamped & Verified</span>
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Consent Checkbox */}
        <div
          onClick={handleAgreeClick}
          className="flex items-start gap-2.5 pt-1 cursor-pointer text-xs text-[#423830] select-none"
        >
          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            signature ? 'bg-[#b88548] border-[#b88548]' : 'bg-white border-[#ebd8c0]'
          }`}>
            {signature ? <Check className="w-3 h-3 text-white stroke-[3]" /> : null}
          </div>
          <span className="text-[11px] leading-tight font-medium">
            I confirm that I have reviewed and agree to the Clay Photography Service Agreement terms above.
          </span>
        </div>
      </div>
    </div>
  );
}
