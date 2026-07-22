import { z } from "zod"
import { UseFormReturn } from "react-hook-form"

/**
 * Standardized Zod error map to ensure consistent error messages across forms
 */
export const customErrorMap = (issue: any, ctx: any): { message: string } => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") return { message: "This field is required" }
  }
  if (issue.code === z.ZodIssueCode.too_small && issue.type === "string") {
    return { message: "This field cannot be empty" }
  }
  return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap as any)

/**
 * A reusable submit handler wrapper that catches async errors and maps them 
 * back to the react-hook-form instance or global toast system.
 */
export async function handleFormSubmit<T>(
  form: UseFormReturn<any>,
  submitFn: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: any) => void
) {
  try {
    const result = await submitFn()
    if (onSuccess) onSuccess(result)
    return result
  } catch (error: any) {
    // Check if error is a standardized ApiError with field-level details
    if (error?.details && Array.isArray(error.details)) {
      error.details.forEach((detail: { field: string; message: string }) => {
        form.setError(detail.field as any, { 
          type: "server", 
          message: detail.message 
        })
      })
    }
    
    // Pass to generic error handler for toast notifications
    if (onError) onError(error)
  }
}
