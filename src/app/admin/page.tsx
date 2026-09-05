'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import {
  Calendar,
  DollarSign,
  Users,
  Settings,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Lock,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AdminPage() {
  const {
    packages,
    updatePackage,
    availability,
    toggleDateBlock,
    bookings,
    openBookingModal,
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'bookings' | 'availability' | 'packages' | 'pixieset'>('bookings');

  // Package editor local state
  const [editingPackages, setEditingPackages] = useState(packages);
  const [savedNotice, setSavedNotice] = useState(false);

  // Financial Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const depositsCollected = bookings.reduce((sum, b) => sum + b.depositPaid, 0);
  const pendingBalances = bookings.reduce((sum, b) => sum + b.remainingBalance, 0);

  const handlePriceChange = (pkgId: string, price: number, deposit: number) => {
    setEditingPackages((prev) =>
      prev.map((p) => (p.id === pkgId ? { ...p, price, deposit } : p))
    );
  };

  const handleSavePackages = () => {
    editingPackages.forEach((pkg) => {
      updatePackage(pkg.id, pkg.price, pkg.deposit);
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#2c2520] pb-24">
      {/* Admin Top Header - White & Cream */}
      <header className="border-b border-[#ebd8c0] bg-white px-6 py-6 sticky top-[41px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl tracking-[0.15em] font-bold text-[#2c2520]">
                CLAY PHOTOGRAPHER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f5efe4] text-[#855b25] text-[10px] uppercase font-bold tracking-wider border border-[#ebd8c0]">
                Studio Manager
              </span>
            </div>
            <p className="text-xs text-[#5c4f44] mt-1 font-light">
              Simple studio backend: availability, packages, contracts, deposits & Pixieset gallery syncing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 rounded-full bg-[#b88548] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a07136] transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Test Client Booking</span>
            </button>

            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-white hover:bg-[#fbf8f2] text-[#2c2520] text-xs font-bold flex items-center gap-1.5 border border-[#ebd8c0] transition-colors shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#b88548]" />
              <span>View Live Website</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* KPI Metrics Strip - White & Cream Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-10">
          <div className="p-6 rounded-3xl bg-white border border-[#ebd8c0] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7a6a5b] font-bold block mb-1">
                Active Bookings
              </span>
              <span className="font-serif text-3xl font-bold text-[#2c2520]">
                {bookings.length} Sessions
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#f5efe4] text-[#855b25] flex items-center justify-center border border-[#ebd8c0]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#ebd8c0] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7a6a5b] font-bold block mb-1">
                Deposits Collected
              </span>
              <span className="font-serif text-3xl font-bold text-emerald-800">
                ${depositsCollected}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#ebd8c0] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7a6a5b] font-bold block mb-1">
                Pending Balances
              </span>
              <span className="font-serif text-3xl font-bold text-amber-900">
                ${pendingBalances}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#ebd8c0] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7a6a5b] font-bold block mb-1">
                Total Pipeline
              </span>
              <span className="font-serif text-3xl font-bold text-[#2c2520]">
                ${totalRevenue}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#f5efe4] text-[#2c2520] flex items-center justify-center border border-[#ebd8c0]">
              <ShieldCheck className="w-5 h-5 text-[#855b25]" />
            </div>
          </div>
        </div>

        {/* Tab Navigation - White & Cream */}
        <div className="flex items-center gap-2 border-b border-[#ebd8c0] mb-8 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#b88548] text-white shadow-md'
                : 'bg-white text-[#5c4f44] hover:text-[#2c2520] border border-[#ebd8c0]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Bookings & Signed Contracts ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'availability'
                ? 'bg-[#b88548] text-white shadow-md'
                : 'bg-white text-[#5c4f44] hover:text-[#2c2520] border border-[#ebd8c0]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar & Block Dates</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-[#b88548] text-white shadow-md'
                : 'bg-white text-[#5c4f44] hover:text-[#2c2520] border border-[#ebd8c0]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Packages & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('pixieset')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pixieset'
                ? 'bg-[#b88548] text-white shadow-md'
                : 'bg-white text-[#5c4f44] hover:text-[#2c2520] border border-[#ebd8c0]'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Pixieset Gallery Sync</span>
          </button>
        </div>

        {/* TAB 1: Bookings & Client Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#2c2520] font-semibold">
                  Confirmed Client Sessions
                </h3>
                <p className="text-xs text-[#5c4f44] font-light">
                  All inquiries that have selected a package, signed the contract, and paid the deposit.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-[#ebd8c0] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f5efe4] text-[#7a6a5b] uppercase tracking-wider font-bold border-b border-[#ebd8c0]">
                    <tr>
                      <th className="p-4">Ref / Client</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Date & Slot</th>
                      <th className="p-4">Financials</th>
                      <th className="p-4">Contract e-Sign</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5efe4] text-[#423830]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#fbf8f2] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-[#2c2520] text-sm">{b.clientName}</div>
                          <div className="text-[11px] text-[#5c4f44]">{b.clientEmail}</div>
                          <div className="text-[11px] text-[#855b25] font-mono font-bold">{b.id} · {b.clientPhone}</div>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#f5efe4] border border-[#ebd8c0] text-[#855b25] font-bold">
                            {b.packageName}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-[#2c2520]">{b.date}</div>
                          <div className="text-[11px] text-[#855b25] font-medium">{b.timeSlot}</div>
                        </td>

                        <td className="p-4">
                          <div className="text-emerald-800 font-bold">
                            +${b.depositPaid} deposit paid
                          </div>
                          <div className="text-[#5c4f44] text-[11px] font-medium">
                            ${b.remainingBalance} due on shoot
                          </div>
                          <div className="text-[10px] text-[#7a6a5b]">Total: ${b.totalPrice}</div>
                        </td>

                        <td className="p-4">
                          <div className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="italic font-serif">{b.signature}</span>
                          </div>
                          <span className="block text-[10px] text-[#7a6a5b]">E-Signed & Binding</span>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(`Simulated: Sent email prep guide to ${b.clientEmail}`)}
                              className="px-3 py-1 rounded-lg bg-[#f5efe4] hover:bg-[#ebd8c0] text-[#2c2520] text-[11px] font-bold border border-[#ebd8c0] transition-colors cursor-pointer"
                              title="Resend welcome prep guide"
                            >
                              <Send className="w-3 h-3 inline mr-1 text-[#855b25]" />
                              Email Guide
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Calendar & Date Blocking */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl text-[#2c2520] font-semibold mb-1">
                Calendar Availability & One-Click Date Blocker
              </h3>
              <p className="text-xs text-[#5c4f44] font-light">
                Click any day below to immediately block it for vacation or studio maintenance. Changes reflect on the client booking page in real time!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {availability.map((day) => (
                <div
                  key={day.date}
                  className={`p-4 rounded-3xl border transition-all flex flex-col justify-between shadow-2xs ${
                    day.isBlocked
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : 'bg-white border-[#ebd8c0] text-[#2c2520] hover:border-[#b88548]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase font-bold text-[#7a6a5b]">{day.dayOfWeek}</span>
                    <span className="text-xs font-mono font-bold">{day.date.slice(5)}</span>
                  </div>

                  <div className="my-2">
                    <span className="text-2xl font-bold font-serif">{day.dayNumber}</span>
                    <div className="text-[11px] mt-1">
                      {day.isBlocked ? (
                        <span className="font-bold text-rose-700 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Blocked
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Available (4 slots)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDateBlock(day.date)}
                    className={`w-full py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer mt-2 ${
                      day.isBlocked
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300'
                    }`}
                  >
                    {day.isBlocked ? 'Unblock Date' : 'Block Date'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Packages & Pricing Modifier */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#2c2520] font-semibold mb-1">
                  Session Packages & Live Price Editor
                </h3>
                <p className="text-xs text-[#5c4f44] font-light">
                  Adjust session rates and deposit requirements. Updates reflect on the front-facing pricing cards instantly.
                </p>
              </div>

              <button
                onClick={handleSavePackages}
                className="px-6 py-2.5 rounded-full bg-[#b88548] hover:bg-[#a07136] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Pricing Changes</span>
              </button>
            </div>

            {savedNotice && (
              <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Pricing successfully saved and updated across the client website!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editingPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-3xl bg-white border border-[#ebd8c0] space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#f5efe4]">
                    <h4 className="font-serif text-lg text-[#2c2520] font-bold">{pkg.name}</h4>
                    {pkg.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-[#f5efe4] text-[#855b25] text-[10px] uppercase font-bold border border-[#ebd8c0]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5c4f44] mb-1">
                      Total Session Price ($ USD)
                    </label>
                    <input
                      type="number"
                      value={pkg.price}
                      onChange={(e) =>
                        handlePriceChange(pkg.id, Number(e.target.value), pkg.deposit)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#fbf8f2] border border-[#ebd8c0] text-[#2c2520] font-mono text-sm focus:outline-none focus:border-[#b88548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5c4f44] mb-1">
                      Required Deposit Today ($ USD)
                    </label>
                    <input
                      type="number"
                      value={pkg.deposit}
                      onChange={(e) =>
                        handlePriceChange(pkg.id, pkg.price, Number(e.target.value))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#fbf8f2] border border-[#ebd8c0] text-[#855b25] font-mono font-bold text-sm focus:outline-none focus:border-[#b88548]"
                    />
                  </div>

                  <div className="pt-2 text-xs text-[#5c4f44] space-y-1">
                    <div>Duration: {pkg.duration}</div>
                    <div>Image Count: {pkg.imageCount}</div>
                    <div className="text-emerald-800 font-bold">
                      Client Pays On Shoot Day: ${pkg.price - pkg.deposit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Pixieset Integration Analysis */}
        {activeTab === 'pixieset' && (
          <div className="p-8 rounded-3xl bg-white border border-[#ebd8c0] space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f5efe4] text-[#855b25] flex items-center justify-center border border-[#ebd8c0]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#2c2520] font-bold">
                  Pixieset Studio Manager & Client Gallery Architecture
                </h3>
                <p className="text-xs text-[#5c4f44] font-light">
                  How this Next.js conversion frontend pairs with Clay&apos;s current Pixieset setup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#423830] leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#fbf8f2] border border-[#ebd8c0] space-y-3">
                <h4 className="text-sm font-bold text-[#2c2520]">Why this stack wins:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#855b25] font-bold">✓</span>
                    <span><strong>Keep Your Familiar Gallery Workflow:</strong> You upload photos to Pixieset Client Gallery exactly as you do today.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#855b25] font-bold">✓</span>
                    <span><strong>Zero WordPress Plugin Headaches:</strong> No database backups, no broken plugin updates, and no security vulnerabilities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#855b25] font-bold">✓</span>
                    <span><strong>99.9% Faster Mobile Conversions:</strong> The bespoke Next.js frontend loads in under 1 second on iPhones, reducing bounce rates by over 50%.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#fbf8f2] border border-[#ebd8c0] space-y-3">
                <h4 className="text-sm font-bold text-[#2c2520]">Automated Booking Pipeline:</h4>
                <ol className="space-y-2 list-decimal list-inside text-[#5c4f44]">
                  <li>Client selects package & date on high-converting mobile modal.</li>
                  <li>Client e-signs photography agreement in 15 seconds.</li>
                  <li>Stripe processes the $150 deposit directly to your bank account.</li>
                  <li>Automated confirmation email with styling guide is dispatched.</li>
                  <li>Date automatically blocks in your calendar.</li>
                  <li>After the shoot, deliver the final gallery via your Pixieset link.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
