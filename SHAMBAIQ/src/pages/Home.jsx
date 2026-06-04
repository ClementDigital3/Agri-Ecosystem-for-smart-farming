import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardTopBar from '../components/DashboardTopBar'
import HomeWelcomeCard from '../components/HomeWelcomeCard'
import HomeStatusCard from '../components/HomeStatusCard'
import { getHomeDashboardData, getMarketPrices } from '../services/shambaService'

function Home() {
  const dashboard = getHomeDashboardData()
  const marketCrops = getMarketPrices().slice(0, 4)

  // Track farm parcel registry details in state
  const [farmDetails, setFarmDetails] = useState(() => {
    const saved = localStorage.getItem('shambaiq_farm_details')
    return saved ? JSON.parse(saved) : null
  })

  // Track farm crop blocks/zones in state
  const [zones, setZones] = useState(() => {
    const saved = localStorage.getItem('shambaiq_zones')
    return saved ? JSON.parse(saved) : []
  })

  // Track registered implements/machinery count in state
  const [implementsCount, setImplementsCount] = useState(() => {
    const saved = localStorage.getItem('shambaiq_implements')
    const parsed = saved ? JSON.parse(saved) : []
    return parsed.length
  })

  useEffect(() => {
    const checkStorage = () => {
      const savedFarm = localStorage.getItem('shambaiq_farm_details')
      const savedZones = localStorage.getItem('shambaiq_zones')
      const savedImplements = localStorage.getItem('shambaiq_implements')

      setFarmDetails(savedFarm ? JSON.parse(savedFarm) : null)
      setZones(savedZones ? JSON.parse(savedZones) : [])
      
      const parsedImplements = savedImplements ? JSON.parse(savedImplements) : []
      setImplementsCount(parsedImplements.length)
    }

    checkStorage()
    window.addEventListener('storage', checkStorage)
    return () => {
      window.removeEventListener('storage', checkStorage)
    }
  }, [])

  const triggerAIAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-shamba-ai'))
  }

  return (
    <section className="page-stack home-dashboard">
      <div className="home-dashboard__layout">
        {/* Left/Sidebar Panel (Weather & Soil telemetry) */}
        <aside className="home-dashboard__sidebar">
          <div className="home-dashboard__sidebar-inner">
            <HomeWelcomeCard
              greeting={`Hello, ${dashboard.user.name}!`}
              location={dashboard.user.location}
              farmName={farmDetails ? farmDetails.parcelName : "No Farm Linked"}
              note={farmDetails ? `Satellite telemetry active for ${farmDetails.parcelName}.` : "Get started by linking your farm parcel."}
              seasonLabel={dashboard.user.seasonLabel}
              todayFocus={farmDetails ? "Monitor telemetry and inspect crop block status." : "Link your farm parcel to unlock drone simulator and GPS maps."}
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
              value={farmDetails ? (farmDetails.soilType || dashboard.soil.moisture) : "N/A"}
              unit={farmDetails ? "" : "%"}
              title={farmDetails ? `Moisture reading: ${dashboard.soil.moisture}%` : "Moisture reading offline"}
              meta={farmDetails ? farmDetails.soilType : "Register Farm"}
              detail={farmDetails ? `Soil health is stable. Guidance: ${dashboard.soil.guidance}` : "Soil telemetry will activate once you link your farm."}
              chips={farmDetails ? [dashboard.soil.guidance] : ["Telemetry Offline"]}
              stats={[
                { label: 'pH', value: farmDetails ? dashboard.soil.ph : 'N/A' },
                { label: 'Status', value: farmDetails ? dashboard.soil.status : 'Offline' },
              ]}
            />
          </div>
        </aside>

        {/* Right/Center Content (TopBar, Farm status/Onboarding CTA, Quick Links, Market Spotlight) */}
        <div className="home-dashboard__center home-dashboard__center--simplified">
          <DashboardTopBar
            title="Farm Dashboard"
            subtitle={dashboard.brand.title}
            status={dashboard.brand.status}
            notificationCount={dashboard.brand.notificationCount}
          />

          {/* Dynamic Farm Status Banner */}
          {!farmDetails ? (
            <div className="farm-onboarding-card glass-panel text-center">
              <div className="farm-onboarding-card__icon-wrapper">
                <span className="farm-onboarding-card__emoji">🏡</span>
              </div>
              <h2 className="farm-onboarding-card__title">Connect & Map Your Farm</h2>
              <p className="farm-onboarding-card__subtitle">
                You haven&apos;t linked a farm parcel yet. Connect your land using Google Satellite telemetry to unlock custom crop zone splitting, IoT soil probes, and digital agricultural passports.
              </p>
              <Link to="/my-farm" className="btn btn--primary btn--large btn--glow">
                Add My Farm
              </Link>
            </div>
          ) : (
            <div className="farm-status-banner glass-panel">
              <div className="farm-status-banner__header">
                <div className="farm-status-banner__title-group">
                  <span className="farm-status-banner__emoji">🚜</span>
                  <div>
                    <span className="farm-status-banner__eyebrow">Connected Property</span>
                    <h2 className="farm-status-banner__title">{farmDetails.parcelName}</h2>
                  </div>
                </div>
                <Link to="/my-farm" className="btn btn--secondary btn--small">
                  Manage Fields
                </Link>
              </div>

              <div className="farm-status-banner__details-grid">
                <div className="farm-status-banner__detail-item">
                  <span className="farm-status-banner__detail-label">Total Acreage</span>
                  <strong className="farm-status-banner__detail-value">{farmDetails.farmSize} Acres</strong>
                </div>
                <div className="farm-status-banner__detail-item">
                  <span className="farm-status-banner__detail-label">Soil Type</span>
                  <strong className="farm-status-banner__detail-value">{farmDetails.soilType}</strong>
                </div>
                <div className="farm-status-banner__detail-item">
                  <span className="farm-status-banner__detail-label">Active Crop Blocks</span>
                  <strong className="farm-status-banner__detail-value">{zones.length} Zones</strong>
                </div>
                <div className="farm-status-banner__detail-item">
                  <span className="farm-status-banner__detail-label">Machinery Registered</span>
                  <strong className="farm-status-banner__detail-value">{implementsCount} Implements</strong>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Grid */}
          <section className="home-quick-links-section">
            <h3 className="home-quick-links-title">Quick Actions</h3>
            <div className="home-quick-links-grid">
              
              <Link to="/weather" className="home-quick-link-card">
                <div className="home-quick-link-card__icon-container home-quick-link-card__icon-container--weather">
                  <svg viewBox="0 0 24 24" fill="none" className="home-quick-link-card__icon">
                    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 3.8v2.1M12 18.1v2.1M3.8 12h2.1M18.1 12h2.1M6.2 6.2l1.5 1.5M16.3 16.3l1.5 1.5M17.8 6.2l-1.5 1.5M7.7 16.3l-1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="home-quick-link-card__body">
                  <h4 className="home-quick-link-card__name">Weather Center</h4>
                  <p className="home-quick-link-card__desc">Localized forecasts, rainfall chances, and wind metrics.</p>
                </div>
              </Link>

              <Link to="/crop-advisory" className="home-quick-link-card">
                <div className="home-quick-link-card__icon-container home-quick-link-card__icon-container--crop">
                  <svg viewBox="0 0 24 24" fill="none" className="home-quick-link-card__icon">
                    <path d="M12 20V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M12 10c0-3.1 2.7-5.6 6-5.6 0 3.1-2.7 5.6-6 5.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M12 14.2c0-2.7-2.3-4.8-5.1-4.8 0 2.7 2.3 4.8 5.1 4.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="home-quick-link-card__body">
                  <h4 className="home-quick-link-card__name">Crop Advisory</h4>
                  <p className="home-quick-link-card__desc">Agricultural protocols, planting suggestions, and crop logs.</p>
                </div>
              </Link>

              <Link to="/market-prices" className="home-quick-link-card">
                <div className="home-quick-link-card__icon-container home-quick-link-card__icon-container--market">
                  <svg viewBox="0 0 24 24" fill="none" className="home-quick-link-card__icon">
                    <path d="M6 16.5 10.2 12l3 2.7L18 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 9.8h2V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="home-quick-link-card__body">
                  <h4 className="home-quick-link-card__name">Market Prices</h4>
                  <p className="home-quick-link-card__desc">Real-time trading prices, buyer demand, and market trends.</p>
                </div>
              </Link>

              <Link to="/profitability" className="home-quick-link-card">
                <div className="home-quick-link-card__icon-container home-quick-link-card__icon-container--profit">
                  <svg viewBox="0 0 24 24" fill="none" className="home-quick-link-card__icon">
                    <path d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zM12 6.5v11M9.5 9.5h4a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 0 0 3h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="home-quick-link-card__body">
                  <h4 className="home-quick-link-card__name">Profit Calculator</h4>
                  <p className="home-quick-link-card__desc">Simulate costs, estimate yields, and track farming margins.</p>
                </div>
              </Link>

              <Link to="/alerts" className="home-quick-link-card">
                <div className="home-quick-link-card__icon-container home-quick-link-card__icon-container--alerts">
                  <svg viewBox="0 0 24 24" fill="none" className="home-quick-link-card__icon">
                    <path d="M12 5.5a4 4 0 0 0-4 4v2.3c0 .8-.3 1.6-.9 2.2L6 15.2h12l-1.1-1.2c-.6-.6-.9-1.4-.9-2.2V9.5a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.2 18a2 2 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="home-quick-link-card__body">
                  <h4 className="home-quick-link-card__name">Risk & Alerts</h4>
                  <p className="home-quick-link-card__desc">Urgent pest outbreaks, high winds, or dry-spell warnings.</p>
                </div>
              </Link>

              <button onClick={triggerAIAssistant} className="home-quick-link-card text-left btn-reset">
                <div className="home-quick-link-card__icon-container home-quick-link-card__icon-container--ai">
                  <span className="home-quick-link-card__emoji-icon">🤖</span>
                </div>
                <div className="home-quick-link-card__body">
                  <h4 className="home-quick-link-card__name">Ask Shamba-AI</h4>
                  <p className="home-quick-link-card__desc">Get immediate fertilizer advice, pest diagnosis, and query solutions.</p>
                </div>
              </button>

            </div>
          </section>

          {/* Market Spotlight Panel */}
          <section className="home-market-spotlight-section">
            <div className="home-market-spotlight-header">
              <div>
                <h3 className="home-market-spotlight-title">📈 Market Spotlight</h3>
                <p className="home-market-spotlight-subtitle">Real-time crop pricing signals and trending opportunities in regional markets.</p>
              </div>
              <Link to="/market-prices" className="btn-market-more">
                View All Markets
              </Link>
            </div>

            <div className="home-market-spotlight-grid">
              {marketCrops.map((item) => (
                <div key={item.id} className="market-spotlight-item-card">
                  <div className="market-spotlight-item-card__left">
                    <span className="market-spotlight-item-card__emoji">
                      {item.crop === 'Sorghum' ? '🌾' : item.crop === 'Green grams' ? '🟢' : '🫘'}
                    </span>
                    <div>
                      <h4 className="market-spotlight-item-card__crop">{item.crop}</h4>
                      <span className="market-spotlight-item-card__market">{item.market} Market</span>
                    </div>
                  </div>
                  
                  <div className="market-spotlight-item-card__right">
                    <div className="market-spotlight-item-card__price-group">
                      <span className="market-spotlight-item-card__price">{item.price}</span>
                      <span className="market-spotlight-item-card__unit">per {item.unit}</span>
                    </div>
                    
                    <span className={`market-spotlight-item-card__change-badge market-spotlight-item-card__change-badge--${item.trend}`}>
                      {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '●'} {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Home
