import React from 'react';

const Sidebar = () => {
  return (
    <aside className="asal-sidebar" style={{
      width: 'var(--sidebar-width)',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      overflowY: 'auto'
    }}>
      <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Insights</h3>

      <div className="insight-card card" style={{ padding: '1rem', background: 'var(--primary-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Rainfall Forecast</span>
          <span>🌧️</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upcoming:</div>
        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>Light Rain</div>
      </div>

      <div className="insight-card card" style={{ padding: '1rem', borderLeft: '4px solid var(--danger)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Drought Risk</span>
          <span>🌡️</span>
        </div>
        <div style={{ 
          background: 'var(--danger)', 
          color: 'white', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '4px', 
          fontSize: '0.85rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '0.5rem'
        }}>
          HIGH ALERT
        </div>
      </div>

      <div className="insight-card card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Soil Moisture</span>
          <span>💧</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>19%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: '600' }}>Dry</div>
        </div>
        <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' }}>
          <div style={{ width: '19%', height: '100%', background: 'var(--accent)' }}></div>
        </div>
      </div>

      <div className="insight-card card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Market Update</span>
          <span>🌽</span>
        </div>
        <div style={{ fontSize: '0.75rem' }}>Maize price:</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
          <span style={{ fontWeight: '700' }}>KSh 3200</span>
          <span style={{ color: 'var(--secondary)', fontSize: '0.75rem' }}>▲ 2.4%</span>
        </div>
      </div>

      <div className="insight-card card" style={{ padding: '1rem' }}>
        <h4 style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Weather Outlook</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Wed</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>34°C</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Thu</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>36°C</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Fri</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>37°C</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
