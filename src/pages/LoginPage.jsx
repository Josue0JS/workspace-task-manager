import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DEPARTAMENTOS } from '../utils/constants'
import { InputField, SelectField, Spinner } from '../components/ui'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]       = useState({ nombre: '', departamento: DEPARTAMENTOS[0] })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  if (isAuthenticated) return <Navigate to="/tablero" replace />

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre.trim()) {
      setError('Ingresa tu nombre de usuario.')
      return
    }
    setLoading(true)
    // Small delay to simulate "auth"
    await new Promise((r) => setTimeout(r, 600))
    login(form)
    navigate('/tablero')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-400/8 blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 shadow-xl shadow-brand-600/30">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Workspace</h1>
            <p className="text-sm text-white/40 mt-1">Gestor de Tareas y Productividad</p>
          </div>
        </div>

        {/* Card */}
        <div className="card p-7">
          <h2 className="text-lg font-semibold text-white mb-1">Bienvenido</h2>
          <p className="text-sm text-white/40 mb-6">Ingresa tus datos para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Nombre de usuario"
              id="nombre"
              placeholder="Tu nombre completo"
              value={form.nombre}
              onChange={set('nombre')}
              required
            />

            <SelectField
              label="Departamento"
              id="departamento"
              options={DEPARTAMENTOS}
              value={form.departamento}
              onChange={set('departamento')}
            />

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
              disabled={loading}
            >
              {loading && <Spinner size="sm" />}
              {loading ? 'Ingresando...' : 'Ingresar al tablero'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6 font-mono">
          Workspace v1.0 · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
