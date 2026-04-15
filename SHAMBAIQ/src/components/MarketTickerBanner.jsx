import { getMarketPrices } from '../services/shambaService'

function MarketTickerBanner() {
  const prices = getMarketPrices()
  // Duplicate exactly 4 times to ensure a smooth infinite marquee scroll
  const repeatedPrices = [...prices, ...prices, ...prices, ...prices, ...prices, ...prices] 

  return (
    <div className="market-ticker">
      <div className="market-ticker__track">
        {repeatedPrices.map((item, i) => (
          <div key={`${item.id}-${i}`} className="ticker-item">
            <span className="ticker-crop">{item.crop.toUpperCase()}</span>
            <span className="ticker-price">{item.price}</span>
            <span className={`ticker-change ticker-trend--${item.trend}`}>
              {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '▬'} {item.change}
            </span>
          </div>
        ))}
      </div>
      <div className="market-ticker__overlay left"></div>
      <div className="market-ticker__overlay right"></div>
    </div>
  )
}

export default MarketTickerBanner
