import axios from 'axios'
import axiosRetry from 'axios-retry'
import { API_CONFIG } from '@/config/api'
import { auth } from '@/lib/firebase'
import { getDemoData } from '@/lib/demo-data'

// Creates a centralized Axios instance configured for the AssetDNA backend
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

// Configure robust retry policy for safe (idempotent) requests only
axiosRetry(apiClient, {
  retries: API_CONFIG.RETRY.retries,
  retryDelay: API_CONFIG.RETRY.retryDelay,
  retryCondition: (error) => {
    // Only retry on Network Errors or 5xx server errors for GET requests
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 500;
  }
})

// Request Interceptor: Attach Firebase Auth Token
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Get token, auto-refreshing if expired
        const token = await user.getIdToken(false);
        config.headers.Authorization = `Bearer ${token}`
      } catch (error) {
        console.error("Failed to get Firebase ID token:", error)
      }
    } else if (typeof window !== 'undefined' && localStorage.getItem('isMockUser') === 'true') {
      config.headers.Authorization = `Bearer mock-token`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Global error handling, 401 retries, and Demo Mode Fallback
apiClient.interceptors.response.use(
  (response) => {
    // Demo Mode: If API returns an empty array, inject realistic demo data so the UI is never empty
    if (response.data && Array.isArray(response.data.data) && response.data.data.length === 0) {
      const demoFallback = getDemoData(response.config.url || '');
      if (demoFallback && Array.isArray(demoFallback.data) && demoFallback.data.length > 0) {
        console.warn(`[Demo Mode] Injected fallback data for empty response at ${response.config.url}`);
        return demoFallback;
      }
    }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Demo Mode Fallback: Intercept network errors/500/404 and return demo data directly to prevent UI crashes
    if (originalRequest && (!error.response || error.response.status !== 401)) {
      const demoFallback = getDemoData(originalRequest.url || '');
      if (demoFallback) {
        console.warn(`[Demo Mode] API Failed (${error.message}). Falling back to demo data for ${originalRequest.url}`);
        return Promise.resolve(demoFallback);
      }
    }

    // If 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const user = auth.currentUser;
        if (user) {
          // Force a token refresh
          const newToken = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the request
          return apiClient(originalRequest);
        } else {
          // No user, dispatch forced logout event
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('auth:unauthorized'));
          }
        }
      } catch (refreshError) {
        // Refresh failed (session invalid)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error)
  }
)
