import React, { useState, useEffect } from 'react';
import { ActiveTab, PortfolioItem } from './types';
import { INITIAL_PORTFOLIO_ITEMS } from './data/initialPortfolio';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ExhibitA_Scrolls } from './components/ExhibitA_Scrolls';
import { ExhibitB_Voices } from './components/ExhibitB_Voices';
import { ExhibitC_Forum } from './components/ExhibitC_Forum';
import { ExhibitD_Laurel } from './components/ExhibitD_Laurel';
import { EditModal } from './components/EditModal';
import { DetailModal } from './components/DetailModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'jc_speech_theater_portfolio_v3';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio state from storage:', e);
    }
    return INITIAL_PORTFOLIO_ITEMS;
  });

  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [detailItem, setDetailItem] = useState<PortfolioItem | null>(null);

  // Sync portfolio changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioItems));
    } catch (e) {
      console.error('Failed to persist portfolio state:', e);
    }
  }, [portfolioItems]);

  // Count items per exhibit for badge display
  const itemCountByExhibit: Record<string, number> = {
    scrolls: portfolioItems.filter(i => i.exhibit === 'scrolls').length,
    voices: portfolioItems.filter(i => i.exhibit === 'voices').length,
    forum: portfolioItems.filter(i => i.exhibit === 'forum').length,
    laurel: portfolioItems.filter(i => i.exhibit === 'laurel').length,
  };

  // Handler to update a single item
  const handleSaveItem = (updatedItem: PortfolioItem) => {
    setPortfolioItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  // Handler to reset portfolio back to initial defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all exhibit entries and reflections back to default course initial state?')) {
      setPortfolioItems(INITIAL_PORTFOLIO_ITEMS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Export full portfolio as JSON file download
  const handleExportPortfolio = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolioItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `JC_Speech_and_Theater_Portfolio_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D2D2D] font-sans antialiased">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemCountByExhibit={itemCountByExhibit}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeHero
            onNavigate={(tab) => setActiveTab(tab)}
            items={portfolioItems}
          />
        )}

        {activeTab === 'scrolls' && (
          <ExhibitA_Scrolls
            items={portfolioItems}
            onOpenDetail={(item) => setDetailItem(item)}
            onEditItem={(item) => setEditingItem(item)}
          />
        )}

        {activeTab === 'voices' && (
          <ExhibitB_Voices
            items={portfolioItems}
            onOpenDetail={(item) => setDetailItem(item)}
            onEditItem={(item) => setEditingItem(item)}
          />
        )}

        {activeTab === 'forum' && (
          <ExhibitC_Forum
            items={portfolioItems}
            onOpenDetail={(item) => setDetailItem(item)}
            onEditItem={(item) => setEditingItem(item)}
          />
        )}

        {activeTab === 'laurel' && (
          <ExhibitD_Laurel
            items={portfolioItems}
            onOpenDetail={(item) => setDetailItem(item)}
            onEditItem={(item) => setEditingItem(item)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <EditModal
        item={editingItem}
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveItem}
      />

      <DetailModal
        item={detailItem}
        isOpen={Boolean(detailItem)}
        onClose={() => setDetailItem(null)}
        onEdit={(item) => setEditingItem(item)}
      />

    </div>
  );
}
