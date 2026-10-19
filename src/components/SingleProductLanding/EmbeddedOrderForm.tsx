import React, { useState } from 'react';
import { 
  Banknote, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  MessageCircle, 
  Printer, 
  Phone, 
  MapPin, 
  Calendar,
  Lock
} from 'lucide-react';
import { ProductFinish, CustomerOrder } from '../../types';
import { LUXURY_FINISHES } from '../../data/products';
import { formatPrice, generateOrderId, generateWhatsAppOrderLink, NIGERIAN_STATES } from '../../utils/formatters';

interface EmbeddedOrderFormProps {
  selectedQuantity: number;
  onQuantityChange: (qty: number) => void;
  selectedFinish: ProductFinish;
  onFinishChange: (finish: ProductFinish) => void;
  onOrderSuccess: (order: CustomerOrder) => void;
  onOpenTrackingWithId: (id: string) => void;
}

export const EmbeddedOrderForm: React.FC<EmbeddedOrderFormProps> = ({
  selectedQuantity,
  onQuantityChange,
  selectedFinish,
  onFinishChange,
  onOrderSuccess,
  onOpenTrackingWithId,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [deliveryTiming, setDeliveryTiming] = useState('Today / Tomorrow (Express Dispatch)');
  const [specialNotes, setSpecialNotes] = useState('');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  // Price calculations based on package
  const getPackagePrice = (qty: number) => {
    if (qty === 1) return 265000;
    if (qty === 2) return 490000;
    if (qty === 3) return 710000;
    return qty * 265000;
  };

  const basePrice = getPackagePrice(selectedQuantity);
  const finalPrice = Math.max(0, basePrice - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'NOBLE40' || code === 'LUXURY10') {
      const disc = Math.round(basePrice * 0.1);
      setCouponDiscount(disc);
      setCouponSuccess(true);
    } else {
      setCouponError('Invalid promo code. Try LUXURY10 for extra 10% OFF.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder: CustomerOrder = {
        orderId,
        createdAt: new Date().toISOString(),
        items: [
          {
            productId: 'noblestone-imperial-piano-shower',
            productTitle: `Noblestone Imperial 5-Key Digital Piano Shower (${selectedQuantity} Set${selectedQuantity > 1 ? 's' : ''})`,
            finishName: selectedFinish.name,
            quantity: selectedQuantity,
            price: basePrice,
            imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          },
        ],
        customer: {
          fullName,
          phone,
          whatsappPhone: altPhone || phone,
          address,
          city,
          state,
          deliveryDatePreference: deliveryTiming,
          notes: specialNotes,
        },
        pricing: {
          subtotal: basePrice,
          discountAmount: couponDiscount,
          deliveryFee: 0,
          total: finalPrice,
        },
        paymentMethod: 'pay-on-delivery',
        status: 'confirmed',
        trackingNumber: orderId,
      };

      try {
        const stored = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
        localStorage.setItem('noblestone_orders', JSON.stringify([newOrder, ...stored]));
      } catch (err) {
        console.error(err);
      }

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 700);
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <section id="order-form" className="py-16 lg:py-24 bg-[#0a0d14] border-t border-[#d4af37]/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {confirmedOrder ? (
          /* Confirmation Success Screen */
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0e131d] border-2 border-[#d4af37] shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest">
                ORDER RECEIVED &amp; DISPATCH INITIATED
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Thank You, {confirmedOrder.customer.fullName}
              </h3>
              <p className="text-xs text-zinc-300 max-w-lg mx-auto">
                Your luxury consignment has been logged with our central logistics coordinator. Our dispatch driver will contact you at <strong className="text-white">{confirmedOrder.customer.phone}</strong> before arrival.
              </p>
            </div>

            {/* Official Order Summary Box */}
            <div className="p-5 rounded-xl bg-black/60 border border-white/10 max-w-lg mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-zinc-400">Order Reference ID:</span>
                <span className="font-mono font-bold text-[#e5c578] text-sm">
                  {confirmedOrder.orderId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">Package:</span>
                <span className="text-white font-medium">{confirmedOrder.items[0].productTitle}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">Finish:</span>
                <span className="text-[#e5c578] font-bold">{confirmedOrder.items[0].finishName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="text-white font-medium text-right max-w-[240px]">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">Payment Term:</span>
                <span className="text-emerald-400 font-bold">Pay on Delivery (Inspect First)</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                <span className="text-white font-bold">Total Amount Due on Arrival:</span>
                <span className="text-lg font-black text-[#e5c578]">
                  {formatPrice(confirmedOrder.pricing.total)}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Dispatch Trigger */}
            <div className="max-w-lg mx-auto space-y-3">
              <a
                href={generateWhatsAppOrderLink(
                  confirmedOrder.orderId,
                  confirmedOrder.customer.fullName,
                  confirmedOrder.customer.phone,
                  confirmedOrder.items[0].productTitle,
                  confirmedOrder.items[0].finishName,
                  formatPrice(confirmedOrder.pricing.total),
                  confirmedOrder.customer.address,
                  confirmedOrder.customer.state
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Instantly via WhatsApp with Dispatch Team</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenTrackingWithId(confirmedOrder.orderId)}
                  className="py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Track Consignment</span>
                </button>

                <button
                  onClick={printInvoice}
                  className="py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Print Proforma</span>
                </button>
              </div>

              <button
                onClick={() => setConfirmedOrder(null)}
                className="text-xs text-zinc-400 hover:text-white underline pt-2 cursor-pointer"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          /* High-Converting Embedded Form */
          <div className="rounded-2xl bg-gradient-to-b from-[#131824] via-[#0d1017] to-[#0a0d14] border-2 border-[#d4af37] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Top Security Banner */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/40 text-xs font-semibold text-[#e5c578]">
                <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Zero Risk • Insured White Glove Delivery</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
                Fill The Delivery Form Below
              </h2>

              <p className="text-xs sm:text-sm text-[#e5c578] font-medium">
                PAY ON DELIVERY NATIONWIDE — INSPECT BEFORE MAKING ANY PAYMENT!
              </p>

              {/* Direct-Response Nigerian Caution Box */}
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 max-w-xl mx-auto flex items-start gap-2.5 text-left mt-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>ATTENTION PLEASE:</strong> Please ONLY fill this order form if you are 100% ready to receive the goods within the next 24 to 72 hours, and the funds are available. We incur heavy insured logistics and freight costs on every delivery.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Package Choice */}
              <div className="space-y-3">
                <label className="font-cinzel text-xs font-bold text-white uppercase tracking-wider block">
                  Step 1: Choose Your Package Offer
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { qty: 1, title: '1 Shower Set', price: 265000, note: 'Standard Sanctuary Pack' },
                    { qty: 2, title: '2 Shower Sets', price: 490000, note: '+ FREE Waterfall Basin Tap!' },
                    { qty: 3, title: '3 Shower Sets', price: 710000, note: '+ 2x FREE Basin Taps!' },
                  ].map((pkg) => (
                    <button
                      key={pkg.qty}
                      type="button"
                      onClick={() => onQuantityChange(pkg.qty)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        selectedQuantity === pkg.qty
                          ? 'border-[#d4af37] bg-[#d4af37]/15 ring-2 ring-[#d4af37]/40 shadow-lg'
                          : 'border-white/10 bg-zinc-900/60 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{pkg.title}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedQuantity === pkg.qty ? 'border-[#d4af37] bg-[#d4af37]' : 'border-zinc-600'
                        }`}>
                          {selectedQuantity === pkg.qty && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-[#e5c578]">
                        {formatPrice(pkg.price)}
                      </div>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-1">
                        {pkg.note}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Finish Selection */}
              <div className="space-y-3">
                <label className="font-cinzel text-xs font-bold text-white uppercase tracking-wider block">
                  Step 2: Choose Architectural Finish
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    LUXURY_FINISHES.gunmetal,
                    LUXURY_FINISHES.brushedGold,
                    LUXURY_FINISHES.matteBlack,
                    LUXURY_FINISHES.chromeSilver,
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      type="button"
                      onClick={() => onFinishChange(fin)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        selectedFinish.id === fin.id
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-white font-bold shadow-md'
                          : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/50" style={{ backgroundColor: fin.hex }} />
                      <span className="text-xs truncate">{fin.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact & Delivery Information */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <label className="font-cinzel text-xs font-bold text-white uppercase tracking-wider block">
                  Step 3: Customer &amp; Delivery Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Your Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Chief Adeleke Johnson"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Active Phone Number (Calls/WhatsApp) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Alternative Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="e.g. 0814 000 8921"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      State for Delivery <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">
                    City / Town / Local Government <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lekki Phase 1 / Ikeja / Garki / Port Harcourt"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">
                    Full Street Address (Street Name, House/Plot Number, Nearest Landmark) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House 24, Bisola Durosinmi Etti Drive, Lekki Phase 1, Opposite Stanbic Bank"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      When Do You Want Delivery?
                    </label>
                    <select
                      value={deliveryTiming}
                      onChange={(e) => setDeliveryTiming(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Today / Tomorrow (Express Dispatch)">Today / Tomorrow (Express Dispatch)</option>
                      <option value="Within 2-3 Business Days">Within 2-3 Business Days</option>
                      <option value="Weekend Preferred (Saturday/Sunday)">Weekend Preferred (Saturday/Sunday)</option>
                      <option value="Call Me To Schedule Exact Time">Call Me To Schedule Exact Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Plumber is on site, call before dispatch"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Promo Code & Price Breakdown */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Promo Code (e.g. LUXURY10)"
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white border border-white/10 cursor-pointer"
                  >
                    Apply Code
                  </button>
                </div>

                {couponSuccess && (
                  <p className="text-[11px] text-emerald-400 font-semibold">
                    ✓ Promo Code Applied: Extra {formatPrice(couponDiscount)} discount!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400">
                    {couponError}
                  </p>
                )}

                <div className="space-y-1.5 text-xs pt-2 border-t border-white/10">
                  <div className="flex justify-between text-zinc-400">
                    <span>Selected Package ({selectedQuantity} Shower Set{selectedQuantity > 1 ? 's' : ''}):</span>
                    <span className="text-white">{formatPrice(basePrice)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount:</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>Priority Insured Delivery:</span>
                    <span className="text-emerald-400 font-bold">100% FREE</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                    <span className="text-sm font-bold text-white">Total To Pay On Delivery:</span>
                    <span className="text-xl font-black text-[#e5c578]">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#d4af37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Insured Dispatch Request...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-black" />
                      <span>SUBMIT ORDER &amp; DISPATCH (PAY ON DELIVERY)</span>
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Zero Upfront Payment
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5 text-[#d4af37]" />
                    Cash, Transfer, or POS On Delivery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                    Insured Nationwide Transit
                  </span>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
