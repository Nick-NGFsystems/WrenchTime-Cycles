import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SiteHeader from '@/components/layout/SiteHeader'

export default async function BookingLandingPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <SiteHeader showBookingCta={false} />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl shadow-black/20">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#38BDF8]">
            Booking Portal
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            You&apos;re signed in.
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Use the booking link sent to you after approval to review your request and confirm your slot.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="rounded-lg bg-[#E97132] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d4612a]"
            >
              Back to Home
            </Link>
            <Link
              href="/intake"
              className="rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-500 hover:bg-gray-800"
            >
              Submit a New Request
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}