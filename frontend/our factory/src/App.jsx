
import { Routes, Route } from 'react-router-dom'
import UserHome from './dashboard/userhome.jsx'
import Registeration from './pages/registeration.jsx'
import Login from './pages/login.jsx'
import Landing from './pages/landing.jsx'
import ProviderDashboard from './dashboard/providerhome.jsx'
import EditProfile from './components/editprofile.jsx'
import ElectricianPage from './services/electrician.jsx'
import PlumberPage from './services/plumber.jsx'
import ProviderEditProfile from './components/providereditprofile.jsx'
import CleaningPage from './services/cleaning.jsx'
import PainterPage from './services/painter.jsx'
import ACrepairPage from './services/acrepair.jsx'
import CarpentrPage from './services/carpenter.jsx'
import ProviderData from './Databoard/providerData.jsx'


function App() {

  
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Registeration />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user" element={<UserHome />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderData />} />

        <Route path="/useredit" element={<EditProfile />} />
        <Route path="/provideredit" element={<ProviderEditProfile />} />

        <Route path="/electrician" element={<ElectricianPage />} />
        <Route path="/plumber" element={<PlumberPage />} />
        <Route path="/cleaning" element={<CleaningPage />} />
        <Route path="/painter" element={<PainterPage />} />
        <Route path="/ac-repair" element={<ACrepairPage />} />
        <Route path="/carpenter" element={<CarpentrPage />} />
      </Routes>
    </div>
  )
}

export default App