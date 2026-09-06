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
  Search,
  FileCheck,
  RefreshCw,
  SlidersHorizontal,
  Check,
  FileText,
} from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookingForContract, setSelectedBookingForContract] = useState<(typeof bookings)[0] | null>(null);

  // Package editor local state
  const [editingPackages, setEditingPackages] = useState(packages);
  const [savedNotice, setSavedNotice] = useState(false);
  const [isSyncingPixieset, setIsSyncingPixieset] = useState(false);
  const [syncNotice, setSyncNotice] = useState(false);

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
    setTimeout(() => setSavedNotice(false), 3500);
  };

  const handleSyncPixieset = () => {
    setIsSyncingPixieset(true);
    setTimeout(() => {
      setIsSyncingPixieset(false);
      setSyncNotice(true);
      setTimeout(() => setSyncNotice(false), 3500);
    }, 1200);
  };

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.clientName.toLowerCase().includes(q) ||
      b.clientEmail.toLowerCase().includes(q) ||
      b.packageName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#2c2520] pb-24 font-sans">
      {/* Admin Top Header - shadcn layout */}
      <header className="border-b border-[#ebd8c0] bg-white/95 backdrop-blur-md px-6 py-5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-2xl tracking-[0.12em] font-bold text-[#2c2520]">
                CLAY PHOTOGRAPHER
              </span>
              <Badge variant="gold" className="text-[10px] py-0.5">
                Studio Backend
              </Badge>
            </div>
            <p className="text-xs text-[#7a6a5b] mt-1 font-light">
              Management system for client reservations, calendar availability, contracts, and Pixieset syncing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="default"
              onClick={() => openBookingModal()}
              className="gap-2 shadow-sm hover:shadow-md uppercase tracking-wider text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Client Booking</span>
            </Button>

            <Button asChild variant="outline" size="default" className="gap-2">
              <Link href="/">
                <Eye className="w-3.5 h-3.5 text-[#b88548]" />
                <span>View Live Site</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        {/* KPI Metrics Strip - shadcn Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <Card className="bg-white hover:border-[#b88548]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="uppercase font-bold tracking-wider text-[10px]">
                Active Bookings
              </CardDescription>
              <div className="w-9 h-9 rounded-xl bg-[#f5efe4] text-[#855b25] flex items-center justify-center border border-[#ebd8c0]">
                <Users className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold text-[#2c2520]">
                {bookings.length}
              </div>
              <p className="text-[11px] text-[#7a6a5b] mt-1 font-light">
                Sessions locked in schedule
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:border-emerald-300 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="uppercase font-bold tracking-wider text-[10px]">
                Deposits Collected
              </CardDescription>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <DollarSign className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold text-emerald-800">
                ${depositsCollected}
              </div>
              <p className="text-[11px] text-[#7a6a5b] mt-1 font-light">
                Stripe verified deposits in hand
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:border-amber-300 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="uppercase font-bold tracking-wider text-[10px]">
                Pending Balances
              </CardDescription>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200">
                <Clock className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold text-[#855b25]">
                ${pendingBalances}
              </div>
              <p className="text-[11px] text-[#7a6a5b] mt-1 font-light">
                Due on session shoot days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:border-[#b88548]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="uppercase font-bold tracking-wider text-[10px]">
                Total Pipeline
              </CardDescription>
              <div className="w-9 h-9 rounded-xl bg-[#f5efe4] text-[#2c2520] flex items-center justify-center border border-[#ebd8c0]">
                <ShieldCheck className="w-4 h-4 text-[#855b25]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold text-[#2c2520]">
                ${totalRevenue}
              </div>
              <p className="text-[11px] text-[#7a6a5b] mt-1 font-light">
                Total contracted studio value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs - shadcn Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as typeof activeTab)}
          className="w-full space-y-6"
        >
          <TabsList className="bg-[#f5efe4] border-[#ebd8c0] h-auto p-1.5 flex flex-wrap sm:inline-flex gap-1">
            <TabsTrigger value="bookings" className="gap-2 py-2 px-4 text-xs">
              <Users className="w-3.5 h-3.5" />
              <span>Bookings ({bookings.length})</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="gap-2 py-2 px-4 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar Availability</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-2 py-2 px-4 text-xs">
              <Settings className="w-3.5 h-3.5" />
              <span>Packages & Rates</span>
            </TabsTrigger>
            <TabsTrigger value="pixieset" className="gap-2 py-2 px-4 text-xs">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Pixieset Integration</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Bookings & Client Management */}
          <TabsContent value="bookings" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl text-[#2c2520] font-bold">
                  Confirmed Client Sessions
                </h3>
                <p className="text-xs text-[#7a6a5b] font-light">
                  All reservations that have selected a package, signed the contract, and secured with deposit.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#9e8976] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client, package, ID..."
                  className="pl-9 h-10 text-xs"
                />
              </div>
            </div>

            {/* shadcn Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client & Reference</TableHead>
                  <TableHead>Package Tier</TableHead>
                  <TableHead>Date & Slot</TableHead>
                  <TableHead>Financials</TableHead>
                  <TableHead>Signed Agreement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-xs text-[#7a6a5b]">
                      No bookings found matching &quot;{searchQuery}&quot;. Click &quot;Test Client Booking&quot; above to create one!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((b) => (
                    <TableRow key={b.id} className="hover:bg-[#fbf8f2]/90">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#f5efe4] text-[#855b25] border border-[#ebd8c0] flex items-center justify-center font-serif font-bold text-xs shrink-0">
                            {b.clientName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[#2c2520] text-sm leading-tight">
                              {b.clientName}
                            </div>
                            <div className="text-[11px] text-[#7a6a5b]">{b.clientEmail}</div>
                            <div className="text-[10px] text-[#b88548] font-mono">{b.id} · {b.clientPhone}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="gold" className="text-[10px]">
                          {b.packageName}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="font-bold text-[#2c2520] text-xs">{b.date}</div>
                        <div className="text-[11px] text-[#855b25] font-medium">{b.timeSlot}</div>
                      </TableCell>

                      <TableCell>
                        <div className="text-emerald-800 font-bold text-xs">
                          +${b.depositPaid} deposit paid
                        </div>
                        <div className="text-[#7a6a5b] text-[11px]">
                          ${b.remainingBalance} due on shoot day
                        </div>
                        <div className="text-[10px] text-[#9e8976]">Total: ${b.totalPrice}</div>
                      </TableCell>

                      <TableCell>
                        <button
                          type="button"
                          onClick={() => setSelectedBookingForContract(b)}
                          className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-bold hover:underline cursor-pointer group"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="italic font-serif">{b.signature}</span>
                          <FileCheck className="w-3 h-3 text-[#b88548] opacity-60 group-hover:opacity-100" />
                        </button>
                        <div className="text-[10px] text-[#7a6a5b]">Binding e-Signature</div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedBookingForContract(b)}
                            className="text-[11px] gap-1"
                          >
                            <FileText className="w-3 h-3 text-[#855b25]" />
                            <span>Contract</span>
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert(`Resent shoot preparation and styling guide to ${b.clientEmail}`)}
                            className="text-[11px] gap-1 border-[#ebd8c0]"
                          >
                            <Send className="w-3 h-3 text-[#855b25]" />
                            <span>Guide</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          {/* TAB 2: Calendar & Date Blocking */}
          <TabsContent value="availability" className="space-y-4">
            <div>
              <h3 className="font-serif text-xl text-[#2c2520] font-bold">
                Calendar Availability & One-Click Date Blocker
              </h3>
              <p className="text-xs text-[#7a6a5b] font-light">
                Toggle the switch for any day below to instantly block or unblock it for bookings. Changes reflect immediately on the client booking page.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {availability.map((day) => (
                <Card
                  key={day.date}
                  className={`transition-all border ${
                    day.isBlocked
                      ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                      : 'bg-white border-[#ebd8c0] text-[#2c2520] hover:border-[#b88548]'
                  }`}
                >
                  <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] uppercase font-bold text-[#7a6a5b]">{day.dayOfWeek}</span>
                      <span className="font-mono text-[11px] text-[#9e8976]">{day.date.slice(5)}</span>
                    </div>

                    <div>
                      <div className="font-serif text-2xl font-bold">
                        {day.dayNumber}
                      </div>
                      <div className="mt-1">
                        {day.isBlocked ? (
                          <Badge variant="destructive" className="gap-1 text-[9px] py-0">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Blocked</span>
                          </Badge>
                        ) : (
                          <Badge variant="success" className="gap-1 text-[9px] py-0">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>4 Slots Open</span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#ebd8c0]/50 flex items-center justify-between">
                      <Label htmlFor={`switch-${day.date}`} className="text-[10px] text-[#7a6a5b]">
                        {day.isBlocked ? 'Blocked' : 'Available'}
                      </Label>
                      <Switch
                        id={`switch-${day.date}`}
                        checked={!day.isBlocked}
                        onCheckedChange={() => toggleDateBlock(day.date)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: Packages & Pricing Editor */}
          <TabsContent value="packages" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl text-[#2c2520] font-bold">
                  Session Packages & Live Price Editor
                </h3>
                <p className="text-xs text-[#7a6a5b] font-light">
                  Adjust session rates and deposit requirements. Updates reflect on client booking modal and pricing cards instantly.
                </p>
              </div>

              <Button
                variant="default"
                onClick={handleSavePackages}
                className="gap-2 shadow-sm uppercase text-xs font-bold tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Pricing Changes</span>
              </Button>
            </div>

            {savedNotice && (
              <Alert variant="success" className="animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <AlertTitle>Pricing Saved Successfully!</AlertTitle>
                <AlertDescription>
                  Your updated tier pricing and required deposit amounts are now live across the website and booking engine.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editingPackages.map((pkg) => (
                <Card key={pkg.id} className="bg-white border-[#ebd8c0]">
                  <CardHeader className="pb-3 border-b border-[#f5efe4]">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-[#2c2520]">{pkg.name}</CardTitle>
                      {pkg.isPopular && (
                        <Badge variant="gold" className="text-[9px]">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs">{pkg.tagline}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#5c4f44]">
                        Total Session Price ($ USD)
                      </Label>
                      <Input
                        type="number"
                        value={pkg.price}
                        onChange={(e) =>
                          handlePriceChange(pkg.id, Number(e.target.value), pkg.deposit)
                        }
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#5c4f44]">
                        Required Deposit Today ($ USD)
                      </Label>
                      <Input
                        type="number"
                        value={pkg.deposit}
                        onChange={(e) =>
                          handlePriceChange(pkg.id, pkg.price, Number(e.target.value))
                        }
                        className="font-mono text-sm text-[#855b25] font-bold"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-1.5 text-xs text-[#7a6a5b]">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold text-[#2c2520]">{pkg.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deliverables:</span>
                        <span className="font-semibold text-[#2c2520]">{pkg.imageCount}</span>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-bold pt-1">
                        <span>Client balance on shoot day:</span>
                        <span>${pkg.price - pkg.deposit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 4: Pixieset Integration */}
          <TabsContent value="pixieset" className="space-y-6">
            <Card className="bg-white border-[#ebd8c0]">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f5efe4]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5efe4] text-[#855b25] flex items-center justify-center border border-[#ebd8c0]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Pixieset Studio Sync & Client Deliveries</CardTitle>
                    <CardDescription>
                      Connected to Clay Photographer&apos;s Pixieset Client Gallery account.
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Badge variant="success" className="gap-1 py-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>API Connected</span>
                  </Badge>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSyncPixieset}
                    disabled={isSyncingPixieset}
                    className="gap-1.5 border-[#ebd8c0]"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#855b25] ${isSyncingPixieset ? 'animate-spin' : ''}`} />
                    <span>{isSyncingPixieset ? 'Syncing...' : 'Sync Galleries'}</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {syncNotice && (
                  <Alert variant="success">
                    <CheckCircle2 className="w-4 h-4" />
                    <AlertTitle>Pixieset Galleries Synced</AlertTitle>
                    <AlertDescription>
                      All active client albums, download permissions, and web proofs are synchronized with Pixieset cloud.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#423830] leading-relaxed">
                  <Card className="bg-[#fbf8f2] border-[#ebd8c0]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Why this architecture wins:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-[#5c4f44]">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#855b25] shrink-0 mt-0.5" />
                        <span><strong>Keep Existing Gallery Workflow:</strong> Upload photos to Pixieset Client Gallery exactly as usual with watermarking and print store.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#855b25] shrink-0 mt-0.5" />
                        <span><strong>Zero WordPress Headaches:</strong> No fragile plugins, slow database queries, or security vulnerabilities.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#855b25] shrink-0 mt-0.5" />
                        <span><strong>Instant Mobile Booking:</strong> Clients reserve dates and pay deposits in 2 minutes without leaving the page.</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#fbf8f2] border-[#ebd8c0]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Automated Pipeline:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs text-[#5c4f44]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-[#ebd8c0] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                        <span>Client selects package tier & date slot in booking engine.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-[#ebd8c0] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                        <span>Client signs photography service contract in 15 seconds.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-[#ebd8c0] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                        <span>Stripe verifies 30% deposit directly to photographer account.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-[#ebd8c0] text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                        <span>Date automatically locks on studio calendar.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-[#ebd8c0] text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
                        <span>Photographer shoots & uploads final deliverables to Pixieset.</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contract Viewer Dialog */}
      <Dialog
        open={!!selectedBookingForContract}
        onOpenChange={(open) => !open && setSelectedBookingForContract(null)}
      >
        <DialogContent className="max-w-xl p-6 bg-white border-[#ebd8c0]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold" className="text-[10px]">
                Signed Service Contract
              </Badge>
              <Badge variant="success" className="text-[10px]">
                Verified
              </Badge>
            </div>
            <DialogTitle>
              {selectedBookingForContract?.clientName} — Photography Agreement
            </DialogTitle>
            <DialogDescription>
              Reference: {selectedBookingForContract?.id} · Package: {selectedBookingForContract?.packageName}
            </DialogDescription>
          </DialogHeader>

          <Card className="bg-[#fbf8f2] border-[#ebd8c0] my-2">
            <CardContent className="p-4">
              <ScrollArea className="max-h-48 pr-2 space-y-2.5 text-xs text-[#5c4f44] font-light leading-relaxed">
                <p>
                  <strong>1. Services & Deliverables:</strong> Clay Photographer agrees to perform professional photography services for the selected tier ({selectedBookingForContract?.packageName}). The client receives hand-retouched, high-resolution master digital files via private online Pixieset gallery.
                </p>
                <p>
                  <strong>2. Financial Terms:</strong> Reservation deposit of ${selectedBookingForContract?.depositPaid} paid upon booking. Remaining balance of ${selectedBookingForContract?.remainingBalance} is due on or before the session date.
                </p>
                <p>
                  <strong>3. Rescheduling:</strong> In the event of severe weather or emergency, the session may be rescheduled up to 48 hours prior with no penalty.
                </p>
                <p>
                  <strong>4. Rights & Usage:</strong> Client receives unrestricted perpetual personal print and social media release.
                </p>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl bg-[#faf1e3]/70 border border-dashed border-[#b88548] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7a6a5b] block">
                Electronic Signature on File:
              </span>
              <span className="font-serif italic text-2xl text-[#855b25]">
                {selectedBookingForContract?.signature}
              </span>
            </div>
            <div className="text-right text-[11px] text-emerald-800 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Legally Binding</span>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <Button
              variant="outline"
              onClick={() => setSelectedBookingForContract(null)}
              className="border-[#ebd8c0]"
            >
              Close Agreement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
