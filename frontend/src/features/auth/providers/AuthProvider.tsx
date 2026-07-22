"use client"

import * as React from "react"
import { User, onIdTokenChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => Promise<void>
  mockLogin: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // onIdTokenChanged tracks login, logout, and token refresh events automatically
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (!firebaseUser && typeof window !== 'undefined' && localStorage.getItem('isMockUser') === 'true') {
        setUser({ email: 'admin', uid: 'admin-mock-uid', getIdToken: async () => 'mock-token' } as any)
      } else {
        setUser(firebaseUser)
      }
      setIsLoading(false)
    })

    const handleUnauthorized = () => {
      signOut(auth)
    }
    window.addEventListener("auth:unauthorized", handleUnauthorized)

    return () => {
      unsubscribe()
      window.removeEventListener("auth:unauthorized", handleUnauthorized)
    }
  }, [])

  const logout = React.useCallback(async () => {
    try {
      await signOut(auth)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isMockUser')
      }
      toast.info("Signed out", { description: "You have been securely logged out." })
      // Hard redirect to landing page to completely wipe global state, React Context, and cached requests
      window.location.href = "/"
    } catch (error) {
      toast.error("Logout failed", { description: "Unable to sign out properly." })
    }
  }, [])

  const mockLogin = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isMockUser', 'true')
    }
    setUser({ email: 'admin', uid: 'admin-mock-uid', getIdToken: async () => 'mock-token' } as any)
    setIsLoading(false)
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      logout,
      mockLogin
    }),
    [user, isLoading, logout, mockLogin]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
