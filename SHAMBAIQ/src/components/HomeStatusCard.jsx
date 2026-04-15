function WeatherIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3.8v2.1M12 18.1v2.1M3.8 12h2.1M18.1 12h2.1M6.2 6.2l1.5 1.5M16.3 16.3l1.5 1.5M17.8 6.2l-1.5 1.5M7.7 16.3l-1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SoilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 15.5c0 2.7 2.2 4.8 5 4.8s5-2.2 5-4.8c0-2.8-2.2-5.3-5-8.8-2.8 3.5-5 6-5 8.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10.4 15.7c.8 1 1.9 1.5 3.2 1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const icons = {
  weather: WeatherIcon,
  soil: SoilIcon,
}

function HomeStatusCard({ tone, label, value, unit, title, meta, detail, chips = [], stats = [] }) {
  const Icon = icons[tone]

  return (
    <article className={`home-status-card home-status-card--${tone}`}>
      <div className="home-status-card__top">
        <div>
          <span className="home-status-card__label">{label}</span>
          <div className="home-status-card__value">
            {value}
            {unit ? <span className="home-status-card__unit">{unit}</span> : null}
          </div>
        </div>

        <span className="home-status-card__icon">
          <Icon />
        </span>
      </div>

      <div className="home-status-card__heading">
        <h3 className="home-status-card__title">{title}</h3>
        {meta ? <span className="home-status-card__meta">{meta}</span> : null}
      </div>
      <p className="home-status-card__detail">{detail}</p>

      {chips.length ? (
        <div className="home-status-card__chips">
          {chips.map((chip) => (
            <span key={chip} className="home-status-card__chip">
              {chip}
            </span>
          ))}
        </div>
      ) : null}

      {stats.length ? (
        <div className="home-status-card__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="home-status-card__stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default HomeStatusCard
