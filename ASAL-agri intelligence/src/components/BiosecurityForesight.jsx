import React, { useState, useEffect } from 'react';

const BiosecurityForesight = () => {
  const [frame, setFrame] = useState(0);

  // Simulate AI "Processing" frames
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="biosecurity-foresight card" style={{ background: '#020617', color: '#f8fafc', border: 'none', overflow: 'hidden' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <span style={{ color: '#ec4899' }}>💠</span> AI Biosecurity Foresight
         </h3>
         <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800' }}>MODE: SIMULATION_ACTIVE</div>
      </div>

      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '1.5rem' }}>
        
        {/* Simulation Grid */}
        <div style={{ position: 'relative', height: '300px', background: '#0f172a', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
           {/* Grid Background */}
           <div style={{ 
             position: 'absolute', 
             inset: 0, 
             background: 'linear-gradient(rgba(30,58,138,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.1) 1px, transparent 1px)',
             backgroundSize: '20px 20px',
             transform: 'perspective(500px) rotateX(45deg) scale(1.5)',
             transformOrigin: 'center top'
           }}></div>

           {/* Animated Vector Nodes */}
           <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
             {/* Node 1: Origin */}
             <circle cx="20%" cy="80%" r="4" fill="#ec4899">
               <animate attributeName="r" values="4;8;4" dur="2s" infinite="true" />
               <animate attributeName="opacity" values="1;0.4;1" dur="2s" infinite="true" />
             </circle>
             {/* Vector Path */}
             <path d="M 50 200 Q 150 100 250 50" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5">
               <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
             </path>
             {/* Target Zone */}
             <circle cx="80%" cy="20%" r="20" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="1" />
           </svg>

           <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(236, 72, 153, 0.2)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.65rem', color: '#fbcfe8', border: '1px solid #ec4899' }}>
             VECTOR: Fall Armyworm Infestation Spread
           </div>

           <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.65rem', family: 'monospace', color: '#94a3b8' }}>
             PROBABILITY SCORE: {(82 + Math.sin(frame/10)*5).toFixed(1)}% | T+14 DAYS
           </div>
        </div>

        {/* Intelligence Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <div style={{ fontSize: '0.7rem', color: '#ec4899', fontWeight: '800', textTransform: 'uppercase' }}>High Risk Zone</div>
             <div style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '0.25rem' }}>Turkana East</div>
             <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>Simulated infestation spread from Marsabit crossing the border within 96 hours.</p>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800' }}>AI INTERVENTION STRATEGY:</div>
             <ul style={{ fontSize: '0.75rem', color: '#cbd5e1', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Pre-deploy 450 liters of bio-pesticide to Lodwar depot.</li>
                <li>Activate drone-scouting perimeter in Kerio Valley.</li>
                <li>Broadcast "Phase 2 Vigilance" SMS to 2,400 farmers.</li>
             </ul>
           </div>

           <button style={{ marginTop: 'auto', background: '#ec4899', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
             APPROVE PRE-EMPTIVE MEASURES
           </button>
        </div>
      </div>
    </div>
  );
};

export default BiosecurityForesight;
