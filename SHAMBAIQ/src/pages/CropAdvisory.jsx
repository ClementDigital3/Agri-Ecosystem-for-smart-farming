import PageHeader from '../components/PageHeader'
import CropDoctorScanner from '../components/CropDoctorScanner'
import LiveThreatRadar from '../components/LiveThreatRadar'
import AdvisoryTickerFeed from '../components/AdvisoryTickerFeed'
import PropagationMap from '../components/PropagationMap'
import { getCropAdvisories, getAgriculturalProtocols } from '../services/shambaService'

function CropAdvisory() {
  const crops = getCropAdvisories()
  const protocols = getAgriculturalProtocols()

  return (
    <section className="page-stack crop-screen">
      <PageHeader
        eyebrow="Crop Advisory"
        title="Command Center"
        subtitle="Live biosecurity, diagnostics, and algorithmic treatment guidance."
        accent="crop"
        stats={[
          { label: 'Network Farms', value: '1,420' },
          { label: 'Threat Level', value: 'Elevated' },
          { label: 'AI Status', value: 'Online' },
        ]}
      />

      <div className="crop-dashboard-columns">
        <div className="crop-dashboard-columns__main" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <LiveThreatRadar />
          <CropDoctorScanner />
          
          <div className="advisory-protocols">
            <h3 className="section-title">Algorithmic Decision Support</h3>
            <div className="protocol-grid">
              {protocols.map(p => (
                <div key={p.id} className="protocol-card glass-panel">
                   <div className="protocol-card__header">
                     <span className="impact-tag" data-impact={p.impact}>{p.impact} Impact</span>
                     <div className="protocol-tags">
                       {p.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
                     </div>
                   </div>
                   <h4>{p.title}</h4>
                   <p className="crop-label">{p.crop}</p>
                   <p className="detailText">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <PropagationMap />
        </div>
        
        <div className="crop-dashboard-columns__aside">
          <AdvisoryTickerFeed />
        </div>
      </div>
    </section>
  )
}

export default CropAdvisory
