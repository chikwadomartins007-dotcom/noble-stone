import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Building2
} from 'lucide-react';

interface ShowroomContactSectionProps {
  hasPlacedOrder?: boolean;
}

export const ShowroomContactSection: React.FC<ShowroomContactSectionProps> = ({
  hasPlacedOrder = false,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      // resets after a few seconds or keeps success
    }, 4000);
  };

  return (
    <section id="showroom" className="py-16 lg:py-24 bg-white border-t border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
            <Building2 className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>Direct Experience Gallery &amp; Warehouses</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-wide">
            Visit Our Flagship Experience Gallery
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Feel the weight of 100% solid brass, test the mechanical piano switches, and see the micro-hydro displays live in person before placing your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gallery Information & Location */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#d4af37] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#b8860b]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-zinc-900">
                    Lagos Flagship Gallery &amp; Central Depot
                  </h4>
                  <p className="text-xs text-zinc-600 font-normal mt-1 leading-relaxed">
                    Shop 17, Mac Austin Luxury Plaza, Freedom Line, <br />
                    Odunade Market, Coker Orile, Ajeromi-Ifelodun, Lagos, Nigeria.
                  </p>
                  <p className="text-[11px] text-[#946c07] font-semibold mt-1">
                    Insured nationwide logistics dispatch departures daily at 9:00 AM &amp; 3:00 PM.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Sales &amp; Dispatch Line:</span>
                    <a href="tel:09117446764" className="text-zinc-900 font-semibold hover:text-[#b8860b]">
                      09117446764
                    </a>
                  </div>
                </div>

                {hasPlacedOrder && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <div>
                      <span className="text-zinc-500 block text-[10px]">WhatsApp Official Line:</span>
                      <a href="https://wa.me/2349117446764" target="_blank" rel="noopener noreferrer" className="text-zinc-900 font-semibold hover:text-[#25D366]">
                        09117446764
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Operating Hours:</span>
                    <span className="text-zinc-900 font-semibold">Mon - Sat: 8:00 AM - 6:30 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Architectural Enquiries:</span>
                    <span className="text-zinc-900 font-semibold">concierge@noblestone.com</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action (Only shown after order placement) */}
              {hasPlacedOrder && (
                <div className="pt-2">
                  <a
                    href="https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20have%20an%20order%20inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat With Us on WhatsApp (09117446764)</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Architectural Inquiry / Custom Request Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <h4 className="font-cinzel text-lg font-bold text-zinc-900">
                  Send Direct Inquiry / Quote Request
                </h4>
                <p className="text-xs text-zinc-600 font-normal">
                  Building a new duplex, hotel, or renovating your master suite? Our senior consultants will respond within 20 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h5 className="font-cinzel text-base font-bold text-zinc-900">Inquiry Received</h5>
                  <p className="text-xs text-zinc-600">
                    Thank you! Our showroom consultant has received your message and will call your phone at <strong className="text-zinc-900">{inquiryPhone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryName('');
                      setInquiryPhone('');
                      setInquiryMessage('');
                    }}
                    className="text-xs text-[#b8860b] font-bold underline pt-2 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Arc. Babatunde Fashola"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">Phone Number / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="e.g. 0802 000 1122"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-700 font-medium block mb-1">Items of Interest or Questions</label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="e.g. I need 4 sets of the 2-Burner Flip-Up Gas Cookers for our site in Lekki..."
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b8912b] hover:from-[#e5c578] hover:to-[#cfa83e] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry for Immediate Callback</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
