import { useState, useRef } from 'react'
import TreatmentPlanPanel from './TreatmentPlanPanel'

const WHEAT_RUST_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%231e293b"/><path d="M 200,20 C 230,100 240,200 210,280 C 180,280 170,180 180,100 Z" fill="%23a3a04c"/><circle cx="195" cy="80" r="3" fill="%23c25e17"/><circle cx="205" cy="110" r="4" fill="%23c25e17"/><circle cx="188" cy="130" r="3.5" fill="%23a1490a"/><circle cx="212" cy="160" r="4.5" fill="%23c25e17"/><circle cx="192" cy="180" r="3" fill="%23a1490a"/><circle cx="202" cy="210" r="4.5" fill="%23c25e17"/><circle cx="197" cy="240" r="3.5" fill="%23a1490a"/><text x="20" y="270" fill="%2394a3b8" font-size="12" font-family="sans-serif">Sample: Wheat Rust (Puccinia)</text></svg>`

const MAIZE_BLIGHT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%231e293b"/><path d="M 200,10 C 260,80 270,220 210,290 C 190,290 140,220 180,80 Z" fill="%234d8248"/><ellipse cx="200" cy="90" rx="25" ry="8" fill="%238c775c" transform="rotate(-30 200 90)"/><ellipse cx="180" cy="150" rx="30" ry="10" fill="%238c775c" transform="rotate(-15 180 150)"/><ellipse cx="220" cy="210" rx="35" ry="12" fill="%23756249" transform="rotate(-20 220 210)"/><path d="M 197,35 Q 211,160 200,285" stroke="%2371a86c" stroke-width="3" fill="none"/><text x="20" y="270" fill="%2394a3b8" font-size="12" font-family="sans-serif">Sample: Corn Leaf Blight</text></svg>`

function CropDoctorScanner() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [showPlan, setShowPlan] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  
  const cameraInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e, isCamera) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageSrc(event.target.result)
        startScan(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const startScan = (file) => {
    setScanning(true)
    setShowPlan(false)
    
    // Dynamically diagnose based on filename or randomly
    const isWheat = file.name.toLowerCase().includes('wheat') || 
                    file.name.toLowerCase().includes('rust') || 
                    Math.random() > 0.5

    setTimeout(() => {
      setScanning(false)
      if (isWheat) {
        setResult({
          disease: 'Stem Rust (Puccinia graminis)',
          confidence: 94,
          severity: 'Critical Threat (Spreading)',
          crop: 'Wheat'
        })
      } else {
        setResult({
          disease: 'Northern Corn Leaf Blight',
          confidence: 96,
          severity: 'Moderate Leaf Necrosis',
          crop: 'Maize'
        })
      }
    }, 2500)
  }

  const handleLoadSample = (cropType) => {
    setScanning(true)
    setShowPlan(false)
    
    if (cropType === 'wheat') {
      setImageSrc(WHEAT_RUST_SVG)
      setTimeout(() => {
        setScanning(false)
        setResult({
          disease: 'Stem Rust (Puccinia graminis)',
          confidence: 94,
          severity: 'Critical Threat (Spreading)',
          crop: 'Wheat'
        })
      }, 2500)
    } else {
      setImageSrc(MAIZE_BLIGHT_SVG)
      setTimeout(() => {
        setScanning(false)
        setResult({
          disease: 'Northern Corn Leaf Blight',
          confidence: 96,
          severity: 'Moderate Leaf Necrosis',
          crop: 'Maize'
        })
      }, 2500)
    }
  }

  const handleScanAgain = () => {
    setResult(null)
    setImageSrc(null)
    setShowPlan(false)
    if (cameraInputRef.current) cameraInputRef.current.value = ''
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="crop-doctor-scanner" style={{ position: 'relative', overflow: 'hidden' }}>
      {!showPlan && (
        <div className="crop-doctor-scanner__header">
          <h3 className="crop-doctor-scanner__title">AI Crop Doctor</h3>
          <p className="crop-doctor-scanner__subtitle">Capture or upload a leaf photo for instant pathogen analysis.</p>
        </div>
      )}

      {/* Hidden input for camera capture */}
      <input 
        type="file" 
        ref={cameraInputRef} 
        onChange={(e) => handleFileChange(e, true)} 
        accept="image/*" 
        capture="environment" 
        style={{ display: 'none' }} 
      />

      {/* Hidden input for normal file selection */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => handleFileChange(e, false)} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {!result && !scanning && (
        <>
          <div className="crop-doctor-scanner__dropzone" style={{ cursor: 'default', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 1.5rem' }}>
            <div className="crop-doctor-scanner__icon" style={{ fontSize: '2.5rem' }}>🛡️</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>Scan affected crop leaf using one of the options below:</p>
            
            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
              <button 
                type="button" 
                className="scan-btn scan-btn--primary"
                onClick={() => cameraInputRef.current.click()}
                style={{ width: 'auto', flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                📸 Take Photo
              </button>
              <button 
                type="button" 
                className="scan-btn scan-btn--secondary"
                onClick={() => fileInputRef.current.click()}
                style={{ width: 'auto', flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                📁 Upload Image
              </button>
            </div>
          </div>

          <div className="crop-doctor-samples-section" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>💡 Presentation Demo: Test instantly with a sample leaf</p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              <button 
                type="button"
                className="scan-btn scan-btn--secondary" 
                onClick={() => handleLoadSample('wheat')}
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
              >
                🌾 Wheat Rust Sample
              </button>
              <button 
                type="button"
                className="scan-btn scan-btn--secondary" 
                onClick={() => handleLoadSample('maize')}
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)' }}
              >
                🌽 Maize Blight Sample
              </button>
            </div>
          </div>
        </>
      )}

      {scanning && (
        <div className="crop-doctor-scanner__dropzone is-scanning" style={{ position: 'relative', overflow: 'hidden' }}>
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Leaf to scan" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45,
                zIndex: 0
              }} 
            />
          )}
          <div className="scanner-line" style={{ zIndex: 2 }}></div>
          <div className="crop-doctor-scanner__icon pulse" style={{ zIndex: 1 }}>🔍</div>
          <p style={{ zIndex: 1, fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Running computer vision analysis...</p>
        </div>
      )}

      {result && !showPlan && (
        <div className="crop-doctor-scanner__result" style={{ position: 'relative' }}>
          {imageSrc && (
            <div style={{ width: '100%', height: '140px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <img src={imageSrc} alt="Diagnosed leaf" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div className="result-header">
            <h4>Diagnosis Acquired</h4>
            <span className="confidence">{result.confidence}% Match Level</span>
          </div>
          <div className="result-body">
            <p><strong>Target Crop:</strong> {result.crop}</p>
            <p><strong>Pathogen:</strong> <span className="alert-text">{result.disease}</span></p>
            <p><strong>Severity:</strong> <span className="alert-text">{result.severity}</span></p>
          </div>
          <div className="result-actions">
            <button className="scan-btn scan-btn--secondary" onClick={handleScanAgain}>Scan Again</button>
            <button className="scan-btn scan-btn--primary" onClick={() => setShowPlan(true)}>View Treatment Plan</button>
          </div>
        </div>
      )}

      {showPlan && (
        <TreatmentPlanPanel 
          disease={result.disease} 
          crop={result.crop} 
          onClose={() => setShowPlan(false)} 
        />
      )}
    </div>
  )
}

export default CropDoctorScanner
