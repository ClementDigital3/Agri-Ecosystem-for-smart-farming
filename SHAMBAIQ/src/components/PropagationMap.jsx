function PropagationMap() {
  return (
    <div className="propagation-map glass-panel">
      <div className="propagation-map__header">
        <h4>Threat Epicenter Map</h4>
        <div className="telemetry-tags">
          <span className="live-badge"><span className="pulse-dot"></span> LIVE T-04hrs</span>
        </div>
      </div>
      
      <div className="propagation-map__canvas">
        <svg viewBox="0 0 400 160" className="propagation-svg" preserveAspectRatio="xMidYMid slice">
          {/* Mock Topographic Grid */}
          <pattern id="propGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#propGrid)" />
          
          {/* Outbreak Epicenter */}
          <g transform="translate(120, 80)">
            <circle r="3" fill="#e74c3c" />
            <text x="10" y="3" fontSize="10" fill="#e74c3c" fontWeight="bold" letterSpacing="1">KITUI SOUTH (EPICENTER)</text>
            
            {/* Expanding Propagation Rings (Radio waves) */}
            <circle r="10" className="prop-ring" style={{animationDelay: '0s'}} />
            <circle r="10" className="prop-ring" style={{animationDelay: '1.2s'}} />
            <circle r="10" className="prop-ring" style={{animationDelay: '2.4s'}} />
          </g>

          {/* Secondary Nodes */}
          <g transform="translate(280, 50)">
            <circle r="3" fill="#f39c12" />
            <text x="-5" y="-10" fontSize="9" fill="#f39c12" textAnchor="middle">MACHAKOS (Warning)</text>
          </g>

          <g transform="translate(260, 130)">
            <circle r="3" fill="#0ad339" />
            <text x="10" y="3" fontSize="9" fill="#0ad339">MAKUENI (Clear)</text>
          </g>

          {/* Drone/Satellite sweeping line */}
          <line x1="0" y1="0" x2="400" y2="160" stroke="rgba(46, 204, 113, 0.4)" strokeWidth="1" className="prop-scanner-line" />
        </svg>
      </div>
      
      <div className="propagation-map__footer">
        <p>Estimated spread velocity: 14km/day against prevailing winds.</p>
      </div>
    </div>
  )
}

export default PropagationMap
