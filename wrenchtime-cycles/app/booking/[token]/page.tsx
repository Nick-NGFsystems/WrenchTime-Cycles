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

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <SiteHeader showBookingCta={false} />

      <div className="mx-auto max-w-2xl space-y-8 px-6 py-16">
        <div>
          <Link href="/" className="text-[#38BDF8] text-sm hover:underline">
            ← Back to home
          </Link>
          <h1 className="text-3xl font-extrabold mt-4 mb-2">
            {alreadyConfirmed ? 'Booking Confirmed' : 'Confirm Your Booking'}
          </h1>
          <p className="text-gray-400">
            {alreadyConfirmed
              ? 'You\'re all set. We\'ll see you soon.'
              : 'Your service request has been approved. Review the details below and confirm your booking.'}
          </p>
        </div>

        {alreadyConfirmed && (
          <div className="bg-emerald-900/30 border border-emerald-700 rounded-xl p-5">
            <p className="text-emerald-400 font-semibold">✓ Booking confirmed</p>
            <p className="text-gray-400 text-sm mt-1">
              We have you on the schedule. Keep an eye on your phone and email for any updates.
            </p>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#38BDF8]">Your Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
              <p className="text-sm text-white mt-1">{request.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
              <p className="text-sm text-white mt-1">{request.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
              <p className="text-sm text-white mt-1">{request.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#38BDF8]">Your Bike</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Year</p>
              <p className="text-sm text-white mt-1">{request.bikeYear}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Make</p>
              <p className="text-sm text-white mt-1">{request.bikeMake}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Model</p>
              <p className="text-sm text-white mt-1">{request.bikeModel}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#38BDF8]">Service Details</h2>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Service Type</p>
            <p className="text-sm text-white mt-1">{request.service}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Description</p>
            <p className="text-sm text-white mt-1">{request.description}</p>
          </div>
          {request.jobDuration !== null && request.jobDuration !== undefined && (
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Estimated Duration</p>
              <p className="text-sm text-white mt-1">
                {request.jobDuration} {request.jobDuration === 1 ? 'day' : 'days'}
              </p>
            </div>
          )}
          {request.notes && (
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Notes from Shop</p>
              <p className="text-sm text-white mt-1">{request.notes}</p>
            </div>
          )}
        </div>

        {!alreadyConfirmed && <BookingConfirmButton token={token} />}
      </div>
    </main>
  )
}
