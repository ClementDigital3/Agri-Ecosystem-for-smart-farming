function GlobalFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer__content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-leaf">🌱</span>
            <h4>ShambaIQ</h4>
          </div>
          <p>Precision agronomic intelligence and algorithmic yield tracking for Eastern Africa's drylands.</p>
        </div>
        
        <div className="footer-links-grid">
          <div className="link-column">
            <strong>Engine</strong>
            <a href="#">Satellite Mapping</a>
            <a href="#">Financial Markets</a>
            <a href="#">AI Diagnostics</a>
          </div>
          <div className="link-column">
            <strong>Farmers</strong>
            <a href="#">Agrovet Network</a>
            <a href="#">USSD Service (*456#)</a>
            <a href="#">Contact Agent</a>
          </div>
        </div>
      </div>
      
      <div className="global-footer__bottom">
        <div className="tech-badge">
          <span className="pulse-dot server-status"></span>
          Connected to Node.js / Open-Meteo
        </div>
        <span className="copyright">&copy; {new Date().getFullYear()} ShambaIQ Systems</span>
      </div>
    </footer>
  )
}

export default GlobalFooter
