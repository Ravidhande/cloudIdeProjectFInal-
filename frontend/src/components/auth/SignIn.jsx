import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaSpinner, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authError = sessionStorage.getItem('authError');
    if (authError) {
      setError(authError);
      sessionStorage.removeItem('authError');
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || 'Sign in failed');
        setLoading(false);
        return;
      }

      setSuccess('Signing in...');
      if (login) {
        login(data.token, data.user);
      } else {
        localStorage.setItem('cide_token', data.token);
        localStorage.setItem('cide_user', JSON.stringify(data.user));
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGithubAuth = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.decorative1}></div>
      <div style={styles.decorative2}></div>

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <span style={styles.cloudIcon}>☁️</span>
          </div>
          <h1 style={styles.title}>CloudIDE</h1>
          <p style={styles.subtitle}>Cloud Code Editor</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome Back</h2>
          <p style={styles.cardSubtitle}>Sign in to your account to continue</p>

          {error && (
            <div style={styles.alertError}>
              <FaExclamationCircle style={styles.alertIcon} />
              <p style={styles.alertText}>{error}</p>
            </div>
          )}

          {success && (
            <div style={styles.alertSuccess}>
              <FaCheckCircle style={styles.alertIcon} />
              <p style={styles.alertText}>{success}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} style={styles.form}>
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <FaEnvelope style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  style={styles.input}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.fieldContainer}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <FaLock style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  style={styles.input}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <div style={styles.forgotContainer}>
              <a href="/forgot-password" style={styles.forgotLink}>Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                ...styles.submitBtn,
                opacity: loading || !email || !password ? 0.5 : 1,
              }}
            >
              {loading ? (
                <><FaSpinner size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing In...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>OR CONTINUE WITH</span>
            <div style={styles.dividerLine}></div>
          </div>

          <div style={styles.oauthContainer}>
            <button type="button" onClick={handleGoogleAuth} disabled={loading} style={styles.oauthBtn}>
              <FaGoogle size={18} style={{ color: '#ef4444' }} />
              <span>Google</span>
            </button>
            <button type="button" onClick={handleGithubAuth} disabled={loading} style={styles.oauthBtn}>
              <FaGithub size={18} style={{ color: '#1f2937' }} />
              <span>GitHub</span>
            </button>
          </div>

          <p style={styles.signupText}>
            Don't have an account? <a href="/signup" style={styles.signupLink}>Sign Up</a>
          </p>
        </div>

        <p style={styles.footer}>
          By signing in, you agree to our <a href="#" style={styles.footerLink}>Terms of Service</a>
        </p>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f7ff, #ffffff, #f0f7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden' },
  decorative1: { position: 'absolute', top: '0', left: '0', width: '384px', height: '384px', background: '#93c5fd', borderRadius: '50%', filter: 'blur(48px)', opacity: 0.2, pointerEvents: 'none' },
  decorative2: { position: 'absolute', bottom: '0', right: '0', width: '384px', height: '384px', background: '#a5b4fc', borderRadius: '50%', filter: 'blur(48px)', opacity: 0.2, pointerEvents: 'none' },
  wrapper: { width: '100%', maxWidth: '448px', position: 'relative', zIndex: 10 },
  header: { textAlign: 'center', marginBottom: '32px' },
  iconCircle: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', background: 'linear-gradient(to bottom right, #2563eb, #4f46e5)', borderRadius: '50%', marginBottom: '16px', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3)' },
  cloudIcon: { fontSize: '32px' },
  title: { fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '8px', margin: 0 },
  subtitle: { fontSize: '16px', color: '#4b5563', fontWeight: '500', margin: 0 },
  card: { background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '32px', border: '1px solid #f3f4f6' },
  cardTitle: { fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px', margin: 0 },
  cardSubtitle: { fontSize: '14px', color: '#6b7280', marginBottom: '24px', margin: 0 },
  alertError: { marginBottom: '16px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px' },
  alertSuccess: { marginBottom: '16px', padding: '16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px' },
  alertIcon: { marginTop: '2px', flexShrink: 0 },
  alertText: { fontSize: '14px', fontWeight: '500', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  fieldContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '16px', color: '#9ca3af', fontSize: '14px' },
  input: { width: '100%', paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', fontFamily: 'inherit' },
  eyeButton: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' },
  forgotContainer: { textAlign: 'right' },
  forgotLink: { fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' },
  submitBtn: { background: 'linear-gradient(to right, #2563eb, #4f46e5)', color: '#ffffff', fontWeight: '600', paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', border: 'none', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)', cursor: 'pointer' },
  divider: { marginTop: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' },
  dividerLine: { flex: 1, height: '1px', background: '#e5e7eb' },
  dividerText: { fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0 },
  oauthContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  oauthBtn: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', paddingTop: '10px', paddingBottom: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.2s', fontSize: '14px', color: '#374151', fontWeight: '500' },
  signupText: { textAlign: 'center', fontSize: '14px', color: '#4b5563', marginTop: '24px', margin: 0 },
  signupLink: { color: '#2563eb', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' },
  footer: { textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '24px', margin: 0 },
  footerLink: { color: '#2563eb', textDecoration: 'none' },
};
