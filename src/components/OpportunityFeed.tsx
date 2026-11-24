import React, { useState } from 'react';
import type { Opportunity, Language, StudentProfile } from '../types';
import { translations } from '../i18n/translations';
import { 
  Building2, 
  Clock, 
  ExternalLink, 
  Bell, 
  Briefcase, 
  GraduationCap, 
  Search,
  Check,
  Sparkles
} from 'lucide-react';
import { AIMatchModal } from './AIMatchModal';

interface OpportunityFeedProps {
  opportunities: Opportunity[];
  studentProfile: StudentProfile;
  currentLang: Language;
  onSetReminder: (opp: Opportunity) => void;
  existingReminderOppIds: Set<string>;
}

export const OpportunityFeed: React.FC<OpportunityFeedProps> = ({
  opportunities,
  studentProfile,
  currentLang,
  onSetReminder,
  existingReminderOppIds
}) => {
  const t = translations[currentLang];
  const [filterType, setFilterType] = useState<'all' | 'scholarship' | 'internship'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [analyzingOpp, setAnalyzingOpp] = useState<Opportunity | null>(null);

  const filteredOpportunities = opportunities.filter((opp) => {
    if (filterType !== 'all' && opp.type !== filterType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const titleMatch = opp.title[currentLang].toLowerCase().includes(q) || opp.title.en.toLowerCase().includes(q);
      const orgMatch = opp.organization.toLowerCase().includes(q);
      const tagMatch = opp.tags.some(tag => tag.toLowerCase().includes(q));
      return titleMatch || orgMatch || tagMatch;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Search and Category Filters Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.filterAll} ({opportunities.length})
            </button>
            <button
              onClick={() => setFilterType('scholarship')}
              className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'scholarship'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.filterScholarships}</span>
            </button>
            <button
              onClick={() => setFilterType('internship')}
              className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'internship'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.filterInternships}</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredOpportunities.length}</span> verified listings
          </div>
        </div>

      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredOpportunities.map((opp) => {
          const isScholarship = opp.type === 'scholarship';
          const hasReminder = existingReminderOppIds.has(opp.id);

          return (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between relative group"
            >
              <div>
                
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isScholarship
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {isScholarship ? (
                      <>
                        <GraduationCap className="w-3 h-3" />
                        <span>Scholarship</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3 h-3" />
                        <span>Internship</span>
                      </>
                    )}
                  </span>

                  {/* AI Eligibility Check Trigger Pill */}
                  <button
                    onClick={() => setAnalyzingOpp(opp)}
                    className="flex items-center space-x-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1 rounded-lg transition active:scale-95"
                    title="Click for full AI Eligibility Analysis"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>🎯 {opp.matchScore}% Match • AI Check</span>
                  </button>
                </div>

                {/* Opportunity Title in Selected Language */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {opp.title[currentLang] || opp.title.en}
                </h3>

                {/* Organization & Location */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 mt-2 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{opp.organization}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 truncate">{opp.location}</span>
                </div>

                {/* Amount / Stipend Highlight */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                      {t.stipend}
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {opp.amountOrStipend}
                    </span>
                  </div>
                  
                  {/* Deadline & countdown */}
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                      {t.deadline}
                    </span>
                    <div className="flex items-center space-x-1 justify-end font-bold text-xs text-amber-700">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{opp.daysLeft} {t.daysRemaining}</span>
                    </div>
                  </div>
                </div>

                {/* Eligibility Summary */}
                <div className="mt-3 text-xs text-slate-600 line-clamp-2">
                  <span className="font-bold text-slate-700">{t.eligibility}: </span>
                  {opp.eligibility[currentLang] || opp.eligibility.en}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {opp.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons: Set Reminder & Apply */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center space-x-2">
                <button
                  onClick={() => onSetReminder(opp)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    hasReminder
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 active:scale-95'
                  }`}
                >
                  {hasReminder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reminder Active</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{t.setReminder}</span>
                    </>
                  )}
                </button>

                <a
                  href={opp.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition active:scale-95"
                >
                  <span>{t.applyNow}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* Embedded AI Match Modal */}
      {analyzingOpp && (
        <AIMatchModal
          opportunity={analyzingOpp}
          profile={studentProfile}
          currentLang={currentLang}
          onClose={() => setAnalyzingOpp(null)}
          onSetReminder={onSetReminder}
        />
      )}

    </div>
  );
};
