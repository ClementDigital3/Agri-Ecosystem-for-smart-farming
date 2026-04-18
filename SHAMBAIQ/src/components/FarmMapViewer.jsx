import { useState, useEffect, useRef } from 'react'

function FarmMapViewer({ fieldMap }) {
  const [isDroneMode, setIsDroneMode] = useState(false)
  const [thermalView, setThermalView] = useState(false)
  const [telemetry, setTelemetry] = useState({ altitude: 400, battery: 88, signal: 94 })
  const [targetPos, setTargetPos] = useState({ x: 400, y: 150 })
  const [activePOI, setActivePOI] = useState(null)
  
  const svgRef = useRef(null)

  // Simulate live telemetry fluctuations when drone is active
  useEffect(() => {
    let interval
    if (isDroneMode) {
      interval = setInterval(() => {
        setTelemetry(prev => ({
          altitude: prev.altitude + (Math.random() > 0.5 ? 1 : -1),
          battery: Math.max(0, prev.battery - (Math.random() > 0.9 ? 1 : 0)),
          signal: 90 + Math.floor(Math.random() * 10)
        }))
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [isDroneMode])

  const handleMapClick = (e) => {
    if (!isDroneMode || !svgRef.current) return

    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    
    // Transform global coordinates to SVG local space
    const cursor = pt.matrixTransform(svg.getScreenCTM().inverse())
    
    // Smoothly redirect drone/reticle
    setTargetPos({ x: cursor.x, y: cursor.y })
    
    // Check for nearby POIs (landmarks/sensors)
    const tolerance = 40
    const nearby = fieldMap.gis.landmarks.find(lm => 
      Math.abs(lm.x - cursor.x) < tolerance && Math.abs(lm.y - cursor.y) < tolerance
    )
    
    if (nearby) {
      setActivePOI({
        ...nearby,
        ts: new Date().toLocaleTimeString(),
        stats: {
           nitrogen: (Math.random() * 100).toFixed(1) + '%',
           lux: (Math.random() * 5000 + 1000).toFixed(0),
           ph: (5.5 + Math.random() * 1.5).toFixed(1)
        }
      })
    } else {
      setActivePOI(null)
    }
  }

  return (
    <div className={`farm-map-viewer ${isDroneMode ? 'drone-active' : ''}`}>
      <div className="farm-map-viewer__header">
        <div>
          <h3 className="farm-map-viewer__title">
            {isDroneMode ? 'UAV Survey Interface' : 'Satellite Field Polygon'}
          </h3>
          <p className="farm-map-viewer__subtitle">
            {isDroneMode ? 'Real-time multi-spectral scanning active' : 'Interactive GIS boundary mapping'}
          </p>
        </div>
        <div className="farm-map-viewer__actions" style={{ display: 'flex', gap: '0.6rem' }}>
          {isDroneMode && (
            <button 
              className={`scan-btn ${thermalView ? 'scan-btn--primary' : 'scan-btn--secondary'}`}
              onClick={() => setThermalView(!thermalView)}
              style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
            >
              Toggle Thermal 🌡️
            </button>
          )}
          <button 
            className={`scan-btn ${isDroneMode ? 'scan-btn--danger' : 'scan-btn--primary'}`}
            onClick={() => {
                setIsDroneMode(!isDroneMode)
                if(isDroneMode) {
                   setThermalView(false)
                   setActivePOI(null)
                }
            }}
            style={{ 
                width: 'auto', 
                padding: '0.6rem 1.2rem', 
                fontSize: '0.8rem',
                background: isDroneMode ? 'var(--danger)' : '' 
            }}
          >
            {isDroneMode ? 'Emergency Recall' : 'Launch Drone Survey 🚁'}
          </button>
        </div>
      </div>
      
      <div className={`farm-map-viewer__canvas ${thermalView ? 'is-thermal' : ''}`} 
        style={{ 
            perspective: '1200px', 
            backgroundColor: isDroneMode ? '#080c10' : 'transparent', 
            transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            cursor: isDroneMode ? 'crosshair' : 'default'
        }}>
        
        {/* Atmospheric Scan Lines (only in drone mode) */}
        {isDroneMode && <div className="drone-scan-overlay"></div>}

        <div className={`map-wrapper ${isDroneMode ? 'is-isometric' : ''}`} style={{ width: '100%', height: '100%' }}>
          <svg 
            ref={svgRef}
            viewBox="0 0 800 500" 
            className="farm-map-viewer__svg" 
            preserveAspectRatio="xMidYMid slice" 
            onClick={handleMapClick}
            style={{ width: '100%', height: '100%', borderRadius: isDroneMode ? '20px' : '0' }}
          >
            <defs>
              <linearGradient id="farmBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={thermalView ? "#1a237e" : "#e8f5e9"} />
                <stop offset="100%" stopColor={thermalView ? "#010822" : "#c8e6c9"} />
              </linearGradient>
              
              <filter id="thermalGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="url(#farmBg)" />
            
            {/* Grid Pattern in Drone Mode */}
            {isDroneMode && (
               <pattern id="droneGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(10, 211, 57, 0.1)" strokeWidth="0.5" />
               </pattern>
            )}
            {isDroneMode && <rect width="100%" height="100%" fill="url(#droneGrid)" />}

            {/* Farm Zones */}
            <path className={`polygon ${isDroneMode ? (thermalView ? 'thermal-good' : 'polygon-glow-good') : 'polygon--good'}`} d="M 50 50 L 350 70 L 380 250 L 100 280 Z" />
            <text x="200" y="150" className="polygon-label" fill={isDroneMode ? "#fff" : ""}>North Block</text>

            <path className={`polygon ${isDroneMode ? (thermalView ? 'thermal-watch' : 'polygon-glow-watch') : 'polygon--watch'}`} d="M 380 250 L 700 200 L 750 350 L 410 400 Z" />
            <text x="550" y="300" className="polygon-label" fill={isDroneMode ? "#fff" : ""}>Central Strip</text>

            <path className={`polygon ${isDroneMode ? (thermalView ? 'thermal-risk' : 'polygon-glow-risk') : 'polygon--risk'}`} d="M 100 280 L 410 400 L 350 480 L 80 460 Z" />
            <text x="220" y="380" className="polygon-label" fill={isDroneMode ? "#fff" : ""}>South Block (Risk)</text>
            
            {/* The Scanning Reticle */}
            {isDroneMode && (
              <g className="uav-reticle" style={{ transform: `translate(${targetPos.x}px, ${targetPos.y}px)`, transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(10, 211, 57, 0.4)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="-50" y1="0" x2="50" y2="0" stroke="rgba(10, 211, 57, 0.6)" strokeWidth="0.5" />
                <line x1="0" y1="-50" x2="0" y2="50" stroke="rgba(10, 211, 57, 0.6)" strokeWidth="0.5" />
                <rect x="-4" y="-4" width="8" height="8" fill="rgba(10, 211, 57, 0.8)" className="reticle-core" />
              </g>
            )}

            {/* Sensor Nodes */}
            {fieldMap.gis.landmarks.map((lm) => (
              <g key={lm.id} transform={`translate(${lm.x}, ${lm.y})`}>
                <circle r={isDroneMode ? 6 : 8} fill={isDroneMode ? (thermalView ? "#00c853" : "#0ad339") : "#1b7f3b"} stroke="#fff" strokeWidth="2" className={isDroneMode ? 'pulse-node' : ''} />
                {!thermalView && <text x="14" y="4" className="sensor-label" fill={isDroneMode ? "#fff" : ""}>{lm.label}</text>}
              </g>
            ))}

            {/* POI Data Ghost Popup */}
            {isDroneMode && activePOI && (
              <g transform={`translate(${activePOI.x + 20}, ${activePOI.y - 80})`} className="poi-ghost slide-in-top">
                 <rect width="140" height="70" rx="8" fill="rgba(15, 23, 30, 0.85)" stroke="rgba(10, 211, 57, 0.3)" />
                 <text x="10" y="20" fontSize="10" fill="#0ad339" fontWeight="800">{activePOI.label.toUpperCase()}</text>
                 <text x="10" y="38" fontSize="9" fill="rgba(255,255,255,0.7)">N-PK: {activePOI.stats.nitrogen}</text>
                 <text x="10" y="52" fontSize="9" fill="rgba(255,255,255,0.7)">UV LUX: {activePOI.stats.lux}</text>
                 <text x="10" y="66" fontSize="9" fill="rgba(255,255,255,0.7)">RECV: {activePOI.ts}</text>
              </g>
            )}

            {/* The Drone */}
            {isDroneMode && (
              <g className="uav-drone" style={{ 
                transform: `translate(${targetPos.x - 20}px, ${targetPos.y - 20}px)`, 
                transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)' 
              }}>
                <circle cx="0" cy="0" r="30" fill="rgba(0,0,0,0.4)" filter="blur(8px)" className="drone-shadow" />
                <text fontSize="60" x="-30" y="20">🚁</text>
                {/* Propeller motion effect */}
                <circle cx="-15" cy="-5" r="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" className="propeller-spin" />
                <circle cx="15" cy="-5" r="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" className="propeller-spin" />
              </g>
            )}
          </svg>
        </div>
      </div>
      
      {isDroneMode && (
        <div className="drone-hud slide-in-top">
          <div className="drone-hud__metric">
            <span className="hud-label">📡 ALTITUDE</span>
            <span className="hud-value">{telemetry.altitude}ft</span>
          </div>
          <div className="drone-hud__metric">
            <span className="hud-label">🔋 BATTERY</span>
            <span className="hud-value">{telemetry.battery}%</span>
          </div>
          <div className="drone-hud__metric">
            <span className="hud-label">📶 SIGNAL</span>
            <span className="hud-value">{telemetry.signal}%</span>
          </div>
          <div className="drone-hud__metric hud-status">
            <span className="hud-label">SYSTEM</span>
            <span className="hud-value status-ok">OPTIMAL</span>
          </div>
          <div className="drone-hud__metric" style={{marginLeft: 'auto'}}>
             <span className="hud-label">UAV COORDINATES</span>
             <span className="hud-value" style={{fontSize: '0.8rem'}}>{targetPos.x.toFixed(0)}, {targetPos.y.toFixed(0)}</span>
          </div>
        </div>
      )}
      
      <div className="farm-map-viewer__footer">
        <span className="farm-map-viewer__tag">Center: {fieldMap.gis.center}</span>
        <span className="farm-map-viewer__tag">Acreage: {fieldMap.gis.acreage}</span>
        {isDroneMode && <span className="farm-map-viewer__tag" style={{color: 'var(--green)'}}>Encryption: AES-256</span>}
      </div>
    </div>
  )
}

export default FarmMapViewer
