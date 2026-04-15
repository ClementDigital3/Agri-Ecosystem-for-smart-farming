import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function BrandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20V9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 10.1c0-3 2.5-5.3 5.6-5.3 0 3-2.5 5.3-5.6 5.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14.2c0-2.6-2.1-4.5-4.8-4.5 0 2.6 2.1 4.5 4.8 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function AppNavigation({ items }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="app-mobile-bar">
        <div className="app-mobile-brand">
          <span className="app-mobile-brand__icon">
            <BrandIcon />
          </span>
          <div>
            <span className="app-mobile-brand__kicker">Smart dryland farming</span>
            <strong className="app-mobile-brand__title">Shamba IQ</strong>
          </div>
        </div>

        <button
          type="button"
          className="app-mobile-toggle"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <div className={`app-mobile-drawer${isOpen ? ' is-open' : ''}`}>
        <button
          type="button"
          className="app-mobile-drawer__backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />

        <nav className="app-mobile-drawer__panel" aria-label="Mobile primary">
          <div className="app-mobile-drawer__header">
            <span className="app-mobile-brand__icon">
              <BrandIcon />
            </span>
            <div>
              <span className="app-mobile-brand__kicker">Navigation</span>
              <strong className="app-mobile-brand__title">Shamba IQ</strong>
            </div>
          </div>

          <div className="app-mobile-drawer__links">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `app-mobile-drawer__link${isActive ? ' active' : ''}`
                }
                onClick={closeMenu}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      <header className="app-desktop-nav">
        <div className="app-desktop-nav__brand">
          <span className="app-mobile-brand__icon">
            <BrandIcon />
          </span>
          <div>
            <span className="app-mobile-brand__kicker">Smart dryland farming</span>
            <strong className="app-mobile-brand__title">Shamba IQ</strong>
          </div>
        </div>

        <nav className="app-desktop-nav__links" aria-label="Desktop primary">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `app-desktop-nav__link${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  )
}

export default AppNavigation
