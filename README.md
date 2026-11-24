# UniQuest - UnlockED Opportunities

**Find opportunities. Never miss them. Share what you learn.**

An installable, high-performance **Progressive Web App (PWA)** built for higher-education students in Tier-3 colleges across India.

Presented at **wHACKiest 2026 Online Ideathon** (Track 4: UnlockED)  
**Team Name:** Return 0  
**College:** Sir M Visvesvaraya Institute of Technology (SMVIT), Bengaluru  

---

## 🚀 Features

1. **Student Profile & Eligibility:** Stores academic credentials (CGPA, degree, Tier-3 category, annual income bracket) to dynamically match opportunities.
2. **Internships & Scholarships Feed:** Curated, verified national & state listings (PM-USP on NSP, Karnataka State SSP, AICTE TULIP, Infosys Springboard).
3. **Custom Reminders Engine (USP):** Automated alerts scheduled at custom intervals (7 days, 3 days, 24 hours prior) via Device Push and In-App notifications.
4. **Peer & Faculty Notes Hub:** Cross-college repository for handwritten notes with search, 5-star ratings, instant read viewer, and PDF/Markdown downloads.
5. **Multilingual Support (Indic):** Full localized experience in **English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ)**.
6. **Smart Contextual AI:**
   - **AI Opportunity Matcher:** Direct qualification breakdown and verdict based on student profile.
   - **AI Notes Explainer & Exam Predictor:** Generates high-yield study digests and predicts 10-mark exam questions in your chosen regional language.

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **PWA Engine:** Service Worker (`sw.js`) with offline caching + Web App Manifest (`manifest.json`)
- **Persistence:** LocalStorage & IndexedDB with verified seed datasets
- **AI / ML Integration:** Sarvam AI Indic LLM prompts & Gemini Flash context analysis

---

## 💻 Local Setup & Run

```bash
# Clone the repository
git clone https://github.com/rishith64/wHACKiest-2026.git
cd wHACKiest-2026

# Install dependencies
npm install

# Run development server
npm run dev

# Or build and preview production PWA
npm run build
npm run preview
```
