import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import FarmMapViewer from '../components/FarmMapViewer'
import FarmZoneList from '../components/FarmZoneList'
import FarmEquipmentWidget from '../components/FarmEquipmentWidget'
import BioPassport from '../components/BioPassport'
import GoogleMapsSyncModal from '../components/GoogleMapsSyncModal'

function MyFarm() {
  // Track farm parcel registry details in state
  const [farmDetails, setFarmDetails] = useState(() => {
    const saved = localStorage.getItem('shambaiq_farm_details')
    return saved ? JSON.parse(saved) : null
  })

  // Track farm crop blocks/zones in state
  const [zones, setZones] = useState(() => {
    const saved = localStorage.getItem('shambaiq_zones')
    return saved ? JSON.parse(saved) : []
  })

  // Track registered implements/machinery in state
  const [implementsList, setImplementsList] = useState(() => {
    const saved = localStorage.getItem('shambaiq_implements')
    return saved ? JSON.parse(saved) : []
  })

  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  // Add implement form states
  const [showAddImplement, setShowAddImplement] = useState(false)
  const [newImpName, setNewImpName] = useState('')
  const [newImpStatus, setNewImpStatus] = useState('Idle')
  const [newImpDetail, setNewImpDetail] = useState('')

  // Persist states to local storage
  useEffect(() => {
    if (farmDetails) {
      localStorage.setItem('shambaiq_farm_details', JSON.stringify(farmDetails))
    } else {
      localStorage.removeItem('shambaiq_farm_details')
    }
  }, [farmDetails])

  useEffect(() => {
    if (zones.length > 0) {
      localStorage.setItem('shambaiq_zones', JSON.stringify(zones))
    } else {
      localStorage.removeItem('shambaiq_zones')
    }
  }, [zones])

  useEffect(() => {
    if (implementsList.length > 0) {
      localStorage.setItem('shambaiq_implements', JSON.stringify(implementsList))
    } else {
      localStorage.removeItem('shambaiq_implements')
    }
  }, [implementsList])

  const handleAddZone = (newZone) => {
    setZones(prev => [...prev, newZone])
    
    // Auto-generate landmark (sensor probe) at the center of the new crop zone!
    let sumLat = 0, sumLng = 0
    newZone.coords.forEach(pt => {
      sumLat += pt.lat
      sumLng += pt.lng
    })
    const lat = sumLat / newZone.coords.length
    const lng = sumLng / newZone.coords.length

    setFarmDetails(prev => {
      if (!prev) return prev
      const newLandmark = {
        id: 'node-' + Date.now(),
        label: `${newZone.crop} Probe`,
        lat,
        lng,
        kind: 'sensor'
      }
      const existingLandmarks = prev.gis?.landmarks || []
      return {
        ...prev,
        gis: {
          ...prev.gis,
          sensors: `${existingLandmarks.length + 1} Probes`,
          landmarks: [...existingLandmarks, newLandmark]
        }
      }
    })
  }

  // Handle successful Google Maps sync completion
  const handleSyncComplete = (syncedFarm) => {
    setFarmDetails({
      parcelName: syncedFarm.parcelName,
      farmSize: syncedFarm.farmSize,
      soilType: syncedFarm.soilType,
      cropMix: syncedFarm.cropMix,
      center: syncedFarm.center,
      centerLatLng: syncedFarm.centerLatLng,
      boundaryCoords: syncedFarm.boundaryCoords,
      gis: {
        center: syncedFarm.center,
        scale: '1:2,500',
        source: 'Google Maps Satellite Cadaster',
        updated: 'Just now',
        acreage: syncedFarm.farmSize,
        sensors: '0 Probes',
        landmarks: []
      }
    })
    setZones([])
    setImplementsList([])
    setIsMapModalOpen(false)
  }

  // Allow resetting/deleting the farm to test the empty onboarding states
  const handleDeleteFarm = () => {
    if (window.confirm("Are you sure you want to delete this farm parcel? This will clear all local blocks and telemetry syncing.")) {
      setFarmDetails(null)
      setZones([])
      setImplementsList([])
      localStorage.removeItem('shambaiq_farm_details')
      localStorage.removeItem('shambaiq_zones')
      localStorage.removeItem('shambaiq_implements')
    }
  }

  const handleAddImplement = (e) => {
    e.preventDefault()
    if (!newImpName.trim()) return
    const newImp = {
      id: 'imp-' + Date.now(),
      name: newImpName,
      status: newImpStatus,
      detail: newImpDetail
    }
    setImplementsList(prev => [...prev, newImp])
    setNewImpName('')
    setNewImpDetail('')
    setShowAddImplement(false)
  }

  const handleDeleteImplement = (id) => {
    setImplementsList(prev => prev.filter(imp => imp.id !== id))
  }

  // Dynamically calculate statistics
  const totalAcreage = zones.reduce((sum, z) => sum + (Number(z.acreage) || 0), 0).toFixed(1) + ' acres'

  // Group the active zones by crop to display dynamic rating cards
  const uniqueCrops = Array.from(new Set(zones.map(z => z.crop)))
  const cropPassports = uniqueCrops.map(crop => {
    const cropZones = zones.filter(z => z.crop === crop)
    let totalScore = 0
    cropZones.forEach(z => {
      if (z.status === 'Stable') totalScore += 95
      else if (z.status === 'Monitor') totalScore += 75
      else totalScore += 45
    })
    const avgScore = Math.round(totalScore / cropZones.length)
    const grade = avgScore >= 90 ? 'A+' : (avgScore >= 70 ? 'B' : 'C-')
    return { crop, score: avgScore, grade }
  })

  // Render onboarding empty state if no farm registered
  if (!farmDetails) {
    return (
      <section className="page-stack farm-screen farm-screen--empty">
        <PageHeader
          eyebrow="Onboarding Portal"
          title="Field Boundary Sync"
          subtitle="Link your coordinates to deploy local weather models and sensor hubs."
          accent="crop"
        />

        <div className="onboarding-landing-card glass-panel">
          <div className="onboarding-landing-card__graphics">🗺️</div>
          <h2>No Farm Connected</h2>
          <p>
            You currently have no registered farm parcel linked to your profile. 
            To begin tracing boundaries, tracking crop block metrics, and deploying IoT probes, connect your property using Google Maps satellite sync.
          </p>
          <button 
            className="connect-maps-btn"
            onClick={() => setIsMapModalOpen(true)}
          >
            🗺️ Connect via Google Maps Satellite Sync
          </button>
        </div>

        <GoogleMapsSyncModal 
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          onSyncComplete={handleSyncComplete}
        />
      </section>
    )
  }

  return (
    <section className="page-stack farm-screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <PageHeader
            eyebrow="Farm Management"
            title={farmDetails.parcelName}
            subtitle={`Soil Type: ${farmDetails.soilType} | Crops: ${farmDetails.cropMix}`}
            accent="crop"
            stats={[
              { label: 'Total Farm Size', value: farmDetails.farmSize },
              { label: 'Allocated Crops', value: totalAcreage },
              { label: 'Active Zones', value: zones.length },
              { label: 'Sensors Online', value: farmDetails.gis?.sensors || '0 Probes' },
            ]}
          />
        </div>
        <button 
          className="delete-farm-btn"
          onClick={handleDeleteFarm}
          title="Delete farm parcel & start onboarding over"
        >
          🗑️ Unlink Property
        </button>
      </div>

      <div className="farm-dashboard-columns">
        <div className="farm-dashboard-columns__main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <FarmMapViewer fieldMap={farmDetails} zones={zones} onAddZone={handleAddZone} />
          
          <div className="farm-passports-grid">
            {cropPassports.length > 0 ? (
              cropPassports.map(cp => (
                <BioPassport key={cp.crop} cropName={`Organic ${cp.crop}`} grade={cp.grade} healthScore={cp.score} />
              ))
            ) : (
              <div className="glass-panel dynamic-passport-empty" style={{ padding: '2.5rem 2rem', textAlign: 'center', color: 'var(--green-deep)', gridColumn: 'span 2', width: '100%', border: '2px dashed rgba(16, 185, 129, 0.35)', background: 'rgba(16, 185, 129, 0.04)' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>🌱</span>
                <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '0.4rem', color: 'var(--green-deep)' }}>No Active Crop Zones</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Add a crop block on the satellite map to activate bio-telemetry rating cards.</span>
              </div>
            )}
          </div>
        </div>
        <aside className="farm-dashboard-columns__aside">
          <FarmZoneList zones={zones} />
          
          {/* Registered Implements Manager */}
          <section className="farm-equipment-list glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem', borderRadius: '16px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
               <h3 className="farm-zone-list__title" style={{ margin: 0, fontSize: '1.1rem' }}>Registered Implements</h3>
               {!showAddImplement && (
                 <button 
                   onClick={() => setShowAddImplement(true)}
                   style={{ background: '#10b981', color: '#0f172a', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                 >
                   ➕ Add
                 </button>
               )}
             </div>

             {showAddImplement && (
               <form onSubmit={handleAddImplement} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                   <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Implement Name</label>
                   <input 
                     type="text" 
                     value={newImpName} 
                     onChange={(e) => setNewImpName(e.target.value)} 
                     placeholder="e.g. Irrigation Pump" 
                     required
                     style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem' }}
                   />
                 </div>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                     <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Status</label>
                     <select 
                       value={newImpStatus} 
                       onChange={(e) => setNewImpStatus(e.target.value)}
                       style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem' }}
                     >
                       <option value="Idle">Idle</option>
                       <option value="Running">Running</option>
                       <option value="Maintenance">Maintenance</option>
                     </select>
                   </div>
                   <div style={{ flex: 2.5, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                     <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Details</label>
                     <input 
                       type="text" 
                       value={newImpDetail} 
                       onChange={(e) => setNewImpDetail(e.target.value)} 
                       placeholder="e.g. Fuel: 75% | Shed" 
                       style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem' }}
                     />
                   </div>
                 </div>
                 <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', justifyContent: 'flex-end' }}>
                   <button 
                     type="button" 
                     onClick={() => setShowAddImplement(false)}
                     style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.75rem', cursor: 'pointer' }}
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit" 
                     style={{ background: '#34d399', color: '#0f172a', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                   >
                     Save Implement
                   </button>
                 </div>
               </form>
             )}

             <div className="farm-zone-list__grid">
               {implementsList.length > 0 ? (
                 implementsList.map(eq => (
                   <div key={eq.id} className="farm-zone-card" style={{ borderLeft: '3px solid #64748b' }}>
                     <div className="farm-zone-card__top">
                       <strong>{eq.name}</strong>
                       <span className="farm-zone-card__status" style={{ 
                         background: eq.status === 'Running' ? 'rgba(16,185,129,0.1)' : (eq.status === 'Maintenance' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)'), 
                         color: eq.status === 'Running' ? '#34d399' : (eq.status === 'Maintenance' ? '#f87171' : '#94a3b8') 
                       }}>
                         {eq.status}
                       </span>
                     </div>
                     <div className="farm-zone-card__detail" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span>{eq.detail}</span>
                       <button 
                         onClick={() => handleDeleteImplement(eq.id)}
                         style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', padding: '0 0.2rem' }}
                         title="Remove implement"
                       >
                         🗑️
                       </button>
                     </div>
                   </div>
                 ))
               ) : (
                 <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', border: '1px dashed rgba(15, 23, 42, 0.12)', borderRadius: '10px' }}>
                   No implements registered. Add your machinery using the Add button.
                 </div>
               )}
             </div>
          </section>
        </aside>
      </div>

      <GoogleMapsSyncModal 
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSyncComplete={handleSyncComplete}
      />
    </section>
  )
}

export default MyFarm
