import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  className?: string;
}

export const ColumnIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {/* Capital / Abacus */}
    <path d="M4 4h16M3 6h18M5 6v14M9 6v14M15 6v14M19 6v14" />
    {/* Base */}
    <path d="M3 20h18M4 22h16" />
    {/* Fluting subtle accent */}
    <path d="M12 6v14" strokeDasharray="1 2" opacity="0.6" />
  </svg>
);

export const LaurelIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {/* Left Laurel Branch */}
    <path d="M12 21C10 18 6 15 5 9C7 9.5 8.5 11 9 13" />
    <path d="M5.5 13.5C4 11.5 4 8.5 6 6.5C7.5 7.5 8 9.5 8 11.5" />
    <path d="M8 8.5C7 6.5 7.5 4 9.5 2.5C10.5 4 10.5 6 10 7.5" />
    
    {/* Right Laurel Branch */}
    <path d="M12 21C14 18 18 15 19 9C17 9.5 15.5 11 15 13" />
    <path d="M18.5 13.5C20 11.5 20 8.5 18 6.5C16.5 7.5 16 9.5 16 11.5" />
    <path d="M16 8.5C17 6.5 16.5 4 14.5 2.5C13.5 4 13.5 6 14 7.5" />
    
    {/* Center Ribbon Stem */}
    <path d="M12 21V18" />
  </svg>
);

export const ScrollIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    <path d="M8 21h11a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z" />
    <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
    <path d="M8 7h7M8 11h5" />
  </svg>
);

export const TheaterMaskIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {/* Comedy/Tragedy Mask Blend */}
    <path d="M12 3c-5 0-9 3.5-9 8.5S7 20 12 20s9-3.5 9-8.5S17 3 12 3z" />
    {/* Eyes */}
    <circle cx="8.5" cy="9.5" r="1.5" />
    <circle cx="15.5" cy="9.5" r="1.5" />
    {/* Expressive Mouth */}
    <path d="M8 15c2 2 6 2 8 0" />
    {/* Brow line */}
    <path d="M7 7.5c1.5-.5 3-.5 4.5 0M12.5 7.5c1.5-.5 3-.5 4.5 0" />
  </svg>
);

export const AmphitheaterIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {/* Concentric Tier Arc / Forum */}
    <path d="M3 18c0-5 4-9 9-9s9 4 9 9" />
    <path d="M5 18c0-3.8 3.1-7 7-7s7 3.2 7 7" />
    <path d="M7.5 18c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
    <path d="M10 18a2 2 0 0 1 4 0" />
    {/* Base Orchestra line */}
    <path d="M2 20h20" />
  </svg>
);
