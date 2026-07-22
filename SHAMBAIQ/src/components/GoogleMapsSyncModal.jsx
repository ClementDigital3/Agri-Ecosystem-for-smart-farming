import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

// Accurate geodetic spherical area Shoelace formula (computes square meters on Earth)
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

function GoogleMapsSyncModal({ isOpen, onClose, onSyncComplete }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  
  const [farmName, setFarmName] = useState('')
  const [soilType, setSoilType] = useState('Sandy loam')
  const [selectedCrops, setSelectedCrops] = useState([])
  const [isOpenCrops, setIsOpenCrops] = useState(false)
  const [computedSize, setComputedSize] = useState(null)
  const [gpsCoords, setGpsCoords] = useState(null)
  const [pointsCount, setPointsCount] = useState(0)
  const [resolvedPlaceName, setResolvedPlaceName] = useState(null)
  
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const polygonRef = useRef(null)
  const markersRef = useRef([])

  // Initialize Leaflet map once when modal is first opened
  useEffect(() => {
    if (!isOpen || mapRef.current) return

    const initLeafletMap = () => {
      if (!mapContainerRef.current) return

      // Initialize map centered on Uasin Gishu County (Moiben), Kenya
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
        maxZoom: 22,
        minZoom: 1
      }).setView([0.7936, 35.3475], 14)
      mapRef.current = map

      // Load Google Hybrid Satellite tiles (Satellite imagery + Labels/Roads)
      L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        maxNativeZoom: 19,
        attribution: '&copy; Google Maps'
      }).addTo(map)

      // Initialize transparent green polygon layer
      const polygon = L.polygon([], {
        color: '#10b981',
        weight: 3,
        fillColor: '#10b981',
        fillOpacity: 0.35
      }).addTo(map)
      polygonRef.current = polygon

      // Update statistics
      const updateAreaStats = async () => {
        const path = polygon.getLatLngs()[0] || []
        setPointsCount(path.length)
        
        if (path.length >= 3) {
          const areaM2 = computeSphericalArea(path)
          // 1 square meter = 0.000247105 acres
          const acreage = (areaM2 * 0.000247105).toFixed(2)
          setComputedSize(`${acreage} acres`)

          // Compute average centroid GPS coord
          let sumLat = 0, sumLng = 0
          path.forEach(ll => {
            sumLat += ll.lat
            sumLng += ll.lng
          })
          const clat = sumLat / path.length
          const clng = sumLng / path.length

          const latDirection = clat >= 0 ? 'N' : 'S'
          const lngDirection = clng >= 0 ? 'E' : 'W'
          const coordsStr = `${Math.abs(clat).toFixed(5)}° ${latDirection}, ${Math.abs(clng).toFixed(5)}° ${lngDirection}`
          setGpsCoords(coordsStr)

          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${clat}&lon=${clng}`)
            if (res.ok) {
              const data = await res.json()
              if (data && data.address) {
                const town = data.address.town || data.address.city || data.address.village || data.address.suburb || data.address.hamlet || ''
                const county = data.address.county || data.address.state || ''
                let nameStr = ''
                if (town) {
                  nameStr = `${town}, ${county.replace(' County', '')}`
                } else {
                  nameStr = county.replace(' County', '')
                }
                if (nameStr) {
                  setResolvedPlaceName(nameStr)
                  setFarmName(prev => prev.trim() ? prev : `${nameStr} Farm`)
                }
              }
            }
          } catch (e) {
            console.error("Reverse geocoding failed", e)
          }
        } else {
          setComputedSize(null)
          setGpsCoords(null)
          setResolvedPlaceName(null)
        }
      }

      // Map click listener to add coordinates
      map.on('click', (e) => {
        polygon.addLatLng(e.latlng)
        
        const marker = L.circleMarker(e.latlng, {
          color: '#ffffff',
          fillColor: '#10b981',
          fillOpacity: 1,
          radius: 7,
          weight: 2
        }).addTo(map)

        markersRef.current.push(marker)
        updateAreaStats()
      })

      map.invalidateSize()
    }

    initLeafletMap()
  }, [isOpen])

  // Invalidate map size and reset session state on open transition
  useEffect(() => {
    if (isOpen) {
      // Clear inputs & previous drawing
      handleResetMap()
      setFarmName('')
      setSearchQuery('')
      setSoilType('Sandy loam')
      setSelectedCrops([])

      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }

      // Let DOM layout settle and invalidate size again
      const timer = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize()
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Cleanup Leaflet map only on actual component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.off()
        mapRef.current.remove()
        mapRef.current = null
      }
      polygonRef.current = null
      markersRef.current = []
    }
  }, [])

  // Reset drawing
  const handleResetMap = () => {
    if (polygonRef.current) {
      polygonRef.current.setLatLngs([])
    }
    if (mapRef.current) {
      markersRef.current.forEach(m => m.removeFrom(mapRef.current))
    }
    markersRef.current = []
    setPointsCount(0)
    setComputedSize(null)
    setGpsCoords(null)
    setSelectedCrops([])
    setResolvedPlaceName(null)
  }

  // Location Geocode Search (OSM Nominatim API)
  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim() || !mapRef.current) return

    setIsSearching(true)
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`)
      if (response.ok) {
        const data = await response.json()
        if (data && data.length > 0) {
          const place = data[0]
          const lat = parseFloat(place.lat)
          const lng = parseFloat(place.lon)
          mapRef.current.setView([lat, lng], 17)
        } else {
          alert("Location not found. Try searching for a broader term like 'Kitui, Kenya' or 'Machakos'.")
        }
      }
    } catch (err) {
      console.error("Geocoding request failed", err)
      alert("Geocoding service unavailable. Try clicking directly on the map.")
    } finally {
      setIsSearching(false)
    }
  }

  // Convert real Lat/Lng points into our synced object
  const handleConfirmSync = (e) => {
    e.preventDefault()
    if (!farmName.trim()) {
      alert("Please provide a name for your farm parcel.")
      return
    }
    if (pointsCount < 3) {
      alert("Please trace at least 3 points on the satellite map to define your boundary.")
      return
    }
    if (selectedCrops.length === 0) {
      alert("Please select at least one crop for your farm.")
      return
    }

    const path = polygonRef.current.getLatLngs()[0] || []
    
    // Compute average centroid GPS coord
    let sumLat = 0, sumLng = 0
    path.forEach(ll => {
      sumLat += ll.lat
      sumLng += ll.lng
    })
    const clat = sumLat / path.length
    const clng = sumLng / path.length

    const syncedFarm = {
      parcelName: farmName,
      farmSize: computedSize,
      soilType: soilType,
      cropMix: selectedCrops.map(c => c.split(' (')[0]).join(', ') || 'Maize, Sorghum',
      center: resolvedPlaceName ? `${resolvedPlaceName} (${gpsCoords})` : gpsCoords,
      centerLatLng: { lat: clat, lng: clng },
      boundaryCoords: path.map(pt => ({ lat: pt.lat, lng: pt.lng })),
      zones: [] // Start clean
    }

    onSyncComplete(syncedFarm)
  }

  return (
    <div className={`google-maps-modal-overlay ${isOpen ? 'is-open' : ''}`}>
      <div className="google-maps-modal-container glass-panel">
        
        {/* Header */}
        <header className="maps-modal-header">
          <div className="maps-modal-header__title">
            <span>📡 SATELLITE CADASRAL SYNC</span>
            <h2>Locate & Import Your Property</h2>
          </div>
          <button className="maps-modal-close" onClick={onClose}>×</button>
        </header>

        {/* Body */}
        <div className="maps-modal-body">
          
          {/* Satellite Map */}
          <div className="maps-viewport-section">
            <form onSubmit={handleSearchSubmit} className="maps-search-bar">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search town, road, village, or coords (e.g. Kitui County, Kenya)..." 
                disabled={isSearching}
              />
              <button type="submit" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search Location 🔎'}
              </button>
            </form>

            <div className="maps-canvas-frame" style={{ cursor: 'pointer' }}>
              <div 
                ref={mapContainerRef} 
                style={{ width: '100%', height: '100%', background: '#111a13' }}
              >
                <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  ⏳ Loading Satellite Map Engine...
                </div>
              </div>
              
              {/* GIS Stats Ticker */}
              <div className="satellite-info-panel">
                <span>🛰️ GPS: {gpsCoords ?? 'Click Satellite Map to place boundary corners'}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', textAlign: 'center' }}>
              💡 Click on the satellite view to plot boundary corners. Add 3 or more points to compute acreage size.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="maps-sidebar-panel">
            <form onSubmit={handleConfirmSync} className="maps-sync-form">
              <h3>Import Parcel Registry</h3>
              <p>Verify your plotted GPS parameters before syncing with the smart dashboard.</p>

              <div className="maps-form-group">
                <label>Farm Name</label>
                <input 
                  type="text" 
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Soy Ridge Plot" 
                  disabled={pointsCount < 3}
                  required
                />
              </div>

              <div className="maps-form-group">
                <label>Soil Composition</label>
                <select 
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  disabled={pointsCount < 3}
                >
                  <option value="Sandy loam">Sandy Loam</option>
                  <option value="Red clay">Red Clay</option>
                  <option value="Black cotton soil">Black Cotton Soil</option>
                  <option value="Loam">Organic Loam</option>
                </select>
              </div>

              <div className="maps-form-group" style={{ position: 'relative' }}>
                <label>Primary Crop Mix</label>
                <div 
                  style={{ 
                    cursor: pointsCount < 3 ? 'not-allowed' : 'pointer', 
                    display: 'flex', 
                    alignItems: 'center',
                    background: '#1e293b', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    padding: '0.65rem 0.5rem', 
                    borderRadius: '8px', 
                    fontSize: '0.85rem',
                    opacity: pointsCount < 3 ? 0.5 : 1
                  }} 
                  onClick={() => {
                    if (pointsCount >= 3) {
                      setIsOpenCrops(!isOpenCrops)
                    }
                  }}
                >
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1,
                    textAlign: 'left',
                    color: selectedCrops.length > 0 ? '#fff' : '#64748b',
                    fontWeight: selectedCrops.length > 0 ? '600' : '400'
                  }}>
                    {selectedCrops.length > 0 ? selectedCrops.join(', ') : 'Select crops (e.g. Maize, Beans)...'}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isOpenCrops ? '▲' : '▼'}</span>
                </div>
                
                {isOpenCrops && pointsCount >= 3 && (
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
                      maxHeight: '180px',
                      overflowY: 'auto',
                      zIndex: 1000,
                      background: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                      marginTop: '4px',
                      padding: '0.4rem',
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
                              padding: '0.4rem 0.5rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              color: isChecked ? '#34d399' : '#fff',
                              fontWeight: isChecked ? '800' : '400',
                              background: isChecked ? 'rgba(52, 211, 153, 0.08)' : 'transparent',
                              transition: 'all 0.15s ease',
                              margin: '1px 0'
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
                                accentColor: '#34d399',
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

              <div className="gis-stats-box">
                <div className="gis-stat-row">
                  <span>Vertices Plotted:</span>
                  <strong>{pointsCount} points</strong>
                </div>
                <div className="gis-stat-row">
                  <span>Geodetic Land Area:</span>
                  <strong style={{color: '#34d399'}}>{computedSize ?? '--'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  className="editor-btn editor-btn--reset" 
                  style={{ flex: 0.4 }}
                  onClick={handleResetMap}
                  disabled={pointsCount === 0}
                >
                  Clear
                </button>
                <button 
                  type="submit" 
                  className="confirm-sync-btn"
                  style={{ flex: 0.6, margin: 0 }}
                  disabled={pointsCount < 3 || !farmName.trim()}
                >
                  🛰️ Sync ShambaIQ
                </button>
              </div>
            </form>
          </aside>

        </div>
      </div>
    </div>
  )
}

export default GoogleMapsSyncModal
