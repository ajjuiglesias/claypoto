'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the deposit and payment structure work?',
      a: 'To lock in your date on our calendar, a modest deposit ($100 for Mini, $150 for Signature, $250 for Editorial) is paid online via secure Stripe or Apple Pay checkout. The remaining balance is not due until the day of our shoot.',
    },
    {
      q: 'What happens if the weather is poor on shoot day?',
      a: 'If rain, high winds, or severe overcast occurs, we will reach out 24 hours prior to assess. You have full freedom to reschedule to another available open date with zero fee or penalty.',
    },
    {
      q: 'How and when will I receive my retouched photos?',
      a: 'Your fully color-graded, high-resolution master gallery will be delivered via our secure private Pixieset gallery within 5–7 business days (or within 48 hours if you add priority rush). You can download web and print files, share with family, and order archival prints directly.',
    },
    {
      q: 'Do you help with wardrobe, styling, and locations?',
      a: 'Yes, absolutely! Once your booking is confirmed, you will receive our Curated Client Styling Guide with color palette suggestions, fabric textures that photograph beautifully in natural light, and our scouted location roster.',
    },
    {
      q: 'Can I reschedule if an unexpected emergency arises?',
      a: 'Life happens! You can reschedule your session date easily through your confirmation link up to 48 hours prior to our scheduled time without losing your deposit.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#ebd8c0]">
      <div className="text-center mb-10 sm:mb-16">
        <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#855b25] block mb-2 sm:mb-3">
          Clear Answers
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#2c2520] font-normal tracking-tight mb-2 sm:mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#5c4f44] font-light">
          Everything you need to know about our process, delivery, and policies.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#ebd8c0] overflow-hidden shadow-2xs transition-all hover:border-[#b88548]"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 text-[#2c2520] font-semibold text-sm sm:text-base hover:text-[#855b25] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#855b25] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-sm text-[#5c4f44] font-light leading-relaxed border-t border-[#f5efe4] pt-4 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
