import { Navigate, Route, Routes } from 'react-router-dom'
import AppNavigation from './components/AppNavigation'
import Alerts from './pages/Alerts'
import CropAdvisory from './pages/CropAdvisory'
import Home from './pages/Home'
import MarketPrices from './pages/MarketPrices'
import MyFarm from './pages/MyFarm'
import Weather from './pages/Weather'
import GlobalAlert from './components/GlobalAlert'
import AiChatbot from './components/AiChatbot'
import GlobalFooter from './components/GlobalFooter'
import './App.css'

const navItems = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/weather', label: 'Weather', icon: 'weather' },
  { to: '/crop-advisory', label: 'Advisory', icon: 'crop' },
  { to: '/alerts', label: 'Alerts', icon: 'alerts' },
  { to: '/market-prices', label: 'Markets', icon: 'market' },
  { to: '/my-farm', label: 'My Farm', icon: 'farm' },
]

function App() {
  return (
    <div className="app-shell">
      <AppNavigation items={navItems} />
      <main className="app-frame">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/crop-advisory" element={<CropAdvisory />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/my-farm" element={<MyFarm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <GlobalFooter />
      </main>
      <GlobalAlert />
      <AiChatbot />
    </div>
  )
}

export default App
