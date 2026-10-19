import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Clock,
  Compass,
  MessageCircle
} from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenOrderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onOpenTracking,
  onSelectCategory,
  onOpenOrderModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Countdown timer for announcement bar
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Flash Sale Announcement Banner */}
      <div className="bg-gradient-to-r from-[#171206] via-[#2d220a] to-[#171206] border-b border-[#d4af37]/30 text-xs py-2 px-4 text-[#e5c578]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 font-medium">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-[#d4af37] text-black font-bold uppercase tracking-wider animate-pulse">
              Flash Deal
            </span>
            <span className="text-white font-semibold">
              Save up to 40% OFF
            </span>
            <span className="hidden md:inline text-zinc-400">|</span>
            <span className="hidden md:inline">
              Free Nationwide Delivery &amp; Pay on Delivery Available
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded border border-[#d4af37]/20">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-zinc-300">Offer Expires:</span>
              <span className="font-mono font-bold text-white tracking-widest">
                {formatDigit(timeLeft.hours)}:{formatDigit(timeLeft.minutes)}:{formatDigit(timeLeft.seconds)}
              </span>
            </div>

            <a 
              href="https://wa.me/2348140008921?text=Hello%20Noblestone%20Bathrooms%2C%20I%20want%20to%20inquire%20about%20your%20luxury%20fixtures" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-[#25D366] hover:text-[#34eb77] transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Helpdesk
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#090c10]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3' 
            : 'bg-[#0a0d13] border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <a 
              href="#" 
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#a68220] to-[#60490b] p-0.5 shadow-lg shadow-[#d4af37]/15">
                <div className="w-full h-full bg-[#0d1017] rounded-[7px] flex items-center justify-center border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors">
                  <span className="font-cinzel text-lg font-extrabold gold-gradient-text tracking-wider">
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

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-zinc-300">
              <button 
                onClick={() => { onSelectCategory('digital-showers'); scrollToSection('products'); }}
                className="hover:text-[#d4af37] transition-colors hover:scale-105 transform cursor-pointer"
              >
                Digital Showers
              </button>
              <button 
                onClick={() => { onSelectCategory('smart-toilets'); scrollToSection('products'); }}
                className="hover:text-[#d4af37] transition-colors hover:scale-105 transform cursor-pointer"
              >
                Smart WCs
              </button>
              <button 
                onClick={() => { onSelectCategory('waterfall-sinks'); scrollToSection('products'); }}
                className="hover:text-[#d4af37] transition-colors hover:scale-105 transform cursor-pointer"
              >
                Waterfall Sinks
              </button>
              <button 
                onClick={() => { onSelectCategory('luxury-bathtubs'); scrollToSection('products'); }}
                className="hover:text-[#d4af37] transition-colors hover:scale-105 transform cursor-pointer"
              >
                Stone Tubs
              </button>
              <button 
                onClick={() => { onSelectCategory('vanities-mirrors'); scrollToSection('products'); }}
                className="hover:text-[#d4af37] transition-colors hover:scale-105 transform cursor-pointer"
              >
                Vanities
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('showroom')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Showroom
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Track Order Button */}
              <button
                onClick={onOpenTracking}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 transition-all cursor-pointer"
                title="Track your order delivery status"
              >
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Track Order</span>
              </button>

              {/* Pay on Delivery Instant Order CTA */}
              <button
                onClick={onOpenOrderModal}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-gradient-to-r from-[#d4af37] to-[#b8912b] text-black hover:from-[#e5c578] hover:to-[#cfa83e] transition-all shadow-md hover:shadow-lg shadow-[#d4af37]/20 uppercase tracking-wider cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Order on Delivery</span>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-lg bg-zinc-900/90 text-zinc-200 hover:text-white hover:bg-zinc-800 border border-white/10 transition-all cursor-pointer group"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:text-[#d4af37] transition-colors" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#d4af37] text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0f15] border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3 transition-all animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium pb-3 border-b border-white/10">
              <button
                onClick={() => { onSelectCategory('all'); scrollToSection('products'); }}
                className="text-left px-3 py-2 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-[#d4af37]"
              >
                All Fixtures
              </button>
              <button
                onClick={() => { onSelectCategory('digital-showers'); scrollToSection('products'); }}
                className="text-left px-3 py-2 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-[#d4af37]"
              >
                Digital Showers
              </button>
              <button
                onClick={() => { onSelectCategory('smart-toilets'); scrollToSection('products'); }}
                className="text-left px-3 py-2 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-[#d4af37]"
              >
                Smart WCs
              </button>
              <button
                onClick={() => { onSelectCategory('waterfall-sinks'); scrollToSection('products'); }}
                className="text-left px-3 py-2 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-[#d4af37]"
              >
                Waterfall Sinks
              </button>
              <button
                onClick={() => { onSelectCategory('luxury-bathtubs'); scrollToSection('products'); }}
                className="text-left px-3 py-2 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-[#d4af37]"
              >
                Stone Bathtubs
              </button>
              <button
                onClick={() => { onSelectCategory('vanities-mirrors'); scrollToSection('products'); }}
                className="text-left px-3 py-2 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-[#d4af37]"
              >
                Vanities &amp; Mirrors
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenOrderModal}
                className="w-full py-3 rounded-lg text-center font-bold bg-[#d4af37] text-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Place Pay-on-Delivery Order
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTracking(); }}
                className="w-full py-2.5 rounded-lg text-center font-semibold bg-zinc-900 text-white text-xs border border-white/10 flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-[#d4af37]" />
                Track Existing Order
              </button>

              <a
                href="https://wa.me/2348140008921"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg text-center font-semibold bg-[#25D366]/15 text-[#25D366] text-xs border border-[#25D366]/30 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Technical Sales on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
