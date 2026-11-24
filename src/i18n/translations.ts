import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  navOpportunities: string;
  navInternships: string;
  navScholarships: string;
  navReminders: string;
  navNotes: string;
  navBot: string;
  navProfile: string;
  searchPlaceholder: string;
  filterAll: string;
  filterScholarships: string;
  filterInternships: string;
  deadline: string;
  daysRemaining: string;
  eligibility: string;
  stipend: string;
  applyNow: string;
  setReminder: string;
  reminderSuccess: string;
  remindersTitle: string;
  noReminders: string;
  clearReminder: string;
  notesTitle: string;
  notesSubtitle: string;
  uploadNote: string;
  downloadNote: string;
  readNote: string;
  rateThisNote: string;
  ratingsCount: string;
  pagesCount: string;
  botWelcome: string;
  botInputPlaceholder: string;
  send: string;
  quickPrompts: string;
  profileTitle: string;
  profileCollege: string;
  profileIncome: string;
  offlineBanner: string;
  installPwa: string;
  matchScoreText: string;
  languageSelect: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "UniQuest",
    tagline: "Find opportunities. Never miss them. Share what you learn.",
    navOpportunities: "Opportunities",
    navInternships: "Internships",
    navScholarships: "Scholarships",
    navReminders: "My Reminders",
    navNotes: "Study Notes",
    navBot: "AI Advisor",
    navProfile: "Profile",
    searchPlaceholder: "Search scholarships, internships, or companies...",
    filterAll: "All Opportunities",
    filterScholarships: "Scholarships Only",
    filterInternships: "Internships Only",
    deadline: "Deadline",
    daysRemaining: "days left",
    eligibility: "Eligibility",
    stipend: "Amount / Stipend",
    applyNow: "Apply Official",
    setReminder: "Set Reminder",
    reminderSuccess: "Custom reminder set successfully!",
    remindersTitle: "Custom Reminders & Alerts",
    noReminders: "No reminders set yet. Browse opportunities and click 'Set Reminder' to never miss a deadline!",
    clearReminder: "Dismiss Alert",
    notesTitle: "Peer & Faculty Notes Hub",
    notesSubtitle: "Search, read, and download verified notes from students and teachers across colleges.",
    uploadNote: "Share Your Notes",
    downloadNote: "Download PDF",
    readNote: "Read Notes",
    rateThisNote: "Rate",
    ratingsCount: "ratings",
    pagesCount: "pages",
    botWelcome: "Namaste! I am your UniQuest AI Career & Opportunity Advisor. Ask me anything about scholarship deadlines, eligibility criteria, internship prep, or notes in English, Hindi, or Kannada!",
    botInputPlaceholder: "Ask about PM-USP scholarship, internships, or exam notes...",
    send: "Send",
    quickPrompts: "Quick Questions:",
    profileTitle: "Student Profile",
    profileCollege: "Institution",
    profileIncome: "Annual Family Income",
    offlineBanner: "You are currently offline. Cached opportunities and notes are fully available!",
    installPwa: "Install App",
    matchScoreText: "Profile Match",
    languageSelect: "Language"
  },
  hi: {
    appName: "युनिक्‍वेस्ट (UniQuest)",
    tagline: "अवसर खोजें। उन्हें कभी न चूकें। जो सीखा है उसे साझा करें।",
    navOpportunities: "अवसर",
    navInternships: "इंटर्नशिप",
    navScholarships: "छात्रवृत्तियां",
    navReminders: "मेरे रिमाइंडर",
    navNotes: "अध्ययन नोट्स",
    navBot: "एआई सलाहकार",
    navProfile: "प्रोफ़ाइल",
    searchPlaceholder: "छात्रवृत्तियां, इंटर्नशिप या कंपनियां खोजें...",
    filterAll: "सभी अवसर",
    filterScholarships: "केवल छात्रवृत्तियां",
    filterInternships: "केवल इंटर्नशिप",
    deadline: "अंतिम तिथि (Deadline)",
    daysRemaining: "दिन शेष",
    eligibility: "पात्रता (Eligibility)",
    stipend: "राशि / वजीफा",
    applyNow: "आधिकारिक आवेदन करें",
    setReminder: "रिमाइंडर सेट करें",
    reminderSuccess: "रिमाइंडर सफलतापूर्वक सेट किया गया!",
    remindersTitle: "कस्टम रिमाइंडर और अलर्ट",
    noReminders: "अभी तक कोई रिमाइंडर सेट नहीं है। अवसरों को ब्राउज़ करें और कभी भी समय सीमा न चूकने के लिए 'रिमाइंडर सेट करें' पर क्लिक करें!",
    clearReminder: "अलर्ट हटाएं",
    notesTitle: "छात्र और शिक्षक नोट्स हब",
    notesSubtitle: "कॉलेजों के छात्रों और शिक्षकों से सत्यापित नोट्स खोजें, पढ़ें और डाउनलोड करें।",
    uploadNote: "अपने नोट्स साझा करें",
    downloadNote: "पीडीएफ डाउनलोड करें",
    readNote: "नोट्स पढ़ें",
    rateThisNote: "रेट करें",
    ratingsCount: "रेटिंग",
    pagesCount: "पृष्ठ",
    botWelcome: "नमस्ते! मैं आपका युनिक्‍वेस्ट एआई सलाहकार हूँ। मुझसे छात्रवृत्ति की समय सीमा, पात्रता, इंटर्नशिप तैयारी या परीक्षा नोट्स के बारे में हिंदी, अंग्रेजी या कन्नड़ में पूछें!",
    botInputPlaceholder: "पीएम-यूएसपी छात्रवृत्ति, इंटर्नशिप या नोट्स के बारे में पूछें...",
    send: "भेजें",
    quickPrompts: "त्वरित प्रश्न:",
    profileTitle: "विद्यार्थी प्रोफ़ाइल",
    profileCollege: "कॉलेज / संस्थान",
    profileIncome: "वार्षिक पारिवारिक आय",
    offlineBanner: "आप अभी ऑफ़लाइन हैं। सहेजे गए अवसर और नोट्स पूरी तरह उपलब्ध हैं!",
    installPwa: "ऐप इंस्टॉल करें",
    matchScoreText: "प्रोफ़ाइल मैच",
    languageSelect: "भाषा"
  },
  kn: {
    appName: "ಯೂನಿಕ್ವೆಸ್ಟ್ (UniQuest)",
    tagline: "ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಿ. ಎಂದಿಗೂ ತಪ್ಪಿಸಿಕೊಳ್ಳಬೇಡಿ. ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    navOpportunities: "ಅವಕಾಶಗಳು",
    navInternships: "ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು",
    navScholarships: "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
    navReminders: "ನನ್ನ ಜ್ಞಾಪನೆಗಳು",
    navNotes: "ಅಧ್ಯಯನ ಟಿಪ್ಪಣಿಗಳು",
    navBot: "ಎಐ ಮಾರ್ಗದರ್ಶಿ",
    navProfile: "ಪ್ರೊಫೈಲ್",
    searchPlaceholder: "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು, ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳನ್ನು ಹುಡುಕಿ...",
    filterAll: "ಎಲ್ಲಾ ಅವಕಾಶಗಳು",
    filterScholarships: "ಕೇವಲ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
    filterInternships: "ಕೇವಲ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು",
    deadline: "ಕೊನೆಯ ದಿನಾಂಕ",
    daysRemaining: "ದಿನಗಳು ಬಾಕಿ",
    eligibility: "ಅರ್ಹತೆ (Eligibility)",
    stipend: "ವಿದ್ಯಾರ್ಥಿವೇತನ / ಸ್ಟೈಫಂಡ್",
    applyNow: "ಅಧಿಕೃತ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    setReminder: "ಜ್ಞಾಪನೆ ಹೊಂದಿಸಿ (Set Reminder)",
    reminderSuccess: "ಜ್ಞಾಪನೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಹೊಂದಿಸಲಾಗಿದೆ!",
    remindersTitle: "ಕಸ್ಟಮ್ ಜ್ಞಾಪನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    noReminders: "ಇನ್ನೂ ಯಾವುದೇ ಜ್ಞಾಪನೆಗಳನ್ನು ಹೊಂದಿಸಿಲ್ಲ. ಕೊನೆಯ ದಿನಾಂಕವನ್ನು ತಪ್ಪಿಸಿಕೊಳ್ಳದಿರಲು 'ಜ್ಞಾಪನೆ ಹೊಂದಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ!",
    clearReminder: "ತೆರವುಗೊಳಿಸಿ",
    notesTitle: "ಟಿಪ್ಪಣಿಗಳ ಕೇಂದ್ರ (Notes Hub)",
    notesSubtitle: "ವಿವಿಧ ಕಾಲೇಜುಗಳ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಶಿಕ್ಷಕರಿಂದ ಪರಿಶೀಲಿಸಿದ ನೋಟ್ಸ್‌ಗಳನ್ನು ಓದಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    uploadNote: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    downloadNote: "ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್",
    readNote: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಓದಿ",
    rateThisNote: "ರೇಟಿಂಗ್ ನೀಡಿ",
    ratingsCount: "ರೇಟಿಂಗ್‌ಗಳು",
    pagesCount: "ಪುಟಗಳು",
    botWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಯೂನಿಕ್ವೆಸ್ಟ್ ಎಐ ಮಾರ್ಗದರ್ಶಿ. ವಿದ್ಯಾರ್ಥಿವೇತನದ ಕೊನೆಯ ದಿನಾಂಕಗಳು, ಅರ್ಹತಾ ಮಾನದಂಡಗಳು, ಇಂಟರ್ನ್‌ಶಿಪ್ ಅಥವಾ ಪರೀಕ್ಷಾ ಟಿಪ್ಪಣಿಗಳ ಬಗ್ಗೆ ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಹಿಂದಿಯಲ್ಲಿ ನನ್ನನ್ನು ಕೇಳಿ!",
    botInputPlaceholder: "ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಅಥವಾ ಇಂಜಿನಿಯರಿಂಗ್ ನೋಟ್ಸ್ ಬಗ್ಗೆ ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    quickPrompts: "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:",
    profileTitle: "ವಿದ್ಯಾರ್ಥಿ ವಿವರ (Profile)",
    profileCollege: "ಕಾಲೇಜು",
    profileIncome: "ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯ",
    offlineBanner: "ನೀವು ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಉಳಿಸಲಾದ ಮಾಹಿತಿ ಲಭ್ಯವಿದೆ!",
    installPwa: "ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ",
    matchScoreText: "ಪ್ರೊಫೈಲ್ ಹೊಂದಾಣಿಕೆ",
    languageSelect: "ಭಾಷೆ"
  }
};
