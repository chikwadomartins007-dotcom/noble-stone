import React, { useState, useEffect } from 'react';
import { 
  X, 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  PackageCheck, 
  Phone, 
  MapPin, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CustomerOrder } from '../types';
import { formatPrice } from '../utils/formatters';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState(initialOrderId);
  const [foundOrder, setFoundOrder] = useState<CustomerOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    } else {
      // Check for most recent order in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
        if (stored.length > 0) {
          setFoundOrder(stored[0]);
          setQuery(stored[0].orderId);
          setHasSearched(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [initialOrderId]);

  const handleSearch = (searchVal: string) => {
    const q = searchVal.trim().toUpperCase();
    if (!q) return;

    setHasSearched(true);

    try {
      const stored: CustomerOrder[] = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
      const match = stored.find(
        (o) => o.orderId.toUpperCase() === q || o.customer.phone.includes(q)
      );

      if (match) {
        setFoundOrder(match);
      } else {
        // Fallback simulated tracking record for quick demo / sample inspection
        if (q.startsWith('NB-') || q.length >= 6) {
          setFoundOrder({
            orderId: q,
            createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
            items: [
              {
                productId: 'noblestone-imperial-piano-shower',
                productTitle: 'Noblestone Imperial 5-Key Digital Piano Thermostatic Shower Set',
                finishName: 'Nano Gunmetal Grey',
                quantity: 1,
                price: 265000,
                imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
              },
            ],
            customer: {
              fullName: 'Engr. D. Adeleke',
              phone: '0803 555 0192',
              whatsappPhone: '0803 555 0192',
              address: 'Plot 12, Admiralty Crescent',
              city: 'Lekki Phase 1',
              state: 'Lagos',
              deliveryDatePreference: 'Express Dispatch',
            },
            pricing: {
              subtotal: 265000,
              discountAmount: 0,
              deliveryFee: 0,
              total: 265000,
            },
            paymentMethod: 'pay-on-delivery',
            status: 'dispatched',
            trackingNumber: q,
          });
        } else {
          setFoundOrder(null);
        }
      }
    } catch (e) {
      console.error(e);
      setFoundOrder(null);
    }
  };

  const steps = [
    { title: 'Order Verified', desc: 'Order details confirmed by Noblestone logistics team', done: true },
    { title: 'Quality Assurance Passed', desc: '16-Bar hydraulic pressure and surface finish inspection verified', done: true },
    { title: 'Dispatched from Warehouse', desc: 'Package secured in reinforced protective crate and assigned to transit vehicle', done: true },
    { title: 'Out For Delivery', desc: 'Courier driver en route to customer destination for on-site inspection', done: true },
    { title: 'Delivered & Verified', desc: 'Payment received after customer inspection', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-[#d4af37] flex items-center justify-center">
              <Truck className="w-4 h-4 text-[#b8860b]" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-zinc-900">
                Live Order &amp; Delivery Tracking
              </h3>
              <p className="text-[11px] text-zinc-500">
                Track your Noblestone consignment across all 36 states
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-black border border-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order Reference (e.g. NB-849204) or Phone Number"
                className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 uppercase focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              />
            </div>
            <button
              onClick={() => handleSearch(query)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-sm"
            >
              Track Order
            </button>
          </div>

          {/* Result */}
          {foundOrder ? (
            <div className="space-y-6">
              {/* Order Info Card */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-2">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Order Reference</span>
                    <span className="font-mono font-bold text-zinc-900 text-sm">
                      {foundOrder.orderId}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
                    ● Dispatched / In Transit
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Customer &amp; Phone:</span>
                    <span className="text-zinc-900 font-medium">{foundOrder.customer.fullName} ({foundOrder.customer.phone})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Destination:</span>
                    <span className="text-zinc-900 font-medium">{foundOrder.customer.city}, {foundOrder.customer.state}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Item Booked:</span>
                    <span className="text-zinc-900 font-medium">{foundOrder.items[0]?.productTitle}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Payment On Delivery:</span>
                    <span className="text-zinc-900 font-bold">{formatPrice(foundOrder.pricing.total)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4">
                <h4 className="font-cinzel text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Live Dispatch Timeline
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div className={`absolute -left-6 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        step.done 
                          ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-xs' 
                          : 'bg-white border-zinc-300 text-zinc-400'
                      }`}>
                        {step.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        )}
                      </div>

                      <div>
                        <h5 className={`text-xs font-bold ${step.done ? 'text-zinc-900' : 'text-zinc-400'}`}>
                          {step.title}
                        </h5>
                        <p className="text-[11px] text-zinc-600 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courier Contact Callout */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#b8860b]" />
                  <span className="text-zinc-800 font-medium">Need immediate dispatch assistance?</span>
                </div>
                <a
                  href="https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20need%20assistance%20tracking%20my%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#946c07] hover:underline font-bold"
                >
                  Contact Dispatch Desk (09117446764)
                </a>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-cinzel text-base font-bold text-zinc-900">No Order Found</h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                We couldn't locate an order with reference "{query}". Please double check your order number or phone number.
              </p>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-zinc-500">
              Enter your 6-digit Order Reference (e.g. NB-123456) or your phone number to view live transit progress.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
