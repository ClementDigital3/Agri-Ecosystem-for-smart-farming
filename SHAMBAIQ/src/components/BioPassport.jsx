import React from 'react';

const BioPassport = ({ cropName, grade, healthScore }) => {
  return (
    <div className="bio-passport-card" style={{ 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
      borderRadius: '20px', 
      padding: '2rem', 
      color: 'white',
      border: '1px solid rgba(52, 211, 153, 0.3)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Security Watermark */}
      <div style={{ 
        position: 'absolute', 
        top: '-20px', 
        right: '-20px', 
        fontSize: '8rem', 
        opacity: 0.05, 
        transform: 'rotate(20deg)' 
      }}>🧬</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
           <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: '800', letterSpacing: '0.2rem' }}>BIO-TRACEABILITY PASSPORT</div>
           <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>{cropName}</h2>
           <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>LOT_ID: #SHB-TRACE-2026-X44</div>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#34d399' }}>{grade}</div>
           <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>CERTIFIED_QUALITY</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>HEALTH_INDEX</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{healthScore}%</div>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '0.5rem', borderRadius: '2px' }}>
            <div style={{ width: `${healthScore}%`, height: '100%', background: '#34d399' }}></div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>WATER_PURITY</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>94.2%</div>
          <div style={{ fontSize: '0.6rem', color: '#34d399', marginTop: '0.2rem' }}>[BIO_SECURE]</div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'monospace' }}>
          VERIFIED_BY: ASAL_SATELLITE_ORBITA_4 <br/>
          BLOCKCHAIN_HASH: x4882...99a
        </div>
        <button style={{ 
          background: '#34d399', 
          color: '#0f172a', 
          border: 'none', 
          padding: '0.6rem 1.2rem', 
          borderRadius: '8px', 
          fontWeight: '900', 
          fontSize: '0.75rem',
          cursor: 'pointer'
        }}>
          EXPORT CERTIFICATE
        </button>
      </div>
    </div>
  );
};

export default BioPassport;
