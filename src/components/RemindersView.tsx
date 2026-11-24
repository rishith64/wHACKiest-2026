import React from 'react';
import { CustomReminder, Language } from '../types';
import { translations } from '../i18n/translations';
import { BellRing, Calendar, Clock, Trash2, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-primary-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold mb-3">
            <BellRing className="w-3.5 h-3.5" />
            <span>Active Notification Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t.remindersTitle}
          </h2>
          <p className="text-indigo-100 text-sm mt-1 max-w-xl">
            You will receive timely push and in-app triggers before official portals close. Never miss scholarship disbursements or internship application windows.
          </p>
        </div>
        
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
            <BellRing className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Active Reminders
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {t.noReminders}
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 active:scale-95 transition"
          >
            Browse Opportunities Now
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    rem.opportunityType === 'scholarship'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {rem.opportunityType}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Triggers {rem.reminderDaysBefore} days before deadline</span>
                  </span>
                </div>
                
                <h4 className="text-base font-bold text-slate-900">
                  {rem.opportunityTitle}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Deadline: <strong className="text-slate-700">{rem.deadlineDate}</strong></span>
                  </span>
                  <span>•</span>
                  <span>Channel: <strong className="uppercase text-slate-700">{rem.channel}</strong></span>
                  <span>•</span>
                  <span className="flex items-center space-x-1 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </span>
                </div>
              </div>

              {/* Dismiss / Delete action */}
              <div className="flex items-center space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-end">
                <button
                  onClick={() => onDismiss(rem.id)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 active:scale-95 transition"
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
