import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import MarketTradingBoard from '../components/MarketTradingBoard'
import MarketDemandChart from '../components/MarketDemandChart'
import MarketTrendRunner from '../components/MarketTrendRunner'
import { getMarketPrices } from '../services/shambaService'

function MarketPrices() {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const prices = getMarketPrices(selectedRegion)

  const sparkline = (pts) => (
    <svg width="100" height="30" style={{ padding: '4px' }}>
      <path d={pts} fill="none" stroke="#2ecc71" strokeWidth="2" />
    </svg>
  );

  return (
    <section className="page-stack market-screen theme-light-finance">
      {/* Fixed Market Runner */}
      <MarketTrendRunner />
      
      <div className="market-wrapper" style={{ marginTop: '3rem' }}>
        <PageHeader
          eyebrow="Market Exchange"
          title="Live Order Book"
          subtitle="Real-time predictive pricing & algorithmic volatility maps."
          accent="market"
          stats={[
            { label: 'Hubs Indexed', value: '14 Active' },
            { label: 'Top Performer', value: 'Cowpeas' },
            { label: 'Volatility', value: 'Low-Med' },
          ]}
        />

        <div className="market-dashboard-spread">
          
          <div className="market-projections-grid">
             <MarketDemandChart />
             
             {/* Trend Analysis Card */}
             <div className="card" style={{ padding: '1.5rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: '#94a3b8' }}>7-Day Yield Projections</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {[
                     { name: 'Maize', trend: 'M0,25 L20,15 L40,20 L60,5 L80,10 L100,2', current: '+12%' },
                     { name: 'Cowpeas', trend: 'M0,10 L20,5 L40,15 L60,25 L80,20 L100,15', current: '+4%' },
                     { name: 'Sorghum', trend: 'M0,15 L20,18 L40,12 L60,20 L80,25 L100,28', current: '-2%' }
                   ].map(item => (
                     <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{item.name}</span>
                        {sparkline(item.trend)}
                        <span style={{ fontSize: '0.8rem', color: item.current.startsWith('+') ? '#2ecc71' : '#f87171' }}>{item.current}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="market-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Regional Spot Prices</h3>
              <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>Live trading floors across East African hubs.</p>
            </div>
            
            <div className="market-filter-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="market-region-select" style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', marginRight: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Region Hub:</label>
              <select 
                id="market-region-select" 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#0f172a',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <option value="all">🌐 All East Africa</option>
                <option value="kenya-rift">🌾 Kenya - Rift Valley</option>
                <option value="kenya-central">🏙️ Kenya - Central (Nairobi)</option>
                <option value="kenya-eastern">☀️ Kenya - ASAL (Eastern)</option>
                <option value="uganda">🇺🇬 Uganda Hubs</option>
                <option value="tanzania">🇹🇿 Tanzania Hubs</option>
              </select>
            </div>
          </div>
          <MarketTradingBoard prices={prices} />
        </div>
      </div>
    </section>
  )
}

export default MarketPrices
