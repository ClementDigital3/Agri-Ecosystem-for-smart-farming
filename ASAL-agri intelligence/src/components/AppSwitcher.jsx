import React, { useState } from 'react';

const AppSwitcher = ({ currentApp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const apps = [
    { 
      id: 'gateway', 
      name: 'Agri-Gateway', 
      role: 'Master Entrance', 
      icon: '🔐', 
      url: import.meta.env.VITE_GATEWAY_URL || 'http://localhost:5000',
      active: false
    },
    { 
      id: 'asal', 
      name: 'ASAL Platform', 
      role: 'Strategic Intelligence', 
      icon: '🏛️', 
      url: import.meta.env.VITE_ASAL_URL || 'http://localhost:5174',
      active: currentApp === 'asal'
    },
    { 
      id: 'shambaiq', 
      name: 'ShambaIQ', 
      role: 'Tactical Farm Monitoring', 
      icon: '🚜', 
      url: import.meta.env.VITE_SHAMBAIQ_URL || 'http://localhost:5173',
      active: currentApp === 'shambaiq'
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: 'none', 
          border: 'none', 
          fontSize: '1.4rem', 
          cursor: 'pointer', 
          padding: '0.5rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          backgroundColor: isOpen ? '#f1f5f9' : 'transparent'
        }}
      >
        ⠿
      </button>

      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          top: '120%', 
          right: 0, 
          width: '320px', 
          background: 'white', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
          borderRadius: '16px', 
          padding: '1.25rem',
          zIndex: 1000,
          border: '1px solid #f1f5f9'
        }}>
          <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Agri-Ecosystem Suite</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {apps.map(app => (
              <a 
                key={app.id}
                href={app.url} 
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  background: app.active ? '#f1f5f9' : 'transparent',
                  border: app.active ? '1px solid #e2e8f0' : '1px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '1.5rem' }}>{app.icon}</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>{app.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{app.role}</div>
                </div>
                {app.active && <div style={{ marginLeft: 'auto', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }}></div>}
              </a>
            ))}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <button style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: '#64748b', fontWeight: '700', cursor: 'pointer' }}>Manage Permissions</button>
             <a href={import.meta.env.VITE_GATEWAY_URL || 'http://localhost:5000'} style={{ textDecoration: 'none', background: '#fee2e2', border: '1px solid #fecaca', fontSize: '0.75rem', color: '#dc2626', fontWeight: '800', cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                 SIGN OUT
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSwitcher;
