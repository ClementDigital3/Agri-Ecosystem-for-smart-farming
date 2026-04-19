import React, { useState } from 'react';

const Sidebar = () => {
    return (
        <aside className="asal-sidebar" style={{ 
            width: '320px', 
            background: 'white', 
            borderRight: '2px solid var(--border)', 
            padding: '2rem',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem',
            overflowY: 'auto'
        }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.2em' }}>REGIONAL_PULSE</div>
            
            {/* Rainfall Forecast */}
            <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Rainfall Forecast</span>
                    <span>🌧️</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Upcoming:</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary)', marginTop: '0.25rem' }}>Light Rain</div>
            </div>

            {/* Drought Risk */}
            <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Drought Risk</span>
                    <span>🌡️</span>
                </div>
                <div style={{ padding: '0.5rem', background: '#fee2e2', color: '#b91c1c', fontSize: '0.75rem', fontWeight: '900', textAlign: 'center', borderRadius: '4px', border: '1px solid #fecaca' }}>
                    HIGH ALERT
                </div>
            </div>

            {/* Soil Moisture */}
            <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Soil Moisture</span>
                    <span>💧</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900' }}>19% <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>Dry</span></div>
                <div style={{ height: '4px', background: '#f1f5f9', marginTop: '0.5rem', borderRadius: '2px' }}>
                    <div style={{ width: '19%', height: '100%', background: '#3b82f6' }}></div>
                </div>
            </div>

            {/* Activity Feed */}
            <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-muted)' }}>RECENT_ALERTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                   <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.7rem' }}>
                      <span style={{ color: 'var(--primary)' }}>[DRONE]</span>
                      <span>Node SHB-102 survey complete.</span>
                   </div>
                   <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.7rem' }}>
                      <span style={{ color: 'var(--accent)' }}>[MARKET]</span>
                      <span>Maize price updated in Turkana.</span>
                   </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
