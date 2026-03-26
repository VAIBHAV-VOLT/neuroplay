import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import Game from './Game';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// Auto Login Wrapper for Guest routes
const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <GuestRoute>
            <LandingPage />
          </GuestRoute>
        } />
        <Route path="/auth" element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/game/:id" element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
