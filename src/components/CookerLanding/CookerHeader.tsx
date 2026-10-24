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
      <div className="bg-yellow-400 border-b border-yellow-500 text-xs py-2 px-3 text-black">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-black">
            <span className="bg-black text-yellow-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              FLASH PROMO
            </span>
            <span className="text-black font-black">
              FROM ₦170,000 PROMO • FREE NATIONWIDE DELIVERY
            </span>
            <span className="hidden md:inline text-black/40">|</span>
            <span className="hidden md:inline text-black font-extrabold">
              100% PAYMENT ON DELIVERY (INSPECT BEFORE PAYING)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 bg-black text-yellow-400 px-2.5 py-1 rounded font-bold shadow-xs">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-zinc-200">Offer Expires:</span>
              <span className="font-mono font-black text-yellow-400 tracking-widest">
                {format2(timeLeft.hours)}:{format2(timeLeft.minutes)}:{format2(timeLeft.seconds)}
              </span>
            </div>

            <button
              onClick={onOpenTracking}
              className="text-black hover:underline font-bold text-[11px] cursor-pointer hidden lg:inline"
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
            <div className="w-10 h-10 rounded-lg bg-yellow-400 p-0.5 shadow-md shadow-yellow-400/20">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center border border-yellow-400/50 group-hover:border-yellow-400 transition-colors">
                <span className="font-cinzel text-lg font-black text-yellow-400">
                  NB
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-zinc-950 group-hover:text-black transition-colors">
                NOBLESTONE
              </span>
              <span className="text-[9px] tracking-[0.38em] text-zinc-600 font-bold uppercase -mt-0.5">
                BATHROOMS &amp; KITCHEN
              </span>
            </div>
          </a>

          {/* Navigation Anchors */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-700 font-bold">
            <a href="#overview" className="hover:text-black hover:underline transition-colors">
              Overview
            </a>
            <a href="#flip-feature" className="hover:text-black hover:underline transition-colors">
              90° Flip Burner
            </a>
            <a href="#components" className="hover:text-black hover:underline transition-colors">
              Components Guide
            </a>
            <a href="#gallery" className="hover:text-black hover:underline transition-colors">
              Product Images
            </a>
            <a href="#pricing" className="hover:text-black hover:underline transition-colors">
              Pricing Packages
            </a>
            <a href="#faq" className="hover:text-black hover:underline transition-colors">
              FAQ
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onScrollToOrder}
              className="px-4 sm:px-6 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs tracking-wider uppercase shadow-lg shadow-yellow-500/20 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
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
