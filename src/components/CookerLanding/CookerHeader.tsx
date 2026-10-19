import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Sparkles, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface CookerHeaderProps {
  onScrollToOrder: () => void;
  onOpenTracking: () => void;
  hasPlacedOrder?: boolean;
}

export const CookerHeader: React.FC<CookerHeaderProps> = ({
  onScrollToOrder,
  onOpenTracking,
  hasPlacedOrder = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <header className="sticky top-0 z-40 w-full shadow-2xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#171206] via-[#2a1e08] to-[#171206] border-b border-[#d4af37]/40 text-xs py-2 px-3 text-[#f0d48b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#d4af37] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              PROMO DEAL
            </span>
            <span className="text-white font-bold">
              FROM ₦170,000 PROMO • FREE NATIONWIDE DELIVERY
            </span>
            <span className="hidden md:inline text-zinc-400">|</span>
            <span className="hidden md:inline text-[#e5c578]">
              100% PAYMENT ON DELIVERY (INSPECT BEFORE PAYING)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded border border-[#d4af37]/30">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-zinc-300">Offer Expires:</span>
              <span className="font-mono font-bold text-white tracking-widest">
                {format2(timeLeft.hours)}:{format2(timeLeft.minutes)}:{format2(timeLeft.seconds)}
              </span>
            </div>

            <button
              onClick={onOpenTracking}
              className="text-zinc-300 hover:text-white underline text-[11px] cursor-pointer hidden lg:inline"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#a37f1c] to-[#594409] p-0.5 shadow-md shadow-[#d4af37]/20">
              <div className="w-full h-full bg-zinc-900 rounded-[7px] flex items-center justify-center border border-[#d4af37]/40 group-hover:border-[#d4af37] transition-colors">
                <span className="font-cinzel text-lg font-black text-[#d4af37]">
                  NB
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-zinc-900 group-hover:text-[#d4af37] transition-colors">
                NOBLESTONE
              </span>
              <span className="text-[9px] tracking-[0.38em] text-[#b8860b] font-semibold uppercase -mt-0.5">
                BATHROOMS
              </span>
            </div>
          </a>

          {/* Navigation Anchors */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-600 font-medium">
            <a href="#overview" className="hover:text-[#d4af37] transition-colors">
              Overview
            </a>
            <a href="#flip-feature" className="hover:text-[#d4af37] transition-colors">
              90° Flip Burner
            </a>
            <a href="#components" className="hover:text-[#d4af37] transition-colors">
              Components Guide
            </a>
            <a href="#gallery" className="hover:text-[#d4af37] transition-colors">
              Product Images
            </a>
            <a href="#pricing" className="hover:text-[#d4af37] transition-colors">
              Pricing Packages
            </a>
            <a href="#faq" className="hover:text-[#d4af37] transition-colors">
              FAQ
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {hasPlacedOrder && (
              <a
                href="https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20want%20to%20follow%20up%20on%20my%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 09117446764</span>
              </a>
            )}

            <button
              onClick={onScrollToOrder}
              className="px-4 sm:px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c578] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-[#d4af37]/20 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <span>Order Now (POD)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
