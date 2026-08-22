import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => load('trawell_user', null))
  const [trips, setTrips] = useState(() => load('trawell_trips', []))
  const [notifications, setNotifications] = useState(() => load('trawell_notifications', [
    { id: 1, type: 'weather', text: 'Rain expected at your next destination tomorrow.', read: false },
    { id: 2, type: 'budget', text: 'You have used 60% of your Kerala Trip budget.', read: false },
  ]))

  useEffect(() => { localStorage.setItem('trawell_user', JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem('trawell_trips', JSON.stringify(trips)) }, [trips])
  useEffect(() => { localStorage.setItem('trawell_notifications', JSON.stringify(notifications)) }, [notifications])

  const login = (username) => {
    setUser({
      name: username || 'Traveler',
      userId: 'TRW-' + Math.floor(1000 + Math.random() * 9000),
      email: `${(username || 'traveler').toLowerCase()}@trawell.com`,
      phone: '+91 90000 00000',
      location: 'Thanjavur, Tamil Nadu',
    })
  }

  const register = ({ name, userId, email }) => {
    setUser({
      name: name || 'Traveler',
      userId: userId || 'TRW-' + Math.floor(1000 + Math.random() * 9000),
      email: email || 'traveler@trawell.com',
      phone: '+91 90000 00000',
      location: 'Thanjavur, Tamil Nadu',
    })
  }

  const logout = () => setUser(null)

  const addTrip = (trip) => {
    const newTrip = {
      id: Date.now(),
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: Number(trip.budget) || 0,
      expenses: [],
    }
    setTrips((t) => [...t, newTrip])
    return newTrip.id
  }

  const addExpense = (tripId, expense) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? { ...t, expenses: [...t.expenses, { id: Date.now(), ...expense, amount: Number(expense.amount) || 0 }] }
          : t
      )
    )
  }

  const markNotificationsRead = () => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })))
  }

  const value = {
    user, login, register, logout,
    trips, addTrip, addExpense,
    notifications, markNotificationsRead,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
