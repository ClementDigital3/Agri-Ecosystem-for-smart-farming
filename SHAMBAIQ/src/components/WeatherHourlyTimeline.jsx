function WeatherHourlyTimeline({ hourly }) {
  return (
    <section className="weather-hourly-timeline">
      <h3 className="weather-hourly-timeline__title">24-Hour Rain & Wind Watch</h3>
      <div className="weather-hourly-timeline__scroll">
        {hourly.map(hour => (
          <div key={hour.time} className="hourly-column">
            <span className="hourly-column__time">{hour.time}</span>
            <span className="hourly-column__temp">{hour.temp}°C</span>
            
            {/* The rain bar fills from the bottom up based on rain chance */}
            <div className="hourly-column__rain-bar-container">
              <div 
                className="hourly-column__rain-bar" 
                style={{ height: `${Math.max(hour.rain, 5)}%`, opacity: hour.rain > 0 ? 1 : 0.2 }}
              >
                <span className="hourly-column__rain-text">{hour.rain}%</span>
              </div>
            </div>
            
            <span className="hourly-column__wind">{hour.wind} km/h</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherHourlyTimeline
