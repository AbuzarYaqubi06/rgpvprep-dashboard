import React, { useState } from 'react';
import Filters from '../components/Filters';
import NotesList from '../components/NotesList';

export default function UserDashboard() {
  const [filters, setFilters] = useState({});

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <p className="muted">Filter and browse approved notes</p>

      <Filters onChange={setFilters} />
      <NotesList filters={filters} />
    </div>
  );
}
