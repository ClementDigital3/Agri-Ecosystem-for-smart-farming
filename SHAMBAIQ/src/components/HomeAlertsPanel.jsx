const levelLabels = {
  high: 'High priority',
  medium: 'Watch closely',
  low: 'Stable',
}

function HomeAlertsPanel({ eyebrow, title, detail, alerts }) {
  return (
    <article className="home-alert-panel">
      <div className="home-alert-panel__header">
        <span className="home-alert-panel__eyebrow">{eyebrow}</span>
        <h3 className="home-alert-panel__title">{title}</h3>
        <p className="home-alert-panel__detail">{detail}</p>
      </div>

      <div className="home-alert-panel__list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`home-alert-panel__item home-alert-panel__item--${alert.level}`}>
            <div className="home-alert-panel__meta">
              <span className={`home-alert-panel__status home-alert-panel__status--${alert.level}`}>
                {levelLabels[alert.level] ?? 'Monitor'}
              </span>
              <span className="home-alert-panel__tag">{alert.tag}</span>
            </div>

            <h4 className="home-alert-panel__item-title">{alert.title}</h4>
            <p className="home-alert-panel__item-copy">{alert.detail}</p>
            <span className="home-alert-panel__time">{alert.time}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default HomeAlertsPanel
