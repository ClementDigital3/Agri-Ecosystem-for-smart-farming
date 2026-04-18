import React, { useState, useEffect } from 'react';

function App() {
  const [coords, setCoords] = useState({ lat: -1.2921, lng: 36.8219 });
  const [load, setLoad] = useState(14.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001
      }));
      setLoad(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5))));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const enterApp = (url) => {
    window.location.href = url;
  };

  return (
    <div className="precision-portal">
      <div className="portal-darken"></div>
      <div className="clinical-grid"></div>
      
      {/* HUD Header */}
      <header className="eng-header">
        <div className="eng-title-group">
          <div className="eng-meta">SYSTEM_ROOT // ECO_V_4.2</div>
          <h1 className="eng-title">AGRI-ECOSYSTEM MASTER COMMAND</h1>
          <div style={{ color: '#60a5fa', fontSize: '0.65rem', marginTop: '0.25rem' }}>
            REGIONAL ASAL COORDINATION HUB <span className="cursor-blink"></span>
          </div>
        </div>

        <div className="eng-status-block">
          <div className="eng-status-item">
            <span className="label">Encryption</span>
            <span className="value" style={{ color: '#34d399' }}>AES-256_ACTIVE</span>
          </div>
          <div className="eng-status-item">
            <span className="label">Sync_Delay</span>
            <span className="value">{(Math.random() * 40).toFixed(2)}ms</span>
          </div>
          <div className="eng-status-item">
            <span className="label">LAT_COORDS</span>
            <span className="value">{coords.lat.toFixed(6)}</span>
          </div>
          <div className="eng-status-item">
            <span className="label">LNG_COORDS</span>
            <span className="value">{coords.lng.toFixed(6)}</span>
          </div>
        </div>
      </header>

      {/* Main Clinical Cards */}
      <div className="eng-card-container">
        
        {/* Node 01: ShambaIQ */}
        <div className="eng-card" onClick={() => enterApp('http://localhost:5173')}>
          <div className="eng-card-corner" style={{ top: -2, left: -2, borderBottom: 'none', borderRight: 'none' }}></div>
          <div className="eng-card-id">NODE_01 // TACTICAL_INTERFACE</div>
          <h2 className="card-title">SHAMBAIQ</h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Synchronized field telemetry, drone flight-pathing, and localized commodity ledger management.
          </p>
          
          <div className="card-spec-grid">
            <div className="spec-item">
              <span className="spec-label">ACTIVE_SENSORS</span>
              <span className="spec-value">1,248 Units</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">UAV_TRAFFIC</span>
              <span className="spec-value">82 Flights/hr</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">DATA_THROUGHPUT</span>
              <span className="spec-value">4.2 GB/s</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">LOCAL_NODES</span>
              <span className="spec-value">64 Clusters</span>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.6rem', color: '#60a5fa' }}>SYSTEM_NOMINAL</span>
            <div style={{ padding: '0.6rem 2rem', background: '#60a5fa', color: '#030712', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>ACCESS_NODE</div>
          </div>
        </div>

        {/* Node 02: ASAL Hub */}
        <div className="eng-card" style={{ borderColor: 'rgba(244, 114, 182, 0.3)' }} onClick={() => enterApp('http://localhost:5174')}>
          <div className="eng-card-corner" style={{ top: -2, right: -2, borderBottom: 'none', borderLeft: 'none', borderColor: '#f472b6' }}></div>
          <div className="eng-card-id" style={{ color: '#f472b6' }}>NODE_02 // STRATEGIC_INTEL</div>
          <h2 className="card-title">ASAL PLATFORM</h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Macro-scale analytical modeling, biosecurity foresight simulation, and county-wide crisis coordination.
          </p>
          
          <div className="card-spec-grid">
            <div className="spec-item">
              <span className="spec-label">GIS_SAMPLING</span>
              <span className="spec-value" style={{ color: '#f472b6' }}>30m Res</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">AI_CONFIDENCE</span>
              <span className="spec-value" style={{ color: '#f472b6' }}>94.8% Prob</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">REGIONAL_SYNC</span>
              <span className="spec-value" style={{ color: '#f472b6' }}>4 Counties</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">ALERT_LATENCY</span>
              <span className="spec-value" style={{ color: '#f472b6' }}>0.04 Sec</span>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.6rem', color: '#f472b6' }}>NETWORK_SECURED</span>
            <div style={{ padding: '0.6rem 2rem', background: '#f472b6', color: '#030712', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>ENTER_COMMAND</div>
          </div>
        </div>

      </div>

      {/* Clinical Footer Logs */}
      <footer className="eng-footer">
        <div className="log-stream">
          <span style={{ opacity: 0.5 }}>TERMINAL_LOG:</span>
          <span>{`[OK] HANDSHAKE: ASAL_PRIMARY_01`}</span>
          <span>{`[RECV] DATA_PACKET_7741`}</span>
          <span>{`[WARN] TEMP_ANOMALY: MACHAKOS_SECTOR_A`}</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>MEM_USAGE: {(load / 4).toFixed(1)}%</div>
          <div>CPU_ALLOC: {load.toFixed(1)}%</div>
          <div style={{ color: '#34d399' }}>STABLE_V.4.2</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
