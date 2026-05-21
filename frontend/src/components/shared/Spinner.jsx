import React from 'react';

export default function Spinner({ size = 15 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '2px solid rgba(0,0,0,0.2)',
        borderTopColor: '#080808',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    />
  );
}
