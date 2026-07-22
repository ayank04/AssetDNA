import { ApiError } from "@/types/api"
import axios, { AxiosError } from "axios"

export const normalizeApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>
    
    // Check if network error or timeout
    if (axiosError.code === 'ECONNABORTED' || axiosError.message === 'Network Error') {
      return {
        status: 0,
        message: "Unable to connect to the server. Please check your internet connection.",
        code: "NETWORK_ERROR",
        isNetworkError: true,
      }
    }

    // Backend formatted errors
    if (axiosError.response) {
      const status = axiosError.response.status
      const responseData = axiosError.response.data
      
      let message = responseData?.message || axiosError.message
      let code = responseData?.code || "UNKNOWN_ERROR"
      let details = responseData?.details || []

      // Fallback standard messages based on status
      if (!responseData?.message) {
        switch (status) {
          case 400: message = "Bad Request. Please check your input."; break;
          case 401: message = "Unauthorized. Please log in."; break;
          case 403: message = "Forbidden. You do not have permission to access this resource."; break;
          case 404: message = "Resource not found."; break;
          case 409: message = "Conflict. The resource already exists or has been modified."; break;
          case 422: message = "Validation Error."; break;
          case 500: message = "Internal Server Error. Our team has been notified."; break;
        }
      }

      return { status, message, code, details, isNetworkError: false }
    }
  }

  // Generic fallback for non-axios errors
  return {
    status: 500,
    message: error instanceof Error ? error.message : "An unexpected error occurred.",
    code: "UNEXPECTED_ERROR",
    isNetworkError: false
  }
}
