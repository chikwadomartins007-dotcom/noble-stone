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

  const selectedPkg = COOKER_PACKAGES.find(p => p.quantity === selectedQuantity) || COOKER_PACKAGES[0];
  const basePrice = selectedPkg.totalPrice;
  const finalPrice = Math.max(0, basePrice - couponDiscount);

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess(false);
    const code = couponCode.trim().toUpperCase();

    if (code === 'LUXURY10' || code === 'SAVE5000' || code === 'FLASH5K') {
      const discount = 5000;
      setCouponDiscount(discount);
      setCouponSuccess(true);
    } else if (code === 'NOBLE10K') {
      const discount = 10000;
      setCouponDiscount(discount);
      setCouponSuccess(true);
    } else if (code) {
      setCouponError('Invalid coupon code. Try "FLASH5K" for ₦5,000 instant discount.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const packageTitle = `Premium 2-Burner Flip-Up Glass Gas Cooker (${selectedPkg.label})`;

    const newOrder: CustomerOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [
        {
          productId: 'noblestone-2b-flip-cooker',
          productTitle: packageTitle,
          finishName: 'Crystal Tempered Glass (Black)',
          quantity: selectedQuantity,
          price: finalPrice,
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
      status: 'processing',
      trackingNumber: orderId,
    };

    // Forward to Formspree
    try {
      await fetch('https://formspree.io/f/xyekoajq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          order_type: 'Main Pay on Delivery Form',
          customer_name: fullName,
          phone_number: phone,
          alternative_phone: altPhone || phone,
          delivery_address: address,
          city_area: city,
          state: state,
          package_ordered: packageTitle,
          quantity: selectedQuantity,
          total_amount_payable_on_delivery: `₦${finalPrice.toLocaleString()}`,
          payment_terms: 'Pay on Delivery (Inspect before payment)',
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
    <section id="order-form" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative text-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {confirmedOrder ? (
          /* Order Confirmation View (WhatsApp button ONLY appears here after order is placed!) */
          <div className="rounded-2xl bg-white border-2 border-yellow-400 shadow-2xl p-6 sm:p-10 text-center space-y-6 animate-fade-in text-zinc-900">
            <div className="w-16 h-16 rounded-full bg-yellow-400 text-black mx-auto flex items-center justify-center shadow-lg shadow-yellow-500/25">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-black uppercase tracking-widest bg-yellow-400 px-3 py-1 rounded">
                ORDER RECEIVED &amp; DISPATCH INITIATED
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-zinc-950 mt-3">
                Thank You, {confirmedOrder.customer.fullName}
              </h3>
              <p className="text-xs text-zinc-600 max-w-lg mx-auto">
                Your Premium 2-Burner Flip-Up Glass Cooker order has been confirmed. Our dispatch logistics rider will call you at <strong className="text-black font-bold">{confirmedOrder.customer.phone}</strong> before delivery.
              </p>
            </div>

            {/* Official Order Summary Box */}
            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 max-w-lg mx-auto text-left space-y-3 text-xs text-zinc-700 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                <span className="text-zinc-500">Order Reference ID:</span>
                <span className="font-mono font-bold text-black text-sm">
                  {confirmedOrder.orderId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Package:</span>
                <span className="text-zinc-950 font-medium">{confirmedOrder.items[0].productTitle}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery Address:</span>
                <span className="text-zinc-950 font-medium text-right max-w-[240px]">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Payment Term:</span>
                <span className="text-black font-bold">Pay on Delivery (Inspect First)</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-200">
                <span className="text-zinc-950 font-bold">Total Amount Due on Arrival:</span>
                <span className="text-2xl font-black text-black">
                  {formatPrice(confirmedOrder.pricing.total)}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Dispatch Trigger (Rendered ONLY after customer completes placing order) */}
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
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>Confirm Instantly via WhatsApp with Dispatch Desk</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenTrackingWithId(confirmedOrder.orderId)}
                  className="py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold border border-zinc-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-black" />
                  <span>Track Consignment</span>
                </button>

                <button
                  onClick={printInvoice}
                  className="py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold border border-zinc-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-black" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <button
                onClick={() => setConfirmedOrder(null)}
                className="text-xs text-zinc-500 hover:text-black underline cursor-pointer pt-2 block mx-auto"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          /* High-Converting Embedded Form */
          <div className="rounded-2xl bg-zinc-50 border-2 border-yellow-400 shadow-xl p-6 sm:p-10 relative overflow-hidden text-zinc-900">
            
            {/* Top Security Banner */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-xs font-bold text-black">
                <Lock className="w-3.5 h-3.5 text-yellow-600" />
                <span>Zero Risk • Insured White-Glove Dispatch</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Fill The Delivery Form Below
              </h2>

              <p className="text-xs sm:text-sm text-black font-bold">
                PAY ON DELIVERY NATIONWIDE — INSPECT BEFORE MAKING ANY PAYMENT!
              </p>

              {/* Direct-Response Caution Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-yellow-300 text-xs text-zinc-800 max-w-xl mx-auto flex items-start gap-2.5 text-left mt-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>ATTENTION PLEASE:</strong> Please ONLY submit this order if you are 100% prepared to receive the cooker within the next 24 to 72 hours and payment is readily available. We incur substantial insured freight and handling costs on every dispatch.
                </p>
              </div>
            </div>

            <form action="https://formspree.io/f/xyekoajq" method="POST" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Package Choice */}
              <div className="space-y-3">
                <label className="font-cinzel text-xs font-bold text-zinc-950 uppercase tracking-wider block">
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
                          ? 'border-2 border-yellow-400 bg-yellow-400/15 shadow-md shadow-yellow-500/10'
                          : 'border-zinc-200 bg-white hover:border-yellow-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-zinc-950">{pkg.title}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          selectedQuantity === pkg.qty ? 'border-yellow-400 bg-yellow-400' : 'border-zinc-400'
                        }`}>
                          {selectedQuantity === pkg.qty && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-zinc-950">
                        {formatPrice(pkg.price)}
                      </div>
                      <p className="text-[10px] text-zinc-600 font-bold mt-0.5">
                        {pkg.note}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Contact & Delivery Information (NO WhatsApp number shown prior to order) */}
              <div className="space-y-4 pt-2 border-t border-zinc-200">
                <label className="font-cinzel text-xs font-bold text-zinc-950 uppercase tracking-wider block">
                  Step 2: Customer Contact &amp; Delivery Destination
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Your Full Name <span className="text-black font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Chief Adeleke Johnson"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Active Phone Number (Rider Will Call) <span className="text-black font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      Alternative Phone Line (Optional)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="e.g. 0814 777 8029"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                      State for Delivery <span className="text-black font-bold">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                    City / Town / LGA <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lekki Phase 1 / Ikeja / Garki / Port Harcourt"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-700 font-medium block mb-1">
                    Full Delivery Address (Street Name, House/Plot Number, Landmark) <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House 14, Admiralty Way, Lekki Phase 1, Opposite Stanbic Bank"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
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
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
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
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Promo Code & Price Calculation */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3 shadow-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Promo Code (e.g. FLASH5K)"
                    className="flex-1 bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 uppercase focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-xs font-black text-black cursor-pointer shadow-sm"
                  >
                    Apply Code
                  </button>
                </div>

                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 font-bold">
                    ✓ Promo Code Applied: Extra {formatPrice(couponDiscount)} discount!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {couponError}
                  </p>
                )}

                <div className="space-y-1.5 text-xs pt-2 border-t border-zinc-200">
                  <div className="flex justify-between text-zinc-600">
                    <span>Selected Package ({selectedQuantity} Cooker Set{selectedQuantity > 1 ? 's' : ''}):</span>
                    <span className="text-zinc-950 font-medium">{formatPrice(basePrice)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount:</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-600">
                    <span>Priority Insured Delivery:</span>
                    <span className="text-emerald-700 font-bold">100% FREE</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-zinc-200">
                    <span className="text-sm font-bold text-zinc-950">Total Due On Delivery:</span>
                    <span className="text-2xl font-black text-zinc-950">
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
                  className="w-full py-4 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-widest shadow-xl shadow-yellow-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-500" />
                    Zero Upfront Payment
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5 text-yellow-500" />
                    Cash, Transfer, or POS On Delivery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-yellow-500" />
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
