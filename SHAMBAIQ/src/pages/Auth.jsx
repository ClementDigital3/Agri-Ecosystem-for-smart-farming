import React, { useState } from 'react'

const KENYAN_COUNTIES = [
  "01. Mombasa County",
  "02. Kwale County",
  "03. Kilifi County",
  "04. Tana River County",
  "05. Lamu County",
  "06. Taita Taveta County",
  "07. Garissa County",
  "08. Wajir County",
  "09. Mandera County",
  "10. Marsabit County",
  "11. Isiolo County",
  "12. Meru County",
  "13. Tharaka-Nithi County",
  "14. Embu County",
  "15. Kitui County",
  "16. Machakos County",
  "17. Makueni County",
  "18. Nyandarua County",
  "19. Nyeri County",
  "20. Kirinyaga County",
  "21. Murang'a County",
  "22. Kiambu County",
  "23. Turkana County",
  "24. West Pokot County",
  "25. Samburu County",
  "26. Trans Nzoia County",
  "27. Uasin Gishu County",
  "28. Elgeyo Marakwet County",
  "29. Nandi County",
  "30. Baringo County",
  "31. Laikipia County",
  "32. Nakuru County",
  "33. Narok County",
  "34. Kajiado County",
  "35. Kericho County",
  "36. Bomet County",
  "37. Kakamega County",
  "38. Vihiga County",
  "39. Bungoma County",
  "40. Busia County",
  "41. Siaya County",
  "42. Kisumu County",
  "43. Homa Bay County",
  "44. Migori County",
  "45. Kisii County",
  "46. Nyamira County",
  "47. Nairobi County"
]

const EAST_AFRICAN_CROPS = [
  "Maize (Mahindi)",
  "Sorghum (Mtama)",
  "Beans (Maharagwe)",
  "Cowpeas (Kunde)",
  "Pigeon Peas (Mbaazi)",
  "Green Grams (Ndengu)",
  "Finger Millet (Wimbi)",
  "Cassava (Muhogo)",
  "Sweet Potatoes (Viazi Tamu)",
  "Irish Potatoes (Viazi)",
  "Bananas (Ndizi)",
  "Rice (Mchele)",
  "Wheat (Ngano)",
  "Groundnuts (Njugu)",
  "Coffee (Kahawa)",
  "Tea (Chai)",
  "Sugarcane (Miwa)",
  "Macadamia Nuts",
  "Cashew Nuts (Korosho)",
  "Sesame (Simsim)",
  "Sunflower (Alizeti)",
  "Cotton (Pamba)"
]

