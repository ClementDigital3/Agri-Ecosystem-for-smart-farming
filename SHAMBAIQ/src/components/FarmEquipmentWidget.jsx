function FarmEquipmentWidget({ equipment }) {
  return (
    <section className="farm-equipment-widget">
      <h3 className="farm-equipment-widget__title">Fleet & Infrastructure</h3>
      <ul className="farm-equipment-list">
        {equipment.map(item => (
          <li key={item.name} className="farm-equipment-item">
            <div className="farm-equipment-item__heading">
              <strong>{item.name}</strong>
              <span className={`farm-equipment-item__status status--${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
            <p className="farm-equipment-item__meta">
              {item.fuel && <span>Fuel: {item.fuel}</span>}
              {item.flow && <span>Flow: {item.flow}</span>}
              {item.battery && <span>Battery: {item.battery}</span>}
              <span> • Loc: {item.location}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FarmEquipmentWidget
