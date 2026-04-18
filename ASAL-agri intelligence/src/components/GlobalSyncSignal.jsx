import React from 'react';

const GlobalSyncSignal = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem', 
      padding: '0.4rem 0.8rem', 
      background: 'rgba(59, 130, 246, 0.05)', 
      border: '1px solid rgba(59, 130, 246, 0.2)', 
      borderRadius: '20px',
      fontSize: '0.7rem',
      fontWeight: '700',
      color: 'var(--primary)'
    }}>
      <div style={{ 
        width: '8px', 
        height: '8px', 
        background: '#2ecc71', 
        borderRadius: '50%', 
        boxShadow: '0 0 8px #2ecc71',
        animation: 'pulse 1.5s infinite' 
      }}></div>
      <div style={{ letterSpacing: '0.05em' }}>
        SYNC: <span style={{ opacity: 0.7 }}>ASAL_ORBITAL_LINK_7</span>
      </div>
      <div style={{ borderLeft: '1px solid rgba(59, 130, 246, 0.2)', paddingLeft: '0.75rem', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
        SHAMBAIQ FEED: 142 NODES
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default GlobalSyncSignal;
