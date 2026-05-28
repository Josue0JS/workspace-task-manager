import { useState, useEffect } from 'react'
import { ESTADOS } from '../../utils/constants'
import { InputField, TextareaField, SelectField, Spinner } from '../ui'

const EMPTY_FORM = {
  titulo:           '',
  descripcion:      '',
  fechaVencimiento: '',
  estado:           ESTADOS.PENDIENTE,
}

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm]       = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const isEditing = !!task

  useEffect(() => {
    if (task) {
      setForm({
        titulo:           task.titulo          || '',
        descripcion:      task.descripcion     || '',
        fechaVencimiento: task.fechaVencimiento ? task.fechaVencimiento.slice(0, 10) : '',
        estado:           task.estado          || ESTADOS.PENDIENTE,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [task])

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) {
      setError('El título es obligatorio.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await onSubmit(form)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-white mb-5">
        {isEditing ? 'Editar tarea' : 'Nueva tarea'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Título"
          id="titulo"
          placeholder="¿Qué hay que hacer?"
          value={form.titulo}
          onChange={set('titulo')}
          required
        />

        <TextareaField
          label="Descripción"
          id="descripcion"
          placeholder="Detalles adicionales (opcional)..."
          value={form.descripcion}
          onChange={set('descripcion')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Fecha de vencimiento"
            id="fechaVencimiento"
            type="date"
            value={form.fechaVencimiento}
            onChange={set('fechaVencimiento')}
          />

          {isEditing && (
            <SelectField
              label="Estado"
              id="estado"
              options={Object.values(ESTADOS)}
              value={form.estado}
              onChange={set('estado')}
            />
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <button type="submit" className="btn-primary flex items-center gap-2" disabled={loading}>
            {loading && <Spinner size="sm" />}
            {isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </button>
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
