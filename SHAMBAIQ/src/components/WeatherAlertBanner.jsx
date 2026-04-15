function WeatherAlertBanner({ alerts }) {
  return (
    <section className="weather-alert-banner" aria-label="Weather risks">
      <div className="weather-alert-banner__header">
        <span className="weather-alert-banner__eyebrow">Weather risks</span>
        <h2 className="weather-alert-banner__title">Plan for dryland conditions</h2>
      </div>

      <div className="weather-alert-banner__list">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className={`weather-alert-banner__item weather-alert-banner__item--${alert.level}`}
          >
            <span className="weather-alert-banner__item-title">{alert.title}</span>
            <p className="weather-alert-banner__item-copy">{alert.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WeatherAlertBanner
