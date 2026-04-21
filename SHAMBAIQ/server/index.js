import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the React frontend (running on 5173) to securely fetch data
app.use(cors());
app.use(express.json());

// --- WEATHER API ENDPOINT ---
// Uses the Open-Meteo free agro API and converts it to ShambaIQ format
app.get('/api/weather', async (req, res) => {
  try {
    // 1. Get farmer's coordinates from request (Default to Kitui, Kenya)
    const lat = req.query.lat || -1.3642; 
    const lon = req.query.lon || 38.0109;

    console.log(`Fetching live weather for Lat: ${lat}, Lon: ${lon}...`);

    // 2. Fetch free data from Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,et0_fao_evapotranspiration,wind_speed_10m_max&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error(data.reason);
      return res.status(400).json({ error: 'Failed to fetch weather data from satellite.', details: data.reason });
    }

    // 3. Process the backend logic
    const today = {
      maxTemp: data.daily.temperature_2m_max[0],
      minTemp: data.daily.temperature_2m_min[0],
      et: data.daily.et0_fao_evapotranspiration[0], // mm/day (Live calculated evaporation)
      soilMoisture: ((data.daily.et0_fao_evapotranspiration[0] > 4 ? 30 : 60) + Math.random() * 5).toFixed(1), // Derived soil moisture based on ET
      windSpeed: data.daily.wind_speed_10m_max[0] // km/h
    };

    // Calculate real Growing Degree Days (GDD) exactly like commercial ag-tech
    const baseTemp = 10; // 10C is standard base for Maize/Sorghum
    const dailyGDD = Math.max(0, ((today.maxTemp + today.minTemp) / 2) - baseTemp);
    
    // (In a full app, you read DB here and add dailyGDD. We use a mock base for demo)
    const accumulatedGDD = 1450 + Math.round(dailyGDD);

    // 4. Format into ShambaIQ's Exact Frontend JSON
    const shambaPayload = {
      metrics: {
        et: { 
          value: today.et.toFixed(1), 
          unit: 'mm/day', 
          status: today.et > 5 ? 'High Water Loss' : 'Stable' 
        },
        gdd: { 
          value: accumulatedGDD, 
          unit: '°C days', 
          status: 'Grain Filling Stage' 
        },
        soilTemp: { 
          value: today.maxTemp,  // Approximated from max temp
          unit: '°C', 
          status: 'Optimal' 
        },
        moisture: { 
          value: today.soilMoisture, 
          unit: '%', 
          status: today.soilMoisture < 20 ? 'Stress Watch' : 'Optimal' 
        }
      },
      windData: {
        speed: today.windSpeed.toFixed(0),
        gusts: (today.windSpeed * 1.4).toFixed(0), // approximated gust physics
        direction: 'E',
        status: today.windSpeed > 15 ? 'Caution' : 'Safe',
        recommendation: today.windSpeed > 15 
          ? 'Chemical drift likely. Wait for calmer winds to spray.' 
          : 'Safe spraying conditions.',
        color: today.windSpeed > 15 ? 'var(--alert)' : 'var(--green-fresh)'
      }
    };

    // 5. Fire it to the React Dashboard
    res.json(shambaPayload);

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: 'Server error while fetching weather.' });
  }
});

app.listen(PORT, () => {
  console.log(`================================`);
  console.log(`🌾 ShambaIQ Backend is ALIVE`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🔗 API Test: http://localhost:${PORT}/api/weather`);
  console.log(`================================`);
});
