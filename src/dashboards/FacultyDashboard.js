import React from 'react';
import UploadForm from '../components/UploadForm';
import NotesList from '../components/NotesList';

export default function FacultyDashboard() {
  return (
    <div className="dashboard">
      <h2>Faculty Dashboard</h2>
      <p className="muted">Upload notes — admin will approve before they're visible to students.</p>

      <UploadForm />

      <h3 style={{marginTop:20}}>Your uploads (all statuses)</h3>
      <NotesList showPending={true} />
    </div>
  );
}
