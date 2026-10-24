import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { CookerImage } from '../../data/cookerData';

interface CookerImageModalProps {
  image: CookerImage | null;
  onClose: () => void;
  onScrollToOrder: () => void;
}

export const CookerImageModal: React.FC<CookerImageModalProps> = ({
  image,
  onClose,
  onScrollToOrder,
}) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl my-auto text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-black bg-yellow-400 px-2.5 py-0.5 rounded uppercase">
              {image.badge}
            </span>
            <h3 className="font-cinzel text-sm font-bold text-zinc-950">
              {image.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black border border-zinc-200 cursor-pointer transition-colors"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative max-h-[70vh] overflow-hidden bg-zinc-950 flex items-center justify-center p-2">
          <img 
            src={image.url} 
            alt={image.title} 
            className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
          />
        </div>

        {/* Footer info */}
        <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 font-normal text-center sm:text-left">
            {image.description}
          </p>

          <button
            onClick={() => {
              onClose();
              onScrollToOrder();
            }}
            className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-md shadow-yellow-500/20 transition-all"
          >
            Order Now (Pay on Delivery)
          </button>
        </div>
      </div>
    </div>
  );
};
