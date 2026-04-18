import { alerts } from '../data/alerts'
import { cropAdvisories, agriculturalProtocols } from '../data/crops'
import {
  farmerProfile,
  homeBrand,
  homeFieldMap,
  homeQuickActions,
  myFarmOverview,
  soilStatus,
} from '../data/home'
import { marketPrices } from '../data/marketPrices'
import { weatherAlerts, weatherCurrent, weatherForecast, weatherRainfallSummary, fieldConditions, hourlyForecast, agriMetrics, pestRisks, windData, soilProfile } from '../data/weather'

function parseTrendChange(change) {
  return Number.parseFloat(String(change).replace('%', '')) || 0
}

function scaleBars(values, minimum = 22, maximum = 88) {
  const highest = Math.max(...values, 1)

  return values.map((value) => {
    const ratio = value / highest
    return Math.round(minimum + ratio * (maximum - minimum))
  })
}

export async function getWeatherData() {
  const baseData = {
    current: weatherCurrent,
    forecast: weatherForecast,
    rainfallSummary: weatherRainfallSummary,
    alerts: weatherAlerts,
    conditions: fieldConditions,
    hourly: hourlyForecast,
    metrics: agriMetrics,
    pests: pestRisks,
    wind: windData,
    soilProfile: soilProfile
  }

  try {
    // Fetch live weather data for Eldoret (Lat: 0.5143, Lon: 35.2698)
    const res = await fetch('http://localhost:3001/api/weather?lat=0.5143&lon=35.2698')
    if (res.ok) {
      const liveData = await res.json()
      // Merge live satellite data over the static mock data
      baseData.metrics = liveData.metrics
      baseData.wind = liveData.windData
    }
  } catch (err) {
    console.warn("Backend offline. Falling back to offline mock weather data.", err)
  }

  return baseData
}

export function getCropAdvisories() {
  return cropAdvisories
}
export function getAgriculturalProtocols() {
  return agriculturalProtocols
}

export function getAlerts() {
  return alerts
}

export function getMarketPrices() {
  return marketPrices
}

export function getDashboardSnapshot() {
  return {
    currentWeather: weatherCurrent,
    cropFocus: cropAdvisories[0],
    primaryAlert: alerts[0],
    marketSpotlight: marketPrices[0],
    alertCount: alerts.length,
  }
}

