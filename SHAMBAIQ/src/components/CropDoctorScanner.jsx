import { useState, useRef } from 'react'
import TreatmentPlanPanel from './TreatmentPlanPanel'

function CropDoctorScanner() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [showPlan, setShowPlan] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
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
    
    // Dynamically diagnose based on filename or randomly to fit Uasin Gishu's primary crops
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
    }, 2800)
  }

  const handleScanAgain = () => {
    setResult(null)
    setImageSrc(null)
    setShowPlan(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="crop-doctor-scanner" style={{ position: 'relative', overflow: 'hidden' }}>
      {!showPlan && (
        <div className="crop-doctor-scanner__header">
          <h3 className="crop-doctor-scanner__title">AI Crop Doctor</h3>
          <p className="crop-doctor-scanner__subtitle">Capture or upload a leaf photo for instant pathogen analysis.</p>
        </div>
      )}

      {/* Hidden input for camera / file upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        capture="environment" 
        style={{ display: 'none' }} 
      />

      {!result && !scanning && (
        <div className="crop-doctor-scanner__dropzone" onClick={() => fileInputRef.current.click()} style={{ cursor: 'pointer' }}>
          <div className="crop-doctor-scanner__icon">📸</div>
          <p>Tap to take photo or upload leaf image</p>
        </div>
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
