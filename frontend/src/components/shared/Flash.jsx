import React from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export default function Flash({ type = 'error', children }) {
  if (!children) return null;

  const config = {
    error: { bg: '#190a0a', border: '#3d1414', color: '#fca5a5', icon: FaExclamationTriangle },
    success: { bg: '#091509', border: '#14401a', color: '#86efac', icon: FaCheckCircle },
    info: { bg: '#080e19', border: '#1a2e50', color: '#93c5fd', icon: null },
    warning: { bg: '#190e05', border: '#3d2810', color: '#fcd34d', icon: null },
  }[type] || { bg: '#190a0a', border: '#3d1414', color: '#fca5a5', icon: FaExclamationTriangle };

  const IconComponent = config.icon;

  return (
    <div
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 8,
        padding: '11px 14px',
        marginBottom: 18,
        fontSize: 12,
        color: config.color,
        lineHeight: 1.65,
        display: 'flex',
        gap: 8,
        alignItems: 'flex-start',
      }}
    >
      {IconComponent && <IconComponent size={12} style={{ flexShrink: 0, marginTop: 1 }} />}
      <span>{children}</span>
    </div>
  );
}
