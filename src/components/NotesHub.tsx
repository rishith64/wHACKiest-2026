import React, { useState } from 'react';
import type { Note, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  BookOpen, 
  Search, 
  Star, 
  Download, 
  Upload, 
  Eye, 
  X, 
  Check, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AINoteExplainer } from './AINoteExplainer';

interface NotesHubProps {
  notes: Note[];
  currentLang: Language;
  onRateNote: (noteId: string, rating: number) => void;
  onAddNote: (newNote: Note) => void;
}

export const NotesHub: React.FC<NotesHubProps> = ({
  notes,
  currentLang,
  onRateNote,
  onAddNote
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | Language>('all');
  const [readingNote, setReadingNote] = useState<Note | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [downloadSuccessNoteId, setDownloadSuccessNoteId] = useState<string | null>(null);

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    if (selectedLanguageFilter !== 'all' && note.language !== selectedLanguageFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(q) ||
        note.subject.toLowerCase().includes(q) ||
        note.college.toLowerCase().includes(q) ||
        note.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleDownload = (note: Note) => {
    setDownloadSuccessNoteId(note.id);
    const blob = new Blob([note.fullContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.subject}_${note.title.slice(0, 20)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch (e) {}

    setTimeout(() => setDownloadSuccessNoteId(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cross-College Notes Repository • AI Augmented</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t.notesTitle}
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            {t.notesSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="self-start md:self-center flex items-center space-x-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-900 active:scale-95 transition"
        >
          <Upload className="w-4 h-4" />
          <span>{t.uploadNote}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by subject (OS, DBMS, DSA), college, or keywords..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Language:
            </span>
            {[
              { id: 'all', label: "All" },
              { id: 'en', label: "English" },
              { id: 'kn', label: "ಕನ್ನಡ (Kannada)" },
              { id: 'hi', label: "हिन्दी (Hindi)" },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguageFilter(lang.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedLanguageFilter === lang.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {filteredNotes.length} notes available
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
          >
            <div>
              
              {/* Badges */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {note.subject} • Sem {note.semester}
                </span>

                {/* Rating badge */}
                <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-700 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{note.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-amber-600/70 font-normal">
                    ({note.ratingCount})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition leading-snug">
                {note.title}
              </h3>

              {/* College & Contributor */}
              <div className="text-xs text-slate-500 mt-2 space-y-0.5 font-medium">
                <div>From: <strong className="text-slate-700">{note.college}</strong></div>
                <div>Uploaded by: <span className="text-indigo-600">{note.uploadedBy}</span></div>
              </div>

              {/* Preview Snippet */}
              <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 line-clamp-3">
                {note.previewSnippet}
              </p>

              {/* Metadata */}
              <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-medium mt-3">
                <span>📄 {note.pages} pages</span>
                <span>•</span>
                <span>💾 {note.fileSize}</span>
                <span>•</span>
                <span>📥 {note.downloadCount} downloads</span>
              </div>

            </div>

            {/* Actions: Read & Download & Rate */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center space-x-2">
              <button
                onClick={() => setReadingNote(note)}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.readNote} & AI Digest</span>
              </button>

              <button
                onClick={() => handleDownload(note)}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition active:scale-95"
              >
                {downloadSuccessNoteId === note.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.downloadNote}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Reader Modal with Embedded AI Explainer */}
      {readingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col relative space-y-4">
            
            <button
              onClick={() => setReadingNote(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {readingNote.subject} • {readingNote.college}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {readingNote.title}
              </h3>
            </div>

            {/* Smart AI Explainer & Exam Predictor embedded directly */}
            <AINoteExplainer note={readingNote} currentLang={currentLang} />

            {/* Note Full Content Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              {readingNote.fullContent}
            </div>

            {/* Modal Bottom: Star Rating */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-slate-600 mr-2">Rate this note:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      onRateNote(readingNote.id, star);
                      try { confetti({ particleCount: 20 }); } catch (e) {}
                    }}
                    className="p-1 hover:scale-125 transition"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= Math.round(readingNote.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleDownload(readingNote)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Download Verified PDF
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload Note Modal */}
      {showUploadModal && (
        <UploadModal
          currentLang={currentLang}
          onClose={() => setShowUploadModal(false)}
          onAddNote={(newNote) => {
            onAddNote(newNote);
            setShowUploadModal(false);
          }}
        />
      )}

    </div>
  );
};

// Subcomponent: Upload Note Modal
const UploadModal: React.FC<{
  currentLang: Language;
  onClose: () => void;
  onAddNote: (note: Note) => void;
}> = ({ currentLang, onClose, onAddNote }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Operating Systems');
  const [college] = useState('Sir M Visvesvaraya Institute of Technology');
  const [author] = useState('Nelaturi Rishith Reddy');
  const [language, setLanguage] = useState<Language>(currentLang);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title,
      subject,
      branch: "CSE",
      semester: 5,
      college,
      uploadedBy: `${author} (Verified Student)`,
      uploadDate: new Date().toISOString().split('T')[0],
      language,
      rating: 5.0,
      ratingCount: 1,
      downloadCount: 0,
      pages: 12,
      fileSize: "1.4 MB",
      previewSnippet: content.slice(0, 120) + "...",
      fullContent: content,
      tags: ["Student Contribution", subject, "Verified"]
    };

    onAddNote(newNote);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Share Your Study Notes
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Title of Notes
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Web Development MERN Stack Unit 1-3 summary"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Notes Text / Summary Preview
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste formulas, key questions, solved problems, or module summary..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition active:scale-95"
          >
            Publish Verified Note
          </button>
        </form>
      </div>
    </div>
  );
};
