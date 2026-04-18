import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CropAdvisory from './pages/CropAdvisory';
import MarketPrices from './pages/MarketPrices';
import WeatherCenter from './pages/WeatherCenter';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="asal-shell">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      <div className="asal-main-container">
        <Sidebar />
        <main className="asal-content animate-fade-in">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'advisory' && <CropAdvisory />}
          {currentPage === 'market' && <MarketPrices />}
          {currentPage === 'weather' && <WeatherCenter />}
        </main>
      </div>
      
      {/* Platform Status Footer */}
      <footer style={{ 
        height: '30px', 
        background: '#f1f5f9', 
        borderTop: '1px solid var(--border)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 1.5rem',
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        gap: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#2ecc71' }}>●</span> System Online: Machakos Data Nodes
        </div>
        <div>Last Regional Sync: 12 minutes ago</div>
        <div style={{ marginLeft: 'auto' }}>ASAL Agri-Intelligence Platform v1.2 Enterprise Edition</div>
      </footer>
    </div>
  );
}

export default App;
