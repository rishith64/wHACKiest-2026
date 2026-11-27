import React from 'react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';
import { Compass, Globe, Bell, DownloadCloud, Wifi, WifiOff } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeRemindersCount: number;
  onNavSelect: (tab: string) => void;
  isOnline: boolean;
  canInstallPwa: boolean;
  onInstallPwa: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeRemindersCount,
  onNavSelect,
  isOnline,
  canInstallPwa,
  onInstallPwa
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-black/35 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Minimalist Monochrome Brand Logo & Tagline */}
        <div 
          className="flex items-center space-x-3 cursor-pointer select-none group" 
          onClick={() => onNavSelect('explore')}
        >
          <div className="w-10 h-10 rounded-2xl tactile-btn flex items-center justify-center group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white stroke-[1.75px]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-semibold tracking-tight text-primary">
                Uni<span className="font-light text-primary">Quest</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.05] text-primary border border-white/15">
                UnlockED
              </span>
            </div>
            <p className="text-[11px] text-primary hidden sm:block font-normal tracking-wide">
              Find opportunities. Never miss them.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Offline/Online Indicator */}
          <div 
            title={isOnline ? "Online & Synchronized" : "Working in Offline Mode"}
            className={`flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border bg-white/[0.03] backdrop-blur-sm ${
              isOnline 
                ? 'text-zinc-300 border-white/15' 
                : 'text-amber-300 border-amber-400/40 animate-pulse'
            }`}
          >
            {isOnline ? (
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <Wifi className="w-3.5 h-3.5 text-zinc-300" />
                <span className="hidden md:inline">Online</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1">
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline</span>
              </span>
            )}
          </div>

          {/* Multilingual Switcher */}
          <div className="relative flex items-center rounded-full px-2 py-0.5 tactile-btn">
            <Globe className="w-3.5 h-3.5 text-zinc-400 ml-1 mr-1 hidden sm:inline" />
            <select
              aria-label={t.languageSelect}
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs font-medium text-zinc-200 py-1 pr-1 rounded-full focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-zinc-950 text-zinc-100">English</option>
              <option value="hi" className="bg-zinc-950 text-zinc-100">हिन्दी</option>
              <option value="kn" className="bg-zinc-950 text-zinc-100">ಕನ್ನಡ</option>
            </select>
          </div>

          {/* PWA Install Button */}
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tactile-btn"
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              <span>{t.installPwa}</span>
            </button>
          )}

          {/* Reminders / Notification Bell */}
          <button
            onClick={() => onNavSelect('reminders')}
            className="relative p-2.5 rounded-full tactile-btn"
            title={t.navReminders}
            aria-label="View notifications and reminders"
          >
            <Bell className="w-4 h-4" />
            {activeRemindersCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {activeRemindersCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
