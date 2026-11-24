import React, { useState, useEffect } from 'react';
import type { Language, Opportunity, Note, CustomReminder, StudentProfile } from './types';
import { seedOpportunities, seedNotes, defaultStudentProfile } from './data/mockData';
import { translations } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { OpportunityFeed } from './components/OpportunityFeed';
import { ReminderModal } from './components/ReminderModal';
import { RemindersView } from './components/RemindersView';
import { NotesHub } from './components/NotesHub';
import { ProfileView } from './components/ProfileView';
import { Compass, BookOpen, User, BellRing } from 'lucide-react';

export function App() {
  // Persistence state
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('uniquest_lang') as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('explore');

  const [opportunities] = useState<Opportunity[]>(seedOpportunities);

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('uniquest_notes');
    return saved ? JSON.parse(saved) : seedNotes;
  });

  const [reminders, setReminders] = useState<CustomReminder[]>(() => {
    const saved = localStorage.getItem('uniquest_reminders');
    return saved ? JSON.parse(saved) : [
      {
        id: "rem-default",
        opportunityId: "opp-1",
        opportunityTitle: "PM-USP Central Sector Scholarship Scheme (NSP)",
        opportunityType: "scholarship",
        deadlineDate: "2026-11-30",
        reminderDaysBefore: 3,
        scheduledTime: "09:00 AM",
        channel: "push",
        createdAt: "2026-11-24",
        isTriggered: false,
        isDismissed: false
      }
    ];
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('uniquest_profile');
    return saved ? JSON.parse(saved) : defaultStudentProfile;
  });

  const [selectedOppForReminder, setSelectedOppForReminder] = useState<Opportunity | null>(null);

  // Network & PWA status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    localStorage.setItem('uniquest_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('uniquest_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('uniquest_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('uniquest_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstallPwa(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleSaveReminder = (newReminderData: Omit<CustomReminder, 'id' | 'createdAt' | 'isTriggered' | 'isDismissed'>) => {
    const newReminder: CustomReminder = {
      ...newReminderData,
      id: `rem-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isTriggered: false,
      isDismissed: false
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleDismissReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleRateNote = (noteId: string, starRating: number) => {
    setNotes(prev =>
      prev.map(note => {
        if (note.id === noteId) {
          const totalRating = note.rating * note.ratingCount + starRating;
          const newCount = note.ratingCount + 1;
          return {
            ...note,
            rating: Math.round((totalRating / newCount) * 10) / 10,
            ratingCount: newCount
          };
        }
        return note;
      })
    );
  };

  const handleAddNote = (newNote: Note) => {
    setNotes(prev => [newNote, ...prev]);
  };

  const existingReminderOppIds = new Set(reminders.map(r => r.opportunityId));
  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 sm:pb-8 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeRemindersCount={reminders.length}
        onNavSelect={setActiveTab}
        isOnline={isOnline}
        canInstallPwa={canInstallPwa}
        onInstallPwa={handleInstallPwa}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex-1 w-full">
        
        {/* Offline Notification Banner */}
        {!isOnline && (
          <div className="mb-5 p-3.5 bg-amber-500 text-white rounded-2xl text-xs font-bold flex items-center justify-between shadow-md">
            <span>⚡ {t.offlineBanner}</span>
            <span className="text-[10px] uppercase bg-black/20 px-2 py-0.5 rounded">PWA Cache Ready</span>
          </div>
        )}

        {/* Desktop Tab Switcher (4 Focused Tabs Matching Updated Flow) */}
        <div className="hidden sm:flex items-center space-x-2 mb-6 border-b border-slate-200 pb-3">
          {[
            { id: 'explore', label: t.navOpportunities, icon: Compass },
            { id: 'reminders', label: t.navReminders, icon: BellRing, count: reminders.length },
            { id: 'notes', label: t.navNotes, icon: BookOpen },
            { id: 'profile', label: t.navProfile, icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-indigo-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Views */}
        {activeTab === 'explore' && (
          <OpportunityFeed
            opportunities={opportunities}
            studentProfile={profile}
            currentLang={currentLang}
            onSetReminder={(opp) => setSelectedOppForReminder(opp)}
            existingReminderOppIds={existingReminderOppIds}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersView
            reminders={reminders}
            currentLang={currentLang}
            onDismiss={handleDismissReminder}
            onExplore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'notes' && (
          <NotesHub
            notes={notes}
            currentLang={currentLang}
            onRateNote={handleRateNote}
            onAddNote={handleAddNote}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            currentLang={currentLang}
            onUpdateProfile={setProfile}
          />
        )}

      </main>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentLang={currentLang}
        remindersBadgeCount={reminders.length}
      />

      {/* Set Custom Reminder Modal */}
      {selectedOppForReminder && (
        <ReminderModal
          opportunity={selectedOppForReminder}
          currentLang={currentLang}
          onClose={() => setSelectedOppForReminder(null)}
          onSaveReminder={handleSaveReminder}
        />
      )}

      {/* Hackathon Footer Credit */}
      <footer className="mt-8 border-t border-slate-200 py-4 text-center text-xs text-slate-400 font-medium hidden sm:block">
        UniQuest • UnlockED Hackathon • Built with ❤️ for Tier-3 College Students by Team Return 0
      </footer>

    </div>
  );
}

export default App;
