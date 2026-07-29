import React from 'react';
import { PortfolioItem } from '../types';
import { LaurelIcon } from './GreekIcon';
import { GreekKeyDivider } from './GreekKeyDivider';
import { Eye, Video, ExternalLink } from 'lucide-react';

interface ExhibitDLaurelProps {
  items: PortfolioItem[];
  onOpenDetail: (item: PortfolioItem) => void;
  onEditItem?: (item: PortfolioItem) => void;
}

export const ExhibitD_Laurel: React.FC<ExhibitDLaurelProps> = ({
  items,
  onOpenDetail
}) => {
  const laurelItems = items.filter(item => item.exhibit === 'laurel');

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Exhibit Header with Single Small Laurel Icon Anchor */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[#C5A059]">
          <LaurelIcon size={24} />
          <span className="font-serif italic text-xs tracking-widest uppercase">Exhibit D</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1A17] tracking-tight flex items-center justify-center gap-2">
          The Laurel Trials
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#666159] leading-relaxed">
          The culminating course milestones: the Midterm Persuasive Speech performance and the Final Staged Play production.
        </p>
      </div>

      <GreekKeyDivider />

      {/* 2 Culminating Activity Entries */}
      <div className="space-y-8">
        {laurelItems.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2DDD3] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs hover:border-[#C5A059] transition-all duration-200 relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#F7F4EE] px-2 py-0.5 rounded border border-[#EBE7DF]">
                    {idx === 0 ? 'Midterm Milestone' : 'Final Milestone'}
                  </span>
                  <span className="text-xs text-[#8C877D] font-serif italic">&bull; {item.date}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1A17] pt-1 flex items-center gap-2">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenDetail(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans tracking-wider uppercase bg-[#1C1A17] text-[#FAFAFA] hover:bg-[#C5A059] rounded-sm transition-colors"
                >
                  <Eye size={14} /> View Performance
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C877D] font-medium">Performance Overview</span>
              <p className="font-sans text-sm text-[#1C1A17] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Media Attachment link */}
            {item.fileUrl && (
              <div className="p-3 bg-[#F4F1EA] border border-[#E2DDD3] rounded-sm flex items-center justify-between text-xs text-[#1C1A17]">
                <div className="flex items-center gap-2 truncate">
                  <Video className="w-4 h-4 text-[#C5A059]" />
                  <span className="truncate font-medium">{item.fileName || 'Live Performance Recording'}</span>
                </div>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A059] hover:underline flex items-center gap-1 text-xs font-medium uppercase tracking-wider"
                >
                  Watch Video <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Reflection Section */}
            {item.reflection && (
              <div className="space-y-2 pt-4 border-t border-[#EBE7DF]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-widest text-[#C5A059] font-semibold flex items-center gap-1.5">
                    <LaurelIcon size={14} /> Culminating Reflection
                  </span>
                  <span className="text-[11px] font-mono text-[#8C877D]">
                    {item.reflection.trim().split(/\s+/).length} words
                  </span>
                </div>
                <div className="p-5 bg-[#F9F7F2] border-l-2 border-[#C5A059] rounded-r-sm font-sans text-sm text-[#1C1A17] leading-relaxed whitespace-pre-line">
                  {item.reflection}
                </div>
              </div>
            )}

            {/* Date stamp */}
            <div className="text-right text-[10px] font-mono text-[#8C877D] pt-1">
              {item.lastEdited ? `Last updated: ${item.lastEdited}` : `Date: ${item.date}`}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
