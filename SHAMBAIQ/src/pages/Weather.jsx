import { useState, useEffect } from 'react'
import InfoCard from '../components/InfoCard'
import WeatherAlertBanner from '../components/WeatherAlertBanner'
import WeatherForecastCard from '../components/WeatherForecastCard'
import WeatherFieldConditionsBoard from '../components/WeatherFieldConditionsBoard'
import WeatherHourlyTimeline from '../components/WeatherHourlyTimeline'
import WeatherAgriMetrics from '../components/WeatherAgriMetrics'
import WeatherPestRadar from '../components/WeatherPestRadar'
import WeatherWindCompass from '../components/WeatherWindCompass'
import WeatherSoilProfile from '../components/WeatherSoilProfile'
import { getWeatherData } from '../services/shambaService'

function Weather() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch live data on mount
    getWeatherData().then(setData)
  }, [])

  if (!data) {
    return <div style={{ padding: '4rem 2rem', textAlign: 'center', fontWeight: 'bold' }}>📡 Connecting to ShambaIQ Satellite Backend...</div>
  }

  const { current, forecast, rainfallSummary, alerts, conditions, hourly, metrics, pests, wind, soilProfile } = data

  return (
    <section className="page-stack weather-screen">
      <header className="weather-topbar">
        <span className="weather-topbar__eyebrow">Decision Support</span>
        <h1 className="weather-topbar__title">Field Conditions & Weather</h1>
        <p className="weather-topbar__copy">
          Live guidance for spraying, planting, and rain timing.
        </p>
      </header>

      <WeatherAlertBanner alerts={alerts} />

      <div className="weather-dashboard-columns">
        <div className="weather-dashboard-columns__main">
          {/* Core Decision Dashboard */}
          <WeatherFieldConditionsBoard conditions={conditions} />
          
          <div className="weather-metrics-hero">
            <section className="weather-current-card weather-current-card--minimal">
              <div className="weather-current-card__top">
                <div>
                  <span className="weather-current-card__label">Current</span>
                  <h2 className="weather-current-card__location">{current.location}</h2>
                </div>
                <span className="weather-current-card__chip">{current.rainChance}% rain</span>
              </div>
              <div className="weather-current-card__hero">
                <div className="weather-current-card__reading">
                  <div className="weather-current-card__temperature">
                    {current.temperature}
                    <span>°C</span>
                  </div>
                  <p className="weather-current-card__condition">{current.condition}</p>
                </div>
              </div>
            </section>
            
            <WeatherHourlyTimeline hourly={hourly} />
          </div>

          <WeatherAgriMetrics metrics={metrics} />
          
          {/* Bottom row: split layout to equalize column height */}
          <div className="weather-bottom-split">
            <WeatherSoilProfile profile={soilProfile} />
            <div className="weather-bottom-split__stack">
              <WeatherWindCompass wind={wind} />
              <WeatherPestRadar pests={pests} />
            </div>
          </div>
        </div>

        <aside className="weather-dashboard-columns__aside">
          <section className="weather-section weather-section--forecast">
            <div className="weather-section__header">
              <span className="weather-section__eyebrow">5-day Outlook</span>
              <h2 className="weather-section__title">Weekly Activity Planner</h2>
            </div>
            <div className="weather-forecast-grid">
              {forecast.map((day) => (
                <WeatherForecastCard key={day.day} {...day} />
              ))}
            </div>
          </section>

          <InfoCard
            className="weather-rainfall-card"
            label="Moisture Accumulation"
            title={`${rainfallSummary.expectedRainfall} expected this week`}
            tone="crop"
          >
            <p className="card-copy">{rainfallSummary.weeklyPattern}</p>
            <p className="weather-rainfall-card__recommendation">{rainfallSummary.recommendation}</p>
          </InfoCard>
        </aside>
      </div>
    </section>
  )
}

export default Weather
