import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function readFileAsBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export default function UploadForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  function getNotes() {
    const raw = localStorage.getItem('rgpv_notes');
    return raw ? JSON.parse(raw) : [];
  }

  async function submit(e) {
    e.preventDefault();
    if (!file) return setMsg('Please choose a file');
    const b64 = await readFileAsBase64(file);
    const newNote = {
      id: Date.now(),
      title,
      university,
      college,
      course,
      branch,
      subject,
      fileName: file.name,
      fileData: b64,
      uploadedBy: user.email,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const notes = getNotes();
    notes.unshift(newNote);
    localStorage.setItem('rgpv_notes', JSON.stringify(notes));
    setMsg('Uploaded and pending admin approval');
    // reset
    setTitle(''); setUniversity(''); setCollege(''); setCourse(''); setBranch(''); setSubject(''); setFile(null);
  }

  return (
    <form className="upload-card" onSubmit={submit}>
      <h3>Upload Notes (Faculty)</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="University" value={university} onChange={e => setUniversity(e.target.value)} required />
      <input placeholder="College" value={college} onChange={e => setCollege(e.target.value)} required />
      <input placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} required />
      <input placeholder="Branch" value={branch} onChange={e => setBranch(e.target.value)} required />
      <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
      <input type="file" onChange={e => setFile(e.target.files[0])} accept=".pdf,.txt,.doc,.docx" required />
      <button className="primary">Upload</button>
      {msg && <p className="muted">{msg}</p>}
    </form>
  );
}
