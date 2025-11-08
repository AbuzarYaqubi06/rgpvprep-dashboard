import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const sample = `Sample accounts:
user@example.com / user123
faculty@example.com / faculty123
admin@example.com / admin123`;

  async function submit(e) {
    e.preventDefault();
    try {
      const user = login({ email, password });
      if (user.role === 'user') nav('/user');
      if (user.role === 'faculty') nav('/faculty');
      if (user.role === 'admin') nav('/admin');
    } catch (ex) {
      setErr(ex.message);
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <p className="muted">{sample}</p>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="primary">Login</button>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}
