import { useState, useEffect, useCallback } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'

export function useTasks() {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── Fetch all tasks ──────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError('No se pudieron cargar las tareas. Verifica tu conexión.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  // ── Create ───────────────────────────────────────────────────────────────
  const addTask = async (taskData) => {
    const newTask = await createTask({
      ...taskData,
      estado: 'Pendiente',
      createdAt: new Date().toISOString(),
    })
    setTasks((prev) => [...prev, newTask])
    return newTask
  }

  // ── Update / change status ───────────────────────────────────────────────
  const editTask = async (id, taskData) => {
    const updated = await updateTask(id, taskData)
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    return updated
  }

  // ── Delete ───────────────────────────────────────────────────────────────
  const removeTask = async (id) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return { tasks, loading, error, fetchTasks, addTask, editTask, removeTask }
}
