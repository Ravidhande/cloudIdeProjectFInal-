import React from 'react';

export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  error = false,
  label = '',
  disabled = false,
  autoFocus = false,
  ...props
}) {
  const baseStyle = {
    width: '100%',
    boxSizing: 'border-box',
    background: '#080808',
    border: error ? '1px solid #ef4444' : '1px solid #1e1e1e',
    borderRadius: 8,
    padding: '0 14px',
    height: 44,
    color: '#d4d4d4',
    fontSize: 13,
    fontFamily: "'Geist',sans-serif",
    outline: 'none',
    transition: 'border-color 0.15s',
  };

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
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoFocus={autoFocus}
        style={baseStyle}
        {...props}
      />
      {error && (
        <div style={{ fontSize: 11, color: '#ef4444', marginTop: 5 }}>
          {error}
        </div>
      )}
    </div>
  );
}