function Auth({ onSignInSuccess }) {
  // authMode: 'signin' | 'signup' | 'forgot' | 'reset'
  const [authMode, setAuthMode] = useState('signin')
  
  // Sign In inputs
  const [signInPhone, setSignInPhone] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  
  // Sign Up inputs
  const [signUpName, setSignUpName] = useState('')
  const [signUpPhone, setSignUpPhone] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpFarmName, setSignUpFarmName] = useState('')
  const [signUpLocation, setSignUpLocation] = useState('15. Kitui County')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')
  const [selectedCrops, setSelectedCrops] = useState([])
  const [isOpenCrops, setIsOpenCrops] = useState(false)

  // Forgot / Reset Password inputs
  const [forgotPhone, setForgotPhone] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault()
    setError('')

    if (!signInPhone.trim() || !signInPassword.trim()) {
      setError('Please fill in all credentials.')
      return
    }

    // Default test account evaluation bypass
    if (signInPhone === '0700000000' && signInPassword === 'password') {
      const defaultUser = {
        name: 'John',
        location: '15. Kitui County',
        farmName: 'Kaveta Farm',
        phone: '0700000000',
        email: 'john@shambaiq.com'
      }
      localStorage.setItem('shambaiq_user_session', JSON.stringify(defaultUser))
      onSignInSuccess(defaultUser)
      return
    }

    // Lookup users in local db
    const usersJson = localStorage.getItem('shambaiq_users_db')
    const users = usersJson ? JSON.parse(usersJson) : []
    const matched = users.find(u => u.phone === signInPhone && u.password === signInPassword)

    if (matched) {
      const session = {
        name: matched.name,
        location: matched.location,
        farmName: matched.farmName,
        phone: matched.phone,
        email: matched.email
      }
      localStorage.setItem('shambaiq_user_session', JSON.stringify(session))
      onSignInSuccess(session)
    } else {
      setError('Incorrect phone number or password. Check credentials or register a new farmer profile!')
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!signUpName.trim() || !signUpPhone.trim() || !signUpFarmName.trim() || !signUpPassword.trim()) {
      setError('All fields except Email are required for registration.')
      return
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (signUpPassword.length < 4) {
      setError('Password must be at least 4 characters long.')
      return
    }

    if (selectedCrops.length === 0) {
      setError('Please select at least one target crop.')
      return
    }

    // Read existing users
    const usersJson = localStorage.getItem('shambaiq_users_db')
    const users = usersJson ? JSON.parse(usersJson) : []

    // Check if phone already registered
    if (users.some(u => u.phone === signUpPhone) || signUpPhone === '0700000000') {
      setError('This phone number is already registered.')
      return
    }

    const newUser = {
      name: signUpName,
      phone: signUpPhone,
      email: signUpEmail,
      farmName: signUpFarmName,
      location: signUpLocation,
      password: signUpPassword
    }

    // Save to users db
    users.push(newUser)
    localStorage.setItem('shambaiq_users_db', JSON.stringify(users))

    // Automatically sync initial farm details for onboarding testing
    const defaultFarm = {
      parcelName: signUpFarmName,
      farmSize: '2.5',
      soilType: 'Clay-Loam',
      cropMix: selectedCrops.map(c => c.split(' (')[0]).join(', ') || 'Maize, Sorghum',
      center: '1.2921 S, 36.8219 E',
      centerLatLng: { lat: -1.2921, lng: 36.8219 },
      boundaryCoords: [
        { lat: -1.2915, lng: 36.8210 },
        { lat: -1.2915, lng: 36.8228 },
        { lat: -1.2927, lng: 36.8228 },
        { lat: -1.2927, lng: 36.8210 }
      ],
      gis: {
        center: '1.2921 S, 36.8219 E',
        scale: '1:2,500',
        source: 'Google Maps Satellite Cadaster',
        updated: 'Synced via registration',
        acreage: '2.5',
        sensors: '0 Probes',
        landmarks: []
      }
    }
    localStorage.setItem('shambaiq_farm_details', JSON.stringify(defaultFarm))

    setSuccess('Registration successful! Logging you in...')
    setTimeout(() => {
      const session = {
        name: newUser.name,
        location: newUser.location,
        farmName: newUser.farmName,
        phone: newUser.phone,
        email: newUser.email
      }
      localStorage.setItem('shambaiq_user_session', JSON.stringify(session))
      onSignInSuccess(session)
    }, 1500)
  }

  const handleForgotRequest = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!forgotPhone.trim()) {
      setError('Please input your registered phone number.')
      return
    }

    // Check if phone matches default evaluation or local users
    const usersJson = localStorage.getItem('shambaiq_users_db')
    const users = usersJson ? JSON.parse(usersJson) : []
    const userExists = users.some(u => u.phone === forgotPhone) || forgotPhone === '0700000000'

    if (userExists) {
      setSuccess('Verification code sent! Code is: 1234')
      setTimeout(() => {
        setSuccess('')
        setAuthMode('reset')
      }, 1500)
    } else {
      setError('Phone number not registered. Please sign up or try again.')
    }
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!resetCode.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
      setError('Please fill out all fields.')
      return
    }

    if (resetCode !== '1234') {
      setError('Invalid verification code. Enter the code sent to your phone.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.')
      return
    }

    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters long.')
      return
    }

    // Handle default test account bypass
    if (forgotPhone === '0700000000') {
      setError('Cannot change default evaluation account password. Please sign in or register a profile!')
      return
    }

    // Reset password in local users db
    const usersJson = localStorage.getItem('shambaiq_users_db')
    const users = usersJson ? JSON.parse(usersJson) : []
    const userIndex = users.findIndex(u => u.phone === forgotPhone)

    if (userIndex !== -1) {
      users[userIndex].password = newPassword
      localStorage.setItem('shambaiq_users_db', JSON.stringify(users))
      setSuccess('Password updated successfully! Redirecting to Sign In...')
      setTimeout(() => {
        setSuccess('')
        setSignInPhone(forgotPhone)
        setSignInPassword(newPassword)
        setAuthMode('signin')
      }, 1800)
    } else {
      setError('Error resetting password. Registration profile not found.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        
        {/* Brand Header */}
        <div className="auth-card__header">
          <div className="auth-brand-logo">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="auth-logo-icon">
              <path d="M12 20V9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M12 10.1c0-3 2.5-5.3 5.6-5.3 0 3-2.5 5.3-5.6 5.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M12 14.2c0-2.6-2.1-4.5-4.8-4.5 0 2.6 2.1 4.5 4.8 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="auth-brand-title">ShambaIQ</h1>
          <p className="auth-brand-subtitle">Smart Dryland Farming & Satellite Telemetry</p>
        </div>

        {/* Tab switchers only visible in Sign In / Sign Up states */}
        {(authMode === 'signin' || authMode === 'signup') && (
          <div className="auth-tabs">
            <button 
              type="button" 
              className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
              onClick={() => { setAuthMode('signin'); setError(''); setSuccess(''); }}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => { setAuthMode('signup'); setError(''); setSuccess(''); }}
            >
              Register Profile
            </button>
          </div>
        )}

        {/* Feedback Alerts */}
        {error && <div className="auth-alert auth-alert--error">{error}</div>}
        {success && <div className="auth-alert auth-alert--success">{success}</div>}

        {/* 1. SIGN IN SCREEN */}
        {authMode === 'signin' && (
          <form className="auth-form" onSubmit={handleSignIn}>
            <div className="auth-form-group">
              <label htmlFor="signin-phone">Farmer Phone Number</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">📞</span>
                <input 
                  type="text" 
                  id="signin-phone" 
                  placeholder="e.g. 0700000000"
                  value={signInPhone}
                  onChange={(e) => setSignInPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="signin-password" style={{ margin: 0 }}>Password</label>
                <button 
                  type="button" 
                  className="auth-forgot-link" 
                  onClick={() => { setAuthMode('forgot'); setError(''); setSuccess(''); }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔑</span>
                <input 
                  type="password" 
                  id="signin-password" 
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit btn--glow">
              Sign In to ShambaIQ
            </button>

            {/* Hint Box */}
            <div className="auth-demo-hint">
              <strong>💡 Demo Evaluation Credentials:</strong>
              <div className="demo-hint-details">
                <span>Phone: <code>0700000000</code></span>
                <span>Password: <code>password</code></span>
              </div>
            </div>
          </form>
        )}

        {/* 2. REGISTER SCREEN */}
        {authMode === 'signup' && (
          <form className="auth-form" onSubmit={handleSignUp}>
            <div className="auth-form-group">
              <label htmlFor="signup-name">Farmer Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">👤</span>
                <input 
                  type="text" 
                  id="signup-name" 
                  placeholder="e.g. John Doe"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="signup-phone">Phone Number</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">📞</span>
                <input 
                  type="text" 
                  id="signup-phone" 
                  placeholder="e.g. 0712345678"
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="signup-email">Email Address (Optional)</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">✉️</span>
                <input 
                  type="email" 
                  id="signup-email" 
                  placeholder="e.g. farmer@domain.com"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="signup-farm">Farm/Shamba Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🏡</span>
                <input 
                  type="text" 
                  id="signup-farm" 
                  placeholder="e.g. Kaveta Farm"
                  value={signUpFarmName}
                  onChange={(e) => setSignUpFarmName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="signup-region">Farmer County</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">📍</span>
                <select 
                  id="signup-region"
                  value={signUpLocation}
                  onChange={(e) => setSignUpLocation(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    outline: 'none',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    fontWeight: '600',
                    cursor: 'pointer',
                    paddingRight: '1rem'
                  }}
                >
                  {KENYAN_COUNTIES.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="auth-form-group" style={{ position: 'relative' }}>
              <label>Target Crops / Crop Mix</label>
              <div className="auth-input-wrapper" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsOpenCrops(!isOpenCrops)}>
                <span className="auth-input-icon">🌾</span>
                <div style={{
                  padding: '0.65rem 0.5rem 0.65rem 0',
                  fontSize: '0.88rem',
                  color: selectedCrops.length > 0 ? '#0f172a' : '#64748b',
                  fontWeight: selectedCrops.length > 0 ? '600' : '400',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                  textAlign: 'left'
                }}>
                  {selectedCrops.length > 0 ? selectedCrops.join(', ') : 'Select crops (e.g. Maize, Beans)...'}
                </div>
                <span style={{ fontSize: '0.75rem', marginRight: '0.75rem', color: '#64748b' }}>{isOpenCrops ? '▲' : '▼'}</span>
              </div>
              
              {isOpenCrops && (
                <>
                  <div 
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} 
                    onClick={() => setIsOpenCrops(false)} 
                  />
                  <div className="glass-panel" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: '220px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    background: '#ffffff',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    marginTop: '4px',
                    padding: '0.5rem',
                    textAlign: 'left'
                  }}>
                    {EAST_AFRICAN_CROPS.map(crop => {
                      const isChecked = selectedCrops.includes(crop)
                      const handleToggleCrop = (c) => {
                        if (selectedCrops.includes(c)) {
                          setSelectedCrops(prev => prev.filter(x => x !== c))
                        } else {
                          setSelectedCrops(prev => [...prev, c])
                        }
                      }
                      return (
                        <label 
                          key={crop} 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.45rem 0.6rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            color: isChecked ? 'var(--green-deep)' : '#0f172a',
                            fontWeight: isChecked ? '800' : '400',
                            background: isChecked ? 'rgba(16, 185, 129, 0.06)' : 'transparent',
                            transition: 'all 0.15s ease',
                            margin: '2px 0'
                          }}
                          onClick={(e) => {
                            e.preventDefault()
                            handleToggleCrop(crop)
                          }}
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked} 
                            readOnly
                            style={{ 
                              accentColor: '#10b981',
                              cursor: 'pointer'
                            }} 
                          />
                          <span>{crop}</span>
                        </label>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="auth-form-row">
              <div className="auth-form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔑</span>
                  <input 
                    type="password" 
                    id="signup-password" 
                    placeholder="••••"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-confirm">Confirm</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔑</span>
                  <input 
                    type="password" 
                    id="signup-confirm" 
                    placeholder="••••"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-auth-submit btn--glow" style={{ marginTop: '0.8rem' }}>
              Create Farmer Profile
            </button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD SCREEN */}
        {authMode === 'forgot' && (
          <form className="auth-form" onSubmit={handleForgotRequest}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--green-deep)', margin: 0 }}>Forgot Password?</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem', lineHeight: '1.4' }}>
                Input your registered phone number. We will simulate sending a verification code via SMS.
              </p>
            </div>

            <div className="auth-form-group">
              <label htmlFor="forgot-phone">Phone Number</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">📞</span>
                <input 
                  type="text" 
                  id="forgot-phone" 
                  placeholder="e.g. 0712345678"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit btn--glow">
              Send SMS Verification
            </button>

            <button 
              type="button" 
              className="auth-back-btn" 
              onClick={() => { setAuthMode('signin'); setError(''); setSuccess(''); }}
            >
              ⬅ Back to Sign In
            </button>
          </form>
        )}

        {/* 4. RESET PASSWORD SCREEN */}
        {authMode === 'reset' && (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--green-deep)', margin: 0 }}>Verify Code</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem', lineHeight: '1.4' }}>
                We sent a code to your phone number. Verify the code and set your new password.
              </p>
            </div>

            <div className="auth-form-group">
              <label htmlFor="reset-code">Verification Code</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔑</span>
                <input 
                  type="text" 
                  id="reset-code" 
                  placeholder="Enter code (default: 1234)"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="reset-password">New Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔑</span>
                <input 
                  type="password" 
                  id="reset-password" 
                  placeholder="••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="reset-confirm">Confirm New Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔑</span>
                <input 
                  type="password" 
                  id="reset-confirm" 
                  placeholder="••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit btn--glow">
              Reset Password
            </button>

            <button 
              type="button" 
              className="auth-back-btn" 
              onClick={() => { setAuthMode('forgot'); setError(''); setSuccess(''); }}
            >
              ⬅ Back
            </button>
          </form>
        )}

      </div>
    </div>
  )
}

export default Auth
