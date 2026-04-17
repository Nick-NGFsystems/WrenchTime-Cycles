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
      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Confirming...' : 'Confirm My Booking'}
      </button>
      <p className="text-center text-xs uppercase tracking-[0.12em] text-slate-500">
        By confirming, you agree to drop off your bike at the scheduled time.
      </p>
    </div>
  )
}
