import * as React from "react"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { WorkspaceProvider } from "@/components/workspace/WorkspaceProvider"
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader"
import { ContextPanel } from "@/components/workspace/ContextPanel"
import { AnimatedFade } from "@/components/animations/Motion"

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <WorkspaceProvider>
        <AnimatedFade className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
          <WorkspaceHeader />
          <div className="flex flex-1 overflow-hidden relative">
            <main className="flex-1 overflow-hidden relative bg-muted/10">
              {children}
            </main>
            <ContextPanel />
          </div>
        </AnimatedFade>
      </WorkspaceProvider>
    </ProtectedRoute>
  )
}
