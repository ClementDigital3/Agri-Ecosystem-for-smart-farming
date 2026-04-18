import { Link } from 'react-router-dom'

function CropIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 10c0-3.1 2.7-5.6 6-5.6 0 3.1-2.7 5.6-6 5.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14.2c0-2.7-2.3-4.8-5.1-4.8 0 2.7 2.3 4.8 5.1 4.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5.5a4 4 0 0 0-4 4v2.3c0 .8-.3 1.6-.9 2.2L6 15.2h12l-1.1-1.2c-.6-.6-.9-1.4-.9-2.2V9.5a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2 18a2 2 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MarketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 16.5 10.2 12l3 2.7L18 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9.8h2V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function FarmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 18v-6.5L12 7l6 4.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18v-3.5h4V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FinanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zM12 6.5v11M9.5 9.5h4a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 0 0 3h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const icons = {
  crop: CropIcon,
  alerts: AlertIcon,
  market: MarketIcon,
  farm: FarmIcon,
  finance: FinanceIcon,
}

function QuickActionCard({ title, detail, badge, icon, route, tone }) {
  const Icon = icons[icon]

  return (
    <Link className={`quick-action-card quick-action-card--${tone ?? icon}`} to={route}>
      <div className="quick-action-card__top">
        <span className="quick-action-card__icon">
          <Icon />
        </span>
        <span className="quick-action-card__arrow">
          <ArrowIcon />
        </span>
      </div>

      <div className="quick-action-card__body">
        <span className="quick-action-card__badge">{badge}</span>
        <h3 className="quick-action-card__title">{title}</h3>
        <p className="quick-action-card__detail">{detail}</p>
      </div>
    </Link>
  )
}

export default QuickActionCard
