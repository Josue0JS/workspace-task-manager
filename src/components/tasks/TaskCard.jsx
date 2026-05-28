import { useState } from 'react'
import { ESTADO_LABELS, ESTADOS, formatDate, isOverdue } from '../../utils/constants'

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [changingStatus, setChangingStatus] = useState(false)
  const estado = ESTADO_LABELS[task.estado] ?? ESTADO_LABELS[ESTADOS.PENDIENTE]
  const overdue = isOverdue(task.fechaVencimiento, task.estado)

  const handleStatusChange = async (e) => {
    setChangingStatus(true)
    try {
      await onStatusChange(task.id, e.target.value)
    } finally {
      setChangingStatus(false)
    }
  }

  return (
    <article className="card p-5 flex flex-col gap-3 hover:border-white/10 transition-all duration-200 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-semibold leading-snug ${task.estado === ESTADOS.COMPLETADA ? 'line-through text-white/40' : 'text-white'}`}>
          {task.titulo}
        </h3>
        <span className={estado.className}>{estado.label}</span>
      </div>

      {/* Description */}
      {task.descripcion && (
        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{task.descripcion}</p>
      )}

      {/* Due date */}
      <div className="flex items-center gap-1.5">
        <svg className={`h-3.5 w-3.5 ${overdue ? 'text-red-400' : 'text-white/30'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={`text-xs font-mono ${overdue ? 'text-red-400' : 'text-white/40'}`}>
          {formatDate(task.fechaVencimiento)}
          {overdue && ' · Vencida'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        {/* Status changer */}
        <select
          value={task.estado}
          onChange={handleStatusChange}
          disabled={changingStatus}
          className="bg-surface-3 border border-white/10 rounded-lg text-xs text-white/70 px-2 py-1.5 cursor-pointer
                     focus:outline-none focus:border-brand-500 transition-all disabled:opacity-50"
        >
          {Object.values(ESTADOS).map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        {/* Edit & Delete buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="btn-ghost p-2 text-white/50"
            title="Editar tarea"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id, task.titulo)}
            className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            title="Eliminar tarea"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