export function getHomeDashboardData() {
  const todayWeather = weatherForecast[0] ?? {}
  const cropFocus = cropAdvisories[0]
  const topAlert = alerts[0]
  const marketSpotlight = [...marketPrices].sort(
    (left, right) => parseTrendChange(right.change) - parseTrendChange(left.change),
  )[0] ?? marketPrices[0]
  const rainWindow = [...weatherForecast].sort((left, right) => (right.rainChance ?? 0) - (left.rainChance ?? 0))[0] ?? weatherForecast[0]
  const rainfallBars = scaleBars(weatherForecast.map((day) => day.rainChance ?? 0))
  const cropPerformanceBars = scaleBars([58, 64, 72, 78, 82])
  const marketPulseBars = scaleBars([42, 48, 56, 63, 74])

  return {
    brand: {
      ...homeBrand,
      notificationCount: alerts.length,
    },
    user: farmerProfile,
    weather: {
      label: "Today's weather",
      day: todayWeather.day ?? 'Today',
      temperature: weatherCurrent.temperature,
      condition: todayWeather.condition ?? weatherCurrent.condition,
      summary: weatherCurrent.summary,
      location: weatherCurrent.location,
      updated: weatherCurrent.updated,
      humidity: weatherCurrent.humidity,
      windSpeed: weatherCurrent.windSpeed ?? weatherCurrent.wind,
      rainChance: weatherCurrent.rainChance,
    },
    soil: soilStatus,
    quickStats: [
      {
        id: 'crop-health-score',
        label: 'Crop Health Score',
        value: '82%',
        note: `${cropFocus.name} is responding well after the last moisture window.`,
        tone: 'crop',
        meta: 'Score',
      },
      {
        id: 'alerts',
        label: 'Active Alerts',
        value: `${alerts.length}`,
        note: `1 high-priority issue led by ${topAlert.title.toLowerCase()}.`,
        tone: 'alerts',
        meta: 'Live',
      },
      {
        id: 'market-opportunity',
        label: 'Market Opportunity',
        value: marketSpotlight.crop,
        note: `${marketSpotlight.market} buyers are up ${marketSpotlight.change} today.`,
        tone: 'market',
        meta: 'Best',
      },
      {
        id: 'rain-readiness',
        label: 'Rain Readiness',
        value: 'Moderate',
        note: `${rainWindow.day} offers the clearest planting window at ${rainWindow.rainChance}% chance.`,
        tone: 'weather',
        meta: 'Prep',
      },
    ],
    trendCards: [
      {
        id: 'rainfall-trend',
        label: 'Rainfall trend',
        value: weatherRainfallSummary.expectedRainfall,
        delta: '5-day view',
        title: `${rainWindow.day} is the main moisture window`,
        detail: weatherRainfallSummary.recommendation,
        bars: rainfallBars,
        tone: 'weather',
      },
      {
        id: 'crop-performance-trend',
        label: 'Crop performance trend',
        value: '82%',
        delta: '+6 pts',
        title: `${cropFocus.name} is leading field performance`,
        detail: `Current watch: ${cropFocus.watch}`,
        bars: cropPerformanceBars,
        tone: 'crop',
      },
      {
        id: 'market-pulse',
        label: 'Market pulse',
        value: marketSpotlight.price,
        delta: marketSpotlight.change,
        title: `${marketSpotlight.crop} is the best-selling crop today`,
        detail: `${marketSpotlight.market} is leading at ${marketSpotlight.price} per ${marketSpotlight.unit}.`,
        bars: marketPulseBars,
        tone: 'market',
      },
    ],
    recommendation: {
      eyebrow: "Today's recommendations",
      badge: 'Decision support',
      title: 'Action priority for the week',
      detail:
        'Prepared plots can use the Tuesday shower window well, but broad planting should stay conservative until a second rainfall signal arrives.',
      actions: [
        {
          label: 'Plant sorghum this week',
          copy: `Finish row layout and seed moisture-holding plots before ${rainWindow.day.toLowerCase()} evening.`,
          tone: 'primary',
        },
        {
          label: 'Delay planting due to low rainfall',
          copy: 'Hold pigeon pea expansion and any wide-field planting until rainfall becomes more reliable.',
          tone: 'watch',
        },
      ],
      timing: `Rain readiness is moderate with ${rainWindow.rainChance}% rain probability on ${rainWindow.day}.`,
    },
    alertPanel: {
      eyebrow: 'Alerts panel',
      title: 'Pest and drought signals',
      detail: 'Color-coded field signals ranked by urgency for quicker scouting decisions.',
      alerts: [
        {
          id: topAlert.id,
          tag: topAlert.tag,
          title: topAlert.title,
          detail: topAlert.detail,
          level: topAlert.level,
          time: topAlert.time,
        },
        {
          id: weatherAlerts[1]?.id ?? 'drought-watch',
          tag: 'Drought',
          title: weatherAlerts[1]?.title ?? 'Low rainfall risk',
          detail: weatherAlerts[1]?.detail ?? weatherRainfallSummary.recommendation,
          level: 'medium',
          time: '7 day watch',
        },
        {
          id: 'stable-field',
          tag: 'Field',
          title: `${homeFieldMap.zones[0].name} remains stable`,
          detail: `${homeFieldMap.zones[0].crop} currently leads the farm overview with ${homeFieldMap.zones[0].performanceShare}% performance share.`,
          level: 'low',
          time: 'Today',
        },
      ],
    },
    fieldMap: homeFieldMap,
    actions: homeQuickActions.map((action) => {
      if (action.id === 'crop-advice') {
        return {
          ...action,
          detail: `${cropFocus.name} is the current field focus.`,
        }
      }

      if (action.id === 'pest-alerts') {
        return {
          ...action,
          detail: topAlert.title,
        }
      }

      if (action.id === 'market-prices') {
        return {
          ...action,
          detail: `${marketSpotlight.crop} ${marketSpotlight.change} in ${marketSpotlight.market}.`,
        }
      }

      return {
        ...action,
        detail: `${farmerProfile.farmName} overview and field notes.`,
      }
    }),
  }
}

export function getMyFarmData() {
  const cropFocus = cropAdvisories[0]
  const bestMarket = marketPrices[0]

  return {
    ...myFarmOverview,
    cropCount: cropAdvisories.length,
    nextTask: cropFocus.action,
    marketSpotlight: `${bestMarket.crop} at ${bestMarket.market}`,
    fieldMap: homeFieldMap,
    equipment: [
      { name: 'John Deere Tractor', status: 'Idle', fuel: '75%', location: 'Shed' },
      { name: 'Main Irrigation Pump', status: 'Running', flow: '45 L/min', location: 'South River' },
      { name: 'Drone Mapper', status: 'Charging', battery: '95%', location: 'Office' }
    ]
  }
}
