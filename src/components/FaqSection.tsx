import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/reviews';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0a0d14] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d26] border border-[#d4af37]/30 text-xs font-semibold text-[#e5c578]">
            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Customer Guidance &amp; Clear Answers</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            Frequently Asked Questions
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Everything you need to know about our Pay on Delivery policy, plumbing compatibility, and 5-Year warranty.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl bg-[#111520] border border-white/5 hover:border-[#d4af37]/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-white hover:text-[#e5c578] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#d4af37] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-zinc-300 font-light leading-relaxed border-t border-white/5 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 p-5 rounded-xl bg-zinc-900/60 border border-white/10 text-center space-y-2">
          <p className="text-xs text-zinc-300 font-medium">
            Have a technical plumbing question or need custom dimensions?
          </p>
          <a
            href="https://wa.me/2348140008921?text=Hello%20Noblestone%2C%20I%20have%20a%20technical%20plumbing%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat directly with Noblestone Master Technicians</span>
          </a>
        </div>

      </div>
    </section>
  );
};
