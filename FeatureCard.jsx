import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FeatureCard({ icon, label, to }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="flex flex-col items-center gap-2 bg-white rounded-2xl shadow-card py-4 px-2 hover:-translate-y-1 transition"
    >
      <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center text-aqua-dark">
        {icon}
      </div>
      <span className="text-xs font-semibold text-navy text-center leading-tight">{label}</span>
    </button>
  )
}
