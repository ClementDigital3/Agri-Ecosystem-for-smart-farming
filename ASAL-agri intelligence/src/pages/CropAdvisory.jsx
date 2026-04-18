import React from 'react';

const CropAdvisory = () => {
  const recommendations = [
    { crop: 'Sorghum', yield: 'High', water: 'Low', market: 'Stable', suitability: 95 },
    { crop: 'Pigeon Peas', yield: 'Moderate', water: 'Very Low', market: 'High', suitability: 88 },
    { crop: 'Green Grams', yield: 'High', water: 'Moderate', market: 'Fluctuating', suitability: 72 },
    { crop: 'Cowpeas', yield: 'Moderate', water: 'Low', market: 'Stable', suitability: 82 }
  ];

  return (
    <div className="crop-advisory-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Regional Crop Advisory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Strategic cultivation guidance based on 30-day regional climate forecasts.</p>
        </div>
        <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Generate Regional Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Suitability Matrix */}
          <section className="card">
            <h3 className="card-title">Crop Suitability Matrix</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {recommendations.map(item => (
                <div key={item.crop} className="glass" style={{ padding: '1.25rem', borderRadius: '15px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem' }}>{item.crop}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--secondary)', background: 'var(--secondary-soft)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>{item.suitability}% Match</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Yield Potential</span>
                      <span style={{ fontWeight: '700' }}>{item.yield}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Water Demand</span>
                      <span style={{ fontWeight: '700', color: item.water === 'Very Low' ? 'var(--secondary)' : 'var(--text)' }}>{item.water}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Market Demand</span>
                      <span style={{ fontWeight: '700' }}>{item.market}</span>
                    </div>
                  </div>
                  <button style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--primary)', background: 'transparent', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}>View Cultivation Guide</button>
                </div>
              ))}
            </div>
          </section>

          {/* Climate Adaptation Strategies */}
          <section className="card">
            <h3 className="card-title">Climate Adaptation Strategies</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Conservation Tillage</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Minimize soil disturbance to preserve moisture and organic matter. Recommended for Northern Machakos regions with high evaporation rates.</p>
               </div>
               <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Integrated Pest Management</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Early-season scout for Fall Armyworm in Sorghum clusters. Synchronized county-wide spraying is advised for July.</p>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar Intelligence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Advisory Reach</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>14,204</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Farmers Reached (SMS/Radio)</div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginTop: '0.5rem' }}>
                  <div style={{ width: '75%', height: '100%', background: 'white' }}></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>82%</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Strategy Adoption Rate</div>
              </div>
            </div>
          </section>

          <section className="card">
            <h3 className="card-title">Seed Distributions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', fontSize: '0.8rem', alignItems: 'center' }}>
                  <span>Sorghum Seeds (Machakos)</span>
                  <span style={{ fontWeight: '700' }}>4.2 Tons</span>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', fontSize: '0.8rem', alignItems: 'center' }}>
                  <span>Drought-Resistant Maize</span>
                  <span style={{ fontWeight: '700' }}>2.1 Tons</span>
               </div>
               <button style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '8px', background: '#f1f5f9', border: 'none', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>Manage Stock</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CropAdvisory;
