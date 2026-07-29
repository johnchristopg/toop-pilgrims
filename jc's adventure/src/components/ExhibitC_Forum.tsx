import React from 'react';
import { PortfolioItem } from '../types';
import { AmphitheaterIcon } from './GreekIcon';
import { GreekKeyDivider } from './GreekKeyDivider';
import { Eye, Video, ExternalLink } from 'lucide-react';

interface ExhibitCForumProps {
  items: PortfolioItem[];
  onOpenDetail: (item: PortfolioItem) => void;
  onEditItem?: (item: PortfolioItem) => void;
}

export const ExhibitC_Forum: React.FC<ExhibitCForumProps> = ({
  items,
  onOpenDetail
}) => {
  const forumItems = items.filter(item => item.exhibit === 'forum');

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Exhibit Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[#C5A059]">
          <AmphitheaterIcon size={24} />
          <span className="font-serif italic text-xs tracking-widest uppercase">Exhibit C</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1A17] tracking-tight">
          The Forum
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#666159] leading-relaxed">
          Speech dissection studies, public speaking analysis, and peer & self-evaluation of speaking performance skills.
        </p>
      </div>

      <GreekKeyDivider />

      {/* 2 Speech Activity Entries */}
      <div className="space-y-8">
        {forumItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2DDD3] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs hover:border-[#C5A059] transition-all duration-200"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#F7F4EE] px-2 py-0.5 rounded border border-[#EBE7DF]">
                  Speech Activity
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
                  <Eye size={14} /> View Artifact
                </button>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C877D] font-medium">Activity Overview</span>
              <p className="font-sans text-sm text-[#1C1A17] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Media Attachment link */}
            {item.fileUrl && (
              <div className="p-3 bg-[#F4F1EA] border border-[#E2DDD3] rounded-sm flex items-center justify-between text-xs text-[#1C1A17]">
                <div className="flex items-center gap-2 truncate">
                  <Video className="w-4 h-4 text-[#C5A059]" />
                  <span className="truncate font-medium">{item.fileName || 'Speech Recording / Analysis Media'}</span>
                </div>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A059] hover:underline flex items-center gap-1 text-xs font-medium uppercase tracking-wider"
                >
                  Open Recording <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Reflection Section */}
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

            {/* Timestamp */}
            <div className="text-right text-[10px] font-mono text-[#8C877D] pt-1">
              {item.lastEdited ? `Last updated: ${item.lastEdited}` : `Date: ${item.date}`}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
