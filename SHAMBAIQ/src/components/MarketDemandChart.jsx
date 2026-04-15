function MarketDemandChart() {
  return (
    <div className="market-demand-chart">
      <div className="market-demand-chart__header">
        <div>
          <h3>Cowpeas 30-Day Futures</h3>
          <p>Highest performing commodity this week</p>
        </div>
        <div className="chart-metrics">
          <strong>+14.2%</strong>
          <span>Monthly Yield</span>
        </div>
      </div>
      <div className="market-demand-chart__canvas">
        <svg viewBox="0 0 400 150" className="chart-svg" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="25" x2="400" y2="25" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="0" y1="75" x2="400" y2="75" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="0" y1="125" x2="400" y2="125" stroke="var(--line)" strokeDasharray="4 4" />
          
          {/* Mock curve line */}
          <path 
            d="M 0 120 Q 50 130, 100 90 T 200 70 T 300 40 T 400 10" 
            fill="none" 
            stroke="var(--green-fresh)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            className="chart-path"
          />
          {/* Glow/Gradient fill under curve */}
          <path 
            d="M 0 120 Q 50 130, 100 90 T 200 70 T 300 40 T 400 10 L 400 150 L 0 150 Z" 
            fill="url(#chartGrad)" 
            opacity="0.2"
            className="chart-fill"
          />
          <defs>
            <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--green-fresh)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default MarketDemandChart
