import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/layout/Navbar'
import TaskCard from '../components/tasks/TaskCard'
import TaskForm from '../components/tasks/TaskForm'
import FilterBar from '../components/tasks/FilterBar'
import StatsBar from '../components/tasks/StatsBar'
import { SkeletonCard, EmptyState, Spinner } from '../components/ui'
import { useTasks } from '../hooks/useTasks'
import { ESTADOS } from '../utils/constants'

export default function DashboardPage() {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks()

  const [showForm, setShowForm]     = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter]         = useState('Todos')

  // ── Filtered tasks ─────────────────────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    if (filter === 'Todos') return tasks
    return tasks.filter((t) => t.estado === filter)
  }, [tasks, filter])

  // ── Counts for FilterBar ───────────────────────────────────────────────────
  const counts = useMemo(() => ({
    [ESTADOS.PENDIENTE]:   tasks.filter(t => t.estado === ESTADOS.PENDIENTE).length,
    [ESTADOS.EN_PROGRESO]: tasks.filter(t => t.estado === ESTADOS.EN_PROGRESO).length,
    [ESTADOS.COMPLETADA]:  tasks.filter(t => t.estado === ESTADOS.COMPLETADA).length,
  }), [tasks])

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCreate = async (formData) => {
    try {
      await addTask(formData)
      setShowForm(false)
      Swal.fire({ title: '¡Tarea creada!', icon: 'success', timer: 1800, showConfirmButton: false })
    } catch {
      Swal.fire({ title: 'Error', text: 'No se pudo crear la tarea.', icon: 'error' })
    }
  }

  const handleEdit = async (formData) => {
    try {
      await editTask(editingTask.id, formData)
      setEditingTask(null)
      Swal.fire({ title: '¡Tarea actualizada!', icon: 'success', timer: 1800, showConfirmButton: false })
    } catch {
      Swal.fire({ title: 'Error', text: 'No se pudo actualizar la tarea.', icon: 'error' })
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    await editTask(id, { estado: newStatus })
  }

  const handleDelete = async (id, titulo) => {
    const result = await Swal.fire({
      title: '¿Eliminar tarea?',
      html: `La tarea <strong>"${titulo}"</strong> se eliminará permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      try {
        await removeTask(id)
        Swal.fire({ title: 'Eliminada', text: 'La tarea fue eliminada.', icon: 'success', timer: 1800, showConfirmButton: false })
      } catch {
        Swal.fire({ title: 'Error', text: 'No se pudo eliminar la tarea.', icon: 'error' })
      }
    }
  }

  const openCreate = () => { setEditingTask(null); setShowForm(true) }
  const openEdit = (task) => { setShowForm(false); setEditingTask(task) }
  const cancelForm = () => { setShowForm(false); setEditingTask(null) }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Tablero</h1>
            <p className="text-sm text-white/40 mt-0.5">Gestiona y realiza seguimiento de tus tareas</p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nueva tarea
          </button>
        </div>

        {/* Stats */}
        {!loading && tasks.length > 0 && <StatsBar tasks={tasks} />}

        {/* Form: Create */}
        {showForm && (
          <TaskForm onSubmit={handleCreate} onCancel={cancelForm} />
        )}

        {/* Form: Edit */}
        {editingTask && (
          <TaskForm task={editingTask} onSubmit={handleEdit} onCancel={cancelForm} />
        )}

        {/* Filter bar */}
        {!loading && tasks.length > 0 && (
          <FilterBar active={filter} onChange={setFilter} counts={counts} />
        )}

        {/* Error state */}
        {error && (
          <div className="card p-4 border-red-500/20 bg-red-500/5 text-red-400 text-sm flex items-center gap-2">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Tasks grid */}
        {!loading && !error && (
          filteredTasks.length === 0 ? (
            <EmptyState
              title={filter === 'Todos' ? 'Sin tareas aún' : `Sin tareas "${filter}"`}
              description={filter === 'Todos' ? 'Crea tu primera tarea para comenzar.' : 'No hay tareas con este filtro.'}
              action={
                filter === 'Todos' && (
                  <button onClick={openCreate} className="btn-primary text-sm">
                    Crear primera tarea
                  </button>
                )
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  )
}
