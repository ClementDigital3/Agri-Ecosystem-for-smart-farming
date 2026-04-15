import InfoCard from '../components/InfoCard'
import PageHeader from '../components/PageHeader'
import { getAlerts } from '../services/shambaService'

function Alerts() {
  const activeAlerts = getAlerts()

  return (
    <section className="page-stack alerts-screen">
      <PageHeader
        eyebrow="Alerts"
        title={`${activeAlerts.length} active alerts`}
        subtitle="Fast updates for pests, weather, and market movement."
        accent="alerts"
        stats={[
          { label: 'High', value: '1' },
          { label: 'Medium', value: '1' },
          { label: 'Low', value: '1' },
        ]}
      />

      <div className="list-stack">
        {activeAlerts.map((alert) => (
          <InfoCard key={alert.id} label={alert.tag} title={alert.title} tone="alerts">
            <div className="row-between">
              <span className={`badge badge--${alert.level}`}>{alert.level}</span>
              <span className="card-label">{alert.time}</span>
            </div>
            <p className="card-copy">{alert.detail}</p>
          </InfoCard>
        ))}
      </div>
    </section>
  )
}

export default Alerts
