import React from 'react';
import { ColumnIcon } from './GreekIcon';

interface FooterProps {
  onResetDefaults?: () => void;
  onExportPortfolio?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="mt-20 border-t border-[#EBE7DF] bg-[#F7F4EE] text-[#524E48] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="flex items-center gap-3 text-center md:text-left mx-auto md:mx-0">
            <div className="w-8 h-8 rounded-full bg-[#E2DDD3] flex items-center justify-center text-[#C5A059]">
              <ColumnIcon size={18} />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-[#1C1A17] uppercase tracking-wider">
                JC's Speech & Theater Adventures
              </p>
              <p className="font-serif italic text-xs text-[#8C877D]">
                Minimalist Greek Museum Wing Portfolio
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-[#EBE7DF] text-center text-[11px] font-mono text-[#8C877D] flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} JC &bull; Speech & Theater Course Gallery</span>
        </div>

      </div>
    </footer>
  );
};
