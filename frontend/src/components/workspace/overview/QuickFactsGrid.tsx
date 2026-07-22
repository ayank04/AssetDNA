import * as React from "react"
import { Asset } from "@/types/models"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { LucideIcon, Factory, Calendar, MapPin, Hash, AlertTriangle, Layers } from "lucide-react"

interface MetadataCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  delay?: number
}

export function MetadataCard({ label, value, icon: Icon, delay = 0 }: MetadataCardProps) {
  return (
    <AnimatedSlideUp delay={delay} className="glass p-4 rounded-xl border flex items-start gap-4">
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 opacity-80" />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 truncate max-w-[120px]">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground capitalize truncate max-w-[150px]" title={String(value)}>
          {value}
        </p>
      </div>
    </AnimatedSlideUp>
  )
}

interface QuickFactsGridProps {
  asset: Asset
}

export function QuickFactsGrid({ asset }: QuickFactsGridProps) {
  const facts = []
  
  if (asset.metadata?.manufacturer) {
    facts.push({ label: "Manufacturer", value: asset.metadata.manufacturer, icon: Factory })
  }
  if (asset.metadata?.installationDate) {
    facts.push({ label: "Installed", value: asset.metadata.installationDate, icon: Calendar })
  }
  if (asset.location) {
    facts.push({ label: "Location", value: asset.location, icon: MapPin })
  }
  if (asset.metadata?.serialNumber) {
    facts.push({ label: "Serial No.", value: asset.metadata.serialNumber, icon: Hash })
  }
  if (asset.metadata?.criticality) {
    facts.push({ label: "Criticality", value: asset.metadata.criticality, icon: AlertTriangle })
  }
  if (asset.type) {
    facts.push({ label: "Category", value: asset.type.replace('_', ' '), icon: Layers })
  }

  if (facts.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {facts.map((fact, index) => (
        <MetadataCard 
          key={fact.label}
          label={fact.label}
          value={fact.value}
          icon={fact.icon}
          delay={index * 0.05}
        />
      ))}
    </div>
  )
}
