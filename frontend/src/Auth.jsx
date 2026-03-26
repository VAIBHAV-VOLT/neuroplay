import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Authentication failed');
      }

      if (isLogin) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setMessage('Login successful! Redirecting...');
        setIsError(false);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        const textData = await response.text();
        setMessage(textData || 'Registration successful! Please log in.');
        setIsError(false);
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.message || 'An error occurred. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    setIsError(false);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-background-blobs">
         <div className="blob blob-1"></div>
         <div className="blob blob-2"></div>
      </div>

      <div className="auth-card glass-card">
        <button className="auth-back-btn" onClick={() => navigate('/')}>
          ← Back to the Sanctuary
        </button>

        <div className="auth-content">
          <header className="auth-header">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Continue your journey in the sanctuary.' 
                : 'Start your journey with NeuroPlay'}
            </p>
          </header>

          {message && (
            <div className={`auth-alert ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-input-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name"
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            )}
            <div className="auth-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="you@example.com"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="auth-input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="••••••••"
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
                {isLogin && (
                  <button type="button" className="forgot-link">Forgot?</button>
                )}
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="auth-footer-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button type="button" onClick={toggleMode}>
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
            {!isLogin && <p className="social-proof">Join 2,000+ others finding their sanctuary.</p>}
          </div>

          {isLogin && (
            <blockquote className="auth-quote">
              "Growth is a gradual process; welcome each step with kindness."
            </blockquote>
          )}
        </div>

        <footer className="auth-legal">
           <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
           </div>
           <p>© 2024 Fluid Sanctuary. Your companion in growth.</p>
        </footer>
      </div>
    </div>
  );
}
