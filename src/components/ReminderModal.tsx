import React, { useState } from 'react';
import type { Opportunity, CustomReminder, Language } from '../types';
import { translations } from '../i18n/translations';
import { BellRing, Calendar, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReminderModalProps {
  opportunity: Opportunity | null;
  currentLang: Language;
  onClose: () => void;
  onSaveReminder: (reminder: Omit<CustomReminder, 'id' | 'createdAt' | 'isTriggered' | 'isDismissed'>) => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  opportunity,
  currentLang,
  onClose,
  onSaveReminder
}) => {
  if (!opportunity) return null;
  const t = translations[currentLang];

  const [reminderDays, setReminderDays] = useState<number>(3);
  const [channel, setChannel] = useState<'push' | 'in-app' | 'whatsapp'>('push');

  const handleSave = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    onSaveReminder({
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title[currentLang] || opportunity.title.en,
      opportunityType: opportunity.type,
      deadlineDate: opportunity.deadline,
      reminderDaysBefore: reminderDays,
      scheduledTime: "09:00 AM",
      channel: channel
    });

    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-950/90 backdrop-blur-xl w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/15 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl glass-inner text-sky-300 flex items-center justify-center">
            <BellRing className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {t.setReminder}
            </h3>
            <p className="text-xs text-zinc-400 font-normal">
              Never miss this deadline with custom automated alerts.
            </p>
          </div>
        </div>

        {/* Opportunity Summary Card */}
        <div className="p-3.5 glass-inner rounded-2xl mb-5">
          <div className="text-[11px] font-medium text-sky-300 uppercase tracking-wider">
            {opportunity.type}
          </div>
          <div className="font-semibold text-sm text-white line-clamp-1 mt-0.5">
            {opportunity.title[currentLang] || opportunity.title.en}
          </div>
          <div className="flex items-center space-x-2 text-xs text-zinc-400 mt-1 font-normal">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Deadline: <span className="text-zinc-100">{opportunity.deadline}</span> ({opportunity.daysLeft} days remaining)</span>
          </div>
        </div>

        {/* Interval Selection */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
            When should UniQuest remind you?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { days: 7, label: "7 Days Before" },
              { days: 3, label: "3 Days Before" },
              { days: 1, label: "24 Hours Before" },
            ].map((opt) => (
              <button
                key={opt.days}
                type="button"
                onClick={() => setReminderDays(opt.days)}
                className={`py-2.5 px-2 rounded-full text-xs font-medium tactile-btn ${
                  reminderDays === opt.days ? 'tactile-btn-active' : ''
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Channel Choice */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
            Notification Delivery Channel
          </label>
          <div className="space-y-2">
            {[
              { id: 'push', title: "PWA Device Push Notification", desc: "Alert directly on phone/laptop screen" },
              { id: 'in-app', title: "In-App UniQuest Notification", desc: "Badges and highlights inside app" },
              { id: 'whatsapp', title: "WhatsApp Alert (Integration Ready)", desc: "Free simulated notification reminder" },
            ].map((chan) => (
              <div
                key={chan.id}
                onClick={() => setChannel(chan.id as any)}
                className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  channel === chan.id
                    ? 'bg-white/10 border-white/40'
                    : 'glass-inner hover:bg-white/[0.06]'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  checked={channel === chan.id}
                  onChange={() => setChannel(chan.id as any)}
                  className="mt-1 accent-white"
                />
                <div>
                  <div className="text-xs font-medium text-white">{chan.title}</div>
                  <div className="text-[11px] text-zinc-400">{chan.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 px-4 font-medium text-sm rounded-full tactile-btn flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Confirm & Activate Reminder</span>
        </button>

      </div>
    </div>
  );
};
