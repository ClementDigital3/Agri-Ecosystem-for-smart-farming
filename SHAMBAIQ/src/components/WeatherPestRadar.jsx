function WeatherPestRadar({ pests }) {
  return (
    <section className="weather-pest-radar">
      <div className="weather-pest-radar__header">
        <h3 className="weather-section__title">Pest & Disease Threat</h3>
      </div>
      <div className="weather-pest-radar__list">
        {pests.map(pest => (
          <div key={pest.name} className="pest-radar-item">
            <div className="pest-radar-item__info">
              <span className="pest-radar-item__name">{pest.name}</span>
              <span className="pest-radar-item__level" style={{ color: pest.color }}>{pest.level}</span>
            </div>
            <div className="pest-radar-item__bar">
              <div 
                className="pest-radar-item__fill" 
                style={{ width: `${pest.progress}%`, background: pest.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherPestRadar
