import React from 'react';
import { FaBolt, FaSpinner } from 'react-icons/fa';

export default function Button({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  variant = 'primary',
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyle = {
    width: '100%',
    height: 44,
    border: 'none',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "'Geist',sans-serif",
    transition: 'opacity 0.15s',
    opacity: disabled ? 0.4 : 1,
  };

  const variants = {
    primary: {
      ...baseStyle,
      background: '#e5e5e5',
      color: '#080808',
    },
    secondary: {
      ...baseStyle,
      background: '#1a1a1a',
      color: '#aaa',
      border: '1px solid #222',
    },
    danger: {
      ...baseStyle,
      background: '#1a0808',
      color: '#f87171',
      border: '1px solid #2a1010',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      style={variants[variant] || variants.primary}
      {...props}
    >
      {loading ? (
        <>
          <div style={{
            width: 15,
            height: 15,
            border: '2px solid rgba(0,0,0,0.2)',
            borderTopColor: '#080808',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }} />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon size={11} />}
          {children}
        </>
      )}
    </button>
  );
}
