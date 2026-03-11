import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Registeration from './pages/registeration.jsx'
import Login from './pages/login.jsx'
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Registeration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App