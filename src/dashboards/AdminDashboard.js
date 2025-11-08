import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NotesList from '../components/NotesList';

export default function AdminDashboard() {
  const { users, approveUser } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('rgpv_notes');
    setNotes(raw ? JSON.parse(raw) : []);
  }, []);

  function approveNote(noteId) {
    const next = notes.map(n => (n.id === noteId ? { ...n, status: 'approved' } : n));
    setNotes(next);
    localStorage.setItem('rgpv_notes', JSON.stringify(next));
  }

  function approveNewUser(id) {
    approveUser(id);
  }

  const pendingUsers = users.filter(u => !u.approved && u.role === 'faculty');

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Pending faculty approvals</h3>
        {pendingUsers.length === 0 && <p className="muted">No pending faculty.</p>}
        {pendingUsers.map(u => (
          <div className="pending-row" key={u.id}>
            <div>
              <strong>{u.name}</strong> — {u.email}
            </div>
            <button className="primary" onClick={() => approveNewUser(u.id)}>Approve</button>
          </div>
        ))}
      </section>

      <section style={{marginTop:20}}>
        <h3>Pending notes</h3>
        <NotesList showPending={true} onApprove={approveNote} />
      </section>
    </div>
  );
}
