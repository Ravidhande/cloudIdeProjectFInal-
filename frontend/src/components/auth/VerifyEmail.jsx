import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes, FaArrowLeft } from 'react-icons/fa';
import BgShell from '../layout/BgShell';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import Flash from '../shared/Flash';
import { useAuth } from '../../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function VerifyEmail({ navigate }) {
  const { login } = useAuth();
  const [status, setStatus] = useState('loading');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');

    if (!token || !userId) {
      setStatus('error');
      setMsg('Invalid verification link — missing token or user ID.');
      return;
    }

    fetch(`${API_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.token) {
          login(d.token, d.user);
          setStatus('success');
        } else if (d.alreadyVerified) {
          setStatus('error');
          setMsg('Email already verified. Please sign in.');
        } else {
          setStatus('error');
          setMsg(d.error || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMsg('Server error. Please try again.');
      });
  }, [login]);

  return (
    <BgShell>
      <div
        style={{
          maxWidth: 420,
          margin: '0 auto',
          textAlign: 'center',
          animation: 'fadeUp 0.35s ease',
        }}
      >
        {status === 'loading' && (
          <>
            <div
              style={{
                width: 48,
                height: 48,
                border: '3px solid #1a1a1a',
                borderTopColor: '#aaa',
                borderRadius: '50%',
                animation: 'spin 0.9s linear infinite',
                margin: '0 auto 20px',
              }}
            />
            <p style={{ color: '#555', fontSize: 14 }}>Verifying your email…</p>
          </>
        )}
        {status === 'success' && (
          <>
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
              <FaCheckCircle size={28} color="#22c55e" />
            </div>
            <h2 style={{ color: '#e5e5e5', marginBottom: 8, fontSize: 20, fontWeight: 700 }}>
              Email Verified!
            </h2>
            <p style={{ color: '#555', marginBottom: 24, fontSize: 14, lineHeight: 1.7 }}>
              Your account is ready. Taking you to the IDE…
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#190a0a',
                border: '1px solid #3d1414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <FaTimes size={26} color="#ef4444" />
            </div>
            <h2 style={{ color: '#e5e5e5', marginBottom: 8, fontSize: 20, fontWeight: 700 }}>
              Verification Failed
            </h2>
            <p style={{ color: '#f87171', marginBottom: 24, fontSize: 13, lineHeight: 1.7 }}>
              {msg}
            </p>
            <Button onClick={() => navigate('signin')} variant="secondary">
              Back to Sign In
            </Button>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </BgShell>
  );
}
