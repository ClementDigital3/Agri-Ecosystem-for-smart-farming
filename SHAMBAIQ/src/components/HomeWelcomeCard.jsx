function HomeWelcomeCard({ greeting, location, farmName, note, seasonLabel, todayFocus }) {
  return (
    <section className="home-welcome-card">
      <div className="home-welcome-card__content">
        <span className="home-welcome-card__eyebrow">{seasonLabel}</span>
        <h2 className="home-welcome-card__title">{greeting}</h2>
        <p className="home-welcome-card__note">{note}</p>

        <div className="home-welcome-card__chips">
          <span className="home-welcome-card__chip">Location: {location}</span>
          <span className="home-welcome-card__chip">{farmName}</span>
        </div>
      </div>

      <div className="home-welcome-card__focus">
        <span className="home-welcome-card__focus-label">Today&apos;s focus</span>
        <p className="home-welcome-card__focus-copy">{todayFocus}</p>
      </div>
    </section>
  )
}

export default HomeWelcomeCard
