import React, { useEffect, useState } from 'react';

export default function NotesList({ filters = {}, showPending = false, onApprove }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('rgpv_notes');
    const all = raw ? JSON.parse(raw) : [];
    setNotes(all);
  }, []);

  function applyFilters(list) {
    let out = [...list];
    if (!showPending) out = out.filter(n => n.status === 'approved');
    // apply filters object keys if provided
    if (filters.university) out = out.filter(n => n.university.toLowerCase().includes(filters.university.toLowerCase()));
    if (filters.college) out = out.filter(n => n.college.toLowerCase().includes(filters.college.toLowerCase()));
    if (filters.course) out = out.filter(n => n.course.toLowerCase().includes(filters.course.toLowerCase()));
    if (filters.branch) out = out.filter(n => n.branch.toLowerCase().includes(filters.branch.toLowerCase()));
    if (filters.subject) out = out.filter(n => n.subject.toLowerCase().includes(filters.subject.toLowerCase()));
    return out;
  }

  const visible = applyFilters(notes);

  function download(note) {
    // create anchor to download fileData
    const a = document.createElement('a');
    a.href = note.fileData;
    a.download = note.fileName;
    a.click();
  }

  return (
    <div className="notes-list">
      {visible.length === 0 && <p className="muted">No notes yet.</p>}
      {visible.map(note => (
        <div key={note.id} className="note-row">
          <div>
            <h4>{note.title}</h4>
            <p className="muted">{note.university} • {note.college} • {note.course} • {note.branch}</p>
            <p className="muted">Subject: {note.subject}</p>
            <p className="muted">Status: {note.status}</p>
          </div>

          <div className="note-actions">
            <button className="btn-ghost" onClick={() => download(note)}>Download</button>
            {onApprove && note.status === 'pending' && <button className="primary" onClick={() => onApprove(note.id)}>Approve</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
