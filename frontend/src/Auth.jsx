import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.defaultMode === 'signup') {
      setIsLogin(false);
    } else if (location.state?.defaultMode === 'login') {
      setIsLogin(true);
    }
  }, [location.state]);

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
    <div className="min-h-screen w-full flex flex-col items-center justify-between relative overflow-y-auto font-body pt-6" style={{ backgroundImage: "url('/7751672.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Background Gradients removed for new image background */}

      {/* Top Logo */}
      <div className="z-10 mt-6 cursor-pointer flex items-center gap-2 transition-transform hover:scale-105" onClick={() => navigate('/')}>
        <span className="material-symbols-outlined text-primary text-3xl">magic_button</span>
        <span className="text-2xl font-headline font-bold text-primary tracking-tight">
          Fluid Sanctuary
        </span>
      </div>

      {/* Center Card */}
      <div className="z-10 w-full max-w-[480px] px-4 sm:px-6 mt-8 sm:mt-12 mb-auto animate-fade-in-up">
        <div className="bg-surface-container-lowest px-6 sm:px-10 py-10 rounded-[2rem] shadow-[0_24px_48px_rgba(0,88,185,0.05)] border border-surface-variant/30 flex flex-col items-center">
          
          <h1 className="text-3xl font-headline font-bold text-on-surface mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-on-surface-variant text-[0.95rem] mb-8 text-center">{isLogin ? 'Continue your journey in the sanctuary.' : 'Start your journey with NeuroPlay'}</p>
          
          {message && (
            <div className={`w-full p-4 rounded-2xl mb-6 text-sm font-bold text-center ${isError ? 'bg-error-container/30 text-error' : 'bg-tertiary-container/30 text-tertiary'}`}>
              {message}
            </div>
          )}

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name"
                className="w-full px-5 py-4 rounded-3xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all font-medium border border-transparent focus:border-primary/30"
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            )}
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              className="w-full px-5 py-4 rounded-3xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all font-medium border border-transparent focus:border-primary/30"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />

            <input 
              type="password" 
              name="password" 
              placeholder="Password"
              className="w-full px-5 py-4 rounded-3xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all font-medium border border-transparent focus:border-primary/30"
              value={formData.password} 
              onChange={handleChange} 
              required 
            />

            <button type="submit" disabled={isLoading} className="mt-2 w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-[1.05rem] hover:shadow-[0_12px_24px_rgba(0,88,185,0.2)] hover:scale-[0.98] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100">
              {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="w-full h-px bg-surface-variant/50 my-10"></div>

          <p className="text-on-surface-variant text-[0.95rem]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={toggleMode} className="text-primary font-bold hover:underline transition-colors ml-1">
              {isLogin ? 'Create one' : 'Login'}
            </button>
          </p>
        </div>

        {/* Social Proof Below Card */}
        {!isLogin && (
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-10 h-10 rounded-full border-[3px] border-surface-container-low object-cover shadow-sm"/>
              <img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-10 h-10 rounded-full border-[3px] border-surface-container-low object-cover shadow-sm"/>
              <img src="https://i.pravatar.cc/100?img=5" alt="user" className="w-10 h-10 rounded-full border-[3px] border-surface-container-low object-cover shadow-sm"/>
            </div>
            <p className="text-[0.85rem] text-on-surface-variant font-medium leading-tight max-w-[160px]">Join 2,000+ others finding their sanctuary.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-8 md:px-12 py-8 z-10 gap-4">
         <p className="text-[0.8rem] text-on-surface-variant/80 font-medium">© 2024 Fluid Sanctuary. Your companion in growth.</p>
         <div className="flex gap-6 text-[0.8rem] text-on-surface-variant/80 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
         </div>
      </footer>
    </div>
  );
}
