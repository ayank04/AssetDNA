import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const surfaceVariants = cva(
  "rounded-xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border border-border",
        elevated: "bg-card text-card-foreground border border-border shadow-elevation-1",
        glass: "glass",
        glassHeavy: "glass-heavy",
        interactive: "surface surface-hover cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(surfaceVariants({ variant }), className)} {...props} />
))
Surface.displayName = "Surface"

export const ElevatedSurface = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <Surface ref={ref} variant="elevated" className={className} {...props} />
))
ElevatedSurface.displayName = "ElevatedSurface"

export const GlassSurface = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <Surface ref={ref} variant="glass" className={className} {...props} />
))
GlassSurface.displayName = "GlassSurface"

export const InteractiveSurface = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <Surface ref={ref} variant="interactive" className={className} {...props} />
))
InteractiveSurface.displayName = "InteractiveSurface"

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("glass p-6", className)} {...props} />
))
GlassCard.displayName = "GlassCard"

export const MetricCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-1", className)} {...props} />
))
MetricCard.displayName = "MetricCard"

export const Panel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-none sm:rounded-xl border bg-background shadow-sm p-4 sm:p-6", className)} {...props} />
))
Panel.displayName = "Panel"
