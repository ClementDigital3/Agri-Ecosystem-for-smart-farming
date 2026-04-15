import PageHeader from '../components/PageHeader'
import FarmMapViewer from '../components/FarmMapViewer'
import FarmZoneList from '../components/FarmZoneList'
import FarmEquipmentWidget from '../components/FarmEquipmentWidget'
import { getMyFarmData } from '../services/shambaService'

function MyFarm() {
  const farm = getMyFarmData()

  return (
    <section className="page-stack farm-screen">
      <PageHeader
        eyebrow="Farm Management"
        title={farm.parcelName}
        subtitle="GIS Boundary & Zone Control"
        accent="crop"
        stats={[
          { label: 'Total Size', value: farm.farmSize },
          { label: 'Active Zones', value: farm.fieldMap.zones.length },
          { label: 'Sensors Online', value: '3 Nodes' },
        ]}
      />

      <div className="farm-dashboard-columns">
        <div className="farm-dashboard-columns__main">
          <FarmMapViewer fieldMap={farm.fieldMap} />
        </div>
        <aside className="farm-dashboard-columns__aside">
          <FarmZoneList zones={farm.fieldMap.zones} />
          <FarmEquipmentWidget equipment={farm.equipment} />
        </aside>
      </div>
    </section>
  )
}

export default MyFarm
