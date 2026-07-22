import * as React from "react"
import { cn } from "@/lib/utils"

export const AppContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex min-h-screen w-full flex-col bg-background", className)} {...props} />
))
AppContainer.displayName = "AppContainer"

export const ContentContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("content-width page-padding flex-1", className)} {...props} />
))
ContentContainer.displayName = "ContentContainer"

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn("section-spacing", className)} {...props} />
))
Section.displayName = "Section"

export const PageHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 pb-8 pt-6 md:pb-12 md:pt-10", className)} {...props} />
))
PageHeader.displayName = "PageHeader"

export const PageTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h1 ref={ref} className={cn("text-3xl font-bold tracking-tight sm:text-4xl", className)} {...props} />
))
PageTitle.displayName = "PageTitle"

export const PageSubtitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-lg text-muted-foreground", className)} {...props} />
))
PageSubtitle.displayName = "PageSubtitle"

export const Divider = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn("my-6 w-full border-t border-border", className)} {...props} />
))
Divider.displayName = "Divider"

export const ScrollableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-full w-full overflow-auto custom-scrollbar", className)} {...props} />
))
ScrollableContainer.displayName = "ScrollableContainer"

export const StickyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sticky top-0 z-[var(--NAVBAR,40)] glass-panel border-b px-4 py-3", className)} {...props} />
))
StickyHeader.displayName = "StickyHeader"

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)} {...props} />
))
ResponsiveGrid.displayName = "ResponsiveGrid"

export const SplitLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col md:flex-row gap-6 lg:gap-8", className)} {...props} />
))
SplitLayout.displayName = "SplitLayout"
