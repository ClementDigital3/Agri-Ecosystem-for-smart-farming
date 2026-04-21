import React, { useState, useEffect } from 'react';

const SupportCommand = () => {
  const [activeCall, setActiveCall] = useState(null);
  const [waveHeight, setWaveHeight] = useState([10, 20, 15, 30, 10]);

  // Simulate Voice Waveform
  useEffect(() => {
    if (activeCall) {
      const timer = setInterval(() => {
        setWaveHeight(prev => prev.map(() => Math.floor(Math.random() * 40) + 10));
      }, 150);
      return () => clearInterval(timer);
    }
  }, [activeCall]);

  const atRiskFarmers = [
    { id: 'FP-401', name: 'Kyalo Musyoka', location: 'Machakos Sector 4', risk: 'Water Stress', status: 'WAITING' },
    { id: 'FP-912', name: 'Ekal Ekal', location: 'Turkana North', risk: 'Pest Vector', status: 'URGENT' },
    { id: 'FP-002', name: 'Linet Linet', location: 'Isiolo Central', risk: 'Heat Anomaly', status: 'WAITING' }
  ];

  const triggerCall = (farmer) => {
    setActiveCall(farmer);
  };

  return (
    <div className="support-command-page grid-main-sidebar" style={{ gap: '2rem', '--desktop-cols': 'minmax(0, 1fr) 400px' }}>
      
      <div className="command-main">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Support Command Center 🎧</h2>
        
        {/* Active Call Window */}
        <div className="active-call-window card" style={{ 
          height: '400px', 
          background: activeCall ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : '#f8fafc',
          color: activeCall ? 'white' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.5s ease',
          position: 'relative'
        }}>
          {!activeCall ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', opacity: 0.1 }}>📞</div>
              <p style={{ fontWeight: '700' }}>No Active Call Session</p>
              <p style={{ fontSize: '0.8rem' }}>Select a farmer from the watch-list to initiate contact.</p>
            </div>
          ) : (
            <>
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '0.7rem', color: '#34d399', fontWeight: '800' }}>LIVE_VOICE_LINK_ENCRYPTED</div>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#3b82f6', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', border: '5px solid rgba(59, 130, 246, 0.2)' }}>👨‍🌾</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '900' }}>{activeCall.name}</h3>
              <p style={{ color: '#94a3b8' }}>{activeCall.location} | ID: {activeCall.id}</p>
              
              {/* Voice Waveform Simulation */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', height: '60px', marginTop: '2rem' }}>
                {waveHeight.map((h, i) => (
                  <div key={i} style={{ width: '4px', height: `${h}px`, background: '#3b82f6', borderRadius: '2px', transition: 'height 0.15s ease' }}></div>
                ))}
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setActiveCall(null)}
                  style={{ background: '#f87171', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', fontWeight: '800', cursor: 'pointer' }}
                >
                  End Session
                </button>
                <button style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: '800', cursor: 'pointer' }}>
                  Deploy Agent
                </button>
              </div>
            </>
          )}
        </div>

        {/* Intelligence Context for the Call */}
        <div className="grid-2-cols" style={{ gap: '1.5rem', marginTop: '2rem' }}>
           <div className="card" style={{ padding: '1.25rem' }}>
             <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Farmer History</h4>
             <ul style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                <li>✅ Last Harvest: Maize (A+ Grade)</li>
                <li>⚠️ Irrigation Status: System Malfunction Rep.</li>
                <li>📍 Field Coordinates: 1.29S, 36.81E</li>
             </ul>
           </div>
           <div className="card" style={{ padding: '1.25rem' }}>
             <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>AI Advice during Call</h4>
             <p style={{ fontSize: '0.75rem', fontStyle: 'italic', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
               "Suggest immediate shade-net deployment. Soil moisture levels indicate root-zone stress in Sector B."
             </p>
           </div>
        </div>
      </div>

      <div className="command-sidebar">
         <h3 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>REGIONAL WATCH-LIST</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {atRiskFarmers.map(farmer => (
              <div key={farmer.id} className="card" style={{ padding: '1rem', borderLeft: `4px solid ${farmer.status === 'URGENT' ? '#f87171' : '#f59e0b'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>{farmer.name}</div>
                   <div style={{ fontSize: '0.65rem', fontWeight: '900', color: farmer.status === 'URGENT' ? '#f87171' : '#f59e0b' }}>{farmer.status}</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Risk: {farmer.risk}</div>
                <button 
                   onClick={() => triggerCall(farmer)}
                   disabled={activeCall?.id === farmer.id}
                   style={{ 
                    width: '100%', 
                    marginTop: '0.75rem', 
                    padding: '0.5rem', 
                    background: activeCall?.id === farmer.id ? '#e2e8f0' : 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    cursor: 'pointer' 
                  }}
                >
                  {activeCall?.id === farmer.id ? 'Establishing Line...' : 'Initiate Call'}
                </button>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SupportCommand;
