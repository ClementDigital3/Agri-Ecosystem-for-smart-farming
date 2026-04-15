function HomeInsightCard({ eyebrow, title, detail, tone }) {
  return (
    <article className={`home-insight-card home-insight-card--${tone}`}>
      <span className="home-insight-card__eyebrow">{eyebrow}</span>
      <h3 className="home-insight-card__title">{title}</h3>
      <p className="home-insight-card__detail">{detail}</p>
    </article>
  )
}

export default HomeInsightCard
