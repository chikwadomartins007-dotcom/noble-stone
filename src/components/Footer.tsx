import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ArrowUp,
  MessageCircle,
  Banknote,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenOrderModal: () => void;
  hasPlacedOrder?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onSelectCategory,
  onOpenOrderModal,
  hasPlacedOrder = false,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-zinc-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Banknote className="w-6 h-6 text-[#b8860b] shrink-0" />
            <div>
              <h5 className="font-bold text-zinc-900 text-xs">Pay On Delivery Nationwide</h5>
              <p className="text-[11px] text-zinc-500">Inspect &amp; confirm before you pay</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Truck className="w-6 h-6 text-[#b8860b] shrink-0" />
            <div>
              <h5 className="font-bold text-zinc-900 text-xs">Free Priority Delivery</h5>
              <p className="text-[11px] text-zinc-500">Fast insured dispatch to all 36 states</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#b8860b] shrink-0" />
            <div>
              <h5 className="font-bold text-zinc-900 text-xs">5-Year Brass Engine Warranty</h5>
              <p className="text-[11px] text-zinc-500">Solid refined H59 brass valves</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Award className="w-6 h-6 text-[#b8860b] shrink-0" />
            <div>
              <h5 className="font-bold text-zinc-900 text-xs">100% Genuine Sanware</h5>
              <p className="text-[11px] text-zinc-500">Pre-tested under 16-bar pressure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#806114] p-0.5 shadow-sm">
                <div className="w-full h-full bg-zinc-900 rounded-[7px] flex items-center justify-center">
                  <span className="font-cinzel text-base font-extrabold text-[#d4af37]">
                    NB
                  </span>
                </div>
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-zinc-900">
                  NOBLESTONE
                </span>
                <span className="block text-[8px] tracking-[0.38em] text-[#b8860b] font-semibold uppercase -mt-0.5">
                  BATHROOMS
                </span>
              </div>
            </div>

            <p className="text-zinc-600 font-normal leading-relaxed max-w-sm">
              NOBLESTONE BATHROOMS is a premier purveyor of architectural bathroom sanware and luxury kitchen workstations. Engineered with refined brass engines, micro-hydro digital displays, and titanium coatings.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {hasPlacedOrder && (
                <a
                  href="https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20have%20an%20inquiry%20regarding%20my%20placed%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#1ea952] font-bold text-xs flex items-center gap-2 hover:bg-[#25D366]/30 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 09117446764</span>
                </a>
              )}

              <button
                onClick={onOpenOrderModal}
                className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e5c578] transition-colors cursor-pointer shadow-xs"
              >
                Quick Order
              </button>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectCategory('digital-showers')} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Digital Piano Showers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('smart-toilets')} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Intelligent Smart WCs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('waterfall-sinks')} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Waterfall Kitchen Sinks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('luxury-bathtubs')} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Cast Stone Resin Tubs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('vanities-mirrors')} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Sintered Slate Vanities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('faucets-accessories')} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Waterfall Basin Mixers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={onOpenTracking} 
                  className="text-zinc-900 font-semibold hover:text-[#b8860b] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Track Existing Consignment</span>
                </button>
              </li>
              <li>
                <a href="#showroom" className="hover:text-[#b8860b] transition-colors">
                  Pay on Delivery Policy
                </a>
              </li>
              <li>
                <a href="#overview" className="hover:text-[#b8860b] transition-colors">
                  5-Year Warranty Registration
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-[#b8860b] transition-colors">
                  Plumbing Installation Guide
                </a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-[#b8860b] transition-colors">
                  Insured Delivery Coverage
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-zinc-900 uppercase tracking-widest">
              Flagship Gallery
            </h4>
            <div className="space-y-2 text-xs text-zinc-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b8860b] mt-0.5 shrink-0" />
                <span>Shop 17 Mac Austin Plaza, Freedom Line, Odunade Market, Coker Orile, Lagos.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>09117446764</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>concierge@noblestonebathrooms.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} NOBLESTONE BATHROOMS. All architectural rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Pay on Delivery Guarantee</span>
            <span>•</span>
            <span>Insured Nationwide Freight</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white text-zinc-600 hover:text-black border border-zinc-200 ml-4 cursor-pointer shadow-xs"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
