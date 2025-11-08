import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  function submit(e) {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const user = signup({ name, email, password, role });
      if (role === 'user') {
        setOk('Registered and logged in. Redirecting...');
        setTimeout(() => nav('/user'), 600);
      } else {
        setOk('Registered. Await admin approval for faculty accounts.');
      }
    } catch (ex) {
      setErr(ex.message);
    }
  }

  return (
    <div className="auth-card">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">Student (User)</option>
          <option value="faculty">Faculty</option>
        </select>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="primary">Create Account</button>
        {err && <p className="error">{err}</p>}
        {ok && <p className="success">{ok}</p>}
      </form>
    </div>
  );
}
