import React, { useState } from 'react';
import { Opportunity, CustomReminder, Language } from '../types';
import { translations } from '../i18n/translations';
import { BellRing, Calendar, Check, X, ShieldAlert, Sparkles } from 'lucide-react';
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
    // Fire confetti for instant positive feedback
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // safe fallback
    }

    onSaveReminder({
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title[currentLang] || opportunity.title.en,
      opportunityType: opportunity.type,
      deadlineDate: opportunity.deadline,
      reminderDaysBefore: reminderDays,
      scheduledTime: "09:00 AM",
      channel: channel
    });

    // Request browser notification permission if available
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-sm">
            <BellRing className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.setReminder}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Never miss this deadline with custom automated alerts.
            </p>
          </div>
        </div>

        {/* Opportunity Summary Card */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 mb-5">
          <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
            {opportunity.type}
          </div>
          <div className="font-bold text-sm text-slate-900 line-clamp-1 mt-0.5">
            {opportunity.title[currentLang] || opportunity.title.en}
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Deadline: <strong className="text-slate-800">{opportunity.deadline}</strong> ({opportunity.daysLeft} days remaining)</span>
          </div>
        </div>

        {/* Interval Selection */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  reminderDays === opt.days
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Channel Choice */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                    ? 'bg-indigo-50/70 border-indigo-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  checked={channel === chan.id}
                  onChange={() => setChannel(chan.id as any)}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{chan.title}</div>
                  <div className="text-[11px] text-slate-500">{chan.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2 active:scale-95 transition"
        >
          <Check className="w-4 h-4" />
          <span>Confirm & Activate Reminder</span>
        </button>

      </div>
    </div>
  );
};
