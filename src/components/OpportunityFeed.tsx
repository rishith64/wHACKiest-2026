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
      
      {/* Search and Category Filters Box */}
      <div className="glass-box rounded-2xl p-4 sm:p-5 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-2.5 glass-inner rounded-xl text-sm font-normal text-white placeholder-zinc-500 focus:outline-none focus:border-white/35 transition"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap tactile-btn ${
                filterType === 'all' ? 'tactile-btn-active' : ''
              }`}
            >
              {t.filterAll} ({opportunities.length})
            </button>
            <button
              onClick={() => setFilterType('scholarship')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap tactile-btn ${
                filterType === 'scholarship' ? 'tactile-btn-active' : ''
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.filterScholarships}</span>
            </button>
            <button
              onClick={() => setFilterType('internship')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap tactile-btn ${
                filterType === 'internship' ? 'tactile-btn-active' : ''
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.filterInternships}</span>
            </button>
          </div>

          <div className="text-xs text-zinc-400 font-normal">
            Showing <span className="font-medium text-white">{filteredOpportunities.length}</span> verified listings
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
              className="glass-box rounded-2xl p-5 flex flex-col justify-between relative group"
            >
              <div>
                
                {/* Top Minimalist Badge Row */}
                <div className="flex items-center justify-between mb-3.5 gap-2">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide glass-inner text-zinc-300">
                    <span className={`w-1.5 h-1.5 rounded-full bg-zinc-500`} />
                    <span>{isScholarship ? 'Scholarship' : 'Internship'}</span>
                  </span>

                  {/* AI Eligibility Check Trigger Pill */}
                  <button
                    onClick={() => setAnalyzingOpp(opp)}
                    className="flex items-center space-x-1.5 text-[11px] font-medium px-3 py-1 rounded-full tactile-btn"
                    title="Click for full AI Eligibility Analysis"
                  >
                    <Sparkles className="w-3 h-3 text-zinc-400" />
                    <span>{opp.matchScore}% Match • AI Check</span>
                  </button>
                </div>

                {/* Opportunity Title */}
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                  {opp.title[currentLang] || opp.title.en}
                </h3>

                {/* Organization & Location */}
                <div className="flex items-center space-x-1.5 text-xs text-zinc-300 mt-1.5 font-normal">
                  <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                  <span className="truncate">{opp.organization}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 truncate">{opp.location}</span>
                </div>

                {/* Minimalist Amount / Stipend Box */}
                <div className="mt-4 p-3 rounded-xl glass-inner flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-zinc-400 block text-[10px] uppercase font-medium tracking-wider">
                      {t.stipend}
                    </span>
                    <span className="font-semibold text-zinc-100 text-sm">
                      {opp.amountOrStipend}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-zinc-400 block text-[10px] uppercase font-medium tracking-wider">
                      {t.deadline}
                    </span>
                    <div className="flex items-center space-x-1 justify-end font-medium text-xs text-zinc-100">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{opp.daysLeft} {t.daysRemaining}</span>
                    </div>
                  </div>
                </div>

                {/* Eligibility Summary */}
                <div className="mt-3 text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  <span className="font-medium text-white">{t.eligibility}: </span>
                  {opp.eligibility[currentLang] || opp.eligibility.en}
                </div>

                {/* Minimal Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {opp.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-normal glass-inner text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center space-x-2.5">
                <button
                  onClick={() => onSetReminder(opp)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full text-xs font-medium tactile-btn ${
                    hasReminder ? 'tactile-btn-active' : ''
                  }`}
                >
                  {hasReminder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-zinc-200" />
                      <span>Reminder Active</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5" />
                      <span>{t.setReminder}</span>
                    </>
                  )}
                </button>

                <a
                  href={opp.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full text-xs font-medium tactile-btn"
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
