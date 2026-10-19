import React, { useState, useEffect } from 'react';
import { CookerHeader } from './components/CookerLanding/CookerHeader';
import { CookerHero } from './components/CookerLanding/CookerHero';
import { TrustBadges } from './components/TrustBadges';
import { CookerFeaturesBento } from './components/CookerLanding/CookerFeaturesBento';
import { CookerGalleryShowcase } from './components/CookerLanding/CookerGalleryShowcase';
import { CookerPricingPackages } from './components/CookerLanding/CookerPricingPackages';
import { CookerOrderForm } from './components/CookerLanding/CookerOrderForm';
import { CookerFaq } from './components/CookerLanding/CookerFaq';
import { ShowroomContactSection } from './components/ShowroomContactSection';
import { Footer } from './components/Footer';
import { CookerImageModal } from './components/CookerLanding/CookerImageModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CookerStickyBar } from './components/CookerLanding/CookerStickyBar';
import { CookerQuickOrderModal } from './components/CookerLanding/CookerQuickOrderModal';
import { CookerImage } from './data/cookerData';
import { CustomerOrder } from './types';
import { formatPrice, generateWhatsAppOrderLink } from './utils/formatters';

export default function App() {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [activeModalImage, setActiveModalImage] = useState<CookerImage | null>(null);
  
  // Tracking modal
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');

  // Track whether customer has completed an order (check localStorage or current session)
  const [hasPlacedOrder, setHasPlacedOrder] = useState<boolean>(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
      return Array.isArray(orders) && orders.length > 0;
    } catch {
      return false;
    }
  });

  const [latestOrder, setLatestOrder] = useState<CustomerOrder | null>(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('noblestone_orders') || '[]');
      return Array.isArray(orders) && orders.length > 0 ? orders[0] : null;
    } catch {
      return null;
    }
  });

  // Quick Order Popup state & 35-second interval timer
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);

  useEffect(() => {
    // If user has already placed an order, do not show pop up
    if (hasPlacedOrder) return;

    const intervalId = setInterval(() => {
      setIsQuickOrderOpen((prev) => {
        // Only open if not currently open
        if (!prev) {
          return true;
        }
        return prev;
      });
    }, 35000); // 35 seconds

    return () => clearInterval(intervalId);
  }, [hasPlacedOrder]);

  const scrollToOrder = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTrackingWithId = (id: string) => {
    setActiveTrackingId(id);
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Landing Header */}
      <CookerHeader
        onScrollToOrder={scrollToOrder}
        onOpenTracking={() => {
          setActiveTrackingId('');
          setIsTrackingOpen(true);
        }}
        hasPlacedOrder={hasPlacedOrder}
      />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Product Hero: Headline, 15-Image Gallery, Price ₦170,000, Stock Countdown & POD CTA */}
        <CookerHero
          onScrollToOrder={scrollToOrder}
          onOpenImageModal={(img) => setActiveModalImage(img)}
          hasPlacedOrder={hasPlacedOrder}
        />

        {/* Guarantees & Trust Badges */}
        <TrustBadges />

        {/* Core Bento Features: 90° Flip-Up Burner, Parts Diagram, Controls & Heat Distribution */}
        <CookerFeaturesBento
          onScrollToOrder={scrollToOrder}
          onOpenImageModal={(img) => setActiveModalImage(img)}
        />

        {/* Full 15-Photo Gallery Showcase with Category Filtering & Lightbox */}
        <CookerGalleryShowcase
          onOpenImageModal={(img) => setActiveModalImage(img)}
        />

        {/* Volume Pricing Packages (1, 2, 3, 4+ Units) */}
        <CookerPricingPackages
          selectedQuantity={selectedQuantity}
          onSelectQuantity={setSelectedQuantity}
          onScrollToOrder={scrollToOrder}
        />

        {/* Embedded Pay-on-Delivery Order Form */}
        <CookerOrderForm
          selectedQuantity={selectedQuantity}
          onQuantityChange={setSelectedQuantity}
          onOrderSuccess={(order: CustomerOrder) => {
            setHasPlacedOrder(true);
            setLatestOrder(order);
          }}
          onOpenTrackingWithId={handleOpenTrackingWithId}
        />

        {/* Technical FAQ */}
        <CookerFaq hasPlacedOrder={hasPlacedOrder} />

        {/* Physical Showroom & Contact Details */}
        <ShowroomContactSection hasPlacedOrder={hasPlacedOrder} />
      </main>

      {/* Footer */}
      <Footer
        onOpenTracking={() => {
          setActiveTrackingId('');
          setIsTrackingOpen(true);
        }}
        onSelectCategory={() => scrollToOrder()}
        onOpenOrderModal={() => setIsQuickOrderOpen(true)}
        hasPlacedOrder={hasPlacedOrder}
      />

      {/* Floating Sticky Mobile Buy Bar */}
      <CookerStickyBar onScrollToOrder={scrollToOrder} />

      {/* Quick Order Pop Up (Shows every 35 seconds until order is placed) */}
      <CookerQuickOrderModal
        isOpen={isQuickOrderOpen}
        onClose={() => setIsQuickOrderOpen(false)}
        selectedQuantity={selectedQuantity}
        onQuantityChange={setSelectedQuantity}
        onOrderSuccess={(order: CustomerOrder) => {
          setHasPlacedOrder(true);
          setLatestOrder(order);
        }}
        onOpenTrackingWithId={handleOpenTrackingWithId}
      />

      {/* Fullscreen Image Lightbox Modal */}
      <CookerImageModal
        image={activeModalImage}
        onClose={() => setActiveModalImage(null)}
        onScrollToOrder={scrollToOrder}
      />

      {/* Consignment Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={activeTrackingId}
      />

      {/* Floating WhatsApp Quick Contact Button (Rendered ONLY after customer has placed an order) */}
      {hasPlacedOrder && (
        <a
          href={
            latestOrder
              ? generateWhatsAppOrderLink(
                  latestOrder.orderId,
                  latestOrder.customer.fullName,
                  latestOrder.customer.phone,
                  latestOrder.items[0]?.productTitle || 'Premium 2-Burner Flip-Up Cooker',
                  'Crystal Tempered Glass',
                  formatPrice(latestOrder.pricing.total),
                  latestOrder.customer.address,
                  latestOrder.customer.state
                )
              : 'https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20have%20an%20inquiry%20regarding%20my%20order'
          }
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-emerald-300/40 cursor-pointer animate-fade-in"
          aria-label="Chat on WhatsApp 09117446764 regarding your placed order"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Dispatch: 09117446764</span>
          <span className="text-xs font-bold tracking-wide sm:hidden">WhatsApp Dispatch</span>
        </a>
      )}
    </div>
  );
}
