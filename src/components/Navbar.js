import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">RGPVPrep</Link>
      </div>

      <div className="nav-right">
        <Link to="/notes" className="nav-link">Notes</Link>

        {!user && <Link to="/login" className="nav-link">Login</Link>}
        {!user && <Link to="/signup" className="nav-link">Signup</Link>}

        {user && user.role === 'user' && <Link to="/user" className="nav-link">Dashboard</Link>}
        {user && user.role === 'faculty' && <Link to="/faculty" className="nav-link">Faculty</Link>}
        {user && user.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}

        {user && <button className="btn-ghost" onClick={() => { logout(); nav('/'); }}>Logout</button>}
      </div>
    </nav>
  );
}
