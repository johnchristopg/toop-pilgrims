import React from 'react';
import { PortfolioItem } from '../types';
import { TheaterMaskIcon } from './GreekIcon';
import { GreekKeyDivider } from './GreekKeyDivider';
import { Users, Eye, ExternalLink, Video } from 'lucide-react';

interface ExhibitBVoicesProps {
  items: PortfolioItem[];
  onOpenDetail: (item: PortfolioItem) => void;
  onEditItem?: (item: PortfolioItem) => void;
}

export const ExhibitB_Voices: React.FC<ExhibitBVoicesProps> = ({
  items,
  onOpenDetail
}) => {
  const voiceItems = items.filter(item => item.exhibit === 'voices');

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Exhibit Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[#C5A059]">
          <TheaterMaskIcon size={24} />
          <span className="font-serif italic text-xs tracking-widest uppercase">Exhibit B</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1A17] tracking-tight">
          The Theater of Voices
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#666159] leading-relaxed">
          Group presentations and oral research projects investigating rhetoric, global theatrical traditions, and script pitching.
        </p>
      </div>

      <GreekKeyDivider />

      {/* 3 Presentation Activity Entries */}
      <div className="space-y-8">
        {voiceItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2DDD3] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs hover:border-[#C5A059] transition-all duration-200"
          >
            {/* Top Bar with Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#F7F4EE] px-2 py-0.5 rounded border border-[#EBE7DF]">
                  Presentation Activity
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1A17] pt-1">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenDetail(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans tracking-wider uppercase bg-[#1C1A17] text-[#FAFAFA] hover:bg-[#C5A059] rounded-sm transition-colors"
                >
                  <Eye size={14} /> View Media
                </button>
              </div>
            </div>

            {/* Group Members Tag */}
            {item.groupMembers && (
              <div className="flex items-center gap-2 text-xs font-sans text-[#524E48] bg-[#F7F4EE] px-3.5 py-2 rounded-sm border border-[#EBE7DF]">
                <Users className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span className="font-semibold text-[#1C1A17] uppercase tracking-wider text-[11px]">Group Members:</span>
                <span>{item.groupMembers}</span>
              </div>
            )}

            {/* Activity Description */}
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C877D] font-medium">Overview</span>
              <p className="font-sans text-sm text-[#1C1A17] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Media Preview Box */}
            {item.fileUrl && (
              <div className="p-3 bg-[#F4F1EA] border border-[#E2DDD3] rounded-sm flex items-center justify-between text-xs text-[#1C1A17]">
                <div className="flex items-center gap-2 truncate">
                  <Video className="w-4 h-4 text-[#C5A059]" />
                  <span className="truncate font-medium">{item.fileName || 'Attached Presentation Media'}</span>
                </div>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A059] hover:underline flex items-center gap-1 text-xs font-medium uppercase tracking-wider"
                >
                  Open Presentation <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Reflection Section (Simple text block below activity) */}
            {item.reflection && (
              <div className="space-y-2 pt-4 border-t border-[#EBE7DF]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-widest text-[#C5A059] font-semibold">
                    Activity Reflection
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

            {/* Footer stamp */}
            <div className="text-right text-[10px] font-mono text-[#8C877D] pt-1">
              {item.lastEdited ? `Last updated: ${item.lastEdited}` : `Date: ${item.date}`}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
