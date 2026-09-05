'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Investment', href: '#pricing' },
    { label: 'The Experience', href: '#experience' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`sticky top-[41px] z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fbf8f2]/95 backdrop-blur-xl border-b border-[#ebd8c0] py-4 shadow-xs'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#2c2520] group-hover:text-[#b88548] transition-colors">
            CLAY
          </span>
          <span className="text-[10px] tracking-[0.35em] text-[#b88548] font-sans font-semibold uppercase">
            Photographer
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-[#5c4f44] hover:text-[#2c2520] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#b88548] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button - No dark bg! Warm Honey Gold */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => openBookingModal('pkg-signature')}
            className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#b88548] hover:bg-[#a07136] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Book Your Session</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#2c2520] hover:text-[#b88548] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-[#ebd8c0] px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-[#2c2520] hover:text-[#b88548] py-2 border-b border-[#f5efe4] font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openBookingModal('pkg-signature');
            }}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#b88548] text-white font-semibold text-sm shadow-md cursor-pointer"
          >
            <span>Book Your Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
}
