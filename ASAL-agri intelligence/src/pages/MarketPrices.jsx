import React from 'react';

const MarketPrices = () => {
  const marketData = [
    { commodity: 'Maize (90kg)', machakos: 3200, turkana: 4100, isiolo: 3800, trend: 'up' },
    { commodity: 'Sorghum (50kg)', machakos: 2400, turkana: 2900, isiolo: 2600, trend: 'down' },
    { commodity: 'Pigeon Peas (1kg)', machakos: 110, turkana: 145, isiolo: 130, trend: 'steady' },
    { commodity: 'Beans (90kg)', machakos: 8500, turkana: 9800, isiolo: 9200, trend: 'up' }
  ];

  return (
    <div className="market-intel-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Regional Market Intelligence</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Comparative arbitrage analysis and supply chain logistics tracking.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer' }}>Export CSV</button>
          <button style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Price Intervention Scan</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Comparative Table */}
          <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1rem' }}>Cross-County Pricing Matrix (KSh)</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Commodity</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Machakos</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Turkana</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Isiolo</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((row) => (
                  <tr key={row.commodity} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: '700' }}>{row.commodity}</td>
                    <td style={{ padding: '1rem' }}>{row.machakos.toLocaleString()}</td>
                    <td style={{ padding: '1rem', color: 'var(--danger)', fontWeight: '700' }}>{row.turkana.toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>{row.isiolo.toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>
                       {row.trend === 'up' ? <span style={{ color: 'var(--danger)' }}>▲ Rising</span> : 
                        row.trend === 'down' ? <span style={{ color: 'var(--secondary)' }}>▼ Dropping</span> : 
                        <span>▬ Stable</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Logistics Tracking */}
          <section className="card">
            <h3 className="card-title">Regional Logistics Intelligence</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
               <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Transport Cost Index</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>KSh 42.1 / Ton-Km</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.2rem' }}>+5.2% Fuel Surcharge</div>
               </div>
               <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Road Accessibility</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--secondary)' }}>92% Passable</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Dry weather clearways</div>
               </div>
            </div>
          </section>
        </div>

        {/* AI Economic Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <section className="card glass" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', border: 'none' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#60a5fa' }}>🤖</span> Enterprise AI Prediction
              </h3>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.6', opacity: 0.9 }}>
                "Alert: Pricing gap between Machakos and Turkana for Maize has widened to 28%. This exceeds the historical transport margin of 15%. AI recommends initiating state-buffer release to stabilize Turkana markets by July 15th."
              </p>
              <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.7rem', color: '#94a3b8' }}>
                Confidence Level: 92.4% based on 6-month historical arbitrage data.
              </div>
           </section>

           <section className="card">
              <h3 className="card-title">Storage Levels (County Depots)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                 <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                       <span>Southern Grain Depot</span>
                       <span style={{ fontWeight: '700' }}>62%</span>
                    </div>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                       <div style={{ width: '62%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                    </div>
                 </div>
                 <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                       <span>Isiolo Cold Storage</span>
                       <span style={{ fontWeight: '700' }}>14%</span>
                    </div>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                       <div style={{ width: '14%', height: '100%', background: 'var(--danger)', borderRadius: '3px' }}></div>
                    </div>
                 </div>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>Depot levels critical in Isiolo. Consider immediate restocking.</p>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
