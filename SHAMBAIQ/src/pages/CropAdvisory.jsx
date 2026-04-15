import PageHeader from '../components/PageHeader'
import CropDoctorScanner from '../components/CropDoctorScanner'
import LiveThreatRadar from '../components/LiveThreatRadar'
import AdvisoryTickerFeed from '../components/AdvisoryTickerFeed'
import { getCropAdvisories } from '../services/shambaService'

function CropAdvisory() {
  const crops = getCropAdvisories()

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
        </div>
        
        <div className="crop-dashboard-columns__aside">
          <AdvisoryTickerFeed />
        </div>
      </div>
    </section>
  )
}

export default CropAdvisory
