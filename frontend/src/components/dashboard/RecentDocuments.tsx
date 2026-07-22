"use client"

import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { FileText, ArrowRight, Download, FileType, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface RecentDocumentsProps {
  isLoading?: boolean
}

// Since Document API is not fully hooked up in this view, we mock 3 recent documents.
const MOCK_DOCS = [
  { id: "doc_1", title: "Bearing Assembly Manual v2.1", assetName: "Pump-X402", type: "PDF", size: "2.4 MB", date: "Today" },
  { id: "doc_2", title: "Cooling Circuit Schematics", assetName: "Cooling Tower Alpha", type: "CAD", size: "14.1 MB", date: "Yesterday" },
  { id: "doc_3", title: "Q3 Inspection Standards", assetName: "Global", type: "PDF", size: "1.1 MB", date: "2 days ago" },
]

export function RecentDocuments({ isLoading }: RecentDocumentsProps) {
  if (isLoading) {
    return (
      <AnimatedSlideUp className="glass p-6 rounded-xl border flex flex-col gap-4">
        <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 w-full bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </AnimatedSlideUp>
    )
  }

  return (
    <AnimatedSlideUp className="glass p-6 rounded-xl border flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Recent Documents</h3>
          <p className="text-xs text-muted-foreground mt-1">Latest uploads & manuals</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <FileText className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {MOCK_DOCS.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 border hover:border-primary/30 transition-colors group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0">
                <FileType className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{doc.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">{doc.assetName}</span>
                  <span>&bull;</span>
                  <span>{doc.type}</span>
                  <span>&bull;</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>
            
            <Link href="/assets/PX-100/documents" tabIndex={-1}>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
      
      <Link href="/assets/PX-100/documents" className="mt-4" tabIndex={-1}>
        <Button variant="outline" className="w-full text-sm">
          View Document Library
        </Button>
      </Link>
    </AnimatedSlideUp>
  )
}
