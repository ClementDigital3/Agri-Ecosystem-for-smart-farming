function WeatherSoilProfile({ profile }) {
  return (
    <section className="weather-soil-profile">
      <div className="weather-soil-profile__header">
        <div>
          <h3 className="weather-section__title">Sub-surface Moisture Profile</h3>
          <p className="weather-soil-profile__subtitle">Satellite-approximated ground water table</p>
        </div>
        <span className="weather-soil-profile__status">{profile.status}</span>
      </div>
      
      <div className="weather-soil-profile__layers">
        {profile.depths.map((layer, idx) => (
          <div key={idx} className="soil-layer-row">
            <div className="soil-layer-row__meta">
              <span className="soil-layer-row__depth">{layer.range}</span>
              <span className="soil-layer-row__label">{layer.label}</span>
            </div>
            <div className="soil-layer-row__bar-track">
              <div 
                className="soil-layer-row__bar-fill" 
                style={{ width: `${layer.moisture}%`, background: layer.color }}
              >
                <span className="soil-layer-row__moisture">{layer.moisture}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherSoilProfile
