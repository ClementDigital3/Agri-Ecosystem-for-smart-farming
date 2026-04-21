import React, { useState, useRef, useEffect } from 'react';
import './index.css';

// -----------------------------------------------------------------------------
// REUSABLE UI COMPONENTS
// -----------------------------------------------------------------------------

const InputField = ({ label, type = "text", placeholder, colSpan = 1, required = true, name, value, onChange }) => (
  <div className="input-wrapper" style={{ gridColumn: `span ${colSpan}` }}>
    <label className="input-label">{label}</label>
    {type === "select" ? (
      <select className="styled-input" name={name} value={value} onChange={onChange} required={required}>
        {placeholder.map((opt, i) => <option key={i} value={opt.val}>{opt.label}</option>)}
      </select>
    ) : (
      <input className="styled-input" name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required} />
    )}
  </div>
);

// -----------------------------------------------------------------------------
// AUTH TERMINAL COMPONENT
// -----------------------------------------------------------------------------

const AuthTerminal = ({ role, mode, onSucceed, onToggleMode, onBack }) => {
  const isFarmer = role === "farmer";
  const themeClass = isFarmer ? "env-farmer" : "env-official";
  
  const [formData, setFormData] = useState({
    name: '',
    pass: '',
    id: '',
    phone: '',
    acres: '',
    water: 'rain',
    sector: 'crops',
    ward: '',
    org: 'moa',
    level: 'national',
    designation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prototype Persistence: Store credentials in browser's local storage
    let storedUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
    
    if (mode === 'register') {
      storedUsers.push({ ...formData, role });
      localStorage.setItem('agri_users', JSON.stringify(storedUsers));
      onSucceed(role, formData);
    } else {
      const foundUser = storedUsers.find(u => u.name === formData.name && u.pass === formData.pass && u.role === role);
      if (foundUser) {
        onSucceed(role, foundUser);
      } else {
        alert("ACCESS DENIED: Identity not found in local storage. Please switch to REGISTER mode first.");
      }
    }
  };

  return (
    <div className={`glass-panel form-container animate-in ${themeClass} floating-idle dynamic-tilt`}>
      <div className="form-header">
        <button type="button" onClick={onBack} className="back-btn mono-tag">← ABORT_ACCESS</button>
        <div style={{ textAlign: 'right' }}>
          <div className="mono-tag" style={{ color: isFarmer ? 'var(--primary)' : 'var(--secondary)' }}>
            TARGET_NODE: {role.toUpperCase()}
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginTop: '0.2rem', letterSpacing: '-0.02em' }}>
            {mode === 'login' ? 'SECURE_AUTHENTICATION' : 'IDENTITY_REGISTRY'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <InputField name="name" value={formData.name} onChange={handleChange} label="FULL_LEGAL_NAME" placeholder="e.g. Samuel K. Ruto" colSpan={2} />
        <InputField name="pass" value={formData.pass} onChange={handleChange} label="PASSPHRASE" type="password" placeholder="••••••••" />

        {mode === 'register' && (
          isFarmer ? (
            <>
              <InputField name="id" value={formData.id} onChange={handleChange} label="GOVT_ID" placeholder="ID_8_DIGITS" />
              <InputField name="phone" value={formData.phone} onChange={handleChange} label="TEL_INTEL" type="tel" placeholder="+254..." />
              <InputField name="acres" value={formData.acres} onChange={handleChange} label="FARM_ACRES" type="number" placeholder="e.g. 5.5" />
              <InputField 
                name="water" value={formData.water} onChange={handleChange}
                label="WATER_NODE" 
                type="select" 
                placeholder={[{val:'rain', label:'Rain-fed'}, {val:'borehole', label:'Borehole Grid'}, {val:'irrigation', label:'Precision Irrigation'}]} 
              />
              <InputField 
                name="sector" value={formData.sector} onChange={handleChange}
                label="ASSET_SECTOR" 
                type="select" 
                placeholder={[{val:'crops', label:'Crops Node'}, {val:'livestock', label:'Livestock Unit'}, {val:'mixed', label:'Integrated Matrix'}]} 
              />
              <InputField name="ward" value={formData.ward} onChange={handleChange} label="WARD_COORD" placeholder="e.g. Mwala" />
            </>
          ) : (
            <>
              <InputField 
                name="org" value={formData.org} onChange={handleChange}
                label="ORGANIZATION_IDENTITY" 
                type="select" 
                colSpan={2}
                placeholder={[{val:'moa', label:'Ministry of Agriculture'}, {val:'county', label:'County Government'}, {val:'kalro', label:'KALRO Innovation'}, {val:'fao', label:'FAO (United Nations)'}, {val:'wfp', label:'World Food Programme'}]} 
              />
              <InputField 
                name="level" value={formData.level} onChange={handleChange}
                label="COMMAND_LEVEL" 
                type="select" 
                placeholder={[{val:'national', label:'NATIONAL_HUB'}, {val:'county', label:'COUNTY_NODE'}, {val:'ward', label:'WARD_UNIT'}]} 
              />
              <InputField name="designation" value={formData.designation} onChange={handleChange} label="OFFICIAL_DESIGNATION" placeholder="e.g. Senior Regional Auditor" colSpan={3} />
            </>
          )
        )}

        <button type="submit" className="submit-btn">
          {mode === 'login' ? 'GRANT_SECURE_ENTRY' : 'FINALIZE_STRATEGIC_REGISTRY'}
        </button>

        <button type="button" onClick={onToggleMode} className="toggle-mode-btn mono-tag">
          {mode === 'login' ? "[ IDENTITY_NOT_FOUND? INITIALIZE_NEW_NODE ]" : "[ IDENTITY_DETECTED? RESUME_SECURE_LOGIN ]"}
        </button>
      </form>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------------------------------

function App() {
  const [role, setRole] = useState(null); 
  const [userData, setUserData] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authView, setAuthView] = useState({ active: false, role: null, mode: 'login' });

  // Extremely performant exact CSS-variable mapping
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5; // range: -0.5 to 0.5
      const y = (e.clientY / innerHeight) - 0.5;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
      });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const finalizeAuth = (finalRole, data) => {
    setRole(finalRole);
    setUserData(data);
    setIsAuthorized(true);
    setAuthView({ active: false, role: null, mode: 'login' });
  };

  const enterApp = (defaultUrl, envUrl) => { 
    // Secure Handshake: Passing encoded identity to the sub-app
    const payload = btoa(JSON.stringify({ ...userData, role }));
    const baseUrl = envUrl || defaultUrl;
    window.location.href = `${baseUrl}?user=${payload}`; 
  };


  return (
    <>
      <div className="bg-layer parallax-bg" />
      <div className="overlay" />

      <div className="app-container">
        <header className="dynamic-tilt-header">
          <div>
            <div className="mono-tag" style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>SYSTEM_STATUS // ONLINE_NOMINAL</div>
            <h1 className="title-main">Agri-Ecosystem</h1>
            <div className="subtitle">
              {isAuthorized ? `ENCRYPTED_LINK_VERIFIED: ${role.toUpperCase()}` : 'AWAITING_BIOMETRIC_IDENTIFICATION...'}
            </div>
          </div>
        </header>

        <main className="main-content dynamic-3d-scene">
          {!isAuthorized ? (
            !authView.active ? (
              <div style={{ display: 'flex', gap: '4rem' }}>
                <div 
                  onClick={() => setAuthView({ active: true, role: 'farmer', mode: 'login' })}
                  className="glass-panel role-card farmer animate-in floating-idle dynamic-tilt"
                >
                  <div className="icon-wrapper">🚜</div>
                  <h2 className="card-title">FARMER</h2>
                  <div className="card-action mono-tag">ACCESS_TACTICAL_SHAMBA</div>
                </div>

                <div 
                  onClick={() => setAuthView({ active: true, role: 'official', mode: 'login' })}
                  className="glass-panel role-card official animate-in floating-idle dynamic-tilt"
                  style={{ animationDelay: '0.1s, 0s' }}
                >
                  <div className="icon-wrapper">🏛️</div>
                  <h2 className="card-title">OFFICIAL</h2>
                  <div className="card-action mono-tag">ACCESS_STRATEGIC_ASAL</div>
                </div>
              </div>
            ) : (
              <AuthTerminal 
                role={authView.role} 
                mode={authView.mode} 
                onSucceed={finalizeAuth}
                onToggleMode={() => setAuthView(prev => ({ ...prev, mode: prev.mode === 'login' ? 'register' : 'login' }))}
                onBack={() => setAuthView({ active: false, role: null, mode: 'login' })}
              />
            )
          ) : (
            <div className="animate-in" style={{ display: 'flex', gap: '3rem' }}>
              {role === 'farmer' ? (
                <div 
                  className="glass-panel role-card farmer floating-idle dynamic-tilt" 
                  style={{ width: '600px' }}
                  onClick={() => enterApp('http://localhost:5173', import.meta.env.VITE_SHAMBAIQ_URL)}
                >
                  <div className="mono-tag" style={{ color: 'var(--primary)', marginBottom: '2rem' }}>WELCOME_BACK // NODE_ACTIVE</div>
                  <h2 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '3rem' }}>ShambaIQ</h2>
                  <div className="card-action mono-tag" style={{ background: 'var(--primary)', color: '#fff', padding: '1.25rem 2rem', fontSize: '1.1rem' }}>LAUNCH_COMMAND_CENTER</div>
                </div>
              ) : (
                <>
                  <div 
                    className="glass-panel role-card official floating-idle dynamic-tilt" 
                    onClick={() => enterApp('http://localhost:5173', import.meta.env.VITE_SHAMBAIQ_URL)}
                  >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-muted)' }}>Node_Manager</h2>
                    <p className="mono-tag" style={{ marginTop: '2rem' }}>REGIONAL_AUDIT_TERMINAL</p>
                  </div>
                  <div 
                    className="glass-panel role-card official floating-idle dynamic-tilt" 
                    style={{ animationDelay: '0.1s, 0s' }}
                    onClick={() => enterApp('http://localhost:5174', import.meta.env.VITE_ASAL_URL)}
                  >
                    <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', fontWeight: '900' }}>ASAL_HUB</h2>
                    <div className="card-action mono-tag" style={{ marginTop: '2.5rem', background: 'var(--secondary)', color: '#fff', padding: '1rem 2rem' }}>OPEN_STRATEGIC_ASAL</div>
                  </div>
                </>
              )}
            </div>
          )}
        </main>

        <footer>
          <div className="mono-tag" style={{ color: 'var(--text-muted)' }}>
            🛰️ LEO_V5_ORBITAL_STATION
            <span className="pulse-dot"></span>
          </div>
          {isAuthorized && (
            <button 
              onClick={() => { setIsAuthorized(false); setRole(null); }} 
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              className="mono-tag"
            >
               TERMINATE_LINK [-]
            </button>
          )}
        </footer>
      </div>
    </>
  );
}

export default App;
