import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export function useNetwork() {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  useEffect(() => {
    setIsOnline(typeof window !== 'undefined' ? window.navigator.onLine : true)

    const handleOnline = () => {
      setIsOnline(true)
      toast.success('Connection restored', {
        description: 'You are back online.',
        id: 'network-toast'
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast.error('You are offline', {
        description: 'Please check your internet connection.',
        id: 'network-toast',
        duration: Infinity, // Keep showing until online
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
