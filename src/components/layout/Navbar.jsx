import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'

export default function Navbar() {
  const { session, logout } = useAuth()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se limpiarán los datos de tu sesión actual.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    })
    if (result.isConfirmed) logout()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight">Workspace</span>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white leading-none">{session?.nombre}</p>
              <p className="text-xs text-white/40 mt-0.5">{session?.departamento}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 font-semibold text-sm select-none">
              {session?.nombre?.[0]?.toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="btn-ghost flex items-center gap-1.5 text-sm"
              title="Cerrar sesión"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
