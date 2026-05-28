import { ESTADOS } from '../../utils/constants'

const FILTERS = [
  { value: 'Todos', label: 'Todos' },
  { value: ESTADOS.PENDIENTE,   label: 'Pendientes'  },
  { value: ESTADOS.EN_PROGRESO, label: 'En Progreso'  },
  { value: ESTADOS.COMPLETADA,  label: 'Completadas'  },
]

export default function FilterBar({ active, onChange, counts }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {FILTERS.map(({ value, label }) => {
        const isActive = active === value
        const count = value === 'Todos'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[value] ?? 0)

        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
