import React, { useState } from 'react';
import './Auth.css';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Backend returns send(err) or send('Invalid credentials'), let's try to parse text
        const errorText = await response.text();
        throw new Error(errorText || 'Authentication failed');
      }

      if (isLogin) {
        const data = await response.json();
        // data.token is provided by backend
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        setIsError(false);
        if (onLoginSuccess) {
          setTimeout(onLoginSuccess, 1000); // short delay to show success message
        }
      } else {
        const textData = await response.text(); // Assuming signup sends back "User registered successfully"
        setMessage(textData || 'Registration successful. Please login.');
        setIsError(false);
        setIsLogin(true); // switch to login form
      }

    } catch (err) {
      console.error('Auth Error:', err);
      setIsError(true);
      setMessage(err.message || 'An error occurred. Please verify backend is running.');
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Welcome Back' : 'Join NeuroPlay'}</h1>
          <p>{isLogin ? 'Enter your details to access your account' : 'Start your journey with us today'}</p>
        </div>

        {message && (
          <div className={`auth-message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
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

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={toggleMode}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
