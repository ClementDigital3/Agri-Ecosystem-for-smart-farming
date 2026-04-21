import React from 'react';

const Header = ({ currentPage, setPage }) => {
  return (
    <header className="asal-header" style={{ 
      background: 'white', 
      borderBottom: '2px solid rgba(15, 23, 42, 0.08)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      
      {/* Platform Branding */}
      <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => setPage('dashboard')}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>
          Agri-Intelligence <span style={{ color: '#3b82f6' }}>Platform</span>
        </h1>
        <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '800', letterSpacing: '0.1em' }}>FOR ASAL REGIONS</span>
      </div>

      {/* RE-WIRED NAVIGATION BUTTONS */}
      <nav className="asal-nav">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'advisory', label: 'Advisory' },
          { id: 'market', label: 'Markets' },
          { id: 'weather', label: 'Weather AI' },
          { id: 'support', label: 'Support Hub' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              cursor: 'pointer',
              color: currentPage === item.id ? '#3b82f6' : '#64748b',
              padding: '0.5rem 0',
              borderBottom: currentPage === item.id ? '2px solid #3b82f6' : '2px solid transparent',
              transition: 'all 0.3s ease',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Profile / Status */}
      <div className="asal-profile" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
         <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800' }}>John Kamau</div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>County Officer</div>
         </div>
         <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>JK</div>
      </div>

    </header>
  );
};

export default Header;
