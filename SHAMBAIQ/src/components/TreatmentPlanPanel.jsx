function TreatmentPlanPanel({ disease, crop, onClose }) {
  return (
    <div className="treatment-panel slide-in-bottom">
      <div className="treatment-panel__header">
        <h4>Action Plan: {disease}</h4>
        <button onClick={onClose} className="scan-btn scan-btn--secondary" style={{padding: '0.2rem 0.5rem', width: 'auto'}}>Back</button>
      </div>

      <div className="protocol-steps">
        <div className="protocol-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h5>Chemical Intervention</h5>
            <p>Apply <strong>Emamectin Benzoate (5% SG)</strong> at 10g per 20 Litres of water. Focus nozzle directly into the funnel of the {crop}.</p>
            <span className="badge badge--danger">Best Window: Tomorrow 06:00 AM (Low Wind)</span>
          </div>
        </div>

        <div className="protocol-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h5>Biological Integration</h5>
            <p>Wait 48 hours, then introduce parasitic <em>Trichogramma</em> wasps to destroy remaining egg masses organically.</p>
          </div>
        </div>

        <div className="protocol-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h5>Resistance Management</h5>
            <p>If &gt;20% of plants show fresh damage after 5 days, rotate to <strong>Spinetoram 120 SC</strong> to prevent mutation resistance.</p>
          </div>
        </div>
      </div>

      <button className="trade-btn trade-btn--sell" style={{width: '100%', marginTop: '1.5rem', padding: '0.8rem'}}>
        Order Agrovets Delivery (KES 1,200)
      </button>
    </div>
  )
}

export default TreatmentPlanPanel
