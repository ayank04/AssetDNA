export const API_CONFIG = {
  // Use environment variables, fallback to local dev
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api',
  TIMEOUT: 15000, // 15 seconds
  VERSION: 'v1',
  
  // Endpoints configuration centralized
  ENDPOINTS: {
    ASSETS: '/assets',
    TIMELINE: '/timeline',
    MAINTENANCE: '/maintenance',
    INSPECTION: '/inspections',
    ENGINEERING: '/engineering-changes',
    DOCUMENTS: '/documents',
    EVIDENCE: '/evidence',
    AI: '/assets' // Base for /assets/:id/investigate
  },

  // Retry configuration for safe GET requests
  RETRY: {
    retries: 3,
    retryDelay: (retryCount: number) => {
      return retryCount * 1000; // Linear backoff
    }
  }
}
