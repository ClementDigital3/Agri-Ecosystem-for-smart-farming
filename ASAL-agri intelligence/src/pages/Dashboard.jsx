import React, { useState, useEffect } from 'react';
import RegionalAlertBroadcast from '../components/RegionalAlertBroadcast';
import RegionalNodeRegistry from '../components/RegionalNodeRegistry';
import BiosecurityForesight from '../components/BiosecurityForesight';

const Dashboard = () => {
  const [activeRegion, setActiveRegion] = useState('Machakos');
  const [activeLayer, setActiveLayer] = useState('ndvi'); // ndvi, moisture, livestock
  const [isLoading, setIsLoading] = useState(false);

  // Mock regional data
  const regionalData = {
    'Machakos': { moisture: 19, temp: 33, ndvi: 0.25, risk: 'High', crops: ['Sorghum', 'Cowpeas'] },
    'Turkana': { moisture: 8, temp: 38, ndvi: 0.12, risk: 'Emergency', crops: ['Pearl Millet', 'Mung Beans'] },
    'Isiolo': { moisture: 14, temp: 35, ndvi: 0.18, risk: 'Critical', crops: ['Pigeon Peas', 'Chickpeas'] }
  };

  const handleRegionChange = (region) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveRegion(region);
      setIsLoading(false);
    }, 800);
  };

  const currentData = regionalData[activeRegion];

  return (
    <div className="asal-dashboard-page" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
      <div className="asal-dashboard-main" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Regional Command Bar */}
        <div className="command-bar card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--primary)', color: 'white', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '800', opacity: 0.8, textTransform: 'uppercase' }}>Target Region:</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {Object.keys(regionalData).map(region => (
                <button 
                  key={region}
                  onClick={() => handleRegionChange(region)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    border: 'none',
                    background: activeRegion === region ? 'white' : 'rgba(255,255,255,0.15)',
                    color: activeRegion === region ? 'var(--primary)' : 'white',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: '600', opacity: 0.9 }}>
            {isLoading ? 'Synchronizing Data...' : `Live Data Feed: ${activeRegion} Station`}
          </div>
        </div>

        {/* Region Overview Section */}
        <section className="region-overview card" style={{ padding: '0', overflow: 'hidden', transition: 'all 0.5s ease', opacity: isLoading ? 0.6 : 1 }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem' }}>County Intelligence Map — {activeRegion}</h3>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', borderRadius: '8px', gap: '0.25rem' }}>
              <button onClick={() => setActiveLayer('ndvi')} style={{ padding: '0.3rem 0.6rem', border: 'none', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', background: activeLayer === 'ndvi' ? 'white' : 'transparent', boxShadow: activeLayer === 'ndvi' ? 'var(--shadow-sm)' : 'none' }}>NDVI</button>
              <button onClick={() => setActiveLayer('moisture')} style={{ padding: '0.3rem 0.6rem', border: 'none', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', background: activeLayer === 'moisture' ? 'white' : 'transparent', boxShadow: activeLayer === 'moisture' ? 'var(--shadow-sm)' : 'none' }}>Water</button>
              <button onClick={() => setActiveLayer('livestock')} style={{ padding: '0.3rem 0.6rem', border: 'none', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', background: activeLayer === 'livestock' ? 'white' : 'transparent', boxShadow: activeLayer === 'livestock' ? 'var(--shadow-sm)' : 'none' }}>Livestock</button>
            </div>
          </div>
          <div style={{ position: 'relative', height: '360px', background: '#f8fafc', overflow: 'hidden' }}>
            <img 
              src="/asal_region_map_gis_1776535705625.png" 
              alt="Regional GIS Map" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: activeLayer === 'moisture' ? 'hue-rotate(200deg)' : activeLayer === 'livestock' ? 'grayscale(0.5) contrast(1.2)' : 'none'
              }}
            />
            {/* Map HUD Overlay */}
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '0.75rem', borderRadius: '10px', backdropFilter: 'blur(8px)', fontSize: '0.75rem', pointerEvents: 'none' }}>
              <div style={{ textTransform: 'uppercase', fontSize: '0.65rem', marginBottom: '0.5rem', opacity: 0.7, fontWeight: '800' }}>GIS Indicators</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                  <span>Active Satellites</span>
                  <span style={{ color: '#4ade80' }}>8 Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ground Sensors</span>
                  <span style={{ color: '#4ade80' }}>142 Online</span>
                </div>
              </div>
            </div>

            {/* Legend Overlay */}
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'white', padding: '0.75rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)', display: 'flex', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span>🌡️</span> <span style={{ fontWeight: '600' }}>Temp: {currentData.temp}°C</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#2ecc71' }}>⬢</span> <span style={{ fontWeight: '600' }}>NDVI: {currentData.ndvi}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--danger)', fontWeight: '800' }}>⚠ {currentData.risk} Risk</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Biosecurity Foresight Engine */}
        <BiosecurityForesight />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Economic Outlook Intelligence */}
          <section className="economic-outlook card">
            <h3 className="card-title">Economic Regional Outlook 📈</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Market Stability</span>
                  <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: '700' }}>Steady</span>
               </div>
               <div style={{ height: '80px', background: 'var(--primary-soft)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--primary)', padding: '1rem', textAlign: 'center' }}>
                  "Regional arbitrage gap widening. High demand for Sorghum projected in {activeRegion} for Q3."
               </div>
            </div>
          </section>

          {/* ShambaIQ Interaction Bridge */}
          <RegionalNodeRegistry activeRegion={activeRegion} />
        </div>
      </div>

      <div className="asal-dashboard-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
         {/* Dynamic Moisture Stat */}
         <section className="moisture-intelligence card" style={{ background: currentData.moisture < 15 ? '#fff1f2' : 'white' }}>
            <h3 className="card-title">Moisture Intelligence</h3>
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
               <div style={{ fontSize: '3rem', fontWeight: '900', color: currentData.moisture < 15 ? 'var(--danger)' : 'var(--primary)' }}>{currentData.moisture}%</div>
               <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>County Average</div>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ width: `${currentData.moisture}%`, height: '100%', background: currentData.moisture < 15 ? 'var(--danger)' : 'var(--primary)', transition: 'width 1s ease' }}></div>
            </div>
         </section>

         {/* Planting Timeline */}
         <section className="planting-timeline card">
            <h3 className="card-title">Planting Timeline</h3>
            <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem' }}>
               <div style={{ flex: 1, height: '40%', background: 'var(--primary-soft)', borderRadius: '4px' }}></div>
               <div style={{ flex: 1, height: '90%', background: 'var(--primary)', borderRadius: '4px' }}></div>
               <div style={{ flex: 1, height: '60%', background: 'var(--accent)', borderRadius: '4px' }}></div>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Optimal window based on current forecast.</p>
         </section>

         {/* Regional Alert Broadcast Integration */}
         <RegionalAlertBroadcast activeRegion={activeRegion} />
      </div>
    </div>
  );
};

export default Dashboard;
