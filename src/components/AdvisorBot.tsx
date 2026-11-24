import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Bot, Send, Sparkles, User, Lightbulb, Compass, Award } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface AdvisorBotProps {
  currentLang: Language;
  onExploreScholarships: () => void;
}

export const AdvisorBot: React.FC<AdvisorBotProps> = ({
  currentLang,
  onExploreScholarships
}) => {
  const t = translations[currentLang];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotGreetings: Record<Language, string> = {
    en: "Namaste! I am UniBot, your multilingual UnlockED Opportunity & Career Advisor. Ask me about the PM-USP scholarship on NSP, eligibility rules for Tier-3 students, or VTU exam notes!",
    hi: "नमस्ते! मैं युनिबॉट (UniBot) हूँ, आपका बहुभाषी छात्रवृत्ति और करियर सलाहकार। मुझसे एनएसपी पर पीएम-यूएसपी छात्रवृत्ति, पात्रता नियमों, या परीक्षा नोट्स के बारे में हिंदी में पूछें!",
    kn: "ನಮಸ್ಕಾರ! ನಾನು ಯೂನಿಬಾಟ್ (UniBot), ನಿಮ್ಮ ಎಐ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶಿ. ಎನ್‌ಎಸ್‌ಪಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ವಿದ್ಯಾರ್ಥಿವೇತನ, ಅರ್ಹತಾ ಮಾನದಂಡಗಳು ಅಥವಾ ಪರೀಕ್ಷಾ ಟಿಪ್ಪಣಿಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ!"
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: initialBotGreetings[currentLang],
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Suggested prompt pills
  const samplePrompts: Record<Language, string[]> = {
    en: [
      "What is the eligibility for the PM-USP scholarship?",
      "How to set reminders so I don't miss the 30 Nov deadline?",
      "Where can I find Kannada Operating Systems notes?"
    ],
    hi: [
      "पीएम-यूएसपी छात्रवृत्ति के लिए क्या पात्रता है?",
      "30 नवंबर की समय सीमा से पहले रिमाइंडर कैसे सेट करें?",
      "कंप्यूटर नेटवर्क के हिंदी नोट्स कहाँ मिलेंगे?"
    ],
    kn: [
      "ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಯಾರು ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು?",
      "ಕೊನೆಯ ದಿನಾಂಕ ತಪ್ಪಿಸಿಕೊಳ್ಳದಿರಲು ರಿಮೈಂಡರ್ ಹೇಗೆ ಹೊಂದಿಸುವುದು?",
      "ಕನ್ನಡದಲ್ಲಿ ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್ಸ್ ನೋಟ್ಸ್ ಸಿಗುತ್ತದೆಯೇ?"
    ]
  };

  // Indic-aware simulated AI response logic
  const generateAIResponse = (userQuery: string, lang: Language): string => {
    const q = userQuery.toLowerCase();

    if (lang === 'kn') {
      if (q.includes('ಪಿಎಂ-ಯುಎಸ್‌ಪಿ') || q.includes('ವಿದ್ಯಾರ್ಥಿವೇತನ') || q.includes('scholarship') || q.includes('nsp')) {
        return "ಪಿಎಂ-ಯುಎಸ್‌ಪಿ (PM-USP Central Sector Scheme) ಕೇಂದ್ರ ಸರ್ಕಾರದ ವಿದ್ಯಾರ್ಥಿವೇತನವಾಗಿದೆ. 12 ನೇ ತರಗತಿಯಲ್ಲಿ 80 ನೇ ಶೇಕಡಾವಾರು ಅಂಕ ಪಡೆದ ಮತ್ತು ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹4.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಇರುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹12,000 ನೀಡಲಾಗುತ್ತದೆ. ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ: 30 ನವೆಂಬರ್ 2026. ಅವಕಾಶಗಳ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ನೀವು ನೇರವಾಗಿ ಅಧಿಕೃತ ಲಿಂಕ್ ಪಡೆಯಬಹುದು!";
      }
      if (q.includes('ನೋಟ್ಸ್') || q.includes('ಟಿಪ್ಪಣಿ') || q.includes('notes') || q.includes('dsa')) {
        return "ಖಂಡಿತ! ನಮ್ಮ ಟಿಪ್ಪಣಿಗಳ ವಿಭಾಗದಲ್ಲಿ 'ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್ಸ್ ಮತ್ತು ಅಲ್ಗಾರಿದಮ್ಸ್ (DSA) ಕನ್ನಡಿಗರಿಗೆ ಸರಳ ಟಿಪ್ಪಣಿಗಳು' ಹಾಗೂ ಬಿಎಂಎಸ್ ಕಾಲೇಜಿನ ಹ್ಯಾಂಡ್‌ರಿಟನ್ ಪಿಡಿಎಫ್ ಲಭ್ಯವಿದೆ. ನೀವು ತಕ್ಷಣ ಓದಬಹುದು ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು.";
      }
      return "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ನಾನು ಉತ್ತರಿಸಲು ಸಿದ್ಧ. ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು, ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು, ಅಥವಾ ಪರೀಕ್ಷಾ ನೋಟ್ಸ್‌ಗಳ ಕುರಿತು ಯಾವುದೇ ವಿವರಗಳನ್ನು ಕೇಳಿ.";
    }

    if (lang === 'hi') {
      if (q.includes('पीएम-यूएसपी') || q.includes('छात्रवृत्ति') || q.includes('scholarship') || q.includes('nsp')) {
        return "पीएम-यूएसपी सेंट्रल सेक्टर छात्रवृत्ति योजना (NSP Portal) के तहत कॉलेज छात्रों को प्रति वर्ष ₹12,000 तक की वित्तीय सहायता मिलती है। इसके लिए 12वीं में 80% से अधिक और पारिवारिक वार्षिक आय ₹4.5 लाख से कम होनी चाहिए। अंतिम तिथि 30 नवंबर 2026 है। आप युनिक्‍वेस्ट में इसके लिए 3 दिन पहले का कस्टम रिमाइंडर सेट कर सकते हैं!";
      }
      if (q.includes('नोट्स') || q.includes('notes') || q.includes('नेटवर्क')) {
        return "हाँ! हमारे 'अध्ययन नोट्स' सेक्शन में कंप्यूटर नेटवर्क (Computer Networks) 5-लेयर मॉडल के सम्पूर्ण हिंदी नोट्स उपलब्ध हैं, जिन्हें 4.7 स्टार रेटिंग मिली है। आप इसे तुरंत मुफ्त में डाउनलोड कर सकते हैं।";
      }
      return "युनिक्‍वेस्ट एआई आपकी सहायता के लिए तैयार है! आप इंटर्नशिप (जैसे एआईसीटीई ट्यूलिप) या छात्रवृत्तियों के बारे में कुछ भी पूछ सकते हैं।";
    }

    // Default English
    if (q.includes('pm-usp') || q.includes('scholarship') || q.includes('nsp') || q.includes('eligibility')) {
      return "The PM-USP Central Sector Scholarship Scheme on the National Scholarship Portal (NSP) provides ₹12,000/year to undergraduate college students. Eligibility: 80th percentile in Class 12 board exams with annual family income under ₹4.5 Lakhs. The hard deadline is 30 November 2026. Make sure to activate custom notifications in UniQuest to stay ahead!";
    }
    if (q.includes('reminder') || q.includes('deadline')) {
      return "UniQuest lets you set custom reminder alerts (7 days, 3 days, or 24 hours prior) for any scholarship or internship listing. Navigate to the 'Opportunities' tab, find your item, and tap 'Set Reminder' to receive automatic alerts!";
    }
    if (q.includes('notes') || q.includes('os') || q.includes('vtu')) {
      return "We have peer-verified hand-written notes for Operating Systems (SMVIT VTU Module 1-5), DBMS from MSRIT, and regional language guides for DSA in Kannada and Computer Networks in Hindi. Check the 'Study Notes' tab to view or download!";
    }

    return "Great question! UniQuest is built specifically to bridge the opportunity gap for Tier-3 college students. You can explore verified internships, national/state scholarships, and rated semester notes directly from the navigation bar.";
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate Sarvam Indic LLM streaming/inference latency
    setTimeout(() => {
      const reply = generateAIResponse(text, currentLang);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: reply,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Bot Chat Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-primary-600 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-base">UniBot</h3>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded border border-emerald-400/30">
                Sarvam AI Indic Powered
              </span>
            </div>
            <p className="text-xs text-indigo-100 font-medium">
              Multilingual Advisor • English, हिन्दी, ಕನ್ನಡ
            </p>
          </div>
        </div>

        <button
          onClick={onExploreScholarships}
          className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-sm transition"
        >
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>View Scholarships</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isBot
                    ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm'
                    : 'bg-indigo-600 text-white font-medium rounded-tr-sm'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-1 text-right ${isBot ? 'text-slate-400' : 'text-indigo-200'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 italic bg-white p-3 rounded-2xl border border-slate-200 w-fit">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
            <span>UniBot is generating response in {currentLang === 'kn' ? 'Kannada' : currentLang === 'hi' ? 'Hindi' : 'English'}...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold uppercase text-slate-400 whitespace-nowrap">
          {t.quickPrompts}
        </span>
        {samplePrompts[currentLang].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 whitespace-nowrap transition border border-slate-200/60"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.botInputPlaceholder}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
          />
          <button
            type="submit"
            className="p-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl shadow-md shadow-indigo-200 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

