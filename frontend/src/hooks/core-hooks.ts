import { useState, useEffect, useCallback } from 'react'

/**
 * useApi hook for wrapping async service calls, managing loading and error states.
 */
export function useApi<T, P extends any[]>(apiFunc: (...args: P) => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(async (...args: P) => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await apiFunc(...args)
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [apiFunc])

  return { data, error, isLoading, execute }
}

/**
 * useDebounce hook for search inputs
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

/**
 * useDisclosure hook for modals and drawers
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)
  
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  
  return { isOpen, open, close, toggle }
}

/**
 * usePagination state manager
 */
export function usePagination(initialLimit = 10) {
  const [limit, setLimit] = useState(initialLimit)
  const [offset, setOffset] = useState(0)
  
  const nextPage = useCallback(() => setOffset((prev) => prev + limit), [limit])
  const prevPage = useCallback(() => setOffset((prev) => Math.max(0, prev - limit)), [limit])
  const reset = useCallback(() => setOffset(0), [])
  
  return { limit, offset, setLimit, setOffset, nextPage, prevPage, reset }
}

/**
 * useSorting state manager
 */
export function useSorting(initialSortBy = 'createdAt', initialSortOrder: 'asc' | 'desc' = 'desc') {
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder)
  
  const toggleSort = useCallback((field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }, [sortBy])
  
  return { sortBy, sortOrder, setSortBy, setSortOrder, toggleSort }
}
