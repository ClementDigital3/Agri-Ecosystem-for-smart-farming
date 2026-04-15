function FarmZoneList({ zones }) {
  return (
    <section className="farm-zone-list">
      <h3 className="farm-zone-list__title">Active Crop Zones</h3>
      <div className="farm-zone-list__grid">
        {zones.map(zone => (
          <div key={zone.id} className="farm-zone-card" data-tone={zone.tone}>
            <div className="farm-zone-card__top">
              <strong>{zone.name}</strong>
              <span className="farm-zone-card__status">{zone.status}</span>
            </div>
            <div className="farm-zone-card__detail">
              <span>Crop: {zone.crop}</span>
              <span>Perf: {zone.performanceShare}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FarmZoneList
