import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { ColumnIcon, LaurelIcon, ScrollIcon, TheaterMaskIcon, AmphitheaterIcon } from './GreekIcon';
import { Menu, X, Landmark } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  itemCountByExhibit: Record<string, number>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  itemCountByExhibit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; exhibitCode: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Museum Main', exhibitCode: 'GALLERY', icon: <Landmark className="w-4 h-4" /> },
    { id: 'scrolls', label: 'Exhibit A: The Scrolls', exhibitCode: 'DRAFTS', icon: <ScrollIcon size={18} /> },
    { id: 'voices', label: 'Exhibit B: Theater of Voices', exhibitCode: 'PRESENTATIONS', icon: <TheaterMaskIcon size={18} /> },
    { id: 'forum', label: 'Exhibit C: The Forum', exhibitCode: 'SPEECHES', icon: <AmphitheaterIcon size={18} /> },
    { id: 'laurel', label: 'Exhibit D: The Laurel Trials', exhibitCode: 'MIDTERM & FINAL', icon: <LaurelIcon size={18} /> },
  ];

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#EBE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Title */}
        <button 
          onClick={() => handleSelect('home')}
          className="flex items-center gap-3 text-left group transition-opacity hover:opacity-90 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#F4F1EA] border border-[#E2DDD3] flex items-center justify-center text-[#C5A059] group-hover:border-[#C5A059] transition-colors">
            <ColumnIcon size={20} />
          </div>
          <div>
            <h1 className="font-display font-semibold text-lg sm:text-xl tracking-wider text-[#1C1A17] uppercase">
              JC's Speech & Theater
            </h1>
            <p className="font-serif italic text-xs text-[#666159] tracking-widest uppercase">
              Adventures &bull; Greek Wing Portfolio
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const count = itemCountByExhibit[item.id];
            
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative px-3 py-2 text-xs font-sans tracking-widest uppercase transition-all flex items-center gap-2 rounded-md ${
                  isActive 
                    ? 'text-[#1C1A17] font-semibold bg-[#F2ECE1]/60' 
                    : 'text-[#666159] hover:text-[#1C1A17] hover:bg-[#F7F4EE]'
                }`}
              >
                <span className={isActive ? 'text-[#C5A059]' : 'text-[#8C877D]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {count !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EBE7DF] text-[#524E48] font-mono">
                    {count}
                  </span>
                )}
                {/* Minimal Gold Underline Active Bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C5A059]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#524E48] hover:text-[#1C1A17] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAFAFA] border-b border-[#EBE7DF] px-4 pt-2 pb-6 space-y-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const count = itemCountByExhibit[item.id];

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-sans tracking-widest uppercase text-left rounded-sm transition-all ${
                  isActive
                    ? 'text-[#1C1A17] font-semibold bg-[#F2ECE1] border-l-2 border-[#C5A059]'
                    : 'text-[#666159] hover:bg-[#F5F2EC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#C5A059]' : 'text-[#8C877D]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {count !== undefined && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#EBE7DF] text-[#524E48] font-mono">
                    {count} items
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
