import { useEffect, useState } from 'react'

const reports = [
  { time: '1m ago', text: 'Aphid spike detected in Mutomo block.', threat: 'high' },
  { time: '4m ago', text: 'Soil moisture dip threshold reached for Sorghum.', threat: 'medium' },
  { time: '12m ago', text: 'County extension officer dispatched to Kitui South.', threat: 'info' },
  { time: '18m ago', text: 'Low-wind spray window opens in exactly 4 hours.', threat: 'low' },
  { time: '21m ago', text: 'Market spot price for Cowpeas jumped +6%.', threat: 'success' },
]

function AdvisoryTickerFeed() {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    // Automatically stagger the items in every 800ms to give a "live incoming data" feel
    reports.forEach((report, i) => {
      setTimeout(() => {
        setItems(prev => {
          if(!prev.some(item => item.time === report.time)) {
             return [report, ...prev]
          }
          return prev
        })
      }, i * 800)
    })
  }, [])

  return (
    <aside className="live-ticker-feed">
      <h3 className="section-title">Field Intelligence Feed</h3>
      <div className="feed-container">
        {items.map((item, i) => (
          <div key={i} className="feed-item slide-in-top">
            <div className="feed-meta">
              <span className={`feed-indicator threat--${item.threat}`}></span>
              <span className="feed-time">{item.time}</span>
            </div>
            <p className="feed-text">{item.text}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default AdvisoryTickerFeed
