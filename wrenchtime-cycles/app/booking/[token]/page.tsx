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
    <main className="min-h-screen text-[var(--text)]">
      <SiteHeader showBookingCta={false} />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-300 hover:text-cyan-200">
            ← Back to home
          </Link>
          <h1 className="mb-2 mt-4 text-4xl font-bold text-white sm:text-5xl">
            {alreadyConfirmed ? 'Booking Confirmed' : 'Confirm Your Booking'}
          </h1>
          <p className="max-w-2xl text-slate-300">
            {alreadyConfirmed
              ? 'You\'re all set. We\'ll see you soon.'
              : 'Your service request has been approved. Review the details below and confirm your booking.'}
          </p>
        </div>

        {alreadyConfirmed && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-400/10 p-5">
            <p className="font-semibold uppercase tracking-[0.08em] text-emerald-300">✓ Booking confirmed</p>
            <p className="mt-1 text-sm text-emerald-100/80">
              We have you on the schedule. Keep an eye on your phone and email for any updates.
            </p>
          </div>
        )}

        <div className="panel p-6">
          <h2 className="text-2xl font-semibold text-cyan-200">Your Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Name</p>
              <p className="mt-1 text-sm text-white">{request.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Phone</p>
              <p className="mt-1 text-sm text-white">{request.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Email</p>
              <p className="mt-1 text-sm text-white">{request.email}</p>
            </div>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-2xl font-semibold text-cyan-200">Your Bike</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Year</p>
              <p className="mt-1 text-sm text-white">{request.bikeYear}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Make</p>
              <p className="mt-1 text-sm text-white">{request.bikeMake}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Model</p>
              <p className="mt-1 text-sm text-white">{request.bikeModel}</p>
            </div>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-2xl font-semibold text-cyan-200">Service Details</h2>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Service Type</p>
            <p className="mt-1 text-sm text-white">{request.service}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Description</p>
            <p className="mt-1 text-sm text-white">{request.description}</p>
          </div>
          {request.jobDuration !== null && request.jobDuration !== undefined && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Estimated Duration</p>
              <p className="mt-1 text-sm text-white">
                {request.jobDuration} {request.jobDuration === 1 ? 'day' : 'days'}
              </p>
            </div>
          )}
          {request.notes && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Notes from Shop</p>
              <p className="mt-1 text-sm text-white">{request.notes}</p>
            </div>
          )}
        </div>

        {!alreadyConfirmed && <BookingConfirmButton token={token} />}
      </div>
    </main>
  )
}
