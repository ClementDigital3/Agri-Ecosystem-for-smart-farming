import { useState, useEffect } from 'react'

function SmsBroadcastConsole() {
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState([])
  const [targetGroup, setTargetGroup] = useState('All Farm Hands')
  const [message, setMessage] = useState('CRITICAL: Localized heat stress detected in South Block. Mulching protocol 4 required immediately. - ShambaIQ')

  const groups = ['All Farm Hands', 'Zone Managers', 'Irrigation Team', 'Veterinary Services']

  const handleBroadcast = () => {
    setIsBroadcasting(true)
    setProgress(0)
    setLog([{ id: 1, text: '🔐 Encrypting transmission...', type: 'sys' }])
  }

  useEffect(() => {
    if (isBroadcasting && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 10)
        
        // Add pseudo-logs
        if (progress === 20) setLog(l => [...l, { id: 2, text: `📡 Handshaking with Safaricom/Airtel...`, type: 'info' }])
        if (progress === 40) setLog(l => [...l, { id: 3, text: `👥 Target: 12 recipients in "${targetGroup}"`, type: 'info' }])
        if (progress === 70) setLog(l => [...l, { id: 4, text: `📤 Outbound: [${message.substring(0, 15)}...]`, type: 'sms' }])
        if (progress === 90) setLog(l => [...l, { id: 5, text: `✅ Distributed successfully.`, type: 'success' }])
      }, 400)
      return () => clearTimeout(timer)
    } else if (progress >= 100) {
      setTimeout(() => setIsBroadcasting(false), 2000)
    }
  }, [isBroadcasting, progress, targetGroup, message])

  return (
    <div className="sms-broadcast-console glass-panel">
      <div className="sms-broadcast-console__header">
        <div className="header-icon">📡</div>
        <div>
          <h4>Emergency SMS Gateway</h4>
          <p>Direct bridge to local cellular networks</p>
        </div>
      </div>

      <div className="sms-broadcast-console__body">
        <div className="input-group">
          <label>Target Recipients</label>
          <select 
            value={targetGroup} 
            onChange={(e) => setTargetGroup(e.target.value)}
            disabled={isBroadcasting}
          >
            {groups.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="input-group">
          <label>Emergency Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isBroadcasting}
            rows="3"
          />
        </div>

        <button 
          className={`broadcast-btn ${isBroadcasting ? 'is-active' : ''}`}
          onClick={handleBroadcast}
          disabled={isBroadcasting}
        >
          {isBroadcasting ? `SENDING... ${progress}%` : 'INITIATE BROADCAST'}
        </button>

        {isBroadcasting && (
          <div className="broadcast-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {log.length > 0 && (
          <div className="broadcast-log">
             {log.map(item => (
               <div key={item.id} className={`log-entry log-entry--${item.type}`}>
                 {item.text}
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SmsBroadcastConsole
