import { apiClient } from "@/lib/axios"
import { API_CONFIG } from "@/config/api"
import { AIInvestigationResponse } from "@/types/models"
import { ApiResponse } from "@/types/api"

export const AIService = {
  /**
   * Run an AI investigation on a specific asset
   */
  async investigate(assetId: string, question: string): Promise<ApiResponse<AIInvestigationResponse>> {
    return apiClient.post(`${API_CONFIG.ENDPOINTS.AI}/${assetId}/investigate`, { question })
  },
  
  /**
   * Get an AI summary for an asset
   */
  async getSummary(assetId: string): Promise<ApiResponse<string>> {
    return apiClient.post(`${API_CONFIG.ENDPOINTS.AI}/${assetId}/summary`)
  }
}
