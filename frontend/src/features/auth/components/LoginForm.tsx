"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Eye, EyeOff, Loader2, WifiOff } from "lucide-react"
import { useNetwork } from "@/hooks/useNetwork"
import { toast } from "sonner"
import { useAuth } from "../providers/AuthProvider"

const loginSchema = z.object({
  email: z.string().min(1, "Please enter your username or email."),
  password: z.string().min(1, "Password is required."),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isOnline = useNetwork()
  const { mockLogin } = useAuth()
  
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: LoginFormValues) => {
    // Admin Mock Bypass
    if (data.email === 'admin' && data.password === 'admin') {
      mockLogin()
      toast.success("Welcome back, Admin!", { description: "Signed in using mock credentials." })
      const redirectTo = searchParams.get('redirect')
      router.push(redirectTo ? decodeURIComponent(redirectTo) : "/dashboard")
      return
    }

    if (!isOnline) {
      toast.error("Offline", { description: "You cannot sign in while offline." })
      return
    }

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      toast.success("Welcome back!", { description: "Signed in successfully." })
      
      // Remember Last Route Logic
      const redirectTo = searchParams.get('redirect')
      router.push(redirectTo ? decodeURIComponent(redirectTo) : "/dashboard")
    } catch (error: any) {
      console.error("Login Error:", error)
      
      // Firebase error mappings to Toast
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error("Invalid credentials", { description: "The email or password you entered is incorrect." })
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Account locked", { description: "Too many failed attempts. Please try again later." })
      } else if (error.code === 'auth/network-request-failed') {
        toast.error("Network error", { description: "Unable to reach the authentication server." })
      } else {
        toast.error("Sign in failed", { description: "An unexpected error occurred. Please try again." })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Username or Email</label>
        <Input 
          type="text" 
          placeholder="admin" 
          disabled={isSubmitting || !isOnline}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="space-y-1 relative">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
        <div className="relative">
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            disabled={isSubmitting || !isOnline}
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            disabled={isSubmitting || !isOnline}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" disabled={isSubmitting || !isOnline}>
        {!isOnline ? (
          <>
            <WifiOff className="mr-2 h-4 w-4" />
            Offline
          </>
        ) : isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
      
    </form>
  )
}
