import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'

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

// Accurate geodetic area Shoelace formula (computes square meters on Earth)
const computeSphericalArea = (latLngs) => {
  const RADIUS = 6378137 // Earth radius in meters
  if (latLngs.length < 3) return 0
  
  let area = 0
  const len = latLngs.length
  
  for (let i = 0; i < len; i++) {
    const p1 = latLngs[i]
    const p2 = latLngs[(i + 1) % len]
    
    const x1 = (p1.lng * Math.PI) / 180
    const x2 = (p2.lng * Math.PI) / 180
    const y1 = (p1.lat * Math.PI) / 180
    const y2 = (p2.lat * Math.PI) / 180
    
    area += (x2 - x1) * (2 + Math.sin(y1) + Math.sin(y2))
  }
  
  return (Math.abs(area) * RADIUS * RADIUS) / 2
}

function FarmMapViewer({ fieldMap, zones = [], onAddZone }) {
  const [isDroneMode, setIsDroneMode] = useState(false)
  const [telemetry, setTelemetry] = useState({ altitude: 400, battery: 88, signal: 94 })
  
  const [isEditing, setIsEditing] = useState(false)
  const [editorPoints, setEditorPoints] = useState([])
  const [zoneName, setZoneName] = useState('')
  const [zoneCrop, setZoneCrop] = useState('Maize')
  const [zoneStatus, setZoneStatus] = useState('Stable')

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const boundaryPolygonRef = useRef(null)
  const activeDrawPolygonRef = useRef(null)
  const activeDrawMarkersRef = useRef([])
  const zonePolygonsRef = useRef([])
  const landmarkMarkersRef = useRef([])

  // Load Leaflet map and render layers
  useEffect(() => {
    if (!fieldMap || !fieldMap.boundaryCoords) {
      if (mapRef.current) {
        mapRef.current.off()
        mapRef.current.remove()
        mapRef.current = null
      }
      boundaryPolygonRef.current = null
      zonePolygonsRef.current = []
      landmarkMarkersRef.current = []
      return
    }

    const initDashboardMap = () => {
      if (!mapContainerRef.current) return

      const center = fieldMap.centerLatLng || fieldMap.boundaryCoords[0]
      const bounds = fieldMap.boundaryCoords.map(pt => [pt.lat, pt.lng])

      let map = mapRef.current
      if (!map) {
        map = L.map(mapContainerRef.current, {
          zoomControl: true,
          attributionControl: false
        }).setView([center.lat, center.lng], 16)
        mapRef.current = map

        // Add Google Hybrid Satellite tiles
        L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
          maxZoom: 22,
          maxNativeZoom: 19
        }).addTo(map)
      } else {
        map.setView([center.lat, center.lng])
      }

      map.fitBounds(bounds)

      // Render the overall farm boundary as a bold green outline
      if (boundaryPolygonRef.current) {
        boundaryPolygonRef.current.removeFrom(map)
      }
      const boundaryPolygon = L.polygon(bounds, {
        color: '#10b981',
        weight: 4,
        fillColor: '#10b981',
        fillOpacity: 0.05,
        dashArray: '8, 6'
      }).addTo(map)
      boundaryPolygonRef.current = boundaryPolygon

      // Add a popup to boundary showing farm name & size
      boundaryPolygon.bindPopup(`<strong>🏡 Registered Property: ${fieldMap.parcelName}</strong><br/>Size: ${fieldMap.farmSize}`).openPopup()

      // Render existing zones (crop blocks)
      zonePolygonsRef.current.forEach(p => p.removeFrom(map))
      zonePolygonsRef.current = []

      zones.forEach(zone => {
        if (!zone.coords) return
        const zoneBounds = zone.coords.map(pt => [pt.lat, pt.lng])
        const toneColor = zone.tone === 'good' ? '#10b981' : (zone.tone === 'watch' ? '#f59e0b' : '#ef4444')
        const zonePoly = L.polygon(zoneBounds, {
          color: toneColor,
          weight: 2.5,
          fillColor: toneColor,
          fillOpacity: 0.35
        }).addTo(map)
        
        zonePoly.bindPopup(`<strong>🌱 Crop Block: ${zone.name}</strong><br/>Crop: ${zone.crop}<br/>Status: ${zone.status}<br/>Size: ${zone.acreage} acres`)
        zonePolygonsRef.current.push(zonePoly)
      })

      // Render landmarks (IoT nodes)
      landmarkMarkersRef.current.forEach(m => m.removeFrom(map))
      landmarkMarkersRef.current = []

      if (fieldMap.gis && fieldMap.gis.landmarks) {
        fieldMap.gis.landmarks.forEach(lm => {
          const markerColor = lm.kind === 'sensor' ? '#10b981' : '#3b82f6'
          const lmMarker = L.circleMarker([lm.lat, lm.lng], {
            color: '#ffffff',
            fillColor: markerColor,
            fillOpacity: 0.9,
            radius: 7,
            weight: 2
          }).addTo(map)

          lmMarker.bindPopup(`<strong>🛰️ IoT ${lm.label}</strong><br/>Status: Active<br/>Type: Crop Soil Probe`)
          landmarkMarkersRef.current.push(lmMarker)
        })
      }

      map.invalidateSize()
    }

    initDashboardMap()
  }, [fieldMap, zones])

  // Cleanup Leaflet map only on actual component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.off()
        mapRef.current.remove()
        mapRef.current = null
      }
      boundaryPolygonRef.current = null
      zonePolygonsRef.current = []
      landmarkMarkersRef.current = []
    }
  }, [])

  // Click handler to draw polygon when editing
  useEffect(() => {
    const map = mapRef.current
    if (!map || !isEditing) return

    // Draw polygon for editing
    const activeDrawPolygon = L.polygon([], {
      color: '#34d399',
      weight: 3,
      fillColor: '#34d399',
      fillOpacity: 0.25,
      dashArray: '6, 4'
    }).addTo(map)
    activeDrawPolygonRef.current = activeDrawPolygon

    const handleMapClick = (e) => {
      const latlng = e.latlng
      activeDrawPolygon.addLatLng(latlng)

      const marker = L.circleMarker(latlng, {
        color: '#ffffff',
        fillColor: '#34d399',
        fillOpacity: 1,
        radius: 6,
        weight: 2
      }).addTo(map)

      activeDrawMarkersRef.current.push(marker)

      const path = activeDrawPolygon.getLatLngs()[0] || []
      setEditorPoints(path.map(ll => ({ lat: ll.lat, lng: ll.lng })))
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
      if (activeDrawPolygonRef.current) {
        activeDrawPolygonRef.current.removeFrom(map)
        activeDrawPolygonRef.current = null
      }
      activeDrawMarkersRef.current.forEach(m => m.removeFrom(map))
      activeDrawMarkersRef.current = []
      setEditorPoints([])
    }
  }, [isEditing])

  // Drone fly simulation effect
  useEffect(() => {
    let interval
    let droneMarker = null

    if (isDroneMode && mapRef.current && fieldMap.boundaryCoords && fieldMap.boundaryCoords.length > 0) {
      const map = mapRef.current
      const coords = fieldMap.boundaryCoords
      let index = 0

      // Create drone marker
      const center = coords[0]
      droneMarker = L.marker([center.lat, center.lng], {
        icon: L.divIcon({
          html: '<div style="font-size: 32px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); animation: droneShake 0.4s infinite ease-in-out">🚁</div>',
          className: 'custom-drone-icon',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      }).addTo(map)

      // Fly around the boundaries of the farm
      interval = setInterval(() => {
        index = (index + 1) % coords.length
        const nextPt = coords[index]
        droneMarker.setLatLng([nextPt.lat, nextPt.lng])

        // Randomize telemetry
        setTelemetry(prev => ({
          altitude: 400 + Math.floor(Math.random() * 20 - 10),
          battery: Math.max(0, prev.battery - (Math.random() > 0.8 ? 1 : 0)),
          signal: 90 + Math.floor(Math.random() * 10)
        }))
      }, 2000)
    }

    return () => {
      clearInterval(interval)
      if (droneMarker && mapRef.current) {
        droneMarker.removeFrom(mapRef.current)
      }
    }
  }, [isDroneMode, fieldMap])

  // Clear current drawing points
  const handleResetPoints = () => {
    if (activeDrawPolygonRef.current) {
      activeDrawPolygonRef.current.setLatLngs([])
    }
    if (mapRef.current) {
      activeDrawMarkersRef.current.forEach(m => m.removeFrom(mapRef.current))
    }
    activeDrawMarkersRef.current = []
    setEditorPoints([])
  }

  // Cancel editing
  const handleCancelEditor = () => {
    setIsEditing(false)
    handleResetPoints()
  }

  // Save custom crop block
  const handleSaveBlock = (e) => {
    e.preventDefault()
    if (!zoneName.trim()) {
      alert("Please provide a name for this farm block.")
      return
    }
    if (editorPoints.length < 3) {
      alert("At least 3 boundary vertices are required to define a block polygon.")
      return
    }

    const areaM2 = computeSphericalArea(editorPoints)
    const computedAcreage = (areaM2 * 0.000247105).toFixed(1)
    
    const newZone = {
      id: 'custom-' + Date.now(),
      name: zoneName,
      crop: zoneCrop,
      status: zoneStatus,
      tone: zoneStatus === 'Stable' ? 'good' : (zoneStatus === 'Monitor' ? 'watch' : 'risk'),
      performanceShare: Math.floor(Math.random() * 30) + 15,
      coords: editorPoints,
      acreage: computedAcreage
    }

    onAddZone(newZone)
    setIsEditing(false)
    handleResetPoints()
    setZoneName('')
  }

  const activeAreaM2 = computeSphericalArea(editorPoints)
  const activeAcreage = (activeAreaM2 * 0.000247105).toFixed(2)

  return (
    <div className={`farm-map-viewer ${isDroneMode && !isEditing ? 'drone-active' : ''} ${isEditing ? 'editor-active' : ''}`}>
      <div className="farm-map-viewer__header">
        <div>
          <h3 className="farm-map-viewer__title">
            {isEditing 
              ? 'Draw Crop Block Boundary' 
              : (isDroneMode ? 'UAV Survey Interface' : 'Satellite Field Polygon')
            }
          </h3>
          <p className="farm-map-viewer__subtitle">
            {isEditing
              ? `Click on the satellite map inside your boundaries to plot block corners.`
              : (isDroneMode ? 'Real-time multi-spectral scanning active' : 'Interactive Google Satellite mapping')
            }
          </p>
        </div>
        
        <div className="farm-map-viewer__actions" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {!isEditing && (
            <>
              <button
                className="scan-btn scan-btn--secondary"
                onClick={() => setIsEditing(true)}
                style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.8rem', background: '#34d399', color: '#0f172a', fontWeight: '800' }}
              >
                ➕ Add Custom Block
              </button>
              <button 
                className={`scan-btn ${isDroneMode ? 'scan-btn--danger' : 'scan-btn--primary'}`}
                onClick={() => setIsDroneMode(!isDroneMode)}
                style={{ 
                    width: 'auto', 
                    padding: '0.6rem 1.2rem', 
                    fontSize: '0.8rem',
                    background: isDroneMode ? 'var(--danger)' : '' 
                }}
              >
                {isDroneMode ? 'Recall UAV' : 'Launch Drone Survey 🚁'}
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Editor Control Panel */}
      {isEditing && (
        <div className="map-editor-controls">
          <div style={{ color: '#fff', fontSize: '0.85rem' }}>
            🖱️ Click on satellite map to draw. Plot at least 3 points.
          </div>
          
          <div className="editor-stat-pill">
             <span>Captured Points: <strong>{editorPoints.length}</strong></span>
             <span>Calculated Size: <strong style={{color: '#34d399'}}>{activeAcreage} acres</strong></span>
          </div>
        </div>
      )}

      <div className="farm-map-layout-columns">
        <div className="farm-map-viewer__canvas" 
          style={{ 
              backgroundColor: '#0f172a',
              overflow: 'hidden',
              position: 'relative',
              height: '400px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)'
          }}>
          
          {/* Map Mount Point */}
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
        </div>

        {/* Editor Form Sidebar */}
        {isEditing && (
          <aside className="map-editor-sidebar">
            <form onSubmit={handleSaveBlock} className="editor-form">
              <h4 className="editor-title">New Block Info</h4>
              
              <div className="form-group">
                <label>Block Name</label>
                <input 
                  type="text" 
                  value={zoneName} 
                  onChange={(e) => setZoneName(e.target.value)} 
                  placeholder="e.g. North Sorghum Patch"
                  required
                />
              </div>

              <div className="form-group">
                <label>Target Crop</label>
                <select value={zoneCrop} onChange={(e) => setZoneCrop(e.target.value)}>
                  {EAST_AFRICAN_CROPS.map(crop => {
                    const shortName = crop.split(' (')[0]
                    return (
                      <option key={crop} value={shortName}>{crop}</option>
                    )
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Soil Composition</label>
                <input 
                  type="text" 
                  value={fieldMap.soilType} 
                  disabled 
                  style={{ opacity: 0.6 }}
                />
              </div>

              <div className="form-group">
                <label>Initial Health Status</label>
                <select value={zoneStatus} onChange={(e) => setZoneStatus(e.target.value)}>
                  <option value="Stable">Stable (Healthy)</option>
                  <option value="Monitor">Monitor (Caution)</option>
                  <option value="Drying">Drying (Water Risk)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="editor-actions">
                <button type="button" className="editor-btn editor-btn--reset" onClick={handleResetPoints} disabled={editorPoints.length === 0}>
                  Clean
                </button>
                <button type="button" className="editor-btn editor-btn--cancel" onClick={handleCancelEditor}>
                  Cancel
                </button>
                <button type="submit" className="editor-btn editor-btn--save" disabled={editorPoints.length < 3 || !zoneName.trim()}>
                  💾 Save Area
                </button>
              </div>
            </form>
          </aside>
        )}
      </div>
      
      {isDroneMode && (
        <div className="drone-hud slide-in-top">
          <div className="drone-hud__metric">
            <span className="hud-label">📡 ALTITUDE</span>
            <span className="hud-value">{telemetry.altitude}ft</span>
          </div>
          <div className="drone-hud__metric">
            <span className="hud-label">🔋 BATTERY</span>
            <span className="hud-value">{telemetry.battery}%</span>
          </div>
          <div className="drone-hud__metric">
            <span className="hud-label">📶 SIGNAL</span>
            <span className="hud-value">{telemetry.signal}%</span>
          </div>
          <div className="drone-hud__metric hud-status">
            <span className="hud-label">SYSTEM</span>
            <span className="hud-value status-ok">OPTIMAL</span>
          </div>
        </div>
      )}
      
      <div className="farm-map-viewer__footer">
        <span className="farm-map-viewer__tag">Center Centroid: {fieldMap.gis?.center}</span>
        <span className="farm-map-viewer__tag">Property Size: {fieldMap.farmSize ?? 'N/A'}</span>
        <span className="farm-map-viewer__tag">Allocated Crops: {zones.reduce((sum, z) => sum + (Number(z.acreage) || 0), 0).toFixed(1)} acres</span>
      </div>
    </div>
  )
}

export default FarmMapViewer
