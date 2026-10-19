import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Truck,
  ArrowRight
} from 'lucide-react';

interface SingleProductHeaderProps {
  onScrollToOrder: () => void;
  onOpenTracking: () => void;
}

export const SingleProductHeader: React.FC<SingleProductHeaderProps> = ({
  onScrollToOrder,
  onOpenTracking,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 38,
    seconds: 44,
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

  const format2 = (num: number) => num.toString().padStart(2, '0');

  return (
    <header className="sticky top-0 z-40 w-full shadow-2xl">
      {/* Top Flash Sale Announcement Bar */}
      <div className="bg-gradient-to-r from-[#191307] via-[#2c2009] to-[#191307] border-b border-[#d4af37]/40 text-xs py-2 px-3 text-[#f0d48b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#d4af37] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              PROMO ALERT
            </span>
            <span className="text-white font-bold">
              FLASH SALE: 40% OFF + FREE NATIONWIDE DELIVERY
            </span>
            <span className="hidden md:inline text-zinc-400">|</span>
            <span className="hidden md:inline text-[#e5c578]">
              PAY ON DELIVERY NATIONWIDE (INSPECT BEFORE PAYING)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded border border-[#d4af37]/30">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-zinc-300">Sale Ends In:</span>
              <span className="font-mono font-bold text-white tracking-widest">
                {format2(timeLeft.hours)}:{format2(timeLeft.minutes)}:{format2(timeLeft.seconds)}
              </span>
            </div>

            <button
              onClick={onOpenTracking}
              className="text-zinc-300 hover:text-white underline text-[11px] cursor-pointer hidden lg:inline"
            >
              Track Existing Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-[#0b0e14]/95 backdrop-blur-md border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#a37f1c] to-[#594409] p-0.5 shadow-lg shadow-[#d4af37]/20">
              <div className="w-full h-full bg-[#0c0f16] rounded-[7px] flex items-center justify-center border border-[#d4af37]/40 group-hover:border-[#d4af37] transition-colors">
                <span className="font-cinzel text-lg font-black gold-gradient-text">
                  NB
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-white group-hover:text-[#d4af37] transition-colors">
                NOBLESTONE
              </span>
              <span className="text-[9px] tracking-[0.38em] text-[#d4af37] font-semibold uppercase -mt-0.5">
                BATHROOMS
              </span>
            </div>
          </a>

          {/* Center Trust Highlights */}
          <div className="hidden md:flex items-center gap-6 text-xs text-zinc-300 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              5-Year Full Warranty
            </span>
            <span className="flex items-center gap-1.5 text-[#e5c578]">
              <Truck className="w-4 h-4" />
              Pay on Delivery (Inspect First)
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              100% Solid H59 Brass
            </span>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/2348140008921?text=Hello%20Noblestone%20Bathrooms%2C%20I%20have%20questions%20about%20the%20Digital%20Piano%20Shower"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Help</span>
            </a>

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
