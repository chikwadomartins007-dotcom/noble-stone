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
import { COOKER_PACKAGES } from '../../data/cookerData';
import { CustomerOrder } from '../../types';
import { formatPrice, generateOrderId, generateWhatsAppOrderLink, NIGERIAN_STATES } from '../../utils/formatters';

interface CookerOrderFormProps {
  selectedQuantity: number;
  onQuantityChange: (qty: number) => void;
  onOrderSuccess: (order: CustomerOrder) => void;
  onOpenTrackingWithId: (id: string) => void;
}

export const CookerOrderForm: React.FC<CookerOrderFormProps> = ({
  selectedQuantity,
  onQuantityChange,
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

  const getPackageTotal = (qty: number) => {
    if (qty === 1) return 170000;
    if (qty === 2) return 330000;
    if (qty === 3) return 480000;
    if (qty >= 4) return qty * 150000;
    return 170000;
  };

  const basePrice = getPackageTotal(selectedQuantity);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const packageTitle = `Premium 2-Burner Flip-Up Glass Gas Cooker (${selectedQuantity} Set${selectedQuantity > 1 ? 's' : ''})`;

    const newOrder: CustomerOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [
        {
          productId: 'noblestone-2b-flip-cooker',
          productTitle: packageTitle,
          finishName: 'Crystal Tempered Glass (Black)',
          quantity: selectedQuantity,
          price: basePrice,
          imageUrl: '/images/He848b3e8bcc24b1e9c9d64ea2c2c4a96q.jpg',
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

    // Forward order details directly to Formspree so store owner receives instant email notification
    try {
      await fetch('https://formspree.io/f/xyekoajq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Order #${orderId} - ${fullName} (₦${finalPrice.toLocaleString()})`,
          order_id: orderId,
          customer_name: fullName,
          phone_number: phone,
          whatsapp_or_alt_phone: altPhone || phone,
          delivery_address: address,
          city_area: city,
          state: state,
          package_ordered: packageTitle,
          quantity: selectedQuantity,
          unit_subtotal: `₦${basePrice.toLocaleString()}`,
          discount_applied: couponDiscount > 0 ? `₦${couponDiscount.toLocaleString()} (Code: ${couponCode})` : '₦0',
          total_amount_payable_on_delivery: `₦${finalPrice.toLocaleString()}`,
          payment_terms: 'Pay on Delivery (Inspect upon delivery before payment)',
          delivery_schedule_preference: deliveryTiming,
          special_notes_or_landmarks: specialNotes || 'None',
          order_timestamp: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
        }),
      });
    } catch (err) {
      console.error('Failed to notify Formspree:', err);
    }

    try {
      const stored = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
      localStorage.setItem('noblestone_orders', JSON.stringify([newOrder, ...stored]));
    } catch (err) {
      console.error(err);
    }

    setConfirmedOrder(newOrder);
    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <section id="order-form" className="py-16 lg:py-24 bg-white border-t border-zinc-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {confirmedOrder ? (
          /* Confirmation Success Screen */
          <div className="p-6 sm:p-10 rounded-2xl bg-white border-2 border-[#d4af37] shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#b8860b] uppercase tracking-widest">
                ORDER RECEIVED &amp; DISPATCH INITIATED
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-zinc-900">
                Thank You, {confirmedOrder.customer.fullName}
              </h3>
              <p className="text-xs text-zinc-600 max-w-lg mx-auto">
                Your Premium 2-Burner Flip-Up Glass Cooker order has been confirmed. Our dispatch logistics rider will contact you at <strong className="text-zinc-900">{confirmedOrder.customer.phone}</strong> before delivery.
              </p>
            </div>

            {/* Official Order Summary Box */}
            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 max-w-lg mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                <span className="text-zinc-500">Order Reference ID:</span>
                <span className="font-mono font-bold text-zinc-900 text-sm">
                  {confirmedOrder.orderId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Package:</span>
                <span className="text-zinc-900 font-medium">{confirmedOrder.items[0].productTitle}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery Address:</span>
                <span className="text-zinc-900 font-medium text-right max-w-[240px]">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Payment Term:</span>
                <span className="text-emerald-700 font-bold">Pay on Delivery (Inspect First)</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-200">
                <span className="text-zinc-900 font-bold">Total Amount Due on Arrival:</span>
                <span className="text-lg font-black text-zinc-900">
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
                  'Crystal Tempered Glass',
                  formatPrice(confirmedOrder.pricing.total),
                  confirmedOrder.customer.address,
                  confirmedOrder.customer.state
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Instantly via WhatsApp with Dispatch Desk</span>
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
                  <span>Print Invoice</span>
                </button>
              </div>

              <button
                onClick={() => setConfirmedOrder(null)}
                className="text-xs text-zinc-500 hover:text-zinc-900 underline pt-2 cursor-pointer"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          /* High-Converting Embedded Form */
          <div className="rounded-2xl bg-white border-2 border-[#d4af37] shadow-xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Top Security Banner */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
                <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Zero Risk • Insured White-Glove Dispatch</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-zinc-900">
                Fill The Delivery Form Below
              </h2>

              <p className="text-xs sm:text-sm text-[#946c07] font-bold">
                PAY ON DELIVERY NATIONWIDE — INSPECT BEFORE MAKING ANY PAYMENT!
              </p>

              {/* Direct-Response Caution Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 max-w-xl mx-auto flex items-start gap-2.5 text-left mt-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>ATTENTION PLEASE:</strong> Please ONLY submit this order if you are 100% prepared to receive the cooker within the next 24 to 72 hours and payment is readily available. We incur substantial insured freight and handling costs on every dispatch.
                </p>
              </div>
            </div>

            <form action="https://formspree.io/f/xyekoajq" method="POST" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Package Choice */}
              <div className="space-y-3">
                <label className="font-cinzel text-xs font-bold text-zinc-900 uppercase tracking-wider block">
                  Step 1: Select Your Package Quantity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { qty: 1, title: '1 Piece', price: 170000, note: 'Promo Rate' },
                    { qty: 2, title: '2 Pieces', price: 330000, note: '₦165,000 each' },
                    { qty: 3, title: '3 Pieces', price: 480000, note: '₦160,000 each' },
                    { qty: 4, title: '4+ Pieces', price: 600000, note: '₦150,000 each' },
                  ].map((pkg) => (
                    <button
                      key={pkg.qty}
                      type="button"
                      onClick={() => onQuantityChange(pkg.qty)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                        selectedQuantity === pkg.qty
                          ? 'border-[#d4af37] bg-amber-50/80 ring-2 ring-[#d4af37]/40 shadow-sm'
                          : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-zinc-900">{pkg.title}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          selectedQuantity === pkg.qty ? 'border-[#d4af37] bg-[#d4af37]' : 'border-zinc-400'
                        }`}>
                          {selectedQuantity === pkg.qty && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-zinc-900">
                        {formatPrice(pkg.price)}
                      </div>
                      <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        {pkg.note}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Contact & Delivery Information */}
              <div className="space-y-4 pt-2 border-t border-zinc-200">
                <label className="font-cinzel text-xs font-bold text-zinc-900 uppercase tracking-wider block">
                  Step 2: Customer Contact &amp; Delivery Destination
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Chief Adeleke Johnson"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Active Phone Number (Calls/WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Alternative Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="e.g. 0814 777 8029"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      State for Delivery <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                    City / Town / LGA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lekki Phase 1 / Ikeja / Garki / Port Harcourt"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                    Full Delivery Address (Street Name, House/Plot Number, Landmark) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House 14, Admiralty Way, Lekki Phase 1, Opposite Stanbic Bank"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      When Do You Want Delivery?
                    </label>
                    <select
                      value={deliveryTiming}
                      onChange={(e) => setDeliveryTiming(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    >
                      <option value="Today / Tomorrow (Express Dispatch)">Today / Tomorrow (Express Dispatch)</option>
                      <option value="Within 2-3 Business Days">Within 2-3 Business Days</option>
                      <option value="Weekend Preferred (Saturday/Sunday)">Weekend Preferred (Saturday/Sunday)</option>
                      <option value="Call Me To Schedule Exact Time">Call Me To Schedule Exact Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Call my security man at gate before arriving"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Promo Code & Price Calculation */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Promo Code (e.g. LUXURY10)"
                    className="flex-1 bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 uppercase focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black text-xs font-bold text-white cursor-pointer"
                  >
                    Apply Code
                  </button>
                </div>

                {couponSuccess && (
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Promo Code Applied: Extra {formatPrice(couponDiscount)} discount!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-medium">
                    {couponError}
                  </p>
                )}

                <div className="space-y-1.5 text-xs pt-2 border-t border-zinc-200">
                  <div className="flex justify-between text-zinc-600">
                    <span>Selected Package ({selectedQuantity} Cooker Set{selectedQuantity > 1 ? 's' : ''}):</span>
                    <span className="text-zinc-900 font-medium">{formatPrice(basePrice)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount:</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-600">
                    <span>Priority Insured Delivery:</span>
                    <span className="text-emerald-700 font-bold">100% FREE</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-zinc-200">
                    <span className="text-sm font-bold text-zinc-900">Total Due On Delivery:</span>
                    <span className="text-xl font-black text-zinc-900">
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
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-black text-sm uppercase tracking-widest shadow-xl shadow-[#d4af37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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

                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-600 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Zero Upfront Payment
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5 text-[#b8860b]" />
                    Cash, Transfer, or POS On Delivery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#b8860b]" />
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
