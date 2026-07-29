export type ExhibitType = 'scrolls' | 'voices' | 'forum' | 'laurel';

export type FileType = 'pdf' | 'docx' | 'image' | 'video' | 'audio' | 'link' | 'none';

export interface PortfolioItem {
  id: string;
  exhibit: ExhibitType;
  title: string;
  description: string;
  groupMembers?: string; // For Exhibit B (Presentations)
  reflection?: string;   // For Exhibits B, C, D
  fileType?: FileType;
  fileUrl?: string;      // Data URL or external link (YouTube, Vimeo, PDF URL, etc.)
  fileName?: string;
  fileContent?: string;  // Full text content for manuscripts or notes
  date: string;
  lastEdited?: string;   // Date stamp of last update
}

export type ActiveTab = 'home' | 'scrolls' | 'voices' | 'forum' | 'laurel';
