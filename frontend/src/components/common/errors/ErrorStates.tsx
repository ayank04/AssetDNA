import * as React from "react"
import { AlertCircle, WifiOff, ShieldAlert, FileQuestion, ServerCrash, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Title, Subtitle } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
  onRetry?: () => void;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, icon: Icon = AlertCircle, title, description, action, onRetry, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center justify-center p-12 text-center rounded-xl bg-destructive/5 border border-destructive/20", className)} {...props}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4 text-destructive">
        <Icon className="h-8 w-8" />
      </div>
      <Title className="mb-2 text-foreground">{title}</Title>
      <Subtitle className="max-w-md mb-6">{description}</Subtitle>
      <div className="flex gap-4">
        {action}
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
)
ErrorState.displayName = "ErrorState"

export const NetworkError = (props: Partial<ErrorStateProps>) => (
  <ErrorState icon={WifiOff} title="Connection Error" description="Unable to connect to the server. Please check your internet connection and try again." {...props} />
)

export const PermissionDenied = (props: Partial<ErrorStateProps>) => (
  <ErrorState icon={ShieldAlert} title="Access Denied" description="You do not have permission to view this resource or perform this action." {...props} />
)

export const NotFound404 = (props: Partial<ErrorStateProps>) => (
  <ErrorState icon={FileQuestion} title="Page Not Found" description="The resource you are looking for doesn't exist or has been moved." {...props} />
)

export const ServerError500 = (props: Partial<ErrorStateProps>) => (
  <ErrorState icon={ServerCrash} title="Server Error" description="An unexpected error occurred on our end. We've been notified and are looking into it." {...props} />
)

export const RetryState = ({ onRetry, ...props }: Partial<ErrorStateProps>) => (
  <ErrorState icon={RefreshCcw} title="Failed to load" description="There was an issue loading this component." onRetry={onRetry} {...props} />
)
