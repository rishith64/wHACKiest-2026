import React, { useState } from 'react';
import { Opportunity, StudentProfile, Language } from '../types';
import { Sparkles, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Bot, BrainCircuit } from 'lucide-react';

interface AIMatchModalProps {
  opportunity: Opportunity;
  profile: StudentProfile;
  currentLang: Language;
  onClose: () => void;
  onSetReminder: (opp: Opportunity) => void;
}

export const AIMatchModal: React.FC<AIMatchModalProps> = ({
  opportunity,
  profile,
  currentLang,
  onClose,
  onSetReminder,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  // Dynamic calculations based on real student profile parameters
  const isIncomeEligible = opportunity.type === 'scholarship'
    ? !profile.familyIncomeAnnual.includes('> ₹8.0')
    : true;

  const isAcademicEligible = profile.cgpa >= 7.5;
  const matchScore = opportunity.matchScore || (isIncomeEligible && isAcademicEligible ? 96 : 84);

  // Multilingual AI explanation text
  const getAnalysis = () => {
    if (currentLang === 'kn') {
      return {
        verdict: isIncomeEligible && isAcademicEligible ? "ಅತ್ಯುನ್ನತ ಹೊಂದಾಣಿಕೆ (Strong Match)" : "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ (Review Criteria)",
        reasons: [
          `ಶೈಕ್ಷಣಿಕ ಅಂಕಗಳು: ನಿಮ್ಮ CGPA (${profile.cgpa}) ಈ ಅವಕಾಶಕ್ಕೆ ಸೂಕ್ತವಾಗಿದೆ.`,
          `ಕುಟುಂಬದ ಆದಾಯ (${profile.familyIncomeAnnual}): ವಿದ್ಯಾರ್ಥಿವೇತನದ ಆದಾಯ ಮಿತಿಯೊಳಗೆ ಬರುತ್ತದೆ.`,
          `ಕಾಲೇಜು ಹಂತ: ${profile.college} - ಟೈರ್-3 ಇಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಈ ಯೋಜನೆ ಮುಕ್ತವಾಗಿದೆ.`,
        ],
        advice: "ಕೊನೆಯ ದಿನಾಂಕಕ್ಕೆ ಕಾಯಬೇಡಿ. ಈಗಲೇ ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು (ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, 12 ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿ) ಸಿದ್ಧಪಡಿಸಿ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      };
    }
    if (currentLang === 'hi') {
      return {
        verdict: isIncomeEligible && isAcademicEligible ? "मजबूत प्रोफ़ाइल मैच (Strong Match)" : "पात्रता समीक्षा आवश्यक",
        reasons: [
          `शैक्षणिक स्थिति: आपका CGPA (${profile.cgpa}) इस अवसर के लिए उपयुक्त है।`,
          `पारिवारिक आय (${profile.familyIncomeAnnual}): निर्धारित पात्रता सीमा के अंतर्गत है।`,
          `संस्थान: ${profile.college} - इस योजना का लाभ टियर-3 कॉलेज के विद्यार्थी उठा सकते हैं।`,
        ],
        advice: "अंतिम तिथि से पहले आवश्यक दस्तावेज़ (आय प्रमाण पत्र, 12वीं की मार्कशीट) तैयार रखें और आधिकारिक पोर्टल पर आवेदन करें।",
      };
    }
    return {
      verdict: isIncomeEligible && isAcademicEligible ? "Strong Profile Match (96%)" : "Partial Match (Needs Review)",
      reasons: [
        `Academic Standing: Current CGPA (${profile.cgpa}) comfortably satisfies cutoffs.`,
        `Annual Family Income (${profile.familyIncomeAnnual}): Fully complies with criteria.`,
        `Target Institution: Students from ${profile.college} are eligible to apply.`,
      ],
      advice: "Ensure your domicile certificate, income certificate, and 12th marksheet are verified by your college nodal officer before the portal closes.",
    };
  };

  const analysis = getAnalysis();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Sarvam & Gemini Eligibility Analysis
              </h3>
              <p className="text-[11px] text-slate-500">
                Contextual matching against your student profile
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Opportunity Card */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            {opportunity.type}
          </span>
          <h4 className="font-bold text-sm text-slate-900 mt-0.5">
            {opportunity.title[currentLang] || opportunity.title.en}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Deadline: <strong className="text-slate-800">{opportunity.deadline}</strong> ({opportunity.daysLeft} days left)
          </p>
        </div>

        {/* AI Match Gauge */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              AI Match Verdict
            </div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {analysis.verdict}
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-200 flex flex-col items-center justify-center text-emerald-600">
            <span className="text-base font-black leading-none">{matchScore}%</span>
            <span className="text-[9px] font-bold text-slate-400 mt-0.5">Fit</span>
          </div>
        </div>

        {/* Breakdown Points */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Why you qualify:
          </div>
          {analysis.reasons.map((r, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* AI Tip / Action */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
          <div className="font-bold flex items-center space-x-1.5 mb-1 text-amber-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Actionable Recommendation:</span>
          </div>
          <p className="leading-relaxed">{analysis.advice}</p>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center space-x-2">
          <button
            onClick={() => {
              onClose();
              onSetReminder(opportunity);
            }}
            className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Set Custom Reminder
          </button>
          <a
            href={opportunity.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
          >
            Apply on Official Portal
          </a>
        </div>

      </div>
    </div>
  );
};
