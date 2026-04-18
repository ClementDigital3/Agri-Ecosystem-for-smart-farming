import React from 'react';

const WeatherCenter = () => {
  return (
    <div className="weather-ai-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Weather AI Command</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>High-fidelity satellite monitoring and macro-climate predictive modeling.</p>
        </div>
        <div style={{ background: 'var(--secondary-soft)', color: 'var(--secondary)', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: '800', fontSize: '0.8rem' }}>
          SAT-LINK: ACTIVE
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Satellite Cloud Cover Visualization */}
          <section className="card" style={{ padding: '0', overflow: 'hidden', background: '#0f172a' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              <h3 style={{ fontSize: '1rem' }}>Satellite Cloud Cover Scan (Live)</h3>
            </div>
            <div style={{ position: 'relative', height: '380px', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {/* Simulated Satellite Scan Lines */}
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(96, 165, 250, 0.05) 1px, transparent 2px)', pointerEvents: 'none' }}></div>
              <div style={{ 
                position: 'absolute', 
                top: 0, left: 0, width: '100%', height: '40px', 
                background: 'linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.2), transparent)',
                animation: 'scanDown 4s linear infinite'
              }}></div>
              
              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px #3b82f6)' }}>☁️</div>
                <div style={{ color: '#3b82f6', fontWeight: '900', letterSpacing: '0.2em', marginTop: '1rem' }}>SATELLITE SYNCING...</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>METEOSAT-9 / ASAL STATION 04</div>
              </div>
              
              <style>{`
                @keyframes scanDown {
                  from { transform: translateY(-100%); }
                  to { transform: translateY(800%); }
                }
              `}</style>
            </div>
          </section>

          {/* Regional Precipitation Table */}
          <section className="card">
            <h3 className="card-title">Precipitation Log (Last 7 Days)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
               <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Machakos</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>12.4 mm</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--secondary)' }}>Below Average</div>
               </div>
               <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Turkana</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>1.2 mm</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--danger)' }}>Crisis Zone</div>
               </div>
               <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Isiolo</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>4.8 mm</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>Stable</div>
               </div>
            </div>
          </section>
        </div>

        {/* Severe Weather Watch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card" style={{ borderLeft: '5px solid #ef4444' }}>
            <h3 className="card-title">Severe Weather Watch ⛈️</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ color: '#ef4444', fontWeight: '800', fontSize: '0.85rem' }}>DUST STORM WARNING</div>
                  <p style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '0.25rem' }}>High winds detected in Turkana North. Expected arrival: 14:00 EAT. Alert local livestock clusters.</p>
               </div>
               <div style={{ background: '#fefce8', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ color: '#854d0e', fontWeight: '800', fontSize: '0.85rem' }}>HEATWAVE ALERT</div>
                  <p style={{ fontSize: '0.75rem', color: '#713f12', marginTop: '0.25rem' }}>Expected temperatures of 39°C+ for Machakos/Makueni area. Risk of crop desiccation.</p>
               </div>
            </div>
          </section>

          <section className="card">
             <h3 className="card-title">SST Anomaly Index</h3>
             <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-soft)', borderRadius: '15px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ textAlign: 'center' }}>
                   <div style={{ fontSize: '1.8rem', fontWeight: '900' }}>+1.2°C</div>
                   <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>El Niño Condition</div>
                </div>
                {/* Decorative Wave */}
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50% 50% 0 0' }}></div>
             </div>
             <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>Indian Ocean Dipole (IOD) showing negative trend. Increased dry season severity expected.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WeatherCenter;
