import React from 'react';
import GlobalSyncSignal from './GlobalSyncSignal';
import AppSwitcher from './AppSwitcher';

const Header = ({ currentPage, setPage }) => {
  return (
    <header className="asal-header" style={{
      height: 'var(--header-height)',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div className="asal-header__brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }} onClick={() => setPage('dashboard')}>
          A
        </div>
        <div>
           <h1 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '700', lineHeight: 1.1 }}>
            Agri-Intelligence Platform
          </h1>
          <div style={{ fontWeight: '400', color: 'var(--text-muted)', fontSize: '0.8rem' }}>for ASAL Regions</div>
        </div>
      </div>

      <nav className="asal-header__nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button 
          onClick={() => setPage('dashboard')}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === 'dashboard' ? 'var(--primary)' : 'var(--text-muted)', 
            fontWeight: currentPage === 'dashboard' ? '700' : '500', 
            cursor: 'pointer',
            fontSize: '0.95rem' 
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setPage('advisory')}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === 'advisory' ? 'var(--primary)' : 'var(--text-muted)', 
            fontWeight: currentPage === 'advisory' ? '700' : '500', 
            cursor: 'pointer',
            fontSize: '0.95rem' 
          }}
        >
          Advisory
        </button>
        <button 
           onClick={() => setPage('market')}
           style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === 'market' ? 'var(--primary)' : 'var(--text-muted)', 
            fontWeight: currentPage === 'market' ? '700' : '500', 
            cursor: 'pointer',
            fontSize: '0.95rem' 
          }}
        >
          Markets
        </button>
        <button 
           onClick={() => setPage('weather')}
           style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === 'weather' ? 'var(--primary)' : 'var(--text-muted)', 
            fontWeight: currentPage === 'weather' ? '700' : '500', 
            cursor: 'pointer',
            fontSize: '0.95rem' 
          }}
        >
          Weather AI
        </button>
        
        {/* Global Sync Hub */}
        <div style={{ marginLeft: '1rem' }}>
           <GlobalSyncSignal />
        </div>
      </nav>

      <div className="asal-header__user" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '30px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>John Kamau</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>County Officer</div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
        </div>
        
        {/* The Ecosystem Switcher */}
        <AppSwitcher currentApp="asal" />
      </div>
    </header>
  );
};

export default Header;
