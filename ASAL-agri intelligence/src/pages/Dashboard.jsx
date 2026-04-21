import React, { useState } from 'react';
import BiosecurityForesight from '../components/BiosecurityForesight';
import RegionalNodeRegistry from '../components/RegionalNodeRegistry';
import RegionalAlertBroadcast from '../components/RegionalAlertBroadcast';

const Dashboard = () => {
  const [activeRegion, setActiveRegion] = useState('Machakos');
  const [gisView, setGisView] = useState('NDVI');

  const regionalData = {
    'Machakos': { moisture: 19, temp: 33, ndvi: 0.25, risk: 'High', nodes: 428, status: 'STABLE_ORANGE' },
    'Turkana': { moisture: 8, temp: 38, ndvi: 0.12, risk: 'Emergency', nodes: 890, status: 'CRITICAL_NODE' },
    'Isiolo': { moisture: 14, temp: 35, ndvi: 0.18, risk: 'Critical', nodes: 610, status: 'LATENCY_RISK' }
  };

  const currentData = regionalData[activeRegion];

  return (
    <div className="dashboard-root" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* MACRO-REGIONAL HUD // RESTORED DATA INTEGRITY */}
      <div className="macro-hud" style={{ gap: '1.5rem' }}>
        {[
          { label: 'REGIONAL_STATUS', value: currentData.status, color: '#10b981' },
          { label: 'ORBITAL_PLANE', value: 'GEO_SYNC_01', color: '#3b82f6' },
          { label: 'ACTIVE_NODES', value: currentData.nodes, color: '#f59e0b' },
          { label: 'DATA_LATENCY', value: '0.42ms', color: '#3b82f6' }
        ].map(stat => (
          <div key={stat.label} style={{ background: 'white', padding: '1.5rem', border: '1px solid rgba(15, 23, 42, 0.08)', borderLeft: `4px solid ${stat.color}`, borderRadius: '4px' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '800', fontFamily: 'Space Mono', letterSpacing: '0.1em' }}>{stat.label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', marginTop: '0.5rem', color: '#0f172a' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-layout" style={{ gap: '2.5rem', alignItems: 'start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* SECTOR AUDIT SELECTOR */}
          <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '4px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#10b981', fontFamily: 'Space Mono' }}>// SELECT_STRATEGIC_SECTOR</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {Object.keys(regionalData).map(r => (
                      <button 
                        key={r} 
                        onClick={() => setActiveRegion(r)}
                        style={{ 
                          padding: '0.5rem 1.25rem', background: activeRegion === r ? '#10b981' : 'white', 
                          color: activeRegion === r ? 'white' : '#64748b', border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem'
                        }}
                      >
                        {r.toUpperCase()}
                      </button>
                    ))}
                </div>
             </div>
             <div style={{ fontSize: '0.65rem', fontFamily: 'Space Mono', color: '#10b981', fontWeight: '800' }}>REAL_TIME_FEED: ACTIVE</div>
          </div>

          {/* MASTER GIS SATELLITE HUB // MULTISPECTRAL MODE */}
          <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
             <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.9rem', margin: 0, fontWeight: '800' }}>GIS_SATELLITE_VIEWPORT // {activeRegion.toUpperCase()}</h3>
                <div style={{ display: 'flex', background: '#f8fafc', padding: '0.25rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    {['NDVI', 'THERMAL', 'WATER'].map(v => (
                      <button 
                        key={v} 
                        onClick={() => setGisView(v)}
                        style={{ padding: '0.4rem 1rem', border: 'none', background: gisView === v ? '#3b82f6' : 'transparent', color: gisView === v ? 'white' : '#64748b', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900', cursor: 'pointer' }}
                      >
                        {v}
                      </button>
                    ))}
                </div>
             </div>
             <div style={{ height: '450px', background: '#e2e8f0', position: 'relative' }}>
                <img 
                  src="/asal_region_map_gis_1776535705625.png" 
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: gisView === 'THERMAL' ? 'hue-rotate(240deg) saturate(1.5)' : gisView === 'WATER' ? 'hue-rotate(180deg) saturate(1.2)' : 'none'
                  }} 
                />
                
                {/* HUD OVERLAY LAYERS */}
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.9)', padding: '1.5rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px', backdropFilter: 'blur(10px)' }}>
                   <div style={{ fontSize: '0.6rem', color: '#3b82f6', fontWeight: '900', fontFamily: 'Space Mono', marginBottom: '0.75rem' }}>// GIS_METRIC_GAUGE</div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                         <span style={{ color: '#64748b' }}>RESOLUTION</span>
                         <span style={{ fontWeight: '800', color: '#0f172a' }}>15CM/PX</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <span style={{ color: '#64748b' }}>SAT_FIX</span>
                         <span style={{ fontWeight: '800', color: '#10b981' }}>08_ALIGNED</span>
                      </div>
                   </div>
                </div>

                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                   <div className="card" style={{ padding: '0.75rem 1.5rem', background: 'white' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', marginBottom: '0.2rem', fontWeight: '800' }}>TEMP_CORE</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900' }}>{currentData.temp}°C</div>
                   </div>
                   <div className="card" style={{ padding: '0.75rem 1.5rem', background: 'white' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', marginBottom: '0.2rem', fontWeight: '800' }}>NDVI_HEALTH</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#10b981' }}>{currentData.ndvi}_OK</div>
                   </div>
                </div>
             </div>
          </section>

          {/* BIOSECURITY FORESIGHT // SENSORY CLUSTER */}
          <BiosecurityForesight />

          {/* REGIONAL NODE REGISTRY // FARM INDIVIDUALS */}
          <RegionalNodeRegistry activeRegion={activeRegion} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
           
           {/* HYDRATION INTELLIGENCE */}
           <section className="card" style={{ padding: '1.5rem', borderLeft: `6px solid ${currentData.moisture < 15 ? '#ef4444' : '#10b981'}` }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', fontFamily: 'Space Mono' }}>// HYDRATION_INDEX</h3>
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                 <div style={{ fontSize: '4.5rem', fontWeight: '900', color: currentData.moisture < 15 ? '#ef4444' : '#0f172a' }}>{currentData.moisture}%</div>
                 <div style={{ fontSize: '0.65rem', fontFamily: 'Space Mono', color: '#64748b', letterSpacing: '0.2em', fontWeight: '800' }}>SECTOR_MOISTURE_AVG</div>
              </div>
              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                 <div style={{ width: `${currentData.moisture}%`, height: '100%', background: currentData.moisture < 15 ? '#ef4444' : '#10b981', transition: 'width 1s ease' }}></div>
              </div>
           </section>

           <RegionalAlertBroadcast activeRegion={activeRegion} />
           
           {/* MACRO-ECONOMIC TRADE CORRIDOR */}
           <div className="card" style={{ background: '#ecfdf5', border: '1px solid #10b981' }}>
              <h4 style={{ fontSize: '0.7rem', color: '#10b981', marginBottom: '1.25rem', fontFamily: 'Space Mono', fontWeight: '900' }}>// TRADE_ARBITRAGE_ALERTS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div style={{ background: 'white', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '4px', fontStyle: 'italic', fontSize: '0.8rem', color: '#0f172a', lineHeight: '1.5' }}>
                   "Arbitrage channel detected for {activeRegion.toUpperCase()}. High demand for drought-resistant legumes in neighboring trade nodes. Net parity: +4.2%."
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#10b981', fontWeight: '800', fontFamily: 'Space Mono' }}>
                    <span>CROP_PARITY: STABLE</span>
                    <span>LOGISTICS: OPEN</span>
                 </div>
              </div>
           </div>

           {/* PLATFORM LOGS TICKET */}
           <div className="card" style={{ background: 'white' }}>
              <h4 style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '1.25rem', fontFamily: 'Space Mono', fontWeight: '800' }}>// DATA_SYNC_LOGS</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.75rem', color: '#0f172a' }}>
                 <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Satellite Link</span>
                    <span style={{ fontWeight: '800', color: '#10b981' }}>OK_CONNECTED</span>
                 </li>
                 <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Drone Telemetry</span>
                    <span style={{ fontWeight: '800', color: '#10b981' }}>ACTIVE</span>
                 </li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
