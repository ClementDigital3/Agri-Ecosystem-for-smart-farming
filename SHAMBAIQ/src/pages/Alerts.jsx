import PageHeader from '../components/PageHeader'
import PropagationMap from '../components/PropagationMap'
import SmsBroadcastConsole from '../components/SmsBroadcastConsole'
import { getAlerts } from '../services/shambaService'

function Alerts() {
  const activeAlerts = getAlerts()

  // Make sure High alerts are prominently featured
  const sortedAlerts = [...activeAlerts].sort((a, b) => {
    if (a.level === 'High') return -1
    return 1
  })

  return (
    <section className="page-stack alerts-screen">
      <div className="sms-sync-bar">
        <span className="pulse-dot"></span>
        <span>SMS Telemetry Bridge Online (Syncing to +254 712 *** ***)</span>
      </div>

      <PageHeader
        eyebrow="Emergency Hub"
        title="Active Broadcasts"
        subtitle="Government extension warnings and localized weather emergencies."
        accent="alerts"
        stats={[
          { label: 'Unread', value: '3' },
          { label: 'Critical', value: '1' },
          { label: 'Source', value: 'KALRO & Open-Meteo' },
        ]}
      />

      <PropagationMap />
      
      <div className="alerts-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="alert-inbox">
          {sortedAlerts.map((alert) => (
            <div key={alert.id} className={`alert-card alert-card--${alert.level}`}>
              <div className="alert-card__header">
                <span className="alert-icon">
                  {alert.level === 'High' ? '🚨' : alert.level === 'Medium' ? '⚠️' : 'ℹ️'}
                </span>
                <div className="alert-meta">
                  <strong>{alert.tag}</strong>
                  <span>{alert.time}</span>
                </div>
              </div>
              
              <div className="alert-card__content">
                <h4>{alert.title}</h4>
                <p>{alert.detail}</p>
              </div>
              
              {alert.level === 'High' && (
                <div className="alert-card__actions">
                  <button className="trade-btn trade-btn--sell" style={{ background: 'var(--danger)', color: '#fff' }}>Execute Emergency Protocol</button>
                  <button className="scan-btn scan-btn--secondary">Forward via SMS Bridge</button>
                </div>
              )}
               {alert.level === 'Medium' && (
                <div className="alert-card__actions">
                  <button className="scan-btn scan-btn--secondary">Acknowledge Threat</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <aside className="alerts-sidebar">
          <SmsBroadcastConsole />
        </aside>
      </div>
    </section>
  )
}

export default Alerts
