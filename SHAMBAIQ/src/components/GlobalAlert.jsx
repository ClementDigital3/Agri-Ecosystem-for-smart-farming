import { useState, useEffect } from 'react'

function GlobalAlert() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Simulate an incoming SMS/Broadcast alert exactly 5 seconds after opening the app
    const timer = setTimeout(() => setVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="global-alert-toast slide-in-top">
      <div className="global-alert-toast__icon shake-anim">🚨</div>
      <div className="global-alert-toast__content">
        <h4>URGENT: Flash Weather Alert</h4>
        <p>Severe localized downpour projected for Kitui/Machakos corridor at 16:00. Halt chemical spraying immediately to rapidly reduce runoff risk.</p>
      </div>
      <button className="global-alert-toast__close" onClick={() => setVisible(false)}>×</button>
    </div>
  )
}

export default GlobalAlert
