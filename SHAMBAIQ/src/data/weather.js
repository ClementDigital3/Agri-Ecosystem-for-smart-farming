export const weatherCurrent = {
  location: 'Kitui County',
  updated: 'Updated 4:00 PM',
  condition: 'Sunny',
  summary: 'Hot afternoon with dry air and light winds across most farms.',
  temperature: 31,
  rainChance: 18,
  humidity: 46,
  wind: '18 km/h',
  windSpeed: '18 km/h',
}

export const weatherForecast = [
  {
    day: 'Today',
    condition: 'Sunny',
    high: 31,
    low: 19,
    rainChance: 18,
    wind: '18 km/h',
    outlook: 'Hot and dry through late afternoon.',
  },
  {
    day: 'Sun',
    condition: 'Partly cloudy',
    high: 30,
    low: 18,
    rainChance: 20,
    wind: '16 km/h',
    outlook: 'Light cloud cover with little rainfall expected.',
  },
  {
    day: 'Mon',
    condition: 'Breezy',
    high: 29,
    low: 17,
    rainChance: 12,
    wind: '22 km/h',
    outlook: 'Dry winds may increase surface moisture loss.',
  },
  {
    day: 'Tue',
    condition: 'Light showers',
    high: 27,
    low: 17,
    rainChance: 44,
    wind: '14 km/h',
    outlook: 'Short showers may support land preparation.',
  },
  {
    day: 'Wed',
    condition: 'Mostly sunny',
    high: 30,
    low: 18,
    rainChance: 16,
    wind: '17 km/h',
    outlook: 'Warm return after the brief moisture window.',
  },
]

export const weatherRainfallSummary = {
  expectedRainfall: '14 mm',
  weeklyPattern: 'Light and uneven rainfall',
  recommendation: 'Suitable for land preparation. Delay full planting until follow-up rain improves.',
}

export const weatherAlerts = [
  {
    id: 'heat-risk',
    level: 'high',
    title: 'High heat',
    detail: 'Midday temperatures may stress young crops and livestock.',
  },
  {
    id: 'low-rainfall',
    level: 'medium',
    title: 'Low rainfall',
    detail: 'Only scattered light showers are expected this week.',
  },
  {
    id: 'dry-spell',
    level: 'medium',
    title: 'Possible dry spell',
    detail: 'Soil moisture may drop again quickly after Tuesday.',
  },
]

export const fieldConditions = [
  { task: 'Spraying', status: 'WAIT', reason: 'High wind gusts (18 km/h)', color: 'var(--alert)' },
  { task: 'Planting', status: 'STOP', reason: 'Low soil moisture (35%)', color: 'var(--danger)' },
  { task: 'Harvesting', status: 'GO', reason: 'Dry canopy, low rain risk', color: 'var(--green-fresh)' }
]

export const hourlyForecast = [
  { time: '08:00', temp: 23, rain: 0, wind: 12 },
  { time: '11:00', temp: 27, rain: 5, wind: 14 },
  { time: '14:00', temp: 31, rain: 15, wind: 18 },
  { time: '17:00', temp: 30, rain: 25, wind: 22 },
  { time: '20:00', temp: 26, rain: 60, wind: 16 },
  { time: '23:00', temp: 23, rain: 30, wind: 12 },
]

export const agriMetrics = {
  et: { value: 6.8, unit: 'mm/day', status: 'High Water Loss' },
  gdd: { value: 1450, unit: '°C days', status: 'Grain Filling Stage' },
  soilTemp: { value: 24, unit: '°C', status: 'Optimal' },
  moisture: { value: 34, unit: '%', status: 'Stress Watch' }
}

export const pestRisks = [
  { name: 'Fall Armyworm', level: 'High Risk', progress: 85, color: 'var(--danger)' },
  { name: 'Fungal Blight', level: 'Moderate', progress: 45, color: 'var(--alert)' },
  { name: 'Locust Swarm', level: 'Low Risk', progress: 15, color: 'var(--green-fresh)' }
]

export const windData = {
  speed: 18,
  gusts: 26,
  direction: 'NE',
  status: 'Caution',
  recommendation: 'Chemical drift highly likely. Halt spraying activities until dusk.',
  color: 'var(--alert)'
}

export const soilProfile = {
  status: 'Drying Surface',
  depths: [
    { range: '0 - 10 cm', moisture: 25, label: 'Topsoil (Dry)', color: 'var(--weather)' },
    { range: '10 - 30 cm', moisture: 48, label: 'Active Root Zone (Optimal)', color: 'var(--green-fresh)' },
    { range: '30 - 60 cm', moisture: 65, label: 'Deep Soil (Saturated)', color: 'var(--info)' }
  ]
}
