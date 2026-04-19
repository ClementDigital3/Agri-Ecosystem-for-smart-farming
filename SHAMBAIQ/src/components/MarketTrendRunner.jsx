import React from 'react';

const MarketTrendRunner = () => {
  const trends = [
    { crop: 'Maize (White)', price: '3,450', change: '+5.2%', up: true },
    { crop: 'Sorghum', price: '2,100', change: '-1.4%', up: false },
    { crop: 'Cowpeas', price: '4,800', change: '+8.1%', up: true },
    { crop: 'Millet', price: '3,900', change: '0.0%', up: null },
    { crop: 'Dry Beans', price: '9,200', change: '+2.4%', up: true },
  ];

  return (
    <div className="market-runner-container" style={{ 
      position: 'fixed',
      top: 'calc(4.8rem + env(safe-area-inset-top))', // Aligned below the ShambaIQ fixed header
      left: 0,
      right: 0,
      background: 'rgba(15, 26, 18, 0.95)', 
      backdropFilter: 'blur(10px)',
      height: '40px', 
      display: 'flex', 
      alignItems: 'center', 
      overflow: 'hidden',
      borderBottom: '1px solid rgba(10, 211, 57, 0.2)',
      zIndex: 1000, // Elevated above all other UI elements
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <div className="runner-label" style={{ 
        background: '#0ad339', 
        height: '100%', 
        padding: '0 1.25rem', 
        display: 'flex', 
        alignItems: 'center', 
        fontSize: '0.65rem', 
        fontWeight: '900', 
        color: '#0c160f',
        zIndex: 1010,
        boxShadow: '8px 0 15px rgba(0,0,0,0.4)',
        letterSpacing: '0.05em'
      }}>
        LIVE_PRICE_TICKER
      </div>

      <div className="ticker-track" style={{ 
        display: 'flex', 
        gap: '4rem', 
        padding: '0 2rem',
        animation: 'scrollTicker 25s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        {[...trends, ...trends, ...trends].map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0b2a5' }}>{item.crop}:</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'white' }}>{item.price}</span>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: '800', 
              color: item.up === true ? '#0ad339' : item.up === false ? '#f87171' : '#a0b2a5' 
            }}>
              {item.up === true ? '▲' : item.up === false ? '▼' : '●'} {item.change}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scrollTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

export default MarketTrendRunner;
