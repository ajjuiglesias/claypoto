import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Julianne & David Vance',
      session: 'Couples & Golden Hour Session',
      quote:
        'Clay made us feel instantly at ease. We usually hate being in front of cameras, but this felt like an intimate sunset walk. The booking process was shockingly simple—we reserved our slot from bed on a Friday night!',
      rating: 5,
    },
    {
      name: 'Sofia Al-Mansoor',
      session: 'Creative Founder & Brand Monograph',
      quote:
        'The photos elevated our entire brand identity. Editorial, warm, and intentional. Having transparent pricing and online agreement signing was so refreshing compared to other photographers who take days to reply.',
      rating: 5,
    },
    {
      name: 'Harrison Reed',
      session: 'Editorial Portrait',
      quote:
        'Every single frame looked like it came out of Kinfolk or GQ. Incredible understanding of natural directional light. 10/10 experience from booking to Pixieset gallery delivery.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#ebd8c0]">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#855b25] block mb-2 sm:mb-3">
          Client Words
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#2c2520] font-normal tracking-tight">
          Trust Built on Quiet Artistry
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ebd8c0] flex flex-col justify-between relative shadow-xs hover:shadow-lg transition-all"
          >
            <Quote className="w-8 h-8 text-[#dfc8a8]/40 absolute top-6 right-6" />

            <div>
              <div className="flex items-center gap-1 text-[#b88548] mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#b88548]" />
                ))}
              </div>
              <p className="text-sm text-[#423830] font-light leading-relaxed mb-6 italic">
                &ldquo;{r.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#f5efe4]">
              <div className="font-serif text-base text-[#2c2520] font-bold">{r.name}</div>
              <div className="text-xs text-[#7a6a5b]">{r.session}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
