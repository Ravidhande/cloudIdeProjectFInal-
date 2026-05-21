import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({
  value,
  onChange,
  onKeyDown,
  placeholder = '••••••••',
  label = '',
  error = false,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 500,
          color: '#555',
          marginBottom: 6,
          letterSpacing: 0.1,
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#080808',
            border: error ? '1px solid #ef4444' : '1px solid #1e1e1e',
            borderRadius: 8,
            padding: '0 14px 0 14px',
            paddingRight: 44,
            height: 44,
            color: '#d4d4d4',
            fontSize: 13,
            fontFamily: "'Geist',sans-serif",
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#444',
            display: 'flex',
            padding: 2,
          }}
        >
          {show ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
        </button>
      </div>
      {error && (
        <div style={{ fontSize: 11, color: '#ef4444', marginTop: 5 }}>
          {error}
        </div>
      )}
    </div>
  );
}
