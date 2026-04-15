function WeatherFieldConditionsBoard({ conditions }) {
  return (
    <section className="weather-field-board">
      <div className="weather-field-board__header">
        <h2 className="weather-field-board__title">Optimal Field Work</h2>
        <p className="weather-field-board__subtitle">Live AI Agronomy Assessment</p>
      </div>
      <div className="weather-field-board__grid">
        {conditions.map(cond => (
          <div key={cond.task} className="field-condition-card" style={{ '--status-color': cond.color }}>
            <div className="field-condition-card__top">
              <strong>{cond.task}</strong>
              <span className="field-condition-card__badge">{cond.status}</span>
            </div>
            <p className="field-condition-card__reason">{cond.reason}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherFieldConditionsBoard
