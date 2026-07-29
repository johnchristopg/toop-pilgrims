import React, { useState } from 'react';
import { PortfolioItem, FileType } from '../types';
import { X, Upload, Link as LinkIcon, FileText, Check, AlertCircle } from 'lucide-react';

interface EditModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: PortfolioItem) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !item) return null;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [groupMembers, setGroupMembers] = useState(item.groupMembers || '');
  const [reflection, setReflection] = useState(item.reflection || '');
  const [fileType, setFileType] = useState<FileType>(item.fileType || 'none');
  const [fileUrl, setFileUrl] = useState(item.fileUrl || '');
  const [fileName, setFileName] = useState(item.fileName || '');
  const [fileContent, setFileContent] = useState(item.fileContent || '');
  const [date, setDate] = useState(item.date);
  const [dragActive, setDragActive] = useState(false);

  const wordCount = reflection.trim() ? reflection.trim().split(/\s+/).length : 0;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      setFileType('pdf');
    } else if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(ext || '')) {
      setFileType('image');
    } else if (['mp4', 'webm', 'mov'].includes(ext || '')) {
      setFileType('video');
    } else if (['mp3', 'wav', 'ogg'].includes(ext || '')) {
      setFileType('audio');
    } else {
      setFileType('docx');
    }

    // Read as Data URL or Text
    const reader = new FileReader();
    if (file.type.startsWith('text/') || ext === 'txt' || ext === 'md' || ext === 'docx') {
      reader.onload = (event) => {
        setFileContent(event.target?.result as string || '');
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        setFileUrl(event.target?.result as string || '');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format current date stamp
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const updated: PortfolioItem = {
      ...item,
      title: title.trim(),
      description: description.trim(),
      groupMembers: item.exhibit === 'voices' ? groupMembers.trim() : item.groupMembers,
      reflection: item.exhibit !== 'scrolls' ? reflection.trim() : undefined,
      fileType,
      fileUrl: fileUrl.trim(),
      fileName: fileName.trim(),
      fileContent: fileContent,
      date: date.trim(),
      lastEdited: formattedDate
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAFAFA] border border-[#D8D2C6] rounded-sm shadow-xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE7DF] bg-[#F7F4EE]">
          <div className="flex items-center gap-2 text-[#C5A059]">
            <span className="font-serif italic text-xs tracking-widest uppercase text-[#8C877D]">Exhibit Editor</span>
            <span className="text-xs text-[#1C1A17] font-semibold tracking-wider font-display uppercase">&bull; {item.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#666159] hover:text-[#1C1A17] transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Title Field */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-widest text-[#524E48] mb-1.5 font-medium">
              Activity / Exhibit Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D8D2C6] rounded-sm font-serif text-lg text-[#1C1A17] focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>

          {/* Group Members (Exhibit B only) */}
          {item.exhibit === 'voices' && (
            <div>
              <label className="block text-xs font-sans uppercase tracking-widest text-[#524E48] mb-1.5 font-medium">
                Group Members & Grouping Info
              </label>
              <input
                type="text"
                value={groupMembers}
                onChange={(e) => setGroupMembers(e.target.value)}
                placeholder="e.g. JC (Lead), Elena Vance, Marcus Thorne"
                className="w-full px-3 py-2 bg-white border border-[#D8D2C6] rounded-sm text-sm text-[#1C1A17] focus:outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-widest text-[#524E48] mb-1.5 font-medium">
              Short Description / Activity Overview
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D8D2C6] rounded-sm text-sm text-[#1C1A17] focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>

          {/* Reflection Section (Exhibits B, C, D) */}
          {item.exhibit !== 'scrolls' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-sans uppercase tracking-widest text-[#524E48] font-medium">
                  Reflection Text (~150–300 words recommended)
                </label>
                <span className={`text-[11px] font-mono ${wordCount >= 150 && wordCount <= 350 ? 'text-[#3B7A57]' : 'text-[#8C877D]'}`}>
                  {wordCount} words
                </span>
              </div>
              <textarea
                rows={6}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your personal course reflection here..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D8D2C6] rounded-sm text-sm text-[#1C1A17] leading-relaxed focus:outline-none focus:border-[#C5A059] transition-colors font-sans"
              />
            </div>
          )}

          {/* Manuscript Content (for Exhibit A or custom text documents) */}
          {item.exhibit === 'scrolls' && (
            <div>
              <label className="block text-xs font-sans uppercase tracking-widest text-[#524E48] mb-1.5 font-medium">
                Full Manuscript Text / Script Content
              </label>
              <textarea
                rows={6}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                placeholder="Enter full script, monologue notes, or draft text here..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D8D2C6] rounded-sm text-sm font-mono text-[#1C1A17] leading-relaxed focus:outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>
          )}

          {/* Media / Attachment Upload & URL Section */}
          <div className="p-4 bg-[#F5F2EC] border border-[#E2DDD3] rounded-sm space-y-3">
            <label className="block text-xs font-sans uppercase tracking-widest text-[#1C1A17] font-semibold">
              Media Attachment & Upload Options
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* File Upload Input */}
              <div className="relative border border-dashed border-[#C5A059]/60 hover:border-[#C5A059] bg-white p-3 rounded-sm text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                />
                <Upload className="w-5 h-5 mx-auto text-[#C5A059] mb-1" />
                <p className="text-xs font-medium text-[#1C1A17]">Upload Local File</p>
                <p className="text-[10px] text-[#8C877D]">PDF, DOCX, Image, MP4</p>
              </div>

              {/* External Video / Presentation Link */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#666159]">
                  Or Video/Embed Link
                </label>
                <div className="flex items-center gap-1 bg-white border border-[#D8D2C6] px-2 py-1.5 rounded-sm">
                  <LinkIcon className="w-4 h-4 text-[#8C877D]" />
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={(e) => {
                      setFileUrl(e.target.value);
                      if (e.target.value) setFileType('link');
                    }}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full text-xs bg-transparent text-[#1C1A17] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Current File Display */}
            {fileName && (
              <div className="flex items-center justify-between bg-white px-3 py-2 border border-[#E2DDD3] rounded-sm text-xs text-[#1C1A17]">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span className="truncate font-medium">{fileName}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#F4F1EA] rounded text-[#666159]">
                    {fileType}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFileName('');
                    setFileUrl('');
                    setFileType('none');
                  }}
                  className="text-[11px] text-[#A84242] hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-widest text-[#524E48] mb-1.5 font-medium">
              Activity Date Label
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-[#D8D2C6] rounded-sm text-xs text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-[#EBE7DF] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-sans tracking-widest uppercase text-[#666159] hover:text-[#1C1A17] border border-[#D8D2C6] hover:border-[#1C1A17] rounded-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-sans tracking-widest uppercase bg-[#1C1A17] text-[#FAFAFA] hover:bg-[#C5A059] rounded-sm transition-colors flex items-center gap-1.5 font-medium"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
