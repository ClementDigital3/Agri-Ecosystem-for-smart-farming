import { useState, useEffect } from 'react'

function GlobalAlert({
  title = "URGENT: Flash Weather Alert",
  message = "Severe localized downpour projected for Kitui/Machakos corridor at 16:00. Halt chemical spraying immediately to rapidly reduce runoff risk.",
  delayMs = 5000,
  icon = "🚨"
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show the alert after the specified delay
    const timer = setTimeout(() => setVisible(true), delayMs)
    return () => clearTimeout(timer)
  }, [delayMs])

  if (!visible) return null

  return (
    <div className="global-alert-toast slide-in-top">
      <div className="global-alert-toast__icon shake-anim">{icon}</div>
      <div className="global-alert-toast__content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
      <button className="global-alert-toast__close" onClick={() => setVisible(false)}>×</button>
    </div>
  )
}

export default GlobalAlert
