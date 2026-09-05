'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { User, Mail, Phone, FileText, Wand2 } from 'lucide-react';

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
          <h3 className="font-serif text-xl text-[#1c1b19] font-semibold mb-1">
            Client Details
          </h3>
          <p className="text-xs text-[#5e5951] font-light">
            Where we send your shoot confirmation, styling guide, and contract.
          </p>
        </div>

        {/* Demo Fast-fill button */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#faf1e3] hover:bg-[#ebd8bd] text-[#8c6734] text-xs font-bold border border-[#d6ba92] transition-colors cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Demo Auto-fill</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-[#1c1b19] mb-1.5">
            Full Name <span className="text-[#8c6734]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#736c61] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#e8e2d5] text-[#1c1b19] text-sm focus:outline-none focus:border-[#8c6734] focus:ring-1 focus:ring-[#8c6734] transition-colors"
            />
          </div>
        </div>

        {/* Email and Phone 2-Col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1c1b19] mb-1.5">
              Email Address <span className="text-[#8c6734]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#736c61] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                placeholder="sarah@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#e8e2d5] text-[#1c1b19] text-sm focus:outline-none focus:border-[#8c6734] focus:ring-1 focus:ring-[#8c6734] transition-colors"
              />
            </div>
            <span className="text-[10px] text-[#736c61] mt-1 block font-medium">Contract & gallery link will arrive here</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1c1b19] mb-1.5">
              Mobile Phone <span className="text-[#8c6734]">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#736c61] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                placeholder="(555) 000-0000"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#e8e2d5] text-[#1c1b19] text-sm focus:outline-none focus:border-[#8c6734] focus:ring-1 focus:ring-[#8c6734] transition-colors"
              />
            </div>
            <span className="text-[10px] text-[#736c61] mt-1 block font-medium">For location arrival coordination</span>
          </div>
        </div>

        {/* Shoot Notes */}
        <div>
          <label className="block text-xs font-bold text-[#1c1b19] mb-1.5">
            Shoot Vision or Location Ideas (Optional)
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-[#736c61] absolute left-3.5 top-3.5" />
            <textarea
              rows={3}
              value={clientInfo.notes}
              onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
              placeholder="Tell us about the vibe, specific outfits, or locations you are considering..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e8e2d5] text-[#1c1b19] text-sm focus:outline-none focus:border-[#8c6734] focus:ring-1 focus:ring-[#8c6734] transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
