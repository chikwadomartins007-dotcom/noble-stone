import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  FileText, 
  Printer, 
  AlertCircle,
  Banknote,
  Clock,
  Phone,
  MapPin,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { Product, ProductFinish, CustomerOrder } from '../types';
import { PRODUCTS } from '../data/products';
import { formatPrice, generateOrderId, generateWhatsAppOrderLink, NIGERIAN_STATES } from '../utils/formatters';

interface PayOnDeliveryOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProduct?: Product | null;
  preSelectedFinish?: ProductFinish | null;
  onOrderCompleted?: (order: CustomerOrder) => void;
  onOpenTrackingWithId?: (orderId: string) => void;
}

export const PayOnDeliveryOrderModal: React.FC<PayOnDeliveryOrderModalProps> = ({
  isOpen,
  onClose,
  preSelectedProduct,
  preSelectedFinish,
  onOrderCompleted,
  onOpenTrackingWithId,
}) => {
  if (!isOpen) return null;

  // Selected product & finish state
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    preSelectedProduct || PRODUCTS[0]
  );
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(
    preSelectedFinish || (preSelectedProduct ? preSelectedProduct.finishes[0] : PRODUCTS[0].finishes[0])
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow (Fast Dispatch)');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomerOrder | null>(null);

  useEffect(() => {
    if (preSelectedProduct) {
      setSelectedProduct(preSelectedProduct);
      setSelectedFinish(preSelectedFinish || preSelectedProduct.finishes[0]);
    }
  }, [preSelectedProduct, preSelectedFinish]);

  const handleProductChange = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setSelectedFinish(prod.finishes[0]);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'NOBLE40' || code === 'LUXURY10') {
      const discount = Math.round(selectedProduct.salePrice * quantity * 0.1);
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code. Try LUXURY10 for extra 10% OFF.');
    }
  };

  const subtotal = selectedProduct.salePrice * quantity;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !deliveryAddress.trim() || !city.trim()) {
      alert('Please fill in your name, active phone number, address, and city for dispatch.');
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder: CustomerOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [
        {
          productId: selectedProduct.id,
          productTitle: selectedProduct.title,
          finishName: selectedFinish.name,
          quantity,
          price: selectedProduct.salePrice,
          imageUrl: selectedProduct.images[0],
        },
      ],
      customer: {
        fullName,
        phone,
        whatsappPhone: sameAsPhone ? phone : whatsappPhone,
        address: deliveryAddress,
        city,
        state,
        deliveryDatePreference: deliveryDate,
        notes,
      },
      pricing: {
        subtotal,
        discountAmount,
        deliveryFee: 0, // Free nationwide delivery
        total: finalTotal,
      },
      paymentMethod: 'pay-on-delivery',
      status: 'confirmed',
      trackingNumber: orderId,
    };

    // Forward to Formspree for immediate store email alerts
    try {
      await fetch('https://formspree.io/f/xyekoajq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Order #${orderId} - ${fullName} (₦${finalTotal.toLocaleString()})`,
          order_id: orderId,
          customer_name: fullName,
          phone_number: phone,
          whatsapp_number: sameAsPhone ? phone : whatsappPhone,
          delivery_address: deliveryAddress,
          city: city,
          state: state,
          product_ordered: selectedProduct.title,
          finish: selectedFinish.name,
          quantity,
          subtotal: `₦${subtotal.toLocaleString()}`,
          discount: discountAmount > 0 ? `₦${discountAmount.toLocaleString()}` : '₦0',
          total_due_on_delivery: `₦${finalTotal.toLocaleString()}`,
          payment_type: 'Payment on Delivery',
          delivery_timeline: deliveryDate,
          notes: notes || 'None',
          timestamp: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
        }),
      });
    } catch (err) {
      console.error('Failed to notify Formspree:', err);
    }

    // Save to localStorage for client-side persistence
    try {
      const existing = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
      localStorage.setItem('noblestone_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    setSubmittedOrder(newOrder);
    setIsSubmitting(false);

    if (onOrderCompleted) {
      onOrderCompleted(newOrder);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#0c0f16] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#171206] via-[#241a07] to-[#171206] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
              <Banknote className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Noblestone Pay-on-Delivery Checkout</span>
              </h2>
              <p className="text-[11px] text-[#e5c578]">
                Inspect &amp; Test Goods Upon Delivery Before Making Payment • 100% Zero Risk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/50 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedOrder ? (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Order Placed Successfully
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Dispatch Request Scheduled
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{submittedOrder.customer.fullName}</strong>. Our logistics manager is preparing your insured crate for priority delivery.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#151a24] to-[#0e1219] border border-[#d4af37]/40 max-w-md mx-auto text-left space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                <span className="text-zinc-400">Order Reference:</span>
                <span className="font-mono font-bold text-[#e5c578] text-sm">
                  {submittedOrder.orderId}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Item:</span>
                <span className="text-white font-medium text-right line-clamp-1 max-w-[220px]">
                  {submittedOrder.items[0].productTitle}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Finish:</span>
                <span className="text-[#d4af37] font-medium">
                  {submittedOrder.items[0].finishName}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Quantity:</span>
                <span className="text-white">{submittedOrder.items[0].quantity} Unit(s)</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="text-white font-medium text-right max-w-[200px]">
                  {submittedOrder.customer.address}, {submittedOrder.customer.city}, {submittedOrder.customer.state}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Estimated Delivery:</span>
                <span className="text-emerald-400 font-bold">
                  Within 24 - 48 Hours
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-zinc-300 font-bold text-xs">Amount Due on Delivery:</span>
                <span className="font-extrabold text-[#e5c578] text-base">
                  {formatPrice(submittedOrder.pricing.total)}
                </span>
              </div>
            </div>

            {/* Instant WhatsApp Confirmation Button */}
            <div className="max-w-md mx-auto space-y-3">
              <a
                href={generateWhatsAppOrderLink(
                  submittedOrder.orderId,
                  submittedOrder.customer.fullName,
                  submittedOrder.customer.phone,
                  submittedOrder.items[0].productTitle,
                  submittedOrder.items[0].finishName,
                  formatPrice(submittedOrder.pricing.total),
                  submittedOrder.customer.address,
                  submittedOrder.customer.state
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-transform shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenTrackingWithId) {
                      onOpenTrackingWithId(submittedOrder.orderId);
                    }
                  }}
                  className="py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Track Live Status</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Print Proforma</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="text-xs text-zinc-400 hover:text-white underline pt-2 block mx-auto cursor-pointer"
              >
                Continue Shopping Noblestone Fixtures
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-7 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Step 1: Product Selection & Summary */}
            <div className="p-4 rounded-xl bg-[#121620] border border-white/5 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <span className="font-cinzel text-white font-bold uppercase tracking-wider text-[11px]">
                  1. Fixture Selection
                </span>
                <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  5-Yr Warranty Included
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Product Thumbnail */}
                <div className="sm:col-span-3 aspect-square rounded-lg overflow-hidden bg-black/40 border border-white/10">
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Product Dropdown & Specs */}
                <div className="sm:col-span-9 space-y-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Select Fixture:</label>
                    <select
                      value={selectedProduct.id}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {PRODUCTS.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.title} — {formatPrice(prod.salePrice, prod.currency)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finish Selector */}
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      Architectural Finish: <strong className="text-[#e5c578]">{selectedFinish.name}</strong>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.finishes.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedFinish(f)}
                          className={`px-2.5 py-1 rounded text-[11px] border flex items-center gap-1.5 transition-all cursor-pointer ${
                            selectedFinish.id === f.id
                              ? 'border-[#d4af37] bg-[#d4af37]/15 text-white font-bold'
                              : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.hex }} />
                          <span>{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400">Qty:</span>
                      <div className="flex items-center bg-zinc-900 border border-white/10 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-l-lg text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-r-lg text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-[#e5c578]">
                        {formatPrice(selectedProduct.salePrice * quantity)}
                      </div>
                      <div className="text-[10px] text-zinc-500 line-through">
                        {formatPrice(selectedProduct.originalPrice * quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Customer Contact & Delivery Details */}
            <div className="space-y-4">
              <div className="font-cinzel text-white font-bold uppercase tracking-wider text-[11px] border-b border-white/5 pb-2 flex items-center justify-between">
                <span>2. Delivery &amp; Contact Details</span>
                <span className="text-[10px] text-zinc-400 font-sans font-normal">All fields required for dispatch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief Adeleke Johnson"
                    className="w-full bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">
                    Active Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* WhatsApp phone checkbox */}
              <div>
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="rounded border-zinc-700 text-[#d4af37] focus:ring-0"
                  />
                  <span>WhatsApp number is the same as my phone number</span>
                </label>
                {!sameAsPhone && (
                  <div className="mt-2">
                    <label className="text-[11px] text-zinc-300 block mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      placeholder="e.g. 0814 000 0000"
                      className="w-full bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                )}
              </div>

              {/* Street Address & City & State */}
              <div>
                <label className="text-[11px] text-zinc-300 block mb-1">
                  Full Delivery Address (Street, House/Plot No, Landmark) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. House 14, Admiralty Way, Lekki Phase 1"
                  className="w-full bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">
                    City / Town <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lekki / Ikeja / Maitama"
                    className="w-full bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">
                    State <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Timing preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">Preferred Delivery Timing</label>
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Today / Tomorrow (Express Dispatch)">Today / Tomorrow (Express Dispatch)</option>
                    <option value="Within 2-3 Business Days">Within 2-3 Business Days</option>
                    <option value="Weekend Delivery Preferred">Weekend Delivery Preferred</option>
                    <option value="Call Me To Schedule Exact Date">Call Me To Schedule Exact Date</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">Special Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Plumber is on site, call before dispatch"
                    className="w-full bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Highlight (Pay on Delivery) */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Payment Method: Pay on Delivery (POD)
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed pl-6">
                You will inspect the package in the presence of our courier driver. Once verified that the finish, glass, solid brass, and all accessories are in immaculate condition, you pay via <strong>Cash, Bank Transfer, or POS Machine</strong>.
              </p>
            </div>

            {/* Step 4: Promo Code & Price Calculation */}
            <div className="p-4 rounded-xl bg-[#121620] border border-white/5 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Promo Code (e.g. LUXURY10)"
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-white/10 cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {couponApplied && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  ✓ Code applied! You saved an additional {formatPrice(discountAmount)}
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-red-400 font-medium">
                  {couponError}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Promotional Discount:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Insured Nationwide Delivery:</span>
                  <span className="text-emerald-400 font-semibold">FREE (100% Covered)</span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="font-bold text-white text-sm">Total to Pay Upon Delivery:</span>
                  <span className="text-lg font-black text-[#e5c578]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Booking Insured Dispatch...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Confirm Order (Pay on Delivery)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  Zero Upfront Payment
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                  Direct Priority Courier
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
