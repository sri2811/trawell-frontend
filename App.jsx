import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'

import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import PlanTrip from './pages/PlanTrip.jsx'
import Explore from './pages/Explore.jsx'
import Expenses from './pages/Expenses.jsx'
import Track from './pages/Track.jsx'
import Bookings from './pages/Bookings.jsx'
import Emergency from './pages/Emergency.jsx'
import Memo from './pages/Memo.jsx'
import DelayReplan from './pages/DelayReplan.jsx'
import Weather from './pages/Weather.jsx'

function Protected({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/plan-trip" element={<Protected><PlanTrip /></Protected>} />
      <Route path="/explore" element={<Protected><Explore /></Protected>} />
      <Route path="/expenses" element={<Protected><Expenses /></Protected>} />
      <Route path="/track" element={<Protected><Track /></Protected>} />
      <Route path="/bookings" element={<Protected><Bookings /></Protected>} />
      <Route path="/emergency" element={<Protected><Emergency /></Protected>} />
      <Route path="/memo" element={<Protected><Memo /></Protected>} />
      <Route path="/delay-replan" element={<Protected><DelayReplan /></Protected>} />
      <Route path="/weather" element={<Protected><Weather /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
