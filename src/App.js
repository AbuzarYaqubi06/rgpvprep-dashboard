import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import UserDashboard from './dashboards/UserDashboard';
import FacultyDashboard from './dashboards/FacultyDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import NotesList from './components/NotesList';

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/user"
              element={
                <PrivateRoute roles={['user']}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty"
              element={
                <PrivateRoute roles={['faculty']}>
                  <FacultyDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* Public listing for testing */}
            <Route path="/notes" element={<NotesList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  return (
    <div className="center-card">
      <h1>🚀 Dashboard Test Build</h1>
      <p>If you see this, the correct code is running.</p>
    </div>
  );
}
