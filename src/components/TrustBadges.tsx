import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Banknote, 
  Award, 
  Cpu, 
  Wrench,
  ThumbsUp
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const guarantees = [
    {
      icon: Banknote,
      title: 'Pay on Delivery Nationwide',
      description: 'Zero financial risk. Inspect & verify your fixtures before paying by cash, POS, or mobile transfer.'
    },
    {
      icon: Truck,
      title: 'Insured Priority Shipping',
      description: 'Same-day/24h dispatch in Lagos & Abuja; 48-72h across all 36 states in reinforced protective wooden crates.'
    },
    {
      icon: ShieldCheck,
      title: '5-Year Brass Engine Warranty',
      description: 'Manufactured with high-density refined H59 brass valves. Complete free replacement if issues arise.'
    },
    {
      icon: Cpu,
      title: 'Micro-Hydro Turbine Tech',
      description: 'Patented water-powered LED temperature display. Zero batteries, zero wiring, 100% waterproof.'
    },
    {
      icon: Wrench,
      title: 'Standard Universal Plumbing',
      description: 'Designed strictly to international 1/2" G1/2 pipe fittings. Easily installed by any licensed plumber.'
    }
  ];

  return (
    <section className="py-12 bg-zinc-50 border-y border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm hover:border-[#d4af37] hover:shadow-md transition-all group flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-[#d4af37]/40 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#d4af37] transition-all">
                  <Icon className="w-5 h-5 text-[#b8860b] group-hover:text-black transition-colors" />
                </div>
                <h4 className="font-cinzel text-sm font-bold text-zinc-900 mb-1.5 group-hover:text-[#b8860b] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
