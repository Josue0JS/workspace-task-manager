import { ESTADOS } from '../../utils/constants'

export default function StatsBar({ tasks }) {
  const total     = tasks.length
  const pending   = tasks.filter(t => t.estado === ESTADOS.PENDIENTE).length
  const progress  = tasks.filter(t => t.estado === ESTADOS.EN_PROGRESO).length
  const completed = tasks.filter(t => t.estado === ESTADOS.COMPLETADA).length
  const pct       = total ? Math.round((completed / total) * 100) : 0

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: 'Total',       value: total,     color: 'text-white',        bg: 'bg-white/5'        },
        { label: 'Pendientes',  value: pending,   color: 'text-amber-400',    bg: 'bg-amber-400/10'   },
        { label: 'En Progreso', value: progress,  color: 'text-blue-400',     bg: 'bg-blue-400/10'    },
        { label: 'Completadas', value: completed, color: 'text-emerald-400',  bg: 'bg-emerald-400/10' },
      ].map(({ label, value, color, bg }) => (
        <div key={label} className={`card px-4 py-3 flex items-center justify-between gap-2`}>
          <span className="text-xs text-white/40">{label}</span>
          <span className={`text-xl font-semibold font-mono ${color}`}>{value}</span>
        </div>
      ))}

      {/* Progress bar spans full width */}
      {total > 0 && (
        <div className="col-span-2 sm:col-span-4 card px-4 py-3">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Progreso general</span>
            <span className="font-mono text-emerald-400">{pct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
