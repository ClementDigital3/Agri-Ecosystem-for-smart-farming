function PageHeader({ eyebrow, title, subtitle, accent, stats = [], media }) {
  return (
    <header className={`page-hero page-hero--${accent}`}>
      <div className="page-hero__content">
        <span className="page-eyebrow">{eyebrow}</span>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      {stats.length || media ? (
        <div className="page-hero__aside">
          {stats.length ? (
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}

          {media ? <div className="hero-media">{media}</div> : null}
        </div>
      ) : null}
    </header>
  )
}

export default PageHeader
