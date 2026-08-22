import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  X, User, FileText, Wallet, Bell, Settings, LogOut,
  ChevronRight, ShieldAlert, FileBadge2,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const accountItems = [
  { icon: <User size={18} />, label: 'Personal Information' },
  { icon: <FileText size={18} />, label: 'My Trips / Bookings' },
  { icon: <Wallet size={18} />, label: 'Budget & Spending', to: '/expenses' },
  { icon: <Bell size={18} />, label: 'Notifications' },
  { icon: <Settings size={18} />, label: 'Settings' },
  { icon: <ShieldAlert size={18} />, label: 'Emergency Contacts', to: '/emergency' },
  { icon: <FileBadge2 size={18} />, label: 'Travel Documents' },
]

export default function ProfileDrawer({ open, onClose }) {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 rounded-l-2xl shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-5 pt-5">
          <h2 className="text-lg font-bold text-navy">Profile</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X size={20} className="text-navy" />
          </button>
        </div>

        <div className="flex flex-col items-center mt-4 px-5">
          <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center text-white text-2xl font-bold">
            {user.name?.[0]?.toUpperCase() || 'T'}
          </div>
          <h3 className="mt-3 font-semibold text-navy">{user.name}</h3>
          <p className="text-xs text-slate-500">User ID: {user.userId}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
          <p className="text-xs text-slate-500">{user.phone}</p>
          <p className="text-xs text-slate-500">📍 {user.location}</p>
          <button className="mt-3 text-xs font-semibold text-aqua-dark border border-aqua px-4 py-1.5 rounded-full hover:bg-aqua/10">
            Edit Profile
          </button>
        </div>

        <div className="mt-6 px-5">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">My Account</p>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            {accountItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  onClose()
                  if (item.to) navigate(item.to)
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 border-b last:border-b-0 border-slate-100 text-left"
              >
                <span className="flex items-center gap-3 text-sm text-navy">
                  <span className="text-aqua-dark">{item.icon}</span>
                  {item.label}
                </span>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 px-5">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Account Actions</p>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-sm text-navy border border-slate-100 mb-2">
            Help & Support
          </button>
          <button
            onClick={() => {
              logout()
              onClose()
              navigate('/login')
            }}
            className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </>
  )
}
