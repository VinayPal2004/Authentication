import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserHome from './dashboard/userhome.jsx'
import Registeration from './pages/registeration.jsx'
import Login from './pages/login.jsx'
import Landing from './pages/landing.jsx'
import ProviderDashboard from './dashboard/providerhome.jsx'
import EditProfile from './components/editprofile.jsx'


function App() {

  
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/signup' element={<Registeration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserHome />} />
        <Route path='/provider' element={<ProviderDashboard />} />
        <Route path='/edit' element={<EditProfile/>}/>
      </Routes>
    </div>
  )
}

export default App