function HomeQuickStatCard({ label, value, note, tone, meta }) {
  return (
    <article className={`home-quick-stat home-quick-stat--${tone}`}>
      <div className="home-quick-stat__top">
        <span className="home-quick-stat__label">{label}</span>
        {meta ? <span className="home-quick-stat__meta">{meta}</span> : null}
      </div>
      <strong className="home-quick-stat__value">{value}</strong>
      <p className="home-quick-stat__note">{note}</p>
    </article>
  )
}

export default HomeQuickStatCard
