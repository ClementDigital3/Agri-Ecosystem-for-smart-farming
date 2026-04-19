import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CropAdvisory from './pages/CropAdvisory';
import MarketPrices from './pages/MarketPrices';
import WeatherCenter from './pages/WeatherCenter';
import SupportCommand from './pages/SupportCommand';
import './App.css';

function App() {
  // MASTER NAVIGATION STATE - HARDWIRED FOR 100% RELIABILITY
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'advisory': return <CropAdvisory />;
      case 'market': return <MarketPrices />;
      case 'weather': return <WeatherCenter />;
      case 'support': return <SupportCommand />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="asal-shell" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: '#f8fafc',
      fontFamily: "'Outfit', sans-serif"
    }}>
      
      {/* GLOBAL COMMAND HEADER */}
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      
      <div className="asal-main-container" style={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden',
        position: 'relative'
      }}>
        
        {/* TACTICAL SIDEBAR */}
        <Sidebar />
        
        {/* RE-WIRED INTELLIGENCE COMMAND */}
        <main className="asal-content" style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '2.5rem',
          background: '#f1f5f9' 
        }}>
          <div className="content-inner animate-fade-in" key={currentPage}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* PLATFORM INFRASTRUCTURE STATUS */}
      <footer style={{ 
        height: '40px', 
        background: 'white', 
        borderTop: '2px solid rgba(15, 23, 42, 0.08)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 2.5rem',
        fontSize: '0.75rem',
        color: '#64748b',
        fontFamily: "'Space Mono', monospace"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ color: '#10b981' }}>●</span> SYSTEM_NOMINAL // PRISTINE_REWIRE_COMPLETE
        </div>
        <div style={{ marginLeft: 'auto', fontWeight: '800' }}>ASAL STRATEGIC COMMAND HUB v.3.0 🛰️</div>
      </footer>
    </div>
  );
}

export default App;
