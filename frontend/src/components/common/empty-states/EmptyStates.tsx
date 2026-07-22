import * as React from "react"
import { FolderX, Inbox, SearchX, Clock, Database, FileX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Title, Subtitle } from "@/components/ui/Typography"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon: Icon = Inbox, title, description, action, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl glass shadow-sm", className)} {...props}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4 ring-8 ring-muted/20">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <Title className="mb-2">{title}</Title>
      <Subtitle className="max-w-md mb-6 text-sm">{description}</Subtitle>
      {action && <div>{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export const NoResults = (props: Partial<EmptyStateProps>) => (
  <EmptyState icon={SearchX} title="No results found" description="Try adjusting your search or filters to find what you're looking for." {...props} />
)

export const NoDocuments = (props: Partial<EmptyStateProps>) => (
  <EmptyState icon={FileX} title="No Documents Attached" description="There are no manuals, schematics, or files attached to this record." {...props} />
)

export const NoTimeline = (props: Partial<EmptyStateProps>) => (
  <EmptyState icon={Clock} title="No History Available" description="There are no timeline events recorded for this asset yet." {...props} />
)

export const NoEvidence = (props: Partial<EmptyStateProps>) => (
  <EmptyState icon={Database} title="No Evidence Found" description="The AI could not locate direct evidence in the repository for this query." {...props} />
)

export const NoSearchResults = (props: Partial<EmptyStateProps>) => (
  <NoResults {...props} />
)
