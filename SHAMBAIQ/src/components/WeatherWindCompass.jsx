function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: 'rotate(45deg)' }}>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 5V19M12 5L9 9M12 5L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WeatherWindCompass({ wind }) {
  return (
    <section className="weather-wind-compass">
      <div className="weather-wind-compass__main">
        <div className="weather-wind-compass__dial" style={{ color: wind.color }}>
          <CompassIcon />
        </div>
        <div className="weather-wind-compass__data">
          <span className="weather-wind-compass__speed">
            {wind.speed} <span>km/h</span>
          </span>
          <span className="weather-wind-compass__direction">{wind.direction} Winds</span>
        </div>
      </div>
      <div className="weather-wind-compass__alert" style={{ '--alert-color': wind.color }}>
        <strong>Spraying Safety: {wind.status}</strong>
        <p>{wind.recommendation}</p>
      </div>
    </section>
  )
}

export default WeatherWindCompass
