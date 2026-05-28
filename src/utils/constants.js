export const ESTADOS = {
  PENDIENTE:   'Pendiente',
  EN_PROGRESO: 'En Progreso',
  COMPLETADA:  'Completada',
}

export const DEPARTAMENTOS = [
  'Desarrollo',
  'Diseño',
  'Marketing',
  'Producto',
  'Datos',
  'Operaciones',
]

export const ESTADO_LABELS = {
  [ESTADOS.PENDIENTE]:   { label: 'Pendiente',   className: 'badge-pending',  dot: 'bg-amber-400'   },
  [ESTADOS.EN_PROGRESO]: { label: 'En Progreso',  className: 'badge-progress', dot: 'bg-blue-400'    },
  [ESTADOS.COMPLETADA]:  { label: 'Completada',   className: 'badge-done',     dot: 'bg-emerald-400' },
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  })
}

export const isOverdue = (dateStr, estado) => {
  if (!dateStr || estado === ESTADOS.COMPLETADA) return false
  return new Date(dateStr) < new Date()
}
