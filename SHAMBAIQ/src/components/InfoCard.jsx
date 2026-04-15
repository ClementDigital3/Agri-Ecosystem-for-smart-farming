function InfoCard({ label, title, tone, children, className = '' }) {
  const toneClass = tone ? ` info-card--${tone}` : ''

  return (
    <article className={`info-card${toneClass}${className ? ` ${className}` : ''}`}>
      {label ? <span className="card-label">{label}</span> : null}
      {title ? <h2 className="card-title">{title}</h2> : null}
      {children}
    </article>
  )
}

export default InfoCard
