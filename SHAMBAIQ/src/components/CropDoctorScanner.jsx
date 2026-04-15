import { useState } from 'react'
import TreatmentPlanPanel from './TreatmentPlanPanel'

function CropDoctorScanner() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [showPlan, setShowPlan] = useState(false)

  const handleScan = () => {
    setScanning(true)
    setShowPlan(false)
    // Simulate AI network delay
    setTimeout(() => {
      setScanning(false)
      setResult({
        disease: 'Fall Armyworm Infestation',
        confidence: 94,
        severity: 'Critical Threat',
        crop: 'Sorghum'
      })
    }, 2500)
  }

  return (
    <div className="crop-doctor-scanner">
      {!showPlan && (
        <div className="crop-doctor-scanner__header">
          <h3 className="crop-doctor-scanner__title">AI Crop Doctor</h3>
          <p className="crop-doctor-scanner__subtitle">Capture or upload a leaf photo for instant pathogen analysis.</p>
        </div>
      )}

      {!result && !scanning && (
        <div className="crop-doctor-scanner__dropzone" onClick={handleScan}>
          <div className="crop-doctor-scanner__icon">📸</div>
          <p>Tap to scan affected crop leaf</p>
        </div>
      )}

      {scanning && (
        <div className="crop-doctor-scanner__dropzone is-scanning">
          <div className="scanner-line"></div>
          <div className="crop-doctor-scanner__icon pulse">🔍</div>
          <p>Running computer vision analysis...</p>
        </div>
      )}

      {result && !showPlan && (
        <div className="crop-doctor-scanner__result">
          <div className="result-header">
            <h4>Diagnosis Acquired</h4>
            <span className="confidence">{result.confidence}% Match Level</span>
          </div>
          <div className="result-body">
            <p><strong>Target:</strong> {result.crop}</p>
            <p><strong>Pathogen:</strong> <span className="alert-text">{result.disease}</span></p>
            <p><strong>Severity:</strong> <span className="alert-text">{result.severity}</span></p>
          </div>
          <div className="result-actions">
            <button className="scan-btn scan-btn--secondary" onClick={() => setResult(null)}>Scan Again</button>
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
