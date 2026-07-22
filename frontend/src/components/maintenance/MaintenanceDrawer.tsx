"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Wrench } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface MaintenanceDrawerProps {
  maintenanceId: string | null
  isOpen: boolean
  onClose: () => void
}

export function MaintenanceDrawer({ maintenanceId, isOpen, onClose }: MaintenanceDrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-background border-l shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-warning" />
                <h2 className="text-lg font-semibold tracking-tight">Work Order Details</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-muted-foreground">
                <p>Global maintenance API is not yet available.</p>
                <p className="text-sm">Cannot load work order {maintenanceId}</p>
              </div>
            </div>

            <div className="p-4 border-t bg-background mt-auto">
              <Button variant="outline" className="w-full" disabled>
                <ExternalLink className="h-4 w-4 mr-2" /> Open Asset Maintenance
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
