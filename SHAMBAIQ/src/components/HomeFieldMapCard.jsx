const toneColors = {
  good: '#43a047',
  watch: '#f4b400',
  risk: '#e53935',
}

const toneFills = {
  good: 'rgba(67, 160, 71, 0.72)',
  watch: 'rgba(244, 180, 0, 0.72)',
  risk: 'rgba(229, 57, 53, 0.62)',
}

const zoneVisuals = {
  north: {
    path: 'M82 56 C152 34 236 40 314 82 L286 212 C242 228 162 228 96 214 L58 146 C66 108 70 78 82 56Z',
    label: { x: 108, y: 94, width: 150, height: 60 },
  },
  central: {
    path: 'M336 96 L562 112 C580 168 578 252 532 332 L314 316 C304 274 298 220 298 176 C298 144 308 112 336 96Z',
    label: { x: 374, y: 182, width: 154, height: 62 },
  },
  south: {
    path: 'M92 238 C164 228 232 234 300 252 L280 372 C226 388 148 388 72 352 L52 288 C62 264 76 248 92 238Z',
    label: { x: 102, y: 292, width: 156, height: 62 },
  },
}

function HomeFieldMapCard({ title, subtitle, recommendation, zones, badge, gis }) {
  const defaultShare = zones.length ? 100 / zones.length : 0
  const getZoneShare = (zone) => Math.round(zone.performanceShare ?? defaultShare)
  const totalShare = zones.reduce((total, zone) => total + (zone.performanceShare ?? defaultShare), 0)
  const leadingZone = [...zones].sort(
    (left, right) => (right.performanceShare ?? defaultShare) - (left.performanceShare ?? defaultShare),
  )[0]
  const priorityZone = zones.find((zone) => zone.tone === 'risk') ?? zones.find((zone) => zone.tone === 'watch') ?? leadingZone
  const leadingZoneShortName = leadingZone?.name
    ?.replace(/\s+block$/i, '')
    ?.replace(/\s+strip$/i, '')
  const mapGuide = [
    {
      id: 'stable',
      kind: 'tone',
      tone: 'good',
      title: 'Stable area',
      detail: 'Healthy block with steady moisture retention.',
    },
    {
      id: 'monitor',
      kind: 'tone',
      tone: 'watch',
      title: 'Monitor area',
      detail: 'Needs follow-up scouting before the next rain window.',
    },
    {
      id: 'drying',
      kind: 'tone',
      tone: 'risk',
      title: 'Drying area',
      detail: 'Higher stress risk and first priority for checks.',
    },
    {
      id: 'route',
      kind: 'route',
      title: 'Scout route',
      detail: gis?.route ?? 'Planned field inspection path.',
    },
  ]

  let cursor = 0
  const donutSegments = zones.map((zone) => {
    const share = zone.performanceShare ?? defaultShare
    const percentage = totalShare ? (share / totalShare) * 100 : 0
    const start = cursor
    const end = cursor + percentage
    cursor = end

    return `${toneColors[zone.tone]} ${start}% ${end}%`
  })

  return (
    <section className="home-map-card">
      <div className="home-map-card__header">
        <div className="home-map-card__header-top">
          <span className="home-map-card__eyebrow">Farm map</span>
          {badge ? <span className="home-map-card__badge">{badge}</span> : null}
        </div>
        <h3 className="home-map-card__title">{title}</h3>
        <p className="home-map-card__subtitle">{subtitle}</p>
      </div>

      <div className="home-map-card__summary">
        <div
          className="home-map-card__donut"
          style={{ background: `conic-gradient(${donutSegments.join(', ')})` }}
          aria-label="Farm performance distribution"
        >
          <div className="home-map-card__donut-center">
            <strong>{leadingZone?.performanceShare ?? 0}%</strong>
            <span>Top zone</span>
            <small>{leadingZoneShortName ?? 'No data'}</small>
          </div>
        </div>

        <div className="home-map-card__summary-list">
          {zones.map((zone) => (
            <div key={zone.id} className="home-map-card__summary-item">
              <span className={`home-map-card__legend-dot home-map-card__legend-dot--${zone.tone}`} />
              <div>
                <strong>{zone.status}</strong>
                <p>{getZoneShare(zone)}% of parcel</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-map-card__visual">
        <div className="home-map-card__field-canvas">
          <div className="home-map-card__map-toolbar">
            <div className="home-map-card__map-chip">
              <span>GIS center</span>
              <strong>{gis?.center ?? '1.3642 S, 38.0109 E'}</strong>
            </div>

            <div className="home-map-card__north-indicator" aria-label="North orientation">
              <span>N</span>
            </div>
          </div>

          <div className="home-map-card__map-frame">
            <svg className="home-map-card__gis-map" viewBox="0 0 640 420" role="img" aria-label="GIS-style parcel map of Kaveta Main Plot">
              <rect x="0" y="0" width="640" height="420" className="home-map-card__gis-base" />

              <path className="home-map-card__gis-contour" d="M26 86 C122 28 242 26 362 92 C468 150 556 150 618 116" />
              <path className="home-map-card__gis-contour" d="M18 172 C132 116 248 120 352 176 C446 226 534 224 622 188" />
              <path className="home-map-card__gis-contour" d="M24 262 C132 214 238 220 332 270 C440 328 532 324 618 286" />
              <path className="home-map-card__gis-contour" d="M18 340 C136 294 244 300 338 350 C428 396 520 388 618 346" />

              <path className="home-map-card__gis-track" d="M42 344 C118 320 188 288 264 248 C330 212 404 164 486 126 C532 104 574 92 612 88" />
              <path className="home-map-card__gis-track home-map-card__gis-track--secondary" d="M198 28 C226 76 234 136 230 194 C224 252 212 306 184 376" />
              <path className="home-map-card__gis-stream" d="M560 34 C530 86 526 138 546 184 C562 220 560 266 524 316 C510 336 498 360 496 386" />

              <circle cx="548" cy="56" r="14" className="home-map-card__gis-water" />

              {zones.map((zone) => {
                const share = getZoneShare(zone)
                const visual = zoneVisuals[zone.id] ?? zoneVisuals.north
                const stroke = toneColors[zone.tone] ?? toneColors.good
                const fill = toneFills[zone.tone] ?? toneFills.good

                return (
                  <g key={zone.id}>
                    <path
                      d={visual.path}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="6"
                      strokeLinejoin="round"
                      className="home-map-card__gis-zone-shape"
                    />

                    <g transform={`translate(${visual.label.x} ${visual.label.y})`}>
                      <rect
                        width={visual.label.width}
                        height={visual.label.height}
                        rx="18"
                        className="home-map-card__gis-label-box"
                      />
                      <text x="16" y="24" className="home-map-card__gis-label-name">
                        {zone.name}
                      </text>
                      <text x="16" y="45" className="home-map-card__gis-label-meta">
                        {zone.crop}
                      </text>
                      <text x={visual.label.width - 16} y="45" textAnchor="end" className="home-map-card__gis-label-share">
                        {share}%
                      </text>
                    </g>
                  </g>
                )
              })}

              <path className="home-map-card__gis-route" d="M500 298 C470 278 446 250 420 214 C394 178 366 152 332 142" />
              <circle cx="500" cy="298" r="8" className="home-map-card__gis-pin" />
              <text x="512" y="292" className="home-map-card__gis-route-label">
                {gis?.route ?? 'Scout route'}
              </text>
            </svg>

            <div className="home-map-card__map-scale">{gis?.scale ?? '1:2,500'}</div>
            <div className="home-map-card__map-source">{gis?.source ?? 'Local field records'}</div>
          </div>
        </div>

        <div className="home-map-card__visual-panel">
          <div className="home-map-card__signal">
            <span>Priority zone</span>
            <strong>{priorityZone?.name ?? 'No data'}</strong>
            <p>{priorityZone?.status ?? 'Field scouting cue'} - {priorityZone?.crop ?? 'No crop data'}</p>
          </div>

          <div className="home-map-card__signal">
            <span>Parcel size</span>
            <strong>{gis?.acreage ?? '4.2 acres'}</strong>
            <p>{gis?.updated ?? 'Updated today'} - map scale {gis?.scale ?? '1:2,500'}</p>
          </div>

          <div className="home-map-card__signal">
            <span>Active layers</span>
            <strong>{gis?.layers?.join(' | ') ?? 'Parcel | Crop status | Route'}</strong>
            <p>{leadingZone?.name ?? 'Top block'} leads current field performance.</p>
          </div>
        </div>
      </div>

      <div className="home-map-card__legend">
        {mapGuide.map((item) => (
          <div key={item.id} className="home-map-card__legend-item">
            {item.kind === 'route' ? (
              <span className="home-map-card__legend-route" />
            ) : (
              <span className={`home-map-card__legend-dot home-map-card__legend-dot--${item.tone}`} />
            )}
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="home-map-card__recommendation">{recommendation}</p>
    </section>
  )
}

export default HomeFieldMapCard
