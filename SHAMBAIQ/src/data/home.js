export const homeBrand = {
  title: 'Shamba IQ',
  subtitle: 'Smart dryland farming',
  status: 'Daily dashboard',
}

export const farmerProfile = {
  name: 'John',
  location: 'Kitui County',
  farmName: 'Kaveta Farm',
  greetingNote: 'Your fields look calm this morning. Start with the weather, then review soil and market movement before heading out.',
  seasonLabel: 'Dryland season watch',
  todayFocus: 'Check sorghum blocks early before afternoon heat picks up.',
}

export const soilStatus = {
  moisture: 64,
  ph: 6.4,
  status: 'Balanced soil',
  headline: 'Moisture holding well',
  note: 'Moisture is holding well for sorghum and cowpeas after the last light showers.',
  guidance: 'Suitable for light land preparation and weeding.',
}

export const homeQuickActions = [
  {
    id: 'crop-advice',
    title: 'Crop Advice',
    route: '/crop-advisory',
    icon: 'crop',
    badge: 'Field tips',
    tone: 'crop',
  },
  {
    id: 'pest-alerts',
    title: 'Pest Alerts',
    route: '/alerts',
    icon: 'alerts',
    badge: 'Watch now',
    tone: 'alerts',
  },
  {
    id: 'market-prices',
    title: 'Market Prices',
    route: '/market-prices',
    icon: 'market',
    badge: 'Price check',
    tone: 'market',
  },
  {
    id: 'my-farm',
    title: 'My Farm',
    route: '/my-farm',
    icon: 'farm',
    badge: 'Farm view',
    tone: 'farm',
  },
  {
    id: 'profit-calc',
    title: 'Profitability',
    route: '/profitability',
    icon: 'finance',
    badge: 'Forecast',
    tone: 'finance',
  },
]

export const myFarmOverview = {
  location: 'Kitui County',
  parcelName: 'Kaveta Main Plot',
  farmSize: '4.2 acres',
  soilType: 'Sandy loam',
  cropMix: 'Sorghum, cowpeas, pigeon peas',
  note: 'Field records are local only for now while the backend is still pending.',
}

export const homeInsightCards = [
  {
    id: 'advisory-window',
    eyebrow: 'Field advisory',
    title: 'Land preparation window is still open',
    detail: 'Tuesday showers may briefly improve topsoil moisture, making light tillage and row marking easier.',
    tone: 'crop',
  },
  {
    id: 'market-signal',
    eyebrow: 'Market signal',
    title: 'Cowpeas continue to lead nearby prices',
    detail: 'Use the stronger Machakos price trend to time sorting and bagging before the next collection run.',
    tone: 'market',
  },
  {
    id: 'risk-watch',
    eyebrow: 'Risk watch',
    title: 'Heat stress remains the top short-term risk',
    detail: 'Scout tender blocks early and protect water access for livestock before the hottest afternoon hours.',
    tone: 'alerts',
  },
]

export const homeFieldMap = {
  title: 'Farm Map / Field Overview',
  subtitle: 'GIS-style parcel map with local field overlays for Kaveta Main Plot.',
  badge: 'GIS-ready view',
  recommendation: 'South block is drying faster than the rest of the field. Prioritize scouting and mulch retention there first.',
  gis: {
    center: '1.3642 S, 38.0109 E',
    scale: '1:2,500',
    source: 'Local field records',
    updated: 'Updated 4:00 PM',
    acreage: '4.2 acres',
    route: 'South block scout route',
    sensors: '3 field nodes',
    layers: ['Parcel', 'Crop status', 'Scout route'],
    landmarks: [
      { id: 'node-1', label: 'Weather node', x: 116, y: 70, kind: 'sensor' },
      { id: 'node-2', label: 'Soil probe', x: 248, y: 338, kind: 'sensor' },
      { id: 'node-3', label: 'Water point', x: 548, y: 62, kind: 'water' },
      { id: 'node-4', label: 'Access gate', x: 64, y: 350, kind: 'gate' },
    ],
  },
  zones: [
    { id: 'north', name: 'North block', crop: 'Cowpeas', status: 'Stable', tone: 'good', performanceShare: 41 },
    { id: 'central', name: 'Central strip', crop: 'Sorghum', status: 'Monitor', tone: 'watch', performanceShare: 34 },
    { id: 'south', name: 'South block', crop: 'Pigeon peas', status: 'Drying', tone: 'risk', performanceShare: 25 },
  ],
}
