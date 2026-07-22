import { useState, useEffect } from 'react'

const RADAR_LOGS = [
  "Scanning Uasin Gishu Quad-A (Moiben) for spore concentrations...",
  "MATCH: Stem Rust (Wheat) spores detected in Moiben sector (2.4km NE).",
  "Scanning Uasin Gishu Quad-B (Soy) for crop necrosis triggers...",
  "ALERT: Maize Blight hotspot identified in Soy block (4.1km NW).",
  "Tracking wind drift vectors... NE pattern at 12 km/h active.",
  "SCAN OK: No high-density insect swarms within 50km radius.",
  "Micro-climate warning: 78% relative humidity matches fungal propagation threshold."
]

const THREAT_BLIPS = [
  { id: 1, top: '28%', left: '42%', name: 'Wheat Stem Rust', location: 'Moiben Sector', distance: '2.4km NE', severity: 'Critical', color: '#ef4444' },
  { id: 2, top: '62%', left: '68%', name: 'Maize Leaf Blight', location: 'Soy Block', distance: '4.1km NW', severity: 'Warning', color: '#f97316' },
  { id: 3, top: '22%', left: '78%', name: 'Fall Armyworm', location: 'Kesses Zone', distance: '7.8km SE', severity: 'Low Risk', color: '#eab308' }
]

function LiveThreatRadar() {
  const [logIndex, setLogIndex] = useState(0)
  const [hoveredBlip, setHoveredBlip] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % RADAR_LOGS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="threat-radar-card glass-panel" style={{ position: 'relative' }}>
      <div className="threat-radar__header">
        <h4 style={{ margin: 0 }}>Regional Biosecurity Radar</h4>
        <span className="live-badge"><span className="pulse-dot"></span> LIVE SCAN</span>
      </div>
      
      <div className="threat-radar__display" style={{ position: 'relative', overflow: 'visible' }}>
        <div className="radar-circle" style={{ position: 'relative', overflow: 'visible' }}>
          <div className="radar-beam"></div>
          
          {/* Target blips representing localized pathogen outbreaks */}
          {THREAT_BLIPS.map((blip) => (
            <div 
              key={blip.id}
              className="radar-blip-wrapper"
              style={{
                position: 'absolute',
                top: blip.top,
                left: blip.left,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredBlip(blip.id)}
              onMouseLeave={() => setHoveredBlip(null)}
            >
              {/* Pulsing core dot */}
              <div 
                className="radar-blip" 
                style={{
                  position: 'static',
                  background: blip.color,
                  boxShadow: `0 0 12px ${blip.color}`,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  animation: 'blipPulse 1.5s infinite alternate'
                }}
              />
              
              {/* Glowing outer wave */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: `1.5px solid ${blip.color}`,
                  opacity: 0.4,
                  animation: 'radarWave 2s infinite linear'
                }}
              />

              {/* Hover Tooltip */}
              {hoveredBlip === blip.id && (
                <div 
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    bottom: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    padding: '0.6rem 0.8rem',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: `1px solid ${blip.color}`,
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                >
                  <div style={{ fontWeight: '800', color: blip.color, marginBottom: '0.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{blip.name}</span>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>{blip.severity}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>📍 {blip.location}</div>
                  <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>📡 Dist: {blip.distance}</div>
                </div>
              )}
            </div>
          ))}

          {/* Concentric rings to make it look like a radar */}
          <div className="radar-ring" style={{ width: '100%', height: '100%' }}></div>
          <div className="radar-ring" style={{ width: '66%', height: '66%' }}></div>
          <div className="radar-ring" style={{ width: '33%', height: '33%' }}></div>
          <div className="radar-axis-x"></div>
          <div className="radar-axis-y"></div>
        </div>
      </div>

      <div className="threat-radar__log" style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '1rem', minHeight: '3.2rem', display: 'flex', alignItems: 'center' }}>
        <p className="typing-mono" style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontFamily: 'monospace', textAlign: 'left', width: '100%' }}>
          ⚡ {RADAR_LOGS[logIndex]}
        </p>
      </div>

      {/* Styled animation keyframes inside component to guarantee style load */}
      <style>{`
        @keyframes blipPulse {
          from { transform: scale(0.8); opacity: 0.8; }
          to { transform: scale(1.3); opacity: 1; }
        }
        @keyframes radarWave {
          0% { width: 10px; height: 10px; opacity: 0.8; }
          100% { width: 34px; height: 34px; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default LiveThreatRadar
