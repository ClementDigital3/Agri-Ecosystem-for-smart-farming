import DashboardTopBar from '../components/DashboardTopBar'
import HomeAlertsPanel from '../components/HomeAlertsPanel'
import HomeFieldMapCard from '../components/HomeFieldMapCard'
import HomeQuickStatCard from '../components/HomeQuickStatCard'
import HomeRecommendationCard from '../components/HomeRecommendationCard'
import HomeStatusCard from '../components/HomeStatusCard'
import HomeTrendCard from '../components/HomeTrendCard'
import HomeWelcomeCard from '../components/HomeWelcomeCard'
import QuickActionCard from '../components/QuickActionCard'
import HomeAIAssistantCard from '../components/HomeAIAssistantCard'
import { getHomeDashboardData } from '../services/shambaService'

function Home() {
  const dashboard = getHomeDashboardData()

  return (
    <section className="page-stack home-dashboard">
      <div className="home-dashboard__layout">
        <aside className="home-dashboard__sidebar">
          <div className="home-dashboard__sidebar-inner">
            <HomeWelcomeCard
              greeting={`Hello, ${dashboard.user.name}!`}
              location={dashboard.user.location}
              farmName={dashboard.user.farmName}
              note={dashboard.user.greetingNote}
              seasonLabel={dashboard.user.seasonLabel}
              todayFocus={dashboard.user.todayFocus}
            />

            <HomeStatusCard
              tone="weather"
              label={dashboard.weather.label}
              value={dashboard.weather.temperature}
              unit="°C"
              title={dashboard.weather.condition}
              meta={dashboard.weather.day}
              detail={dashboard.weather.summary}
              chips={[dashboard.weather.location, dashboard.weather.updated]}
              stats={[
                { label: 'Humidity', value: `${dashboard.weather.humidity}%` },
                { label: 'Wind', value: dashboard.weather.windSpeed },
                { label: 'Rain', value: `${dashboard.weather.rainChance}%` },
              ]}
            />

            <HomeStatusCard
              tone="soil"
              label="Soil status"
              value={dashboard.soil.moisture}
              unit="%"
              title={dashboard.soil.headline}
              meta={dashboard.soil.status}
              detail={dashboard.soil.note}
              chips={[dashboard.soil.guidance]}
              stats={[
                { label: 'pH', value: dashboard.soil.ph },
                { label: 'Status', value: dashboard.soil.status },
              ]}
            />
          </div>
        </aside>

        <div className="home-dashboard__center">
          <DashboardTopBar
            title="Farm Dashboard"
            subtitle={dashboard.brand.title}
            status={dashboard.brand.status}
            notificationCount={dashboard.brand.notificationCount}
          />

          <section className="home-summary-panel">
            <div className="home-summary-panel__intro">
              <span className="home-summary-panel__eyebrow">Dashboard stats</span>
              <h2 className="home-summary-panel__title">Decision snapshot for today&apos;s field work</h2>
              <p className="home-summary-panel__copy">
                Crop health, active risk, rain timing, and market signals arranged for a faster farming decision.
              </p>
            </div>

            <div className="home-quick-stats-grid">
              {dashboard.quickStats.map((stat) => (
                <HomeQuickStatCard
                  key={stat.id}
                  label={stat.label}
                  value={stat.value}
                  note={stat.note}
                  tone={stat.tone}
                  meta={stat.meta}
                />
              ))}
            </div>
          </section>

          <section className="home-trends-section">
            <div className="home-section-heading">
              <span className="home-section-heading__eyebrow">Field trends</span>
              <h2 className="home-section-heading__title">Rainfall and crop performance at a glance</h2>
              <p className="home-section-heading__copy">
                Simple chart-style cards highlight rainfall movement, crop performance, and the best market pulse.
              </p>
            </div>

            <div className="home-trends-grid">
              {dashboard.trendCards.map((trend) => (
                <HomeTrendCard
                  key={trend.id}
                  label={trend.label}
                  value={trend.value}
                  delta={trend.delta}
                  title={trend.title}
                  detail={trend.detail}
                  bars={trend.bars}
                  tone={trend.tone}
                />
              ))}
            </div>
          </section>

          <HomeFieldMapCard
            title={dashboard.fieldMap.title}
            subtitle={dashboard.fieldMap.subtitle}
            recommendation={dashboard.fieldMap.recommendation}
            zones={dashboard.fieldMap.zones}
            badge={dashboard.fieldMap.badge}
            gis={dashboard.fieldMap.gis}
          />
          
          <HomeAIAssistantCard />
        </div>

        <aside className="home-dashboard__aside">
          <section className="home-insights-section home-insights-section--updates">
            <div className="home-section-heading">
              <span className="home-section-heading__eyebrow">Recommendations & alerts</span>
              <h2 className="home-section-heading__title">What the dashboard suggests right now</h2>
              <p className="home-section-heading__copy">
                Strong recommendations and urgency-ranked warnings so the dashboard feels like a real field assistant.
              </p>
            </div>

            <div className="home-insights-grid home-insights-grid--stack">
              <HomeRecommendationCard
                eyebrow={dashboard.recommendation.eyebrow}
                title={dashboard.recommendation.title}
                detail={dashboard.recommendation.detail}
                badge={dashboard.recommendation.badge}
                actions={dashboard.recommendation.actions}
                timing={dashboard.recommendation.timing}
              />

              <HomeAlertsPanel
                eyebrow={dashboard.alertPanel.eyebrow}
                title={dashboard.alertPanel.title}
                detail={dashboard.alertPanel.detail}
                alerts={dashboard.alertPanel.alerts}
              />
            </div>
          </section>

          <section className="home-actions-section">
            <div className="home-section-heading">
              <span className="home-section-heading__eyebrow">Quick actions</span>
              <h2 className="home-section-heading__title">Choose what to check next</h2>
              <p className="home-section-heading__copy">
                Open the most useful farm tools with large, touch-friendly shortcuts.
              </p>
            </div>

            <div className="home-actions-grid">
              {dashboard.actions.map((action) => (
                <QuickActionCard
                  key={action.id}
                  title={action.title}
                  detail={action.detail}
                  badge={action.badge}
                  icon={action.icon}
                  route={action.route}
                  tone={action.tone}
                />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default Home
