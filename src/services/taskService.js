import axios from 'axios'

// Replace this URL with your own MockAPI endpoint after creating the project
// Example: https://YOUR_ID.mockapi.io/api/v1
const BASE_URL = import.meta.env.VITE_API_URL || 'https://66700fe1a2c5417c1aea1b93.mockapi.io/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Tasks ──────────────────────────────────────────────────────────────────

export const getTasks = () =>
  api.get('/tareas').then((r) => r.data)

export const createTask = (task) =>
  api.post('/tareas', task).then((r) => r.data)

export const updateTask = (id, task) =>
  api.put(`/tareas/${id}`, task).then((r) => r.data)

export const deleteTask = (id) =>
  api.delete(`/tareas/${id}`).then((r) => r.data)
