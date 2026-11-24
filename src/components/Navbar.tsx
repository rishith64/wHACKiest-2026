import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sparkles, Globe, Bell, DownloadCloud, Wifi, WifiOff } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          className="flex items-center space-x-2.5 cursor-pointer select-none group" 
          onClick={() => onNavSelect('explore')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-primary-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Uni<span className="text-indigo-600">Quest</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                UnlockED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Find opportunities. Never miss them.
            </p>
          </div>
        </div>

        {/* Action Controls: Network status, Language selector, Install PWA, Notifications */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Offline/Online Indicator */}
          <div 
            title={isOnline ? "Online & Synchronized" : "Working in Offline Mode"}
            className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
              isOnline 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
            }`}
          >
            {isOnline ? (
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <Wifi className="w-3.5 h-3.5" />
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
          <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5 hidden sm:inline" />
            <select
              aria-label={t.languageSelect}
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-slate-700 py-1 pl-1 pr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          {/* PWA Install Button */}
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              <span>{t.installPwa}</span>
            </button>
          )}

          {/* Reminders / Notification Bell */}
          <button
            onClick={() => onNavSelect('reminders')}
            className="relative p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            title={t.navReminders}
            aria-label="View notifications and reminders"
          >
            <Bell className="w-5 h-5" />
            {activeRemindersCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {activeRemindersCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

