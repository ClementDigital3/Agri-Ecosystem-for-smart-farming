import React from 'react';
import AppSwitcher from './AppSwitcher';

function NotificationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5.5a4 4 0 0 0-4 4v2.3c0 .8-.3 1.6-.9 2.2L6 15.2h12l-1.1-1.2c-.6-.6-.9-1.4-.9-2.2V9.5a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2 18a2 2 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SeedlingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20V9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 10.1c0-3 2.5-5.3 5.6-5.3 0 3-2.5 5.3-5.6 5.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14.2c0-2.6-2.1-4.5-4.8-4.5 0 2.6 2.1 4.5 4.8 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function DashboardTopBar({ title, subtitle, status, notificationCount }) {
  return (
    <header className="dashboard-topbar">
      <div className="dashboard-brand-panel">
        <span className="dashboard-brand-mark">
          <SeedlingIcon />
        </span>

        <div className="dashboard-brand">
          <span className="dashboard-brand__kicker">{subtitle}</span>
          <div className="dashboard-brand__row">
            <h1 className="dashboard-brand__title">{title}</h1>
            {status ? <span className="dashboard-brand__status">{status}</span> : null}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          className="dashboard-notification"
          aria-label={`${notificationCount} notifications`}
        >
          <NotificationIcon />
          <span className="dashboard-notification__badge">{notificationCount}</span>
        </button>
        
        {/* Global Ecosystem Switcher */}
        <AppSwitcher currentApp="shambaiq" />
      </div>
    </header>
  )
}

export default DashboardTopBar
