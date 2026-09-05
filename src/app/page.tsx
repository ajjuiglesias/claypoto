import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import EditorialPortfolio from '@/components/sections/EditorialPortfolio';
import ServicesList from '@/components/sections/ServicesList';
import PricingCards from '@/components/sections/PricingCards';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import Testimonials from '@/components/sections/Testimonials';
import FaqSection from '@/components/sections/FaqSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fbf8f2]">
      {/* Floating Modern Luxury Navigation */}
      <Navbar />

      {/* Hero Conversion Funnel */}
      <Hero />

      {/* Editorial Intentional Portfolio (With Contextual CTAs) */}
      <EditorialPortfolio />

      {/* Services Breakdown with Inclusions */}
      <ServicesList />

      {/* Transparent Package Investment & Deposit Breakdown */}
      <PricingCards />

      {/* The 4-Step Frictionless Client Experience */}
      <ProcessTimeline />

      {/* Social Proof & Testimonials */}
      <Testimonials />

      {/* Common Client Questions & Policies */}
      <FaqSection />

      {/* Editorial Brand Footer */}
      <Footer />
    </main>
  );
}
