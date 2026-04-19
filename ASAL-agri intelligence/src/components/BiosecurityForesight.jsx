import React, { useState, useEffect } from 'react';

const BiosecurityForesight = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="biosecurity-foresight card" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #fecaca', borderLeft: '6px solid #ef4444', overflow: 'hidden' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff5f5' }}>
         <h3 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '900', color: '#ef4444' }}>
           <span>💠</span> AI_BIOSECURITY_FORESIGHT
         </h3>
         <div style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: '800', fontFamily: 'Space Mono' }}>MODE: THREAT_SIMULATION_ACTIVE</div>
      </div>

      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        
        {/* Simulation Grid - Light Theme */}
        <div style={{ position: 'relative', height: '280px', background: '#f8fafc', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
           <div style={{ 
             position: 'absolute', 
             inset: 0, 
             background: 'linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px)',
             backgroundSize: '20px 20px',
             transform: 'perspective(500px) rotateX(45deg) scale(1.5)',
             transformOrigin: 'center top'
           }}></div>

           <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
             <path d="M 50 180 Q 150 80 250 40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5">
               <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
             </path>
             <circle cx="80%" cy="20%" r="20" fill="rgba(239, 68, 68, 0.05)" stroke="#ef4444" strokeWidth="1" />
           </svg>

           <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#fee2e2', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.6rem', color: '#b91c1c', border: '1px solid #fecaca', fontWeight: '800' }}>
             VECTOR: Fall Armyworm Infestation
           </div>

           <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.65rem', fontFamily: 'Space Mono', color: '#64748b', fontWeight: '800' }}>
             PROBABILITY_SCORE: {(82 + Math.sin(frame/10)*5).toFixed(1)}% | T+14_DAYS
           </div>
        </div>

        {/* Intelligence Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
           <div style={{ background: '#fff5f5', padding: '1rem', borderRadius: '4px', border: '1px solid #fecaca' }}>
             <div style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: '900', textTransform: 'uppercase', fontFamily: 'Space Mono' }}>// HIGH_RISK_SECTOR</div>
             <div style={{ fontSize: '1.2rem', fontWeight: '900', marginTop: '0.25rem' }}>Turkana East Corrdior</div>
             <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', lineHeight: '1.5' }}>
               Simulation predicts trans-border infestation from neighboring regions within 72 hours. Wind vectors aligned for rapid vector dispersal.
             </p>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#0f172a', fontWeight: '900', fontFamily: 'Space Mono' }}>INTERVENTION_PROTOCOL:</div>
              <ul style={{ fontSize: '0.75rem', color: '#475569', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <li>Activate 480 drone scouting perimeters.</li>
                 <li>Pre-deploy bio-pesticide to Lodwar logistical airlocks.</li>
                 <li>Broadcast "Phase 2 Red" alerts to node operators.</li>
              </ul>
           </div>

           <button style={{ marginTop: 'auto', background: '#ef4444', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', fontWeight: '900', cursor: 'pointer', fontSize: '0.75rem' }}>
             APPROVE PRE-EMPTIVE MEASURES
           </button>
        </div>
      </div>
    </div>
  );
};

export default BiosecurityForesight;
