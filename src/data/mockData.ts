import { Opportunity, Note, StudentProfile } from '../types';

export const defaultStudentProfile: StudentProfile = {
  name: "Nelaturi Rishith Reddy",
  email: "rishith.reddy@mvit.ac.in",
  college: "Sir M Visvesvaraya Institute of Technology (SMVIT)",
  degree: "B.E.",
  branch: "Computer Science & Engineering",
  year: 3,
  semester: 5,
  cgpa: 8.6,
  familyIncomeAnnual: "< ₹3.5 Lakhs",
  category: "General / Tier-3 College",
  preferredLanguage: "en",
  interests: ["Web Development", "AI/ML", "Cloud", "Open Source", "Govt Scholarships"]
};

export const seedOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    type: "scholarship",
    title: {
      en: "PM-USP Central Sector Scholarship Scheme (NSP)",
      hi: "पीएम-यूएसपी सेंट्रल सेक्टर छात्रवृत्ति योजना (एनएसपी)",
      kn: "ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ಸೆಂಟ್ರಲ್ ಸೆಕ್ಟರ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ (ಎನ್‌ಎಸ್‌ಪಿ)"
    },
    organization: "Ministry of Education, Govt of India",
    location: "All India (NSP Portal)",
    amountOrStipend: "₹12,000 / year (Undergraduate)",
    deadline: "2026-11-30",
    daysLeft: 6,
    eligibility: {
      en: "Students above 80th percentile in Class 12, annual family income < ₹4.5 Lakhs.",
      hi: "कक्षा 12 में 80वें प्रतिशत से ऊपर के छात्र, वार्षिक पारिवारिक आय ₹4.5 लाख से कम।",
      kn: "12 ನೇ ತರಗತಿಯಲ್ಲಿ 80 ನೇ ಶೇಕಡಾವಾರು ಅಂಕ ಪಡೆದ ವಿದ್ಯಾರ್ಥಿಗಳು, ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯ ₹4.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ."
    },
    category: "merit-cum-means",
    officialLink: "https://scholarships.gov.in",
    featured: true,
    matchScore: 98,
    tags: ["Govt", "NSP", "National", "Tier-3 Friendly"]
  },
  {
    id: "opp-2",
    type: "scholarship",
    title: {
      en: "Karnataka Post-Matric State Scholarship Portal (SSP)",
      hi: "कर्नाटक पोस्ट-मैट्रिक राज्य छात्रवृत्ति पोर्टल (एसएसपी)",
      kn: "ಕರ್ನಾಟಕ ಮೆಟ್ರಿಕ್-ನಂತರದ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (ಎಸ್‌ಎಸ್‌ಪಿ)"
    },
    organization: "Government of Karnataka",
    location: "Karnataka",
    amountOrStipend: "Up to 100% Tuition Fee Waiver + Maintenance",
    deadline: "2026-12-15",
    daysLeft: 21,
    eligibility: {
      en: "Karnataka domicile students enrolled in recognized professional degree colleges.",
      hi: "मान्यता प्राप्त व्यावसायिक डिग्री कॉलेजों में नामांकित कर्नाटक के मूल निवासी छात्र।",
      kn: "ಮಾನ್ಯತೆ ಪಡೆದ ಕಾಲೇಜುಗಳಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಕರ್ನಾಟಕದ ವಿದ್ಯಾರ್ಥಿಗಳು."
    },
    category: "merit-cum-means",
    officialLink: "https://ssp.postmatric.karnataka.gov.in",
    featured: true,
    matchScore: 95,
    tags: ["State", "SSP", "Fee Waiver", "Karnataka"]
  },
  {
    id: "opp-3",
    type: "internship",
    title: {
      en: "AICTE TULIP Urban Internship Program",
      hi: "एआईसीटीई ट्यूलिप शहरी इंटर्नशिप कार्यक्रम",
      kn: "ಎಐಸಿಟಿಇ ಟುಲಿಪ್ ನಗರ ಇಂಟರ್ನ್‌ಶಿಪ್ ಕಾರ್ಯಕ್ರಮ"
    },
    organization: "Ministry of Housing & Urban Affairs & AICTE",
    location: "Bengaluru & Pan-India (Hybrid)",
    isRemote: true,
    amountOrStipend: "₹15,000 - ₹20,000 / month",
    deadline: "2026-12-10",
    daysLeft: 16,
    eligibility: {
      en: "B.Tech/BE students within 18 months of graduation. CS, IT, Civil, Electronics.",
      hi: "स्नातक के 18 महीने के भीतर बी.टेक/बीई छात्र। सीएस, आईटी, इलेक्ट्रॉनिक्स।",
      kn: "ಬಿ.ಟೆಕ್/ಬಿಇ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಅಂತಿಮ ಅಥವಾ ಪೂರ್ವ ವರ್ಷದ ವಿದ್ಯಾರ್ಥಿಗಳು."
    },
    category: "engineering",
    officialLink: "https://internship.aicte-india.org",
    featured: true,
    matchScore: 92,
    tags: ["AICTE", "Govt", "Certificate", "Stipend"]
  },
  {
    id: "opp-4",
    type: "internship",
    title: {
      en: "Full Stack Developer Summer Intern 2027",
      hi: "फुल स्टैक डेवलपर समर इंटर्न 2027",
      kn: "ಫುಲ್ ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್ ಸಮ್ಮರ್ ಇಂಟರ್ನ್ 2027"
    },
    organization: "Infosys Springboard / Campus Connect",
    location: "Mysuru / Remote",
    isRemote: true,
    amountOrStipend: "₹25,000 / month",
    deadline: "2026-12-05",
    daysLeft: 11,
    eligibility: {
      en: "Knowledge of React, Node.js, and SQL. Open to all engineering colleges.",
      hi: "रिएक्ट, नोड.जेएस और एसक्यूएल का ज्ञान। सभी इंजीनियरिंग कॉलेजों के लिए खुला।",
      kn: "ರಿಯಾಕ್ಟ್, ನೋಡ್.ಜೆಎಸ್ ಮತ್ತು ಎಸ್.ಕ್ಯೂ.ಎಲ್ ಜ್ಞಾನ. ಎಲ್ಲಾ ಇಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮುಕ್ತ."
    },
    category: "engineering",
    officialLink: "https://infyspringboard.onwingspan.com",
    matchScore: 89,
    tags: ["Tech", "Remote", "High Stipend", "Mentorship"]
  },
  {
    id: "opp-5",
    type: "scholarship",
    title: {
      en: "Santoor Women's Scholarship in STEM",
      hi: "सन्तूर विमेंस स्कॉलरशिप इन एसटीईएम",
      kn: "ಸಂತೂರ್ ವುಮೆನ್ಸ್ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಇನ್ STEM"
    },
    organization: "Wipro Cares Foundation",
    location: "Karnataka, AP, Telangana",
    amountOrStipend: "₹24,000 / year",
    deadline: "2026-12-20",
    daysLeft: 26,
    eligibility: {
      en: "Female students pursuing higher education in STEM from government/aided schools.",
      hi: "सरकारी/सहायता प्राप्त स्कूलों से एसटीईएम में उच्च शिक्षा प्राप्त करने वाली छात्राएं।",
      kn: "ವಿಜ್ಞಾನ ಮತ್ತು ತಂತ್ರಜ್ಞಾನದಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಗ್ರಾಮೀಣ/ಹಿಂದುಳಿದ ವರ್ಗದ ಮಹಿಳಾ ವಿದ್ಯಾರ್ಥಿನಿಯರು."
    },
    category: "girls-in-tech",
    officialLink: "https://santoorscholarship.com",
    matchScore: 85,
    tags: ["Women in Tech", "Wipro", "Karnataka", "Financial Aid"]
  },
  {
    id: "opp-6",
    type: "internship",
    title: {
      en: "Open Source AI & Web Apprentice",
      hi: "ओपन सोर्स एआई और वेब अपरेंटिस",
      kn: "ಓಪನ್ ಸೋರ್ಸ್ ಎಐ ಮತ್ತು ವೆಬ್ ಅಪ್ರೆಂಟಿಸ್"
    },
    organization: "Sarvam AI Developer Community",
    location: "Bengaluru (Hybrid)",
    isRemote: true,
    amountOrStipend: "₹18,000 / month + Perks",
    deadline: "2026-12-18",
    daysLeft: 24,
    eligibility: {
      en: "Passionate about Indian languages and LLMs. Familiarity with Python, REST APIs.",
      hi: "भारतीय भाषाओं और एलएलएम के प्रति उत्साही। पायथन और रेस्ट एपीआई से परिचित।",
      kn: "ಭಾರತೀಯ ಭಾಷೆಗಳು ಮತ್ತು ಎಐ ಮಾದರಿಗಳಲ್ಲಿ ಆಸಕ್ತಿ ಹೊಂದಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು."
    },
    category: "engineering",
    officialLink: "https://sarvam.ai",
    featured: true,
    matchScore: 94,
    tags: ["Indic AI", "LLMs", "Sarvam", "Tier-3 Friendly"]
  }
];

