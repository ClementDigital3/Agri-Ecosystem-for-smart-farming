import PageHeader from '../components/PageHeader'
import MarketTradingBoard from '../components/MarketTradingBoard'
import MarketDemandChart from '../components/MarketDemandChart'
import MarketTickerBanner from '../components/MarketTickerBanner'
import { getMarketPrices } from '../services/shambaService'

function MarketPrices() {
  const prices = getMarketPrices()

  return (
    <section className="page-stack market-screen theme-dark-finance">
      <MarketTickerBanner />
      
      <div className="market-wrapper">
        <PageHeader
          eyebrow="Market Exchange"
          title="Live Order Book"
          subtitle="Real-time predictive pricing & algorithmic volatility maps."
          accent="market"
          stats={[
            { label: 'Hubs Indexed', value: '14 Active' },
            { label: 'Top Performer', value: 'Cowpeas' },
            { label: 'Volatility', value: 'High' },
          ]}
        />

        <div className="market-dashboard-spread">
          <MarketDemandChart />
          <div className="market-section-title">
            <h3>Regional Spot Prices</h3>
            <p>Live trading floors across Eastern hubs.</p>
          </div>
          <MarketTradingBoard prices={prices} />
        </div>
      </div>
    </section>
  )
}

export default MarketPrices
