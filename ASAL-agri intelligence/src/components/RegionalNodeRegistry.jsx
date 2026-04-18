import React from 'react';

const RegionalNodeRegistry = ({ activeRegion }) => {
  const farmNodes = {
    'Machakos': [
      { id: 'SHB-102', owner: 'Kyalo M.', status: 'Healthy', moisture: '21%', drone: 'Active' },
      { id: 'SHB-405', owner: 'Sarah W.', status: 'Stressed', moisture: '14%', drone: 'Grounded' },
      { id: 'SHB-912', owner: 'John P.', status: 'Healthy', moisture: '24%', drone: 'Active' }
    ],
    'Turkana': [
      { id: 'SHB-001', owner: 'Ekal E.', status: 'Crisis', moisture: '4%', drone: 'Scanning' },
      { id: 'SHB-012', owner: 'Linet L.', status: 'Critical', moisture: '7%', drone: 'Active' }
    ],
    'Isiolo': [
      { id: 'SHB-662', owner: 'Hassan A.', status: 'Healthy', moisture: '19%', drone: 'Standby' },
      { id: 'SHB-712', owner: 'Maria O.', status: 'Alert', moisture: '12%', drone: 'Active' }
    ]
  };

  const currentNodes = farmNodes[activeRegion] || [];

  return (
    <div className="farm-node-registry card">
      <h3 className="card-title">
        Regional Farm Nodes
        <span style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'var(--primary-soft)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>ShambaIQ Sync</span>
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {currentNodes.map((node) => (
          <div key={node.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#f8fafc', 
            padding: '0.85rem', 
            borderRadius: '12px',
            border: '1px solid #f1f5f9'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>{node.id} — {node.owner}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Moisture: {node.moisture} | Drone: <span style={{ color: node.drone === 'Active' ? 'var(--secondary)' : 'var(--text-muted)' }}>{node.drone}</span>
              </div>
            </div>
            <div style={{ 
              fontSize: '0.65rem', 
              fontWeight: '900', 
              textTransform: 'uppercase',
              color: node.status === 'Healthy' ? 'var(--secondary)' : node.status === 'Crisis' ? 'var(--danger)' : 'var(--accent)',
              background: node.status === 'Healthy' ? 'var(--secondary-soft)' : node.status === 'Crisis' ? '#fef2f2' : 'var(--primary-soft)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px'
            }}>
              {node.status}
            </div>
          </div>
        ))}
      </div>
      
      <button style={{ 
        width: '100%', 
        marginTop: '1rem', 
        padding: '0.6rem', 
        borderRadius: '8px', 
        background: 'transparent', 
        border: '1px solid var(--border)', 
        color: 'var(--text-muted)', 
        fontSize: '0.75rem', 
        fontWeight: '700', 
        cursor: 'pointer' 
      }}>
        Audit Platform Logs
      </button>
    </div>
  );
};

export default RegionalNodeRegistry;
