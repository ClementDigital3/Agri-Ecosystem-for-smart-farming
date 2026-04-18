import React, { useState } from 'react';

const RegionalAlertBroadcast = ({ activeRegion }) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastLog, setBroadcastLog] = useState([]);
  const [msg, setMsg] = useState(`URGENT: Drought alert for Northern ${activeRegion}. Please conserve water.`);

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setBroadcastLog(prev => [`[${new Date().toLocaleTimeString()}] Handshaking with local cell towers...`, ...prev]);
    
    setTimeout(() => {
      setBroadcastLog(prev => [`[${new Date().toLocaleTimeString()}] Target: ${activeRegion} (14.2k active subscribers)`, ...prev]);
    }, 1000);

    setTimeout(() => {
      setBroadcastLog(prev => [`[${new Date().toLocaleTimeString()}] Broadcast SUCCESS: 98.4% delivery rate.`, ...prev]);
      setIsBroadcasting(false);
    }, 3000);
  };

  return (
    <div className="card glass" style={{ background: '#0f172a', color: 'white', border: 'none' }}>
      <h4 style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: '#ef4444' }}>📡</span> Regional Crisis Broadcast
      </h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <textarea 
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', padding: '0.5rem', fontSize: '0.75rem', outline: 'none' }}
        />
        
        <button 
          onClick={handleBroadcast}
          disabled={isBroadcasting}
          style={{ width: '100%', background: '#ef4444', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', opacity: isBroadcasting ? 0.6 : 1 }}
        >
          {isBroadcasting ? 'BROADCASTING...' : `BROADCAST TO ${activeRegion.toUpperCase()}`}
        </button>

        {broadcastLog.length > 0 && (
          <div style={{ height: '100px', overflowY: 'auto', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px', fontSize: '0.65rem', fontFamily: 'monospace', color: '#4ade80' }}>
            {broadcastLog.map((log, i) => <div key={i} style={{ marginBottom: '0.2rem' }}>{log}</div>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionalAlertBroadcast;
