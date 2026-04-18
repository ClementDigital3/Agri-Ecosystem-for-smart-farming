import { useState, useEffect } from 'react'

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true) // assume online by default for SSR/SSG
  const [showBackOnline, setShowBackOnline] = useState(false)

  useEffect(() => {
    // Only access navigator safely on client mount
    setIsOnline(navigator.onLine)

    const handleOffline = () => setIsOnline(false)
    const handleOnline = () => {
      setIsOnline(true)
      setShowBackOnline(true)
      setTimeout(() => setShowBackOnline(false), 4000) // hide after 4s
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (isOnline && !showBackOnline) return null;

  return (
    <div className={`network-status-toast ${!isOnline ? 'is-offline' : 'is-online'} slide-in-top`}>
      <span className="network-icon">{!isOnline ? '📡' : '⚡'}</span>
      <div className="network-content">
        <strong>{!isOnline ? 'Offline Mode Active' : 'Connection Restored'}</strong>
        <p>{!isOnline ? 'Data is operating from local cache.' : 'Syncing with ShambaIQ server...'}</p>
      </div>
    </div>
  )
}

export default NetworkStatus