export const seedNotes: Note[] = [
  {
    id: "note-1",
    title: "Operating Systems (OS) Complete VTU Module 1-5 Hand-written Notes",
    subject: "Operating Systems",
    branch: "CSE / ISE",
    semester: 4,
    college: "Sir M Visvesvaraya Institute of Technology (SMVIT)",
    uploadedBy: "Rutvik J N (Topper 9.4 SGPA)",
    uploadDate: "2026-10-15",
    language: "en",
    rating: 4.9,
    ratingCount: 142,
    downloadCount: 820,
    pages: 48,
    fileSize: "4.2 MB",
    previewSnippet: "CPU Scheduling algorithms (FCFS, SJF, Round Robin), Deadlock Banker's Algorithm with solved numericals, Virtual memory paging formulas.",
    fullContent: `MODULE 1: INTRODUCTION TO OPERATING SYSTEMS
1.1 Definition: An OS acts as an intermediary between the computer user and computer hardware.
Goals:
- Execute user programs and make solving problems easier.
- Make the computer system convenient to use.
- Use hardware in an efficient manner.

1.2 Dual Mode Operation:
- User Mode (Mode bit = 1)
- Kernel/Monitor Mode (Mode bit = 0)
Privileged instructions can only be executed in Kernel mode.

1.3 CPU Scheduling:
- Preemptive vs Non-Preemptive
- FCFS, Shortest Job First (SJF)
- Priority Scheduling & Round Robin (Time quantum Q)

1.4 Deadlocks:
Four necessary conditions:
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait
Banker's Algorithm formula: Need[i,j] = Max[i,j] - Allocation[i,j]`,
    tags: ["VTU", "OS", "CSE", "Exam Ready", "Solved Numericals"]
  },
  {
    id: "note-2",
    title: "Database Management Systems (DBMS) - SQL & Normalization Cheatsheet",
    subject: "DBMS",
    branch: "CSE / ISE",
    semester: 5,
    college: "Ramaiah Institute of Technology (MSRIT)",
    uploadedBy: "Prof. K. Venkatesh (Verified Faculty)",
    uploadDate: "2026-11-02",
    language: "en",
    rating: 4.8,
    ratingCount: 98,
    downloadCount: 654,
    pages: 24,
    fileSize: "2.1 MB",
    previewSnippet: "1NF, 2NF, 3NF, BCNF easy decomposition tricks, ACID properties, indexing B-trees and SQL query optimization for placement tests.",
    fullContent: `DATABASE MANAGEMENT SYSTEMS COMPENDIUM
1. ER Diagram notation: Entities, Attributes (Key, Composite, Multi-valued), Relationships.
2. Normalization Rules:
- 1NF: Atomic values, no repeating groups.
- 2NF: 1NF + No partial dependency (Every non-prime attribute fully functionally dependent on Candidate Key).
- 3NF: 2NF + No transitive dependency (X -> Y: X is Superkey or Y is Prime attribute).
- BCNF: For every FD X -> Y, X must be a Superkey.
3. ACID Properties:
- Atomicity: All or nothing.
- Consistency: DB preserves invariants.
- Isolation: Transactions execute as if alone (Locking, 2PL).
- Durability: Committed updates survive system crashes.`,
    tags: ["DBMS", "SQL", "MSRIT", "Placement Prep"]
  },
  {
    id: "note-3",
    title: "ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್ಸ್ ಮತ್ತು ಅಲ್ಗಾರಿದಮ್ಸ್ (DSA) ಕನ್ನಡಿಗರಿಗೆ ಸರಳ ಟಿಪ್ಪಣಿಗಳು",
    subject: "Data Structures & Algorithms",
    branch: "CSE / ECE",
    semester: 3,
    college: "BMS College of Engineering",
    uploadedBy: "Adarsh K (Alumni)",
    uploadDate: "2026-09-20",
    language: "kn",
    rating: 5.0,
    ratingCount: 76,
    downloadCount: 512,
    pages: 35,
    fileSize: "3.5 MB",
    previewSnippet: "ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ (Linked List), ಸ್ಟ್ಯಾಕ್ (Stack), ಕ್ಯೂ (Queue), ಬೈನರಿ ಟ್ರೀ (Binary Tree) ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಕನ್ನಡದಲ್ಲೇ ಸುಲಭವಾಗಿ ವಿವರಿಸಲಾಗಿದೆ.",
    fullContent: `ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್ಸ್ (Data Structures) ಕನ್ನಡ ವಿವರಣೆ:
1. ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ (Linked List):
ಡೇಟಾ ಮತ್ತು ಮುಂದಿನ ನೋಡ್‌ನ ವಿಳಾಸ (Address pointer) ಅನ್ನು ಸಂಗ್ರಹಿಸುವ ಮೆಮೊರಿ ರಚನೆ.
- ಸಿಂಗಲ್ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ (Singly Linked List)
- ಡಬಲ್ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ (Doubly Linked List)
- ಸರ್ಕ್ಯುಲರ್ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ (Circular Linked List)

2. ಸ್ಟ್ಯಾಕ್ (Stack):
LIFO (Last In First Out) ತತ್ವದ ಮೇಲೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.
ಪ್ರಮುಖ ಕಾರ್ಯಾಚರಣೆಗಳು:
- push(): ಎಲಿಮೆಂಟ್ ಸೇರಿಸುವುದು
- pop(): ಎಲಿಮೆಂಟ್ ತೆಗೆಯುವುದು
- peek(): ಮೇಲಿನ ಎಲಿಮೆಂಟ್ ನೋಡುವುದು

3. ಬೈನರಿ ಸರ್ಚ್ ಟ್ರೀ (Binary Search Tree - BST):
ಪ್ರತಿಯೊಂದು ನೋಡ್‌ನಲ್ಲಿ ಎಡಭಾಗದ ಉಪ-ಮರವು (Left subtree) ರೂಟ್‌ಗಿಂತ ಚಿಕ್ಕದಾಗಿರುತ್ತದೆ ಮತ್ತು ಬಲಭಾಗದ ಉಪ-ಮರವು (Right subtree) ದೊಡ್ಡದಾಗಿರುತ್ತದೆ.
ಟೈಮ್ ಕಾಂಪ್ಲೆಕ್ಸಿಟಿ: ಸರಾಸರಿ O(log N).`,
    tags: ["Kannada", "DSA", "VTU", "Easy Learning"]
  },
  {
    id: "note-4",
    title: "कंप्यूटर नेटवर्क (Computer Networks) सम्पूर्ण हिंदी नोट्स - 5 लेयर मॉडल",
    subject: "Computer Networks",
    branch: "CSE / IT",
    semester: 5,
    college: "Sir M Visvesvaraya Institute of Technology (SMVIT)",
    uploadedBy: "Aaditi Singh (CSE 3rd Year)",
    uploadDate: "2026-10-28",
    language: "hi",
    rating: 4.7,
    ratingCount: 64,
    downloadCount: 430,
    pages: 30,
    fileSize: "2.8 MB",
    previewSnippet: "ओएसआई और टीसीपी/आईपी मॉडल, आईपीवी4 और सबनेटिंग, रूटिंग एल्गोरिदम (डीवीआर, एलएसआर) और सॉकेट प्रोग्रामिंग।",
    fullContent: `कंप्यूटर नेटवर्क (Computer Networks) नोट्स:
1. ओएसआई मॉडल (OSI 7 Layers):
- फिजिकल लेयर (Physical): बिट्स का ट्रांसमिशन
- डेटा लिंक लेयर (Data Link): फ्रेमिंग, मैक एड्रेसिंग (MAC)
- नेटवर्क लेयर (Network): रूटिंग, आईपी एड्रेस (IPv4, IPv6)
- ट्रांसपोर्ट लेयर (Transport): एंड-टू-एंड डिलीवरी (TCP vs UDP)
- सेशन लेयर (Session): कनेक्शन प्रबंधन
- प्रेजेंटेशन लेयर (Presentation): एन्क्रिप्शन, कम्प्रेशन
- एप्लीकेशन लेयर (Application): HTTP, DNS, SMTP

2. टीसीपी बनाम यूडीपी (TCP vs UDP):
- TCP: कनेक्शन-ओरिएंटेड, विश्वसनीय, 3-वे हैंडशेक (SYN, SYN-ACK, ACK)।
- UDP: कनेक्शन-रहित, तेज, स्ट्रीमिंग और गेमिंग के लिए उपयुक्त।

3. सबनेटिंग (Subnetting):
क्लासलेस इंटर-डोमेन रूटिंग (CIDR) - /24 मतलब 255.255.255.0।`,
    tags: ["Hindi", "Networks", "OSI", "TCP/IP"]
  }
];
