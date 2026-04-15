function LiveThreatRadar() {
  return (
    <div className="threat-radar-card glass-panel">
      <div className="threat-radar__header">
        <h4 style={{ margin: 0 }}>Regional Biosecurity Radar</h4>
        <span className="live-badge"><span className="pulse-dot"></span> LIVE SCAN</span>
      </div>
      
      <div className="threat-radar__display">
        <div className="radar-circle">
          <div className="radar-beam"></div>
          {/* Target blips representing pest hot spots */}
          <div className="radar-blip" style={{top: '30%', left: '40%', animationDelay: '0.2s'}}></div>
          <div className="radar-blip" style={{top: '60%', left: '70%', animationDelay: '1.4s'}}></div>
          <div className="radar-blip" style={{top: '20%', left: '80%', animationDelay: '0.8s'}}></div>
          {/* Concentric rings to make it look like a radar */}
          <div className="radar-ring" style={{ width: '100%', height: '100%' }}></div>
          <div className="radar-ring" style={{ width: '66%', height: '66%' }}></div>
          <div className="radar-ring" style={{ width: '33%', height: '33%' }}></div>
          <div className="radar-axis-x"></div>
          <div className="radar-axis-y"></div>
        </div>
      </div>
      <div className="threat-radar__log">
        <p className="typing-mono">Scanning quadrant 4B for Armyworm movement...</p>
      </div>
    </div>
  )
}

export default LiveThreatRadar
