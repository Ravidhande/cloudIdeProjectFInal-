import React, { useState } from 'react';
import { FaCheckCircle, FaLock, FaBolt } from 'react-icons/fa';
import BgShell from '../layout/BgShell';
import Logo from '../layout/Logo';
import Button from '../shared/Button';
import PasswordInput from '../shared/PasswordInput';
import Input from '../shared/Input';
import Flash from '../shared/Flash';
import Spinner from '../shared/Spinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function ResetPassword({ navigate }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const userId = params.get('userId');

  const submit = async () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId, password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Reset failed.');
      else setDone(true);
    } catch {
      setError('Cannot connect to server.');
    }
    setLoading(false);
  };

  if (!token || !userId)
    return (
      <BgShell>
        <div style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
          <Flash type="error">Invalid reset link. Please request a new one.</Flash>
          <Button onClick={() => navigate('forgot')} variant="secondary" style={{ marginTop: 8 }}>
            Request New Link
          </Button>
        </div>
      </BgShell>
    );

  return (
    <BgShell>
      <div style={{ maxWidth: 420, margin: '0 auto', animation: 'fadeUp 0.35s ease' }}>
        <Logo />
        {!done ? (
          <>
            <h2 style={{ margin: '0 0 6px', fontSize: 21, fontWeight: 700, color: '#e5e5e5' }}>
              Set a new password
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: '#444' }}>
              Choose a strong password for your account.
            </p>
            <Flash type="error">{error}</Flash>
            <div style={{ marginBottom: 14 }}>
              <PasswordInput
                label="New Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Min. 8 characters"
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                error={confirm && confirm !== password ? "Passwords don't match" : ''}
              />
            </div>
            <Button
              onClick={submit}
              disabled={loading || !password || !confirm}
              loading={loading}
              icon={FaLock}
            >
              Reset Password
            </Button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
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
              Password Reset!
            </h2>
            <p style={{ color: '#555', marginBottom: 28, fontSize: 14, lineHeight: 1.7 }}>
              Your password has been changed. You can now sign in with your new password.
            </p>
            <Button onClick={() => navigate('signin')} icon={FaBolt}>
              Sign In
            </Button>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </BgShell>
  );
}
