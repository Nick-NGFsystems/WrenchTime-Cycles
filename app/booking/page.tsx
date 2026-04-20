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
    <main className="min-h-screen text-[var(--text)]">
      <SiteHeader showBookingCta={false} />

      <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="panel bg-grid-tech relative overflow-hidden p-8 sm:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
          <span className="relative text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Booking Portal
          </span>
          <h1 className="relative mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            You&apos;re signed in.
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg text-slate-300">
            Use the booking link sent to you after approval to review your request and confirm your slot.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-orange-500"
            >
              Back to Home
            </Link>
            <Link
              href="/intake"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-200 transition-colors hover:border-cyan-300/50 hover:text-cyan-100"
            >
              Submit a New Request
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}