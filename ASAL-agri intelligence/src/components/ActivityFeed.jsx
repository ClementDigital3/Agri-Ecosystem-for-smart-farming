import React from 'react';

const ActivityFeed = () => {
  const events = [
    { time: '10:42', type: 'Drone', msg: 'Node SHB-102: Drone survey complete in Machakos North.', icon: '🛰️' },
    { time: '09:15', type: 'Market', msg: 'Maize price updated in Turkana central depot.', icon: '📉' },
    { time: '08:30', type: 'System', msg: 'Satellite sync successful: METEOSAT-9.', icon: '📡' },
    { time: '07:45', type: 'Alert', msg: 'Drought advisory broadcast to 14,000 subscribers.', icon: '📢' },
    { time: '06:00', type: 'System', msg: 'Daily regional moisture average calculated: 14.8%.', icon: '💧' }
  ];

  return (
    <div className="activity-feed card" style={{ padding: '1.25rem' }}>
      <h3 className="card-title" style={{ marginBottom: '1rem' }}>Regional Activity</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {events.map((event, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '1.2rem', marginTop: '2px' }}>{event.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)' }}>{event.type} <span style={{ color: 'var(--text-muted)', fontWeight: '400', marginLeft: '0.4rem' }}>{event.time}</span></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text)', lineHeight: '1.4', marginTop: '0.1rem' }}>{event.msg}</div>
            </div>
          </div>
        ))}
      </div>
      <button style={{ width: '100%', marginTop: '1.25rem', padding: '0.5rem', borderRadius: '8px', border: 'none', background: '#f1f5f9', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>View System Logs</button>
    </div>
  );
};

export default ActivityFeed;
