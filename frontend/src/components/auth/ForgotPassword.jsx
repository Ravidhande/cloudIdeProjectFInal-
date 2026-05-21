import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import BgShell from '../layout/BgShell';
import Logo from '../layout/Logo';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Flash from '../shared/Flash';
import Spinner from '../shared/Spinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function ForgotPassword({ navigate }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Something went wrong.');
      else setSent(true);
    } catch {
      setError('Cannot connect to server.');
    }
    setLoading(false);
  };

  return (
    <BgShell>
      <div style={{ maxWidth: 420, margin: '0 auto', animation: 'fadeUp 0.35s ease' }}>
        <Logo />
        <button
          onClick={() => navigate('signin')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 20,
            color: '#444',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: "'Geist',sans-serif",
            textDecoration: 'underline',
          }}
        >
          <FaArrowLeft size={10} /> Back to Sign In
        </button>

        {!sent ? (
          <>
            <h2
              style={{
                margin: '0 0 6px',
                fontSize: 21,
                fontWeight: 700,
                color: '#e5e5e5',
              }}
            >
              Forgot password?
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: '#444', lineHeight: 1.65 }}>
              Enter the email for your account and we'll send a reset link.
            </p>
            <Flash type="error">{error}</Flash>
            <div style={{ marginBottom: 20 }}>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                autoFocus
              />
            </div>
            <Button onClick={submit} disabled={loading || !email} loading={loading} icon={FaEnvelope}>
              Send Reset Link
            </Button>
          </>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#091509',
                border: '1px solid #14401a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <FaEnvelope size={26} color="#22c55e" />
            </div>
            <h2 style={{ color: '#e5e5e5', marginBottom: 8, fontSize: 20, fontWeight: 700 }}>
              Check your inbox
            </h2>
            <p style={{ color: '#555', lineHeight: 1.75, marginBottom: 28, fontSize: 13 }}>
              If an account exists for <strong style={{ color: '#888' }}>{email}</strong>, you'll receive a password
              reset link within a few minutes. Also check your spam folder.
            </p>
            <Button onClick={() => navigate('signin')} variant="secondary">
              Back to Sign In
            </Button>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </BgShell>
  );
}
