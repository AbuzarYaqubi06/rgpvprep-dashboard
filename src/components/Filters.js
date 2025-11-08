import React, { useState } from 'react';

export default function Filters({ onChange }) {
  const [state, setState] = useState({
    university: '', college: '', course: '', branch: '', subject: ''
  });

  function update(k, v) {
    const next = { ...state, [k]: v };
    setState(next);
    onChange(next);
  }

  return (
    <div className="filters">
      <input placeholder="University" value={state.university} onChange={e => update('university', e.target.value)} />
      <input placeholder="College" value={state.college} onChange={e => update('college', e.target.value)} />
      <input placeholder="Course" value={state.course} onChange={e => update('course', e.target.value)} />
      <input placeholder="Branch" value={state.branch} onChange={e => update('branch', e.target.value)} />
      <input placeholder="Subject" value={state.subject} onChange={e => update('subject', e.target.value)} />
    </div>
  );
}
