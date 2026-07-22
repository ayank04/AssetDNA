import * as React from "react"
import { GuestRoute } from "@/features/auth/components/GuestRoute"
import { LoginForm } from "@/features/auth/components/LoginForm"
import { AnimatedPage, AnimatedSlideUp } from "@/components/animations/Motion"

export default function LoginPage() {
  return (
    <GuestRoute>
      <AnimatedPage className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl opacity-50 pointer-events-none" />
        
        <AnimatedSlideUp className="w-full max-w-md mx-4 relative z-10">
          <div className="glass-heavy rounded-2xl p-8 sm:p-10 shadow-2xl border flex flex-col items-center">
            
            {/* Logo */}
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-sm mb-6">
              A
            </div>
            
            <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Sign in to AssetDNA to access your industrial knowledge base.
            </p>

            <LoginForm />

          </div>
        </AnimatedSlideUp>
      </AnimatedPage>
    </GuestRoute>
  )
}
