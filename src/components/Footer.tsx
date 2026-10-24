import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Mail, 
  ArrowUp,
  Banknote, 
  Award, 
  Clock
} from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenOrderModal: () => void;
  hasPlacedOrder?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onOpenOrderModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-zinc-200 py-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-950 text-xs">Pay On Delivery Nationwide</h5>
              <p className="text-[11px] text-zinc-500">Inspect &amp; confirm before payment</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-950 text-xs">Free Priority Delivery</h5>
              <p className="text-[11px] text-zinc-500">Insured dispatch to all 36 states</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-950 text-xs">2-Year Burner &amp; Glass Warranty</h5>
              <p className="text-[11px] text-zinc-500">Solid refined brass &amp; 8mm glass</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-950 text-xs">100% Factory Quality Tested</h5>
              <p className="text-[11px] text-zinc-500">Pressure and flame tested</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md">
                <span className="font-black text-black text-lg">
                  NB
                </span>
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-zinc-950">
                  NOBLESTONE
                </span>
                <span className="block text-[8px] tracking-[0.38em] text-zinc-500 font-bold uppercase -mt-0.5">
                  PREMIUM KITCHEN APPLIANCES
                </span>
              </div>
            </div>

            <p className="text-zinc-600 font-normal leading-relaxed max-w-md">
              Engineered with patented 90° flip-top burner technology, explosion-proof crystal tempered glass, and dual high-efficiency vortex crowns. Designed to eliminate kitchen grease and cleaning headaches in modern Nigerian homes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenOrderModal}
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-yellow-500/20"
              >
                Quick Order (Pay on Delivery)
              </button>
            </div>
          </div>

          {/* Product Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-widest">
              Cooker Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-black hover:underline transition-colors">
                  Product Overview &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#flip-feature" className="hover:text-black hover:underline transition-colors">
                  90° Flip-Up Easy Clean Tech
                </a>
              </li>
              <li>
                <a href="#components" className="hover:text-black hover:underline transition-colors">
                  Cooker Parts &amp; Anatomy Guide
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-black hover:underline transition-colors">
                  Full 15 HD Photo Gallery
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-black hover:underline transition-colors">
                  Multi-Pack Deals &amp; Discounts
                </a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-black hover:underline transition-colors">
                  Pay-on-Delivery Order Form
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support & Dispatch Policy (NO physical address is shown) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-widest">
              Logistics &amp; Service
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={onOpenTracking} 
                  className="text-zinc-900 font-semibold hover:text-black hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Track Consignment</span>
                </button>
              </li>
              <li>
                <a href="#order-form" className="hover:text-black hover:underline transition-colors">
                  Pay on Delivery Guarantee
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-black hover:underline transition-colors">
                  Installation Guidance
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-black hover:underline transition-colors">
                  2-Year Warranty Terms
                </a>
              </li>
              <li className="pt-2 text-zinc-500 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                <span>Orders Dispatched Daily Mon - Sat</span>
              </li>
              <li className="text-zinc-500 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                <span>orders@noblestoneappliances.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} NOBLESTONE APPLIANCES. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>Pay on Delivery Guarantee</span>
            <span>•</span>
            <span>Insured Nationwide Delivery</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-100 text-zinc-700 hover:text-black hover:bg-yellow-400 border border-zinc-200 ml-2 cursor-pointer transition-all shadow-xs"
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
