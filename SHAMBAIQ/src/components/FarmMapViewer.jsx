function FarmMapViewer({ fieldMap }) {
  return (
    <div className="farm-map-viewer">
      <div className="farm-map-viewer__header">
        <h3 className="farm-map-viewer__title">Satellite Field Polygon</h3>
        <p className="farm-map-viewer__subtitle">Interactive GIS boundary mapping</p>
      </div>
      <div className="farm-map-viewer__canvas">
        <svg viewBox="0 0 800 500" className="farm-map-viewer__svg" preserveAspectRatio="xMidYMid slice">
          {/* Mock satellite background texture (using a soft green gradient) */}
          <rect width="100%" height="100%" fill="url(#farmBg)" />
          
          <defs>
            <linearGradient id="farmBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8f5e9" />
              <stop offset="100%" stopColor="#c8e6c9" />
            </linearGradient>
          </defs>

          {/* Polygons representing the farm zones */}
          <path 
            className="polygon polygon--good"
            d="M 50 50 L 350 70 L 380 250 L 100 280 Z" 
          />
          <text x="200" y="150" className="polygon-label">North Block</text>

          <path 
            className="polygon polygon--watch"
            d="M 380 250 L 700 200 L 750 350 L 410 400 Z" 
          />
          <text x="550" y="300" className="polygon-label">Central Strip</text>

          <path 
            className="polygon polygon--risk"
            d="M 100 280 L 410 400 L 350 480 L 80 460 Z" 
          />
          <text x="220" y="380" className="polygon-label">South Block (Risk)</text>
          
          {/* Mock Sensors */}
          {fieldMap.gis.landmarks.map((lm, idx) => (
            <g key={lm.id} transform={`translate(${lm.x}, ${lm.y})`}>
              <circle r="6" fill="#1b7f3b" stroke="#fff" strokeWidth="2" />
              <text x="10" y="4" className="sensor-label">{lm.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="farm-map-viewer__footer">
        <span className="farm-map-viewer__tag">Center: {fieldMap.gis.center}</span>
        <span className="farm-map-viewer__tag">Scale: {fieldMap.gis.scale}</span>
      </div>
    </div>
  )
}

export default FarmMapViewer
