import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    const levels = [
      { level: 0, label: '', color: 'bg-red-500' },
      { level: 1, label: 'Weak', color: 'bg-red-500' },
      { level: 2, label: 'Fair', color: 'bg-yellow-500' },
      { level: 3, label: 'Good', color: 'bg-blue-500' },
      { level: 4, label: 'Strong', color: 'bg-green-500' },
    ];
    return levels[strength];
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = password === confirm && password.length > 0;
  const isFormValid = name.trim() && email.trim() && password.length >= 8 && passwordsMatch;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your full name'); return; }
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters long'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || data.message || 'Sign up failed'); setLoading(false); return; }
      setSuccess(true);
      setTimeout(() => { window.location.href = '/signin?email=' + encodeURIComponent(email); }, 2000);
    } catch (err) { setError(err.message || 'Network error. Please try again.'); setLoading(false); }
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <div style={styles.successIcon}>
              <FaCheckCircle size={48} color="#22c55e" />
            </div>
            <h2 style={styles.cardTitle}>Account Created!</h2>
            <p style={styles.cardSubtitle}>Check your email to verify your account.</p>
            <div style={styles.successMessage}>
              <p style={{ color: '#155e3b', fontSize: '14px', margin: 0 }}>A verification link has been sent to <strong>{email}</strong></p>
            </div>
            <a href="/signin" style={styles.backLink}>Back to Sign In</a>
          </div>
        </div>
      </div>
    );
  }

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
          <p style={styles.subtitle}>Create Your Account</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Join CloudIDE</h2>
          <p style={styles.cardSubtitle}>Start coding in the cloud today</p>
          {error && (
            <div style={styles.alertError}>
              <FaExclamationCircle style={styles.alertIcon} />
              <p style={styles.alertText}>{error}</p>
            </div>
          )}
          <form onSubmit={handleSignUp} style={styles.form}>
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <FaUser style={styles.inputIcon} />
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => { setName(e.target.value); setError(''); }} style={styles.input} disabled={loading} />
              </div>
            </div>
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <FaEnvelope style={styles.inputIcon} />
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} style={styles.input} disabled={loading} />
              </div>
            </div>
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <FaLock style={styles.inputIcon} />
                <input type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} style={styles.input} disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton} disabled={loading}>
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {password && (
                <div style={styles.strengthContainer}>
                  <div style={styles.strengthBar}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{ ...styles.strengthSegment, background: i <= passwordStrength.level ? (passwordStrength.color === 'bg-red-500' ? '#ef4444' : passwordStrength.color === 'bg-yellow-500' ? '#f59e0b' : passwordStrength.color === 'bg-blue-500' ? '#3b82f6' : '#22c55e') : '#e5e7eb' }}></div>
                    ))}
                  </div>
                  <p style={styles.strengthText}>Strength: <span style={{ color: passwordStrength.color === 'bg-red-500' ? '#dc2626' : passwordStrength.color === 'bg-yellow-500' ? '#d97706' : passwordStrength.color === 'bg-blue-500' ? '#2563eb' : '#16a34a' }}>{passwordStrength.label}</span></p>
                </div>
              )}
            </div>
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <FaLock style={styles.inputIcon} />
                <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" value={confirm} onChange={(e) => { setConfirm(e.target.value); setError(''); }} style={styles.input} disabled={loading} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeButton} disabled={loading}>
                  {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {confirm && <p style={{ ...styles.passwordMatchText, color: passwordsMatch ? '#16a34a' : '#dc2626' }}>
                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>}
            </div>
            <button type="submit" disabled={loading || !isFormValid} style={{ ...styles.submitBtn, opacity: loading || !isFormValid ? 0.5 : 1 }}>
              {loading ? <><FaSpinner size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating Account...</> : 'Create Account'}
            </button>
          </form>
          <p style={styles.signupText}>
            Already have an account? <a href="/signin" style={styles.signupLink}>Sign In</a>
          </p>
        </div>
        <p style={styles.footer}>
          By signing up, you agree to our <a href="#" style={styles.footerLink}>Terms of Service</a>
        </p>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f7ff, #ffffff, #f0f7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden' },
  decorative1: { position: 'absolute', top: '0', left: '0', width: '384px', height: '384px', background: '#93c5fd', borderRadius: '50%', filter: 'blur(48px)', opacity: 0.2 },
  decorative2: { position: 'absolute', bottom: '0', right: '0', width: '384px', height: '384px', background: '#a5b4fc', borderRadius: '50%', filter: 'blur(48px)', opacity: 0.2 },
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
  alertIcon: { marginTop: '2px', flexShrink: 0 },
  alertText: { fontSize: '14px', fontWeight: '500', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  fieldContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '16px', color: '#9ca3af', fontSize: '14px' },
  input: { width: '100%', paddingLeft: '40px', paddingRight: '40px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', fontFamily: 'inherit' },
  eyeButton: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  strengthContainer: { marginTop: '8px' },
  strengthBar: { display: 'flex', gap: '4px', marginBottom: '6px' },
  strengthSegment: { flex: 1, height: '4px', borderRadius: '2px', transition: 'all 0.3s' },
  strengthText: { fontSize: '12px', color: '#6b7280', margin: 0 },
  passwordMatchText: { fontSize: '12px', marginTop: '6px', fontWeight: '500', margin: 0 },
  submitBtn: { background: 'linear-gradient(to right, #2563eb, #4f46e5)', color: '#ffffff', fontWeight: '600', paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', border: 'none', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' },
  signupText: { textAlign: 'center', fontSize: '14px', color: '#4b5563', marginTop: '24px', margin: 0 },
  signupLink: { color: '#2563eb', textDecoration: 'none', fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '24px', margin: 0 },
  footerLink: { color: '#2563eb', textDecoration: 'none' },
  successIcon: { textAlign: 'center', marginBottom: '16px' },
  successMessage: { marginBottom: '24px', padding: '16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' },
  backLink: { display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: '#2563eb', color: '#ffffff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', textAlign: 'center', width: '100%', boxSizing: 'border-box' },
};
