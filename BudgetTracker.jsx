import React from 'react'
import { Target, AlertTriangle } from 'lucide-react'

// Vertical dotted-line budget tracker with a moving marker.
// Fully dynamic: works for any target budget, per the spec.
export default function BudgetTracker({ target, spent }) {
  const pct = target > 0 ? (spent / target) * 100 : 0
  const clampedPct = Math.min(pct, 130) // cap visual overflow at 130%
  const trackHeight = 260
  // 0% -> bottom (y = trackHeight), 100% -> top (y = 0)
  const markerY = trackHeight - (Math.min(clampedPct, 100) / 100) * trackHeight
  const overBudget = pct > 100
  const nearLimit = pct >= 80 && pct <= 100
  const milestones = [0, 25, 50, 75, 100]

  return (
    <div className="bg-white rounded-2xl shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-navy font-bold text-sm">
          <Target size={16} className="text-aqua-dark" /> Target Budget
        </div>
        <span className="text-sm font-bold text-navy">₹{target.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex gap-6">
        <div className="relative w-10 flex justify-center" style={{ height: trackHeight + 24 }}>
          {/* dotted vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-3 w-0.5 border-l-2 border-dashed border-slate-200"
            style={{ height: trackHeight }}
          />
          {/* milestones */}
          {milestones.map((m) => {
            const y = trackHeight - (m / 100) * trackHeight + 3
            return (
              <div
                key={m}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300"
                style={{ top: y }}
              />
            )
          })}
          {/* target bullseye at top */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 text-aqua-dark">
            <Target size={16} />
          </div>
          {/* moving marker */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white shadow-lg transition-all duration-700 ease-out ${
              overBudget ? 'bg-red-500' : nearLimit ? 'bg-amber-400' : 'bg-aqua'
            }`}
            style={{ top: markerY + 3 }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <p className="text-xs text-slate-400">Current spending</p>
            <p className="text-xl font-bold text-navy">₹{spent.toLocaleString('en-IN')}</p>
          </div>

          {!overBudget && (
            <div className="text-xs text-slate-500">
              ₹{spent.toLocaleString('en-IN')} spent · ₹{Math.max(target - spent, 0).toLocaleString('en-IN')} remaining
            </div>
          )}

          {nearLimit && !overBudget && (
            <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold bg-amber-50 rounded-lg px-2 py-1.5 animate-fadeIn">
              <AlertTriangle size={14} /> You are approaching your budget limit.
            </div>
          )}

          {pct >= 100 && !overBudget && (
            <div className="text-xs font-semibold text-navy bg-navy/5 rounded-lg px-2 py-1.5">
              Budget limit reached.
            </div>
          )}

          {overBudget && (
            <div className="flex flex-col gap-1 animate-fadeIn">
              <div className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 rounded-lg px-2 py-1.5">
                <AlertTriangle size={14} /> ⚠ Budget exceeded
              </div>
              <p className="text-xs text-red-500">₹{(spent - target).toLocaleString('en-IN')} over budget</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
