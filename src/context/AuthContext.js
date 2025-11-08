import React, { createContext, useContext, useEffect, useState } from 'react';

// Sample users
const SAMPLE_USERS = [
  { id: 1, email: 'user@example.com', name: 'Demo User', password: 'user123', role: 'user', approved: true },
  { id: 2, email: 'faculty@example.com', name: 'Demo Faculty', password: 'faculty123', role: 'faculty', approved: false },
  { id: 3, email: 'admin@example.com', name: 'Demo Admin', password: 'admin123', role: 'admin', approved: true }
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem('rgpv_users');
    return raw ? JSON.parse(raw) : SAMPLE_USERS;
  });
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('rgpv_current_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    localStorage.setItem('rgpv_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) localStorage.setItem('rgpv_current_user', JSON.stringify(user));
    else localStorage.removeItem('rgpv_current_user');
  }, [user]);

  function signup({ name, email, password, role = 'user' }) {
    // if role faculty -> approved false until admin approves
    const exists = users.some(u => u.email === email);
    if (exists) throw new Error('User already exists');
    const newUser = {
      id: Date.now(),
      email,
      name,
      password,
      role,
      approved: role === 'user' ? true : false
    };
    setUsers(prev => [newUser, ...prev]);
    // auto-login for user role only
    if (newUser.role === 'user') {
      setUser({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name });
    }
    return newUser;
  }

  function login({ email, password }) {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    if (!found.approved) throw new Error('Account pending approval by admin');
    const logged = { id: found.id, email: found.email, role: found.role, name: found.name };
    setUser(logged);
    return logged;
  }

  function logout() {
    setUser(null);
  }

  function approveUser(userId) {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, approved: true } : u)));
  }

  function getUsers() {
    return users;
  }

  return (
    <AuthContext.Provider value={{ user, users, signup, login, logout, approveUser, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
