'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BookingConfirmButtonProps {
  token: string
}

interface ApiResponse {
  success: boolean
  error?: string
  message?: string
}

export default function BookingConfirmButton({ token }: BookingConfirmButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/booking/${token}`, { method: 'POST' })
      const data = (await res.json()) as ApiResponse
      if (!res.ok || !data.success) {
        setError(data.error ?? 'Failed to confirm booking')
        return
      }
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-[#E97132] hover:bg-[#d4612a] disabled:opacity-50 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
      >
        {loading ? 'Confirming...' : 'Confirm My Booking'}
      </button>
      <p className="text-xs text-gray-500 text-center">
        By confirming, you agree to drop off your bike at the scheduled time.
      </p>
    </div>
  )
}
