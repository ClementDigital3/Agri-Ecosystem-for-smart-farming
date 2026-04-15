function HomeRecommendationCard({ eyebrow, title, detail, badge, actions, timing }) {
  return (
    <article className="home-recommendation-card">
      <div className="home-recommendation-card__top">
        <span className="home-recommendation-card__eyebrow">{eyebrow}</span>
        {badge ? <span className="home-recommendation-card__badge">{badge}</span> : null}
      </div>

      <h3 className="home-recommendation-card__title">{title}</h3>
      <p className="home-recommendation-card__detail">{detail}</p>

      <div className="home-recommendation-card__actions">
        {actions.map((action) => (
          <div
            key={action.label}
            className={`home-recommendation-card__action home-recommendation-card__action--${action.tone ?? 'support'}`}
          >
            <strong>{action.label}</strong>
            <p>{action.copy}</p>
          </div>
        ))}
      </div>

      <p className="home-recommendation-card__timing">{timing}</p>
    </article>
  )
}

export default HomeRecommendationCard
