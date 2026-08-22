import React from 'react'
import { X, Bell } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function NotificationPanel({ open, onClose }) {
  const { notifications } = useApp()
  if (!open) return null

  return (
    <div className="absolute right-4 top-16 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 animate-fadeIn">
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100">
        <h3 className="font-semibold text-navy flex items-center gap-2">
          <Bell size={16} /> Notifications
        </h3>
        <button onClick={onClose}><X size={16} className="text-slate-400" /></button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="text-sm text-slate-400 p-4">No notifications yet.</p>
        )}
        {notifications.map((n) => (
          <div key={n.id} className={`px-4 py-3 text-sm border-b border-slate-50 ${n.read ? 'text-slate-400' : 'text-navy font-medium'}`}>
            {n.text}
          </div>
        ))}
      </div>
    </div>
  )
}
