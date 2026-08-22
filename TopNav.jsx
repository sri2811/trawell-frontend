import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Plane, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import ProfileDrawer from './ProfileDrawer.jsx'
import NotificationPanel from './NotificationPanel.jsx'

export default function TopNav({ title, showBack = false }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { notifications, markNotificationsRead } = useApp()
  const navigate = useNavigate()
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="sticky top-0 z-30 bg-navy text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-white/10">
            <ArrowLeft size={20} />
          </button>
        )}
        {!showBack && <Plane size={20} className="text-aqua" />}
        <span className="font-bold tracking-wide">{title || 'TRAWELL'}</span>
      </div>

      <div className="flex items-center gap-3 relative">
        <button
          className="relative p-2 rounded-full hover:bg-white/10"
          onClick={() => {
            setNotifOpen((v) => !v)
            markNotificationsRead()
          }}
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
        <button
          className="w-8 h-8 rounded-full bg-aqua text-navy font-bold flex items-center justify-center"
          onClick={() => setProfileOpen(true)}
        >
          T
        </button>
        <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      </div>

      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  )
}
