function WeatherAgriMetrics({ metrics }) {
  return (
    <section className="weather-agri-metrics">
      <div className="agri-metric-card">
        <span className="agri-metric-card__label">Evapotranspiration (ET)</span>
        <div className="agri-metric-card__value">
          <strong>{metrics.et.value}</strong>
          <span>{metrics.et.unit}</span>
        </div>
        <p className="agri-metric-card__status">{metrics.et.status}</p>
        <div className="agri-metric-card__bar">
          <div className="agri-metric-card__fill" style={{ width: '85%', background: 'var(--alert)' }}></div>
        </div>
      </div>

      <div className="agri-metric-card">
        <span className="agri-metric-card__label">Growing Degree Days</span>
        <div className="agri-metric-card__value">
          <strong>{metrics.gdd.value}</strong>
          <span>{metrics.gdd.unit}</span>
        </div>
        <p className="agri-metric-card__status">{metrics.gdd.status}</p>
        <div className="agri-metric-card__bar">
          <div className="agri-metric-card__fill" style={{ width: '60%', background: 'var(--green-fresh)' }}></div>
        </div>
      </div>

      <div className="agri-metric-card">
        <span className="agri-metric-card__label">Soil Moisture (Top 15cm)</span>
        <div className="agri-metric-card__value">
          <strong>{metrics.moisture.value}</strong>
          <span>{metrics.moisture.unit}</span>
        </div>
        <p className="agri-metric-card__status" style={{ color: 'var(--danger)' }}>{metrics.moisture.status}</p>
        <div className="agri-metric-card__bar">
          <div className="agri-metric-card__fill" style={{ width: '34%', background: 'var(--danger)' }}></div>
        </div>
      </div>
    </section>
  )
}

export default WeatherAgriMetrics
