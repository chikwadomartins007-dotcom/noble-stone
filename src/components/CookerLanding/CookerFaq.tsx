import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { COOKER_FAQS } from '../../data/cookerData';

interface CookerFaqProps {
  hasPlacedOrder?: boolean;
}

export const CookerFaq: React.FC<CookerFaqProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-zinc-200 relative text-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-xs font-bold text-black">
            <HelpCircle className="w-3.5 h-3.5 text-yellow-500" />
            <span>Customer Guidance &amp; Clear Answers</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-wide">
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
                className="rounded-xl bg-zinc-50 border border-zinc-200 hover:border-yellow-400 shadow-xs transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-zinc-950 hover:text-black transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-yellow-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 text-xs text-zinc-700 font-normal leading-relaxed border-t border-zinc-200 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-10 p-6 rounded-xl bg-zinc-50 border border-yellow-400 text-center space-y-3 shadow-md">
          <p className="text-xs text-zinc-800 font-semibold">
            Ready to secure your Premium Flip-Up Cooker with zero risk?
          </p>
          <a
            href="#order-form"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-yellow-500/20"
          >
            <span>Fill Delivery Form (Inspect Before Payment)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
