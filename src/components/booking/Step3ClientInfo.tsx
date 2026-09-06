'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { User, Mail, Phone, FileText, Wand2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Step3ClientInfo() {
  const { clientInfo, setClientInfo } = useBooking();

  const handleFillDemo = () => {
    setClientInfo({
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '(415) 349-2041',
      notes: 'Prefer golden hour near coastal cliffs or quiet eucalyptus groves. Wardrobe is warm earth tones.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg sm:text-xl text-[#2c2520] font-bold mb-1">
            Client & Session Details
          </h3>
          <p className="text-xs text-[#7a6a5b] font-light">
            Where we send your shoot confirmation, styling guide, and contract agreement.
          </p>
        </div>

        {/* Demo Fast-fill button */}
        <Button
          type="button"
          variant="gold"
          size="sm"
          onClick={handleFillDemo}
          className="self-start sm:self-auto gap-1.5 cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Demo Auto-fill</span>
        </Button>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="client-name" className="flex items-center gap-1">
            <span>Full Name</span>
            <span className="text-[#b88548]">*</span>
          </Label>
          <div className="relative">
            <User className="w-4 h-4 text-[#9e8976] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              id="client-name"
              type="text"
              required
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className="pl-10"
            />
          </div>
        </div>

        {/* Email and Phone 2-Col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="client-email" className="flex items-center gap-1">
              <span>Email Address</span>
              <span className="text-[#b88548]">*</span>
            </Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9e8976] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="client-email"
                type="email"
                required
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                placeholder="sarah@example.com"
                className="pl-10"
              />
            </div>
            <span className="text-[10px] text-[#7a6a5b] block font-light">Contract & gallery link will arrive here</span>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="client-phone" className="flex items-center gap-1">
              <span>Mobile Phone</span>
              <span className="text-[#b88548]">*</span>
            </Label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#9e8976] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="client-phone"
                type="tel"
                required
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                placeholder="(415) 349-2041"
                className="pl-10"
              />
            </div>
            <span className="text-[10px] text-[#7a6a5b] block font-light">For location arrival coordination</span>
          </div>
        </div>

        {/* Shoot Notes */}
        <div className="space-y-1.5">
          <Label htmlFor="client-notes">
            Shoot Vision or Location Ideas (Optional)
          </Label>
          <div className="relative">
            <FileText className="w-4 h-4 text-[#9e8976] absolute left-3.5 top-3 pointer-events-none" />
            <Textarea
              id="client-notes"
              value={clientInfo.notes}
              onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
              placeholder="Tell us about the vibe, specific outfits, or locations you are considering..."
              className="pl-10 min-h-[85px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
