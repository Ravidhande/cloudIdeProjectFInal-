import React from 'react';
import { FaCode } from 'react-icons/fa';

export default function Logo({ subtitle = 'Professional Edition' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: '#111',
          border: '1px solid #1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaCode size={14} color="#e5e5e5" />
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#e5e5e5', letterSpacing: -0.3 }}>
          CloudIDE
        </div>
        <div style={{ fontSize: 10, color: '#333' }}>{subtitle}</div>
      </div>
    </div>
  );
}
