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
  Check
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
      <div className="glass-box rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-inner text-zinc-300 text-xs font-medium mb-2">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Cross-College Notes Repository • AI Augmented</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {t.notesTitle}
          </h2>
          <p className="text-zinc-300 text-sm mt-1 max-w-xl">
            {t.notesSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="self-start md:self-center flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-medium tactile-btn"
        >
          <Upload className="w-4 h-4" />
          <span>{t.uploadNote}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-box rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by subject (OS, DBMS, DSA), college, or keywords..."
            className="w-full pl-11 pr-4 py-2.5 glass-inner rounded-xl text-sm font-normal text-white placeholder-zinc-500 focus:outline-none focus:border-white/35 transition"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tactile-btn ${
                  selectedLanguageFilter === lang.id ? 'tactile-btn-active' : ''
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-400 font-normal">
            <span className="text-white font-medium">{filteredNotes.length}</span> notes available
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="glass-box rounded-2xl p-5 flex flex-col justify-between group"
          >
            <div>
              
              {/* Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium glass-inner text-sky-200">
                  {note.subject} • Sem {note.semester}
                </span>

                {/* Rating badge */}
                <div className="flex items-center space-x-1 glass-inner px-2.5 py-0.5 rounded-full text-zinc-100 font-medium text-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{note.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-zinc-400 font-normal">
                    ({note.ratingCount})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                {note.title}
              </h3>

              {/* College & Contributor */}
              <div className="text-xs text-zinc-400 mt-2 space-y-0.5 font-normal">
                <div>From: <span className="text-zinc-200">{note.college}</span></div>
                <div>Uploaded by: <span className="text-sky-200">{note.uploadedBy}</span></div>
              </div>

              {/* Preview Snippet */}
              <p className="mt-3 text-xs text-zinc-300 glass-inner p-3 rounded-xl line-clamp-3 leading-relaxed">
                {note.previewSnippet}
              </p>

              {/* Metadata */}
              <div className="flex items-center space-x-3 text-[11px] text-zinc-400 font-normal mt-3">
                <span>{note.pages} pages</span>
                <span>•</span>
                <span>{note.fileSize}</span>
                <span>•</span>
                <span>{note.downloadCount} downloads</span>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center space-x-2.5">
              <button
                onClick={() => setReadingNote(note)}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full text-xs font-medium tactile-btn"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.readNote} & AI Digest</span>
              </button>

              <button
                onClick={() => handleDownload(note)}
                className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full text-xs font-medium tactile-btn ${
                  downloadSuccessNoteId === note.id ? 'tactile-btn-active' : ''
                }`}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-950/90 backdrop-blur-xl w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-white/15 max-h-[85vh] flex flex-col relative space-y-4">
            
            <button
              onClick={() => setReadingNote(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8">
              <div className="text-xs font-medium uppercase tracking-wider text-sky-300">
                {readingNote.subject} • {readingNote.college}
              </div>
              <h3 className="text-lg font-semibold text-white mt-1">
                {readingNote.title}
              </h3>
            </div>

            <AINoteExplainer note={readingNote} currentLang={currentLang} />

            {/* Note Full Content Body */}
            <div className="flex-1 overflow-y-auto p-4 glass-inner rounded-2xl font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {readingNote.fullContent}
            </div>

            {/* Modal Bottom: Star Rating */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-zinc-300 mr-2">Rate this note:</span>
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
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleDownload(readingNote)}
                className="px-4 py-2 rounded-full font-medium text-xs tactile-btn"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-950/90 backdrop-blur-xl w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Share Your Study Notes
          </h3>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              Title of Notes
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Web Development MERN Stack Unit 1-3 summary"
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white placeholder-zinc-500 focus:border-white/35 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs font-normal text-white focus:border-white/35 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase mb-1">
              Notes Text / Summary Preview
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste formulas, key questions, solved problems, or module summary..."
              className="w-full px-3.5 py-2.5 glass-inner rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:border-white/35 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium text-xs rounded-full tactile-btn"
          >
            Publish Verified Note
          </button>
        </form>
      </div>
    </div>
  );
};
