import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Lock,
  FileText
} from 'lucide-react';
import { formatPrice, generateOrderId, generateWhatsAppOrderLink, NIGERIAN_STATES } from '../../utils/formatters';
import { CustomerOrder } from '../../types';
import { trackMetaPurchase, trackMetaContact, trackMetaInitiateCheckout } from '../../utils/metaPixel';

interface CookerQuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQuantity?: number;
  onQuantityChange?: (qty: number) => void;
  onOrderSuccess: (order: CustomerOrder) => void;
  onOpenTrackingWithId: (orderId: string) => void;
}

export const CookerQuickOrderModal: React.FC<CookerQuickOrderModalProps> = ({
  isOpen,
  onClose,
  selectedQuantity = 1,
  onQuantityChange,
  onOrderSuccess,
  onOpenTrackingWithId,
}) => {
  const [internalQuantity, setInternalQuantity] = useState(selectedQuantity);
  const currentQuantity = selectedQuantity || internalQuantity;

  const setQuantity = (qty: number) => {
    if (onQuantityChange) {
      onQuantityChange(qty);
    } else {
      setInternalQuantity(qty);
    }
  };

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [deliveryTiming, setDeliveryTiming] = useState('Today / Tomorrow (Express Dispatch)');
  const [specialNotes, setSpecialNotes] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  if (!isOpen) return null;

  const getPackageTotal = (qty: number) => {
    if (qty === 1) return 170000;
    if (qty === 2) return 330000;
    if (qty === 3) return 480000;
    if (qty >= 4) return qty * 150000;
    return 170000;
  };

  const totalPrice = getPackageTotal(currentQuantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const packageTitle = `Premium 2-Burner Flip-Up Glass Gas Cooker (${currentQuantity} Set${currentQuantity > 1 ? 's' : ''})`;

    const newOrder: CustomerOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [
        {
          productId: 'noblestone-2b-flip-cooker',
          productTitle: packageTitle,
          finishName: 'Crystal Tempered Glass (Black)',
          quantity: currentQuantity,
          price: totalPrice,
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
        subtotal: totalPrice,
        discountAmount: currentQuantity > 1 ? (currentQuantity * 170000) - totalPrice : 0,
        deliveryFee: 0,
        total: totalPrice,
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
          order_type: 'Quick Order Pop-Up',
          customer_name: fullName,
          phone_number: phone,
          alternative_phone: altPhone || phone,
          delivery_address: address,
          city_area: city,
          state: state,
          package_ordered: packageTitle,
          quantity: currentQuantity,
          total_amount_payable_on_delivery: `₦${totalPrice.toLocaleString()}`,
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

    // Trigger Meta Pixel & Conversions API Purchase Event
    trackMetaPurchase({
      orderId: newOrder.orderId,
      total: newOrder.pricing.total,
      quantity: currentQuantity,
      productTitle: packageTitle,
      customer: {
        fullName,
        phone,
        address,
        city,
        state,
      },
    });

    setConfirmedOrder(newOrder);
    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      {/* Click outside to close (only if order not yet placed) */}
      <div 
        className="fixed inset-0" 
        onClick={() => {
          if (!isSubmitting) onClose();
        }} 
      />

      <div className="relative bg-white border-2 border-yellow-400 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto z-10 animate-fade-in text-zinc-900">
        
        {/* Top Header Bar */}
        <div className="bg-yellow-400 text-black px-5 py-3 sm:py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-black" />
              ⚡ QUICK ORDER • PAY ON DELIVERY (POD)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 active:scale-90 transition-transform cursor-pointer text-black"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 text-black mx-auto flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-yellow-400/20 text-black border border-yellow-400/40">
                Order Received &amp; Logged
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-3">
                Thank You, {confirmedOrder.customer.fullName}!
              </h2>
              <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
                Your order for the <strong className="text-black">Premium 2-Burner Flip-Up Cooker</strong> is booked. Our dispatch rider will call you shortly on <span className="text-black font-bold">{confirmedOrder.customer.phone}</span> prior to delivery.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 sm:p-5 text-left space-y-3">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <span className="text-xs text-zinc-500 uppercase font-semibold">Order Reference:</span>
                <span className="text-sm font-mono font-bold text-black">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Items:</span>
                <span className="text-zinc-950 font-medium">{confirmedOrder.items[0]?.productTitle}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Total Payable on Delivery:</span>
                <span className="text-zinc-950 font-black text-base">{formatPrice(confirmedOrder.pricing.total)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Delivery Address:</span>
                <span className="text-zinc-950 truncate max-w-[240px] font-medium">{confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Payment Terms:</span>
                <span className="text-zinc-950 font-medium">100% Cash / Bank Transfer upon arrival</span>
              </div>
            </div>

            {/* Post-Order WhatsApp Link (ONLY shown after order is placed!) */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppOrderLink(
                  confirmedOrder.orderId,
                  confirmedOrder.customer.fullName,
                  confirmedOrder.customer.phone,
                  confirmedOrder.items[0]?.productTitle || 'Premium 2-Burner Flip-Up Cooker',
                  'Crystal Tempered Glass',
                  formatPrice(confirmedOrder.pricing.total),
                  confirmedOrder.customer.address,
                  confirmedOrder.customer.state
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMetaContact('Quick Order WhatsApp Dispatch', confirmedOrder.orderId)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-sm shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Notify Dispatch on WhatsApp (09117446764)</span>
              </a>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTrackingWithId(confirmedOrder.orderId);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-200"
                >
                  <FileText className="w-4 h-4 text-black" />
                  Track Consignment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-700 transition-colors cursor-pointer border border-zinc-200"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Quick Order Form */
          <div className="p-5 sm:p-7 space-y-5 max-h-[85vh] overflow-y-auto">
            {/* Urgency & Product Mini-Card */}
            <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl shadow-xs">
              <img
                src="/images/He848b3e8bcc24b1e9c9d64ea2c2c4a96q.jpg"
                alt="2-Burner Flip-Up Cooker"
                className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg border border-zinc-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-yellow-400 text-black">
                  Special Promo Price
                </span>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950 truncate mt-1">
                  2-Burner 90° Flip-Up Glass Cooker
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-400 line-through">₦250,000</span>
                  <span className="text-sm sm:text-base font-black text-zinc-950">
                    {formatPrice(totalPrice)}
                  </span>
                  <span className="text-[10px] bg-yellow-400/20 text-black px-1.5 py-0.5 rounded font-bold border border-yellow-400/50">
                    Free Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Package Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-950 mb-2 uppercase tracking-wide">
                1. Select Quantity / Package:
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(1)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    currentQuantity === 1
                      ? 'border-2 border-yellow-400 bg-yellow-400/15 text-zinc-950 font-bold shadow-xs'
                      : 'border-zinc-200 bg-white hover:border-yellow-400 text-zinc-700'
                  }`}
                >
                  <span className="block text-xs font-semibold">1 Cooker</span>
                  <span className="block text-sm font-extrabold text-zinc-950 mt-0.5">₦170,000</span>
                  <span className="block text-[10px] text-zinc-500">Save ₦80k</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuantity(2)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                    currentQuantity === 2
                      ? 'border-2 border-yellow-400 bg-yellow-400/15 text-zinc-950 font-bold shadow-xs'
                      : 'border-zinc-200 bg-white hover:border-yellow-400 text-zinc-700'
                  }`}
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-yellow-400 text-black">
                    Popular
                  </span>
                  <span className="block text-xs font-semibold">2 Cookers</span>
                  <span className="block text-sm font-extrabold text-zinc-950 mt-0.5">₦330,000</span>
                  <span className="block text-[10px] text-zinc-600 font-bold">Extra ₦10k Off</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuantity(3)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    currentQuantity === 3
                      ? 'border-2 border-yellow-400 bg-yellow-400/15 text-zinc-950 font-bold shadow-xs'
                      : 'border-zinc-200 bg-white hover:border-yellow-400 text-zinc-700'
                  }`}
                >
                  <span className="block text-xs font-semibold">3 Cookers</span>
                  <span className="block text-sm font-extrabold text-zinc-950 mt-0.5">₦480,000</span>
                  <span className="block text-[10px] text-zinc-600 font-bold">Extra ₦30k Off</span>
                </button>
              </div>
            </div>

            {/* Direct Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <label className="block text-xs font-bold text-zinc-950 uppercase tracking-wide">
                2. Where Should We Deliver? (Payment on Delivery)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] text-zinc-700 font-medium mb-1">
                    Full Name <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief Emeka Adeleke"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  />
                </div>

                {/* Primary Phone */}
                <div>
                  <label className="block text-[11px] text-zinc-700 font-medium mb-1 flex items-center justify-between">
                    <span>Active Phone Number <span className="text-black font-bold">*</span></span>
                    <span className="text-[10px] text-zinc-500 font-normal">Rider will call</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0803 123 4567"
                      className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-[11px] text-zinc-700 font-medium mb-1">
                  Street Address &amp; Nearest Landmark <span className="text-black font-bold">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Plot 14 Admiralty Way, Lekki Phase 1, Near Ebeano"
                    className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-700 font-medium mb-1">
                    City / Town / Area <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ikeja / Lekki / Wuse 2"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-700 font-medium mb-1">
                    State <span className="text-black font-bold">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors cursor-pointer"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st} className="bg-white text-zinc-900">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Alternative Phone / Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-700 font-medium mb-1">
                    Alternative Phone Line (Optional)
                  </label>
                  <input
                    type="tel"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    placeholder="Alternative line"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-700 font-medium mb-1">
                    Preferred Delivery Timing
                  </label>
                  <select
                    value={deliveryTiming}
                    onChange={(e) => setDeliveryTiming(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors cursor-pointer"
                  >
                    <option value="Today / Tomorrow (Express Dispatch)">Today / Tomorrow (Express)</option>
                    <option value="Within 48 Hours">Within 48 Hours</option>
                    <option value="Weekend Delivery">This Weekend</option>
                  </select>
                </div>
              </div>

              {/* Trust Reassurance banner */}
              <div className="p-3 rounded-lg bg-amber-50 border border-yellow-300 flex items-start gap-2.5 text-[11px] text-zinc-800">
                <ShieldCheck className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-zinc-950">Zero-Risk Guarantee:</strong> You do <strong>not</strong> pay a kobo in advance. When the dispatch rider arrives at your doorstep, inspect and test the gas cooker thoroughly before handing over payment (Cash or Bank Transfer).
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-yellow-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Order...</span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-5 h-5" />
                      <span>SUBMIT QUICK ORDER (PAY {formatPrice(totalPrice)} ON DELIVERY)</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-yellow-600" />
                    Encrypted Direct Dispatch
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="hover:text-black underline cursor-pointer"
                  >
                    Continue browsing
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
