function HomeTrendCard({ label, value, delta, title, detail, bars, tone }) {
  return (
    <article className={`home-trend-card home-trend-card--${tone}`}>
      <div className="home-trend-card__top">
        <span className="home-trend-card__label">{label}</span>
        <span className="home-trend-card__delta">{delta}</span>
      </div>

      <div className="home-trend-card__summary">
        <strong className="home-trend-card__value">{value}</strong>
        <h3 className="home-trend-card__title">{title}</h3>
      </div>

      <div className="home-trend-card__bars" aria-hidden="true">
        {bars.map((bar, index) => (
          <span key={`${label}-${index}`} className="home-trend-card__bar" style={{ height: `${bar}%` }} />
        ))}
      </div>

      <p className="home-trend-card__detail">{detail}</p>
    </article>
  )
}

export default HomeTrendCard
