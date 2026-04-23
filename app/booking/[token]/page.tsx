import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import BookingConfirmButton from '@/components/BookingConfirmButton'
import SiteHeader from '@/components/layout/SiteHeader'

interface BookingPageProps {
  params: Promise<{ token: string }>
}

export const dynamic = 'force-dynamic'

export default async function BookingPage({ params }: BookingPageProps) {
  const { token } = await params

  const request = await db.serviceRequest.findUnique({
    where: { bookingToken: token },
  })

  if (!request) notFound()

  const alreadyConfirmed = request.status === 'confirmed'
  const tokenExpired = request.tokenExpires && request.tokenExpires < new Date()

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader showBookingCta={false} />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            ← Back to home
          </Link>
          <h1 className="mb-2 mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {alreadyConfirmed ? 'Booking Confirmed' : 'Confirm Your Booking'}
          </h1>
          <p className="max-w-2xl text-gray-600">
            {alreadyConfirmed
              ? "You're all set. We'll see you soon."
              : 'Your service request has been approved. Review the details below and confirm your booking.'}
          </p>
        </div>

        {tokenExpired && !alreadyConfirmed && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-semibold uppercase tracking-[0.08em] text-amber-700">⚠ Link expired</p>
            <p className="mt-1 text-sm text-amber-800">
              This booking link has expired. Please contact us to request a new one.
            </p>
          </div>
        )}

        {alreadyConfirmed && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-semibold uppercase tracking-[0.08em] text-emerald-700">✓ Booking confirmed</p>
            <p className="mt-1 text-sm text-emerald-800">
              We have you on the schedule. Keep an eye on your phone and email for any updates.
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Your Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Name</p>
              <p className="mt-1 text-sm text-gray-900">{request.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Phone</p>
              <p className="mt-1 text-sm text-gray-900">{request.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Email</p>
              <p className="mt-1 text-sm text-gray-900">{request.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Your Bike</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Year</p>
              <p className="mt-1 text-sm text-gray-900">{request.bikeYear}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Make</p>
              <p className="mt-1 text-sm text-gray-900">{request.bikeMake}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Model</p>
              <p className="mt-1 text-sm text-gray-900">{request.bikeModel}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Service Details</h2>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Service Type</p>
            <p className="mt-1 text-sm text-gray-900">{request.service}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Description</p>
            <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{request.description}</p>
          </div>
          {request.jobDuration !== null && request.jobDuration !== undefined && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Estimated Duration</p>
              <p className="mt-1 text-sm text-gray-900">
                {request.jobDuration} {request.jobDuration === 1 ? 'day' : 'days'}
              </p>
            </div>
          )}
          {request.notes && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Notes from Shop</p>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{request.notes}</p>
            </div>
          )}
        </div>

        {!alreadyConfirmed && !tokenExpired && <BookingConfirmButton token={token} />}
      </div>
    </main>
  )
}
