import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function OAuthButtons() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#252525', fontSize: 11, margin: '20px 0' }}>
        <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
        <span>or continue with</span>
        <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          style={{
            flex: 1,
            height: 40,
            background: '#111',
            border: '1px solid #1e1e1e',
            borderRadius: 8,
            color: '#666',
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            cursor: 'pointer',
            fontFamily: "'Geist',sans-serif",
            transition: 'border-color 0.15s',
          }}
          onClick={() => (window.location.href = `${API_URL}/auth/google`)}
        >
          {/* Google "G" SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path fill="#ea4335" d="M5.27 9.76A7.08 7.08 0 0 1 19.05 10.8h-6.51V13.5h9.26A9.84 9.84 0 1 1 4.63 7.04l.64 2.72z" />
            <path fill="#4285f4" d="M5.27 9.76l-.64-2.72A9.84 9.84 0 0 0 2.15 12c0 1.62.39 3.14 1.07 4.49L6.3 14a7.05 7.05 0 0 1-.52-2c0-.76.14-1.49.38-2.18l.11-.06z" />
            <path fill="#fbbc04" d="M12 4.92a7.04 7.04 0 0 1 4.72 1.82l3.51-3.5A9.82 9.82 0 0 0 12 2.08 9.84 9.84 0 0 0 4.63 7.04l3.64 2.72A7.08 7.08 0 0 1 12 4.92z" />
            <path fill="#34a853" d="M12 19.08a7.08 7.08 0 0 1-5.72-2.91L3.22 18.53A9.84 9.84 0 0 0 12 21.92a9.82 9.82 0 0 0 8.23-4.42l-3.68-2.86A7.05 7.05 0 0 1 12 19.08z" />
          </svg>
          Google
        </button>
        <button
          style={{
            flex: 1,
            height: 40,
            background: '#111',
            border: '1px solid #1e1e1e',
            borderRadius: 8,
            color: '#666',
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            cursor: 'pointer',
            fontFamily: "'Geist',sans-serif",
            transition: 'border-color 0.15s',
          }}
          onClick={() => (window.location.href = `${API_URL}/auth/github`)}
        >
          <FaGithub size={14} color="#aaa" />
          GitHub
        </button>
      </div>
    </>
  );
}
