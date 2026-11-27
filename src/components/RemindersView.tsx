import React from 'react';
import type { CustomReminder, Language } from '../types';
import { translations } from '../i18n/translations';
import { BellRing, Calendar, Clock, Trash2, CheckCircle2 } from 'lucide-react';

interface RemindersViewProps {
  reminders: CustomReminder[];
  currentLang: Language;
  onDismiss: (id: string) => void;
  onExplore: () => void;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  reminders,
  currentLang,
  onDismiss,
  onExplore
}) => {
  const t = translations[currentLang];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Reminders Header Banner */}
      <div className="glass-box rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-inner text-zinc-300 text-xs font-medium mb-3">
            <BellRing className="w-3.5 h-3.5 text-sky-300" />
            <span>Active Notification Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {t.remindersTitle}
          </h2>
          <p className="text-zinc-300 text-sm mt-1 max-w-xl">
            You will receive timely push and in-app triggers before official portals close. Never miss scholarship disbursements or internship application windows.
          </p>
        </div>
      </div>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <div className="glass-box rounded-3xl p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl glass-inner text-zinc-300 flex items-center justify-center mx-auto">
            <BellRing className="w-8 h-8 opacity-75" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            No Active Reminders
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            {t.noReminders}
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-2.5 rounded-full font-medium text-xs tactile-btn"
          >
            Browse Opportunities Now
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className="glass-box rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider glass-inner text-zinc-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${rem.opportunityType === 'scholarship' ? 'bg-emerald-400' : 'bg-sky-400'}`} />
                    <span>{rem.opportunityType}</span>
                  </span>
                  <span className="text-xs font-normal text-sky-200 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-sky-300" />
                    <span>Triggers {rem.reminderDaysBefore} days before deadline</span>
                  </span>
                </div>
                
                <h4 className="text-base font-semibold text-white">
                  {rem.opportunityTitle}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-normal">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Deadline: <span className="text-zinc-100">{rem.deadlineDate}</span></span>
                  </span>
                  <span>•</span>
                  <span>Channel: <span className="uppercase text-zinc-100">{rem.channel}</span></span>
                  <span>•</span>
                  <span className="flex items-center space-x-1 text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 justify-end">
                <button
                  onClick={() => onDismiss(rem.id)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-medium tactile-btn hover:text-rose-300"
                  title="Remove this reminder"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearReminder}</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
