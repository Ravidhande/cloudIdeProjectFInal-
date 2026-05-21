import React from 'react';

const styles = {
  root: {
    fontFamily: "'Geist',sans-serif",
    minHeight: '100vh',
    background: '#080808',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'fixed',
    inset: 0,
    backgroundImage: 'radial-gradient(circle,#1c1c1c 1px,transparent 1px)',
    backgroundSize: '24px 24px',
    pointerEvents: 'none',
  },
  glow1: {
    position: 'fixed',
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 600,
    height: 400,
    background: 'radial-gradient(ellipse,rgba(59,130,246,0.055) 0%,transparent 70%)',
    pointerEvents: 'none',
  },
  glow2: {
    position: 'fixed',
    bottom: '5%',
    right: '10%',
    width: 500,
    height: 400,
    background: 'radial-gradient(ellipse,rgba(168,139,250,0.04) 0%,transparent 70%)',
    pointerEvents: 'none',
  },
};

export default function BgShell({ children }) {
  return (
    <div style={styles.root}>
      <div style={styles.grid} />
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={{ position: 'relative', zIndex: 1, padding: 20, width: '100%' }}>
        {children}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input::placeholder{color:#252525;}
        input:focus{border-color:#2e2e2e !important;}
        input:focus,button:focus{outline:none;}
        button:hover{opacity:0.8;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
