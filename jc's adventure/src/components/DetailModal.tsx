import React from 'react';
import { PortfolioItem } from '../types';
import { X, Calendar, FileText, ExternalLink, Download, Clock } from 'lucide-react';
import { ScrollIcon, ColumnIcon, LaurelIcon } from './GreekIcon';

interface DetailModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (item: PortfolioItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  isOpen,
  onClose
}) => {
  if (!isOpen || !item) return null;

  const isVideo = item.fileType === 'video' || (item.fileUrl && (item.fileUrl.includes('youtube') || item.fileUrl.includes('youtu.be')));

  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAFAFA] border border-[#D8D2C6] rounded-sm shadow-2xl overflow-hidden my-8">
        
        {/* Header Placard Banner */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#EBE7DF] bg-[#F7F4EE] flex items-start justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-serif italic tracking-widest uppercase">
              <ColumnIcon size={16} />
              <span>Exhibit Artifact Examination</span>
              <span className="text-[#8C877D]">&bull; {item.exhibit.toUpperCase()}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-semibold tracking-tight">
              {item.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#666159] pt-1">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> {item.date}
              </span>
              {item.lastEdited && (
                <span className="flex items-center gap-1 font-mono text-[11px] text-[#8C877D]">
                  <Clock className="w-3 h-3 text-[#C5A059]" /> Last edited: {item.lastEdited}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#666159] hover:text-[#1C1A17] hover:bg-[#EBE7DF] rounded-full transition-colors focus:outline-none"
            aria-label="Close detail view"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Group Info if available */}
          {item.groupMembers && (
            <div className="p-3 bg-[#F4F1EA] border-l-2 border-[#C5A059] text-xs font-sans text-[#524E48]">
              <span className="font-semibold uppercase tracking-wider text-[#1C1A17]">Collaborators: </span>
              {item.groupMembers}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-sans uppercase tracking-widest text-[#8C877D] font-medium">
              Artifact Overview
            </h3>
            <p className="font-sans text-sm text-[#1C1A17] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Full Manuscript Text (for Scrolls) */}
          {item.fileContent && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#8C877D] font-medium flex items-center justify-between">
                <span>Manuscript Transcript</span>
                <span className="text-[10px] font-mono text-[#C5A059]">Parchment Text Record</span>
              </h3>
              <div className="p-5 bg-white border border-[#E2DDD3] rounded-sm font-mono text-xs sm:text-sm text-[#1C1A17] leading-relaxed whitespace-pre-wrap shadow-inner max-h-96 overflow-y-auto">
                {item.fileContent}
              </div>
            </div>
          )}

          {/* Video or External Link Embed */}
          {item.fileUrl && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#8C877D] font-medium">
                Presentation / Media Output
              </h3>
              
              {isVideo ? (
                <div className="aspect-video w-full bg-black rounded-sm overflow-hidden border border-[#D8D2C6]">
                  <iframe
                    src={getEmbedUrl(item.fileUrl)}
                    title={item.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : item.fileType === 'image' ? (
                <div className="w-full bg-[#F4F1EA] p-2 border border-[#D8D2C6] rounded-sm text-center">
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    className="max-h-96 mx-auto object-contain rounded-sm"
                  />
                </div>
              ) : (
                <div className="p-4 bg-[#F5F2EC] border border-[#E2DDD3] rounded-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#C5A059]" />
                    <span className="text-xs font-medium text-[#1C1A17] truncate">{item.fileName || 'Attached Document'}</span>
                  </div>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1A17] text-[#FAFAFA] text-xs uppercase tracking-wider rounded-sm hover:bg-[#C5A059] transition-colors"
                  >
                    Open Media <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Reflection Section */}
          {item.reflection && (
            <div className="space-y-2 pt-4 border-t border-[#EBE7DF]">
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#C5A059] font-semibold flex items-center gap-2">
                <LaurelIcon size={16} /> Course Reflection & Growth Notes
              </h3>
              <div className="p-5 bg-[#F9F7F2] border-l-2 border-[#C5A059] rounded-r-sm text-sm font-sans text-[#1C1A17] leading-relaxed italic">
                "{item.reflection}"
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#EBE7DF] bg-[#F7F4EE] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-sans tracking-widest uppercase bg-[#1C1A17] text-[#FAFAFA] hover:bg-[#C5A059] rounded-sm transition-colors"
          >
            Close Examination
          </button>
        </div>

      </div>
    </div>
  );
};
