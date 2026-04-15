function MarketTradingBoard({ prices }) {
  // Generate random SVG sparkline for each crop to simulate a real-time graph
  const generateSparkline = (trend) => {
    let startY = trend === 'up' ? 25 : trend === 'down' ? 5 : 15
    let currentY = startY
    let path = `M 0 ${currentY}`
    for(let i=1; i<=10; i++) {
        let volatility = (Math.random() - 0.5) * 8
        let verticalBias = trend === 'up' ? -2 : trend === 'down' ? 2 : 0
        currentY = Math.max(2, Math.min(28, currentY + volatility + verticalBias))
        path += ` L ${i*10} ${currentY}`
    }
    return (
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="sparkline-svg">
        <path d={path} vectorEffect="non-scaling-stroke" />
      </svg>
    )
  }

  return (
    <div className="market-trading-grid">
      {prices.map((item) => (
        <div key={item.id} className="commodity-card glass-panel">
          <div className="commodity-card__header">
            <h4>{item.crop}</h4>
            <div className={`trade-signal signal--${item.trend}`}>
              <span className="pulse-dot"></span>
              {item.trend === 'up' ? 'HIGH DEMAND' : item.trend === 'down' ? 'OVERSUPPLY' : 'STABLE'}
            </div>
          </div>
          
          <div className="commodity-card__body">
            <div className="price-block">
              <span className="price-massive">{item.price}</span>
              <span className="price-meta">/ {item.unit} @ {item.market}</span>
            </div>
            <div className={`price-change gradient-text--${item.trend}`}>
              {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '▬'} {item.change} (24h)
            </div>
          </div>
          
          <div className={`commodity-card__sparkline line--${item.trend}`}>
            {generateSparkline(item.trend)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MarketTradingBoard
