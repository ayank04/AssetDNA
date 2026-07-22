"use client"

import * as React from "react"

interface GlobalStateContextType {
  // Authentication Placeholder
  isAuthenticated: boolean
  user: any | null
  
  // Asset Context
  selectedAssetId: string | null
  setSelectedAssetId: (id: string | null) => void
  
  // App-wide loading
  isGlobalLoading: boolean
  setGlobalLoading: (loading: boolean) => void
}

const GlobalStateContext = React.createContext<GlobalStateContextType | undefined>(undefined)

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = React.useState(false) // Placeholder for Firebase Auth
  const [user] = React.useState(null)
  
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null)
  const [isGlobalLoading, setGlobalLoading] = React.useState(false)

  return (
    <GlobalStateContext.Provider
      value={{
        isAuthenticated,
        user,
        selectedAssetId,
        setSelectedAssetId,
        isGlobalLoading,
        setGlobalLoading
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export function useGlobalState() {
  const context = React.useContext(GlobalStateContext)
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider")
  }
  return context
}
