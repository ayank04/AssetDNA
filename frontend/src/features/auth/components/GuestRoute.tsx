"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../providers/AuthProvider"
import { AnimatedFade } from "@/components/animations/Motion"
import { Loader2 } from "lucide-react"

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard") // Redirect to dashboard if already logged in
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <AnimatedFade className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
          <p className="text-sm text-muted-foreground animate-pulse">Restoring session...</p>
        </div>
      </AnimatedFade>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
