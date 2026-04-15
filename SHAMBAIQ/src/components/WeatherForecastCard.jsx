function WeatherForecastCard({ day, condition, high, low, rainChance, wind, outlook }) {
  return (
    <article className="weather-forecast-card">
      <div className="weather-forecast-card__top">
        <span className="weather-forecast-card__day">{day}</span>
        <span className="weather-forecast-card__rain">{rainChance}% rain</span>
      </div>

      <h3 className="weather-forecast-card__condition">{condition}</h3>

      <div className="weather-forecast-card__temps">
        <strong>{high} C</strong>
        <span>Low {low} C</span>
      </div>

      <p className="weather-forecast-card__wind">Wind {wind}</p>
      <p className="weather-forecast-card__outlook">{outlook}</p>
    </article>
  )
}

export default WeatherForecastCard
