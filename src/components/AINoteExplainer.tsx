import React, { useState } from 'react';
import { Note, Language } from '../types';
import { Sparkles, BrainCircuit, RefreshCw, Copy, Check } from 'lucide-react';

interface AINoteExplainerProps {
  note: Note;
  currentLang: Language;
}

export const AINoteExplainer: React.FC<AINoteExplainerProps> = ({ note, currentLang }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'summary' | 'questions'>('summary');

  // Multi-lingual simulated summaries & exam questions for notes
  const getAIContent = () => {
    if (currentLang === 'kn') {
      return {
        summary: `ಈ ಟಿಪ್ಪಣಿಯು ${note.subject} (Sem ${note.semester}) ವಿಷಯದ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಪರೀಕ್ಷಾ ಸೂತ್ರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಅರ್ಥವಾಗುವಂತೆ ಸ್ಪಷ್ಟ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ವಿವರಿಸಲಾಗಿದೆ.`,
        keyTakeaways: [
          "ಪರೀಕ್ಷೆಯಲ್ಲಿ ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ 10 ಅಂಕಗಳ ಪ್ರಶ್ನೆಗಳು",
          "ಅಲ್ಗಾರಿದಮ್‌ಗಳ ಸರಳ ಹಂತಗಳು ಮತ್ತು ಸಿಂಟ್ಯಾಕ್ಸ್",
          "ವಿಟಿಯು (VTU) ಪರೀಕ್ಷೆಗೆ ಸಿದ್ಧಪಡಿಸಿದ ಪರಿಶೀಲಿಸಿದ ಸಾರಾಂಶ"
        ],
        examQuestions: [
          "1. ಡೆಡ್‌ಲಾಕ್ ಎಂದರೇನು? ಬ್ಯಾಂಕರ್ಸ್ ಅಲ್ಗಾರಿದಮ್ ವಿವರಣೆ ಬರೆಯಿರಿ.",
          "2. ಪೇಜಿಂಗ್ ಮತ್ತು ಸೆಗ್ಮೆಂಟೇಶನ್ ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?",
          "3. ಪ್ರಕ್ರಿಯೆ ನಿರ್ವಹಣೆ (Process State Diagram) ಬರೆಯಿರಿ."
        ]
      };
    }
    if (currentLang === 'hi') {
      return {
        summary: `यह नोट्स ${note.subject} (सेमेस्टर ${note.semester}) के महत्वपूर्ण टॉपिक्स, फॉर्मूला और परीक्षा में आने वाले प्रश्नों का सटीक सारांश है। इसे टॉपर्स द्वारा सत्यापित किया गया है।`,
        keyTakeaways: [
          "परीक्षा में बार-बार पूछे जाने वाले 10 अंकों के मॉडल प्रश्न",
          "एल्गोरिदम और डायग्राम का चरणबद्ध विश्लेषण",
          "अंतिम समय में दोहराव (Last Minute Revision) के लिए उपयुक्त"
        ],
        examQuestions: [
          "1. डेडलॉक की 4 आवश्यक शर्तें क्या हैं? समझाइए।",
          "2. टीसीपी और यूडीपी में मुख्य अंतर स्पष्ट करें।",
          "3. नॉर्मलाइजेशन (1NF, 2NF, 3NF, BCNF) के नियम लिखें।"
        ]
      };
    }
    return {
      summary: `AI Executive Digest: High-yield exam notes on ${note.subject} (Semester ${note.semester}). Optimized for rapid revision, covering core architectural concepts, solved numericals, and step-by-step algorithms.`,
      keyTakeaways: [
        "Core theoretical definitions with high weightage in university exams",
        "Formulas, state transitions, and memory layout breakdown",
        "Faculty-verified solutions for typical semester question banks"
      ],
      examQuestions: [
        "1. Explain the Banker's Safety Algorithm with an example matrix.",
        "2. Compare paging vs segmentation with memory overhead analysis.",
        "3. Derive time complexity of operations in binary search trees."
      ]
    };
  };

  const aiContent = getAIContent();

  const handleCopy = () => {
    const text = `${aiContent.summary}\n\nKey Takeaways:\n${aiContent.keyTakeaways.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 rounded-2xl p-4 border border-indigo-200/80 shadow-sm space-y-3">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Sarvam AI Smart Study Assistant
            </h4>
            <p className="text-[10px] text-slate-500">
              Multilingual instant summary & exam questions
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'summary' ? 'questions' : 'summary')}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
          >
            {viewMode === 'summary' ? "Show Exam Questions" : "Show Summary"}
          </button>
          <button
            onClick={handleCopy}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            title="Copy summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'summary' ? (
        <div className="space-y-2 text-xs">
          <p className="text-slate-700 leading-relaxed font-medium">
            {aiContent.summary}
          </p>
          <div className="space-y-1 pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Key Highlights:
            </div>
            {aiContent.keyTakeaways.map((point, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-600">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-1.5 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
            Top Exam Questions Predicted:
          </div>
          {aiContent.examQuestions.map((q, idx) => (
            <div key={idx} className="p-2 bg-white rounded-lg border border-purple-100 text-[11px] font-medium text-slate-800">
              {q}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

