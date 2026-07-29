import React from 'react';

interface GreekKeyDividerProps {
  className?: string;
  color?: string;
}

export const GreekKeyDivider: React.FC<GreekKeyDividerProps> = ({ 
  className = '', 
  color = '#C5A059' 
}) => {
  return (
    <div className={`w-full flex items-center justify-center py-6 my-2 ${className}`}>
      <div className="w-full max-w-4xl flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D8D2C6] to-[#C5A059]/40" />
        
        {/* Minimal Greek Key Motif Line */}
        <svg 
          width="120" 
          height="16" 
          viewBox="0 0 120 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C5A059] opacity-80 flex-shrink-0"
        >
          {/* Continuous thin meander line */}
          <path 
            d="M0 8 H15 V2 H27 V14 H39 V2 H21 V5 H33 V11 H18 C18 11 18 8 18 8
               M39 8 H55 V2 H67 V14 H79 V2 H61 V5 H73 V11 H58 C58 11 58 8 58 8
               M79 8 H95 V2 H107 V14 H120" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D8D2C6] to-[#C5A059]/40" />
      </div>
    </div>
  );
};
