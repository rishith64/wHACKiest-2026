import React from 'react';
import { Compass, BookOpen, Bot, User, BellRing } from 'lucide-react';
import { Language } from '../types';
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
    { id: 'advisor', label: t.navBot, icon: Bot },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe sm:hidden">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center pt-1 pb-1 transition-all ${
                isActive
                  ? 'text-indigo-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-rose-500 text-white text-[9px] font-bold rounded-full min-w-[14px] text-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
