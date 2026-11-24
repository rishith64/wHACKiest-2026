export type Language = 'en' | 'hi' | 'kn';

export type OpportunityType = 'internship' | 'scholarship';

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: Record<Language, string>;
  organization: string;
  location: string;
  isRemote?: boolean;
  amountOrStipend: string;
  deadline: string; // ISO date format YYYY-MM-DD
  daysLeft: number;
  eligibility: Record<Language, string>;
  category: 'engineering' | 'general' | 'merit-cum-means' | 'girls-in-tech' | 'diversity';
  officialLink: string;
  featured?: boolean;
  matchScore?: number; // e.g. 96%
  tags: string[];
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: number;
  college: string;
  uploadedBy: string;
  uploadDate: string;
  language: Language;
  rating: number;
  ratingCount: number;
  downloadCount: number;
  pages: number;
  fileSize: string;
  previewSnippet: string;
  fullContent: string;
  tags: string[];
}

export interface CustomReminder {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  opportunityType: OpportunityType;
  deadlineDate: string;
  reminderDaysBefore: number; // 7, 3, 1
  scheduledTime: string;
  channel: 'push' | 'in-app' | 'whatsapp';
  createdAt: string;
  isTriggered: boolean;
  isDismissed: boolean;
}

export interface StudentProfile {
  name: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  year: number;
  semester: number;
  cgpa: number;
  familyIncomeAnnual: string;
  category: string;
  preferredLanguage: Language;
  interests: string[];
}
