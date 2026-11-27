import React, { useState } from 'react';
import type { StudentProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { School, CheckCircle2, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  profile: StudentProfile;
  currentLang: Language;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  currentLang,
  onUpdateProfile
}) => {
  const t = translations[currentLang];
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedSuccess(true);
    try { confetti({ particleCount: 30 }); } catch (e) {}
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Student Profile Header Card */}
      <div className="glass-box rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-20 h-20 rounded-3xl glass-inner text-white flex items-center justify-center text-3xl font-semibold">
          {formData.name.slice(0, 1)}
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {formData.name}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full glass-inner text-emerald-300 text-[10px] font-medium">
              Verified Student
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-normal mt-0.5">
            {formData.branch} • Year {formData.year} (Sem {formData.semester})
          </p>
          <p className="text-xs text-sky-200 font-medium mt-1">
            {formData.college}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="glass-box rounded-3xl p-6 sm:p-8 space-y-5">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-3 flex items-center space-x-2">
          <School className="w-4 h-4 text-sky-300" />
          <span>Academic & Eligibility Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              {t.profileCollege}
            </label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              Current CGPA
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.cgpa}
              onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              {t.profileIncome}
            </label>
            <select
              value={formData.familyIncomeAnnual}
              onChange={(e) => setFormData({ ...formData, familyIncomeAnnual: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
            >
              <option value="< ₹2.5 Lakhs">&lt; ₹2.5 Lakhs (BPL / Full Subsidy)</option>
              <option value="< ₹4.5 Lakhs">&lt; ₹4.5 Lakhs (Eligible for PM-USP)</option>
              <option value="< ₹8.0 Lakhs">&lt; ₹8.0 Lakhs (EWS / General Merit)</option>
              <option value="> ₹8.0 Lakhs">&gt; ₹8.0 Lakhs</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-zinc-400">
            {savedSuccess ? (
              <span className="text-emerald-300 font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </span>
            ) : (
              <span>Opportunities automatically filter by these parameters.</span>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-medium tactile-btn"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>

    </div>
  );
};
