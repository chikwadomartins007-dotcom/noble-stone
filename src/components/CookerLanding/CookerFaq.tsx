import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { COOKER_FAQS } from '../../data/cookerData';

interface CookerFaqProps {
  hasPlacedOrder?: boolean;
}

export const CookerFaq: React.FC<CookerFaqProps> = ({ hasPlacedOrder = false }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#d4af37]/40 text-xs font-semibold text-[#946c07]">
            <HelpCircle className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>Customer Guidance &amp; Clear Answers</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-wide">
            Frequently Asked Questions
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm font-normal">
            Everything you need to know about pricing, 90° flip-up cleaning, tabletop vs built-in installation, and payment on delivery.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {COOKER_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl bg-zinc-50 border border-zinc-200 hover:border-[#d4af37]/60 shadow-xs transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#b8860b] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#b8860b] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-zinc-600 font-normal leading-relaxed border-t border-zinc-200/80 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Helpdesk */}
        <div className="mt-10 p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center space-y-2">
          {hasPlacedOrder ? (
            <>
              <p className="text-xs text-zinc-800 font-medium">
                Need instant technical assistance or tracking dispatch for your placed order?
              </p>
              <a
                href="https://wa.me/2349117446764?text=Hello%20Noblestone%20Bathrooms%2C%20I%20have%20an%20inquiry%20regarding%20my%20placed%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1ea952] hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat directly on WhatsApp (09117446764)</span>
              </a>
            </>
          ) : (
            <>
              <p className="text-xs text-zinc-800 font-medium">
                Ready to secure your Premium Flip-Up Cooker with zero risk?
              </p>
              <a
                href="#order-form"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b8860b] hover:text-black transition-colors"
              >
                <span>Fill Delivery Form Above (Inspect Before Payment) &rarr;</span>
              </a>
            </>
          )}
        </div>

      </div>
    </section>
  );
};
