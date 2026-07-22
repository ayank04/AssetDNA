import { apiClient } from "@/lib/axios"
import { ApiResponse, PaginatedResponse, PaginationParams, SortingParams, FilterParams } from "@/types/api"
import { buildQueryString } from "@/utils/api-helpers"

/**
 * A generic factory to generate standard CRUD service layers,
 * eliminating duplicated logic across frontend services.
 */
export function createService<T>(baseEndpoint: string) {
  return {
    async getAll(
      pagination?: PaginationParams,
      sorting?: SortingParams,
      filters?: FilterParams
    ): Promise<PaginatedResponse<T>> {
      const query = buildQueryString(pagination, sorting, filters)
      return apiClient.get(`${baseEndpoint}${query}`)
    },
    
    async getById(id: string): Promise<ApiResponse<T>> {
      return apiClient.get(`${baseEndpoint}/${id}`)
    },
    
    async create(data: Partial<T>): Promise<ApiResponse<T>> {
      return apiClient.post(baseEndpoint, data)
    },
    
    async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
      return apiClient.put(`${baseEndpoint}/${id}`, data)
    },
    
    async delete(id: string): Promise<ApiResponse<void>> {
      return apiClient.delete(`${baseEndpoint}/${id}`)
    }
  }
}
