import { apiClient } from "@/lib/axios"
import { API_CONFIG } from "@/config/api"
import { TimelineEvent } from "@/types/models"
import { ApiResponse, PaginatedResponse, PaginationParams, SortingParams, FilterParams } from "@/types/api"
import { buildQueryString } from "@/utils/api-helpers"

const BASE_URL = API_CONFIG.ENDPOINTS.TIMELINE

export const TimelineService = {
  async getEvents(
    assetId: string, 
    pagination?: PaginationParams, 
    sorting?: SortingParams, 
    filters?: FilterParams
  ): Promise<PaginatedResponse<TimelineEvent>> {
    const query = buildQueryString(pagination, sorting, filters)
    const fullQuery = query ? `${query}&assetId=${assetId}` : `?assetId=${assetId}`
    return apiClient.get(`${BASE_URL}${fullQuery}`)
  },
  
  async getEventById(id: string): Promise<ApiResponse<TimelineEvent>> {
    return apiClient.get(`${BASE_URL}/${id}`)
  },

  async createEvent(data: Partial<TimelineEvent>): Promise<ApiResponse<TimelineEvent>> {
    return apiClient.post(BASE_URL, data)
  }
}
