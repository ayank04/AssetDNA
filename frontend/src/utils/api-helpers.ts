import { PaginationParams, SortingParams, FilterParams } from "@/types/api"

/**
 * Serializes pagination, sorting, and filter params into a URL query string
 */
export const buildQueryString = (
  pagination?: PaginationParams,
  sorting?: SortingParams,
  filters?: FilterParams
): string => {
  const params = new URLSearchParams()

  if (pagination) {
    if (pagination.limit !== undefined) params.append('limit', String(pagination.limit))
    if (pagination.offset !== undefined) params.append('offset', String(pagination.offset))
  }

  if (sorting) {
    if (sorting.sortBy) params.append('sortBy', sorting.sortBy)
    if (sorting.sortOrder) params.append('order', sorting.sortOrder)
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const paramKey = key === 'search' ? 'q' : key
        params.append(paramKey, String(value))
      }
    })
  }

  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}
