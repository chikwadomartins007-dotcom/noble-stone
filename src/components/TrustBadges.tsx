import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Banknote, 
  Flame, 
  Wrench
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const guarantees = [
    {
      icon: Banknote,
      title: 'Pay on Delivery Nationwide',
      description: 'Zero financial risk. Inspect & verify your cooker before paying by cash, POS, or mobile transfer.'
    },
    {
      icon: Truck,
      title: 'Free Priority Shipping',
      description: 'Daily dispatch to all 36 states in reinforced shock-proof protective safety packaging.'
    },
    {
      icon: ShieldCheck,
      title: '2-Year Full Warranty',
      description: 'Covered against factory defects, tempered glass integrity, and burner crown durability.'
    },
    {
      icon: Flame,
      title: 'Vortex Blue Flame Tech',
      description: 'Pure 5.2kW multi-jet blue flame that eliminates soot, saves 28% gas, and boils 35% faster.'
    },
    {
      icon: Wrench,
      title: 'Tabletop or Built-In',
      description: 'Ready to use straight out of the box on countertops, or drop smoothly into cabinet cutouts.'
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
                className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs hover:border-yellow-400 hover:shadow-md transition-all group flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-yellow-400 transition-all">
                  <Icon className="w-5 h-5 text-yellow-600 group-hover:text-black transition-colors" />
                </div>
                <h4 className="font-cinzel text-sm font-bold text-zinc-950 mb-1.5 group-hover:text-black transition-colors">
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
