import React from 'react';
import { ActiveTab, PortfolioItem } from '../types';
import { ColumnIcon, ScrollIcon, TheaterMaskIcon, AmphitheaterIcon, LaurelIcon } from './GreekIcon';
import { GreekKeyDivider } from './GreekKeyDivider';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (tab: ActiveTab) => void;
  items: PortfolioItem[];
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate, items }) => {
  const getItemCount = (exhibit: string) => items.filter(i => i.exhibit === exhibit).length;

  const exhibits = [
    {
      id: 'scrolls' as ActiveTab,
      code: 'EXHIBIT A',
      title: 'The Scrolls',
      subtitle: 'Manuscripts & Drafts',
      count: getItemCount('scrolls'),
      description: 'A curated repository of 6 annotated script drafts, speech outlines, and theatrical beat sheets.',
      icon: <ScrollIcon size={28} className="text-[#C5A059]" />
    },
    {
      id: 'voices' as ActiveTab,
      code: 'EXHIBIT B',
      title: 'Theater of Voices',
      subtitle: 'Group Presentations & Research',
      count: getItemCount('voices'),
      description: '3 collaborative presentations exploring rhetoric, world theater traditions, and script pitching.',
      icon: <TheaterMaskIcon size={28} className="text-[#C5A059]" />
    },
    {
      id: 'forum' as ActiveTab,
      code: 'EXHIBIT C',
      title: 'The Forum',
      subtitle: 'Speech & Oratory Activities',
      count: getItemCount('forum'),
      description: '2 deep rhetorical dissection studies and peer speaking evaluations focused on vocal mastery.',
      icon: <AmphitheaterIcon size={28} className="text-[#C5A059]" />
    },
    {
      id: 'laurel' as ActiveTab,
      code: 'EXHIBIT D',
      title: 'The Laurel Trials',
      subtitle: 'Midterm & Final Performances',
      count: getItemCount('laurel'),
      description: '2 culminating milestone performances: the Midterm Persuasive Speech and Final Staged Play.',
      icon: <LaurelIcon size={28} className="text-[#C5A059]" />
    },
  ];

  return (
    <div className="space-y-12 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Museum Placard Hero Header */}
      <div className="text-center space-y-6 pt-4 pb-8 max-w-3xl mx-auto">
        
        {/* Subtle Visual Anchor Column Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#F4F1EA] border border-[#E2DDD3] flex items-center justify-center text-[#C5A059] shadow-sm">
          <ColumnIcon size={32} />
        </div>

        {/* Course & Student Title */}
        <div className="space-y-2">
          <span className="font-serif italic text-xs tracking-widest text-[#C5A059] uppercase block font-medium">
            Personal Course Portfolio &bull; Speech & Theater
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-[#1C1A17] uppercase leading-tight">
            JC's Speech & Theater Adventures
          </h1>
        </div>

        {/* Welcome Line */}
        <p className="font-sans text-xs sm:text-sm text-[#524E48] leading-relaxed max-w-2xl mx-auto pt-2">
          Welcome to my digital gallery exhibit. This curated space houses my manuscript drafts, group presentations, oratory dissections, and culminating performance reflections for the Speech & Theater curriculum.
        </p>

        {/* Submission Metadata Block */}
        <div className="pt-5 mt-4 border-t border-[#E2DDD3]/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-[#F7F4EE] border border-[#E2DDD3] rounded-sm max-w-2xl mx-auto text-left">
          <div className="w-full sm:w-auto space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C877D] block font-medium">
              Submitted by:
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold text-[#1C1A17] block">
              John Christoper Villanueva
            </span>
          </div>
          <div className="w-full sm:w-auto sm:text-right space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C877D] block font-medium">
              Submitted to:
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold text-[#1C1A17] block">
              Allyson Kenchi Salvo, <span className="font-sans text-xs font-normal text-[#524E48] italic">Course Instructor</span>
            </span>
          </div>
        </div>

      </div>

      {/* Single Thin Greek Key Divider Line */}
      <GreekKeyDivider />

      {/* Gallery Grid of 4 Exhibits */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
          <h2 className="font-display text-xs tracking-widest text-[#1C1A17] uppercase font-semibold flex items-center gap-2">
            <BookOpen size={16} className="text-[#C5A059]" />
            Exhibits Catalogue
          </h2>
          <span className="text-[11px] font-mono text-[#8C877D] uppercase">
            Total Artifacts: {items.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {exhibits.map((ex) => (
            <div
              key={ex.id}
              onClick={() => onNavigate(ex.id)}
              className="group cursor-pointer bg-white border border-[#E2DDD3] hover:border-[#C5A059] p-6 rounded-sm shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Top Bar inside Card */}
              <div className="flex items-start justify-between">
                <div className="p-2.5 bg-[#F7F4EE] border border-[#EBE7DF] rounded-sm group-hover:bg-[#F2ECE1] transition-colors">
                  {ex.icon}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#F4F1EA] text-[#666159] rounded border border-[#E2DDD3]">
                    {ex.code}
                  </span>
                  <p className="text-[11px] text-[#8C877D] font-mono mt-1">
                    {ex.count} {ex.count === 1 ? 'Artifact' : 'Artifacts'}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1A17] group-hover:text-[#C5A059] transition-colors">
                  {ex.title}
                </h3>
                <p className="text-xs font-sans uppercase tracking-widest text-[#C5A059] font-medium">
                  {ex.subtitle}
                </p>
                <p className="text-xs font-sans text-[#524E48] leading-relaxed pt-1">
                  {ex.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-2 flex items-center text-xs font-sans uppercase tracking-widest text-[#1C1A17] font-semibold group-hover:text-[#C5A059] transition-colors">
                <span>Enter Wing</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>

              {/* Subtle Gold Accent Corner on Hover */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#C5A059]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Curator Statement Footer Note */}
      <div className="p-6 bg-[#F7F4EE] border border-[#E2DDD3] rounded-sm text-center space-y-2 max-w-2xl mx-auto mt-8">
        <span className="text-[11px] font-serif italic uppercase text-[#C5A059] tracking-widest">Curator's Note</span>
        <p className="text-xs text-[#524E48] font-sans leading-relaxed">
          "live laugh die"
        </p>
      </div>

    </div>
  );
};
