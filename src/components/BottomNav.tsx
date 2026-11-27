import React from 'react';
import { Compass, BookOpen, User, BellRing } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentLang: Language;
  remindersBadgeCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  currentLang,
  remindersBadgeCount,
}) => {
  const t = translations[currentLang];

  const tabs = [
    { id: 'explore', label: t.navOpportunities, icon: Compass },
    { id: 'reminders', label: t.navReminders, icon: BellRing, badge: remindersBadgeCount },
    { id: 'notes', label: t.navNotes, icon: BookOpen },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-t border-white/10 pb-safe sm:hidden">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center pt-1 pb-1 transition-all ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 font-normal'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2px]' : 'stroke-[1.6px]'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 px-1 bg-white text-black text-[9px] font-bold rounded-full min-w-[14px] text-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[11px] mt-1 tracking-tight truncate max-w-[70px]">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
