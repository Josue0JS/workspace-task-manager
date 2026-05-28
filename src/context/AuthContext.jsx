import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const SESSION_KEY = 'workspace_session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (userData) => {
    const sessionData = { ...userData, loginAt: new Date().toISOString() }
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    setSession(sessionData)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, isAuthenticated: !!session }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
