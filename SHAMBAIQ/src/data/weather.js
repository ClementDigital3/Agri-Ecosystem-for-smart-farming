export const weatherCurrent = {
  location: 'Uasin Gishu County',
  updated: 'Updated 10:00 AM',
  condition: 'Cool & Cloudy',
  summary: 'Cool highland conditions with light morning showers. Favorable moisture profile for maize and wheat blocks.',
  temperature: 20,
  rainChance: 65,
  humidity: 78,
  wind: '12 km/h',
  windSpeed: '12 km/h',
}

export const weatherForecast = [
  {
    day: 'Today',
    condition: 'Light Showers',
    high: 21,
    low: 12,
    rainChance: 65,
    wind: '12 km/h',
    outlook: 'Cool temperatures with intermittent light rain.',
  },
  {
    day: 'Thu',
    condition: 'Partly Cloudy',
    high: 22,
    low: 11,
    rainChance: 25,
    wind: '10 km/h',
    outlook: 'Light cloud cover, cool and breezy afternoon.',
  },
  {
    day: 'Fri',
    condition: 'Scattered Showers',
    high: 21,
    low: 12,
    rainChance: 70,
    wind: '14 km/h',
    outlook: 'Afternoon rain showers expected across Moiben/Soy.',
  },
  {
    day: 'Sat',
    condition: 'Mostly Cloudy',
    high: 20,
    low: 11,
    rainChance: 40,
    wind: '11 km/h',
    outlook: 'Overcast skies keeping temperatures low.',
  },
  {
    day: 'Sun',
    condition: 'Sunny Intervals',
    high: 23,
    low: 12,
    rainChance: 20,
    wind: '9 km/h',
    outlook: 'Warm return with clear sunny breaks by midday.',
  },
]

export const weatherRainfallSummary = {
  expectedRainfall: '42 mm',
  weeklyPattern: 'Cool highland rain showers',
  recommendation: 'Optimal moisture for top-dressing and weeding. Delay direct chemical spraying during active rain windows.',
}

export const weatherAlerts = [
  {
    id: 'blight-risk',
    level: 'high',
    title: 'Fungal Blight Risk',
    detail: 'Cool, damp weather increases susceptibility to maize leaf blight and wheat rust.',
  },
  {
    id: 'leaching-risk',
    level: 'medium',
    title: 'Nitrogen Leaching',
    detail: 'Heavy downpours on slopes may wash away recently applied fertilizers.',
  },
  {
    id: 'damp-canopy',
    level: 'medium',
    title: 'High Canopy Dampness',
    detail: 'Extended leaf wetness hours. Avoid mechanical entry to reduce spore transmission.',
  },
]

export const fieldConditions = [
  { task: 'Spraying', status: 'WAIT', reason: 'Leaf canopy dampness / light rain', color: 'var(--alert)' },
  { task: 'Planting', status: 'GO', reason: 'Excellent topsoil moisture (62%)', color: 'var(--green-fresh)' },
  { task: 'Harvesting', status: 'STOP', reason: 'High grain moisture content', color: 'var(--danger)' }
]

export const hourlyForecast = [
  { time: '08:00', temp: 14, rain: 60, wind: 10 },
  { time: '11:00', temp: 18, rain: 45, wind: 12 },
  { time: '14:00', temp: 20, rain: 35, wind: 12 },
  { time: '17:00', temp: 19, rain: 55, wind: 14 },
  { time: '20:00', temp: 16, rain: 20, wind: 8 },
  { time: '23:00', temp: 13, rain: 10, wind: 6 },
]

export const agriMetrics = {
  et: { value: 3.2, unit: 'mm/day', status: 'Low Water Loss' },
  gdd: { value: 980, unit: '°C days', status: 'Vegetative Growth Stage' },
  soilTemp: { value: 16, unit: '°C', status: 'Cool (Optimal for Maize)' },
  moisture: { value: 62, unit: '%', status: 'Optimal Moisture' }
}

export const pestRisks = [
  { name: 'Fungal Blight (Maize)', level: 'High Risk', progress: 80, color: 'var(--danger)' },
  { name: 'Stem Rust (Wheat)', level: 'High Risk', progress: 75, color: 'var(--danger)' },
  { name: 'Fall Armyworm', level: 'Moderate', progress: 40, color: 'var(--alert)' }
]

export const windData = {
  speed: 12,
  gusts: 18,
  direction: 'SE',
  status: 'Favorable',
  recommendation: 'Wind speeds support operations, but spraying is on hold due to damp leaves.',
  color: 'var(--green-fresh)'
}

export const soilProfile = {
  status: 'Adequate Moisture',
  depths: [
    { range: '0 - 10 cm', moisture: 58, label: 'Topsoil (Moist)', color: 'var(--green-fresh)' },
    { range: '10 - 30 cm', moisture: 64, label: 'Active Root Zone (Optimal)', color: 'var(--green-fresh)' },
    { range: '30 - 60 cm', moisture: 68, label: 'Deep Soil (Saturated)', color: 'var(--info)' }
  ]
}
