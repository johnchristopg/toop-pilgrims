import React from 'react';
import { PortfolioItem } from '../types';
import { ScrollIcon } from './GreekIcon';
import { GreekKeyDivider } from './GreekKeyDivider';
import { FileText, Eye, Calendar, FileCode } from 'lucide-react';

interface ExhibitAScrollProps {
  items: PortfolioItem[];
  onOpenDetail: (item: PortfolioItem) => void;
  onEditItem?: (item: PortfolioItem) => void;
}

export const ExhibitA_Scrolls: React.FC<ExhibitAScrollProps> = ({
  items,
  onOpenDetail
}) => {
  const scrollItems = items.filter(item => item.exhibit === 'scrolls');

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Exhibit Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[#C5A059]">
          <ScrollIcon size={24} />
          <span className="font-serif italic text-xs tracking-widest uppercase">Exhibit A</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1A17] tracking-tight">
          The Scrolls
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#666159] leading-relaxed">
          Manuscripts, annotated drafts, script outlines, and vocal beat sheets. Click any scroll to examine the full transcript or document attachment.
        </p>
      </div>

      <GreekKeyDivider />

      {/* Grid of 6 Scrolls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scrollItems.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white border border-[#E2DDD3] hover:border-[#C5A059] rounded-sm p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 relative"
          >
            {/* Card Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#F7F4EE] px-2 py-0.5 rounded border border-[#EBE7DF]">
                  Scroll 0{index + 1}
                </span>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenDetail(item)}
                    className="p-1.5 text-[#666159] hover:text-[#1C1A17] hover:bg-[#F7F4EE] rounded transition-colors"
                    title="Examine Full Manuscript"
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div 
                onClick={() => onOpenDetail(item)}
                className="cursor-pointer space-y-2"
              >
                <h3 className="font-serif text-lg font-semibold text-[#1C1A17] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#524E48] line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-[#F4F1EA] mt-4 flex items-center justify-between text-[11px] text-[#8C877D] font-mono">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#C5A059]" />
                <span>{item.date}</span>
              </div>

              {item.fileName ? (
                <span className="flex items-center gap-1 text-[#524E48] truncate max-w-[120px]">
                  <FileText className="w-3 h-3 text-[#C5A059]" />
                  <span className="truncate">{item.fileName}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[#8C877D]">
                  <FileCode className="w-3 h-3" /> Text Record
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
