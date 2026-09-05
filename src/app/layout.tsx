import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '@/context/BookingContext';
import BookingModal from '@/components/booking/BookingModal';
import DemoSwitcherBar from '@/components/layout/DemoSwitcherBar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clay Photographer | Editorial Portrait & Story Photography',
  description:
    'Authentic, timeless photography for individuals, couples, and creative brands. Transparent pricing, instant availability, electronic agreements, and frictionless online booking.',
  keywords: [
    'editorial photography',
    'portrait photographer',
    'clay photographer',
    'online booking photography',
    'couples photoshoot',
    'creative branding photography',
  ],
  authors: [{ name: 'Clay Photographer' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#fbf8f2] text-[#2c2520] font-sans antialiased selection:bg-[#ebd8c0] selection:text-[#2c2520]">
        <BookingProvider>
          {/* Top Demo Bar for Client Review & Admin Switch */}
          <DemoSwitcherBar />
          
          {children}

          {/* Master 7-Step Interactive Booking Engine Modal */}
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
