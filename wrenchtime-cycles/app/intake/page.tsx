'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'

const SERVICES = [
  'Oil & Filter Service',
  'Carburetor Service',
  'Valve Train Service',
  'Drivetrain Service',
  'Brake Service',
  'Component Installation',
  'Diagnostics / No-Start Evaluation',
  'Pre-Purchase Inspection',
  'Other / Not Sure',
]

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      bikeYear: (form.elements.namedItem('bikeYear') as HTMLInputElement).value,
      bikeMake: (form.elements.namedItem('bikeMake') as HTMLInputElement).value,
      bikeModel: (form.elements.namedItem('bikeModel') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
    }
    const res = await fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setLoading(false)
    if (res.ok) setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen text-[var(--text)]">
        <SiteHeader />
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400/10 text-3xl text-emerald-300">
            ✓
          </span>
          <h1 className="text-5xl font-bold text-white">Request Received</h1>
          <p className="max-w-lg text-slate-300">
            Your service request is in queue. We&apos;ll review the details, then contact you by phone or email with next steps and availability.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-cyan-200 transition-colors hover:border-cyan-300/60 hover:text-cyan-100"
          >
            Back To Home
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen text-[var(--text)]">
      <SiteHeader />

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <aside className="panel h-fit space-y-5 p-6">
            <span className="brand-chip">Service Intake</span>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Start Your Service Request
            </h1>
            <p className="text-slate-300">
              Tell us about your bike and what it needs. We review every request before sending a booking link.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="rounded-xl border border-[var(--line)] bg-slate-900/50 px-4 py-3">1. Fill out contact and bike details.</p>
              <p className="rounded-xl border border-[var(--line)] bg-slate-900/50 px-4 py-3">2. We review and confirm service scope.</p>
              <p className="rounded-xl border border-[var(--line)] bg-slate-900/50 px-4 py-3">3. You receive your booking confirmation link.</p>
            </div>
            <Link href="/" className="inline-flex text-sm font-semibold uppercase tracking-[0.08em] text-cyan-300 hover:text-cyan-200">
              ← Back To Home
            </Link>
          </aside>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="panel p-6">
              <h2 className="text-2xl font-semibold text-white">Your Info</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                />
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-2xl font-semibold text-white">Your Bike</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="bikeYear" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Year
                  </label>
                  <input
                    id="bikeYear"
                    name="bikeYear"
                    required
                    maxLength={4}
                    placeholder="2019"
                    className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bikeMake" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Make
                  </label>
                  <input
                    id="bikeMake"
                    name="bikeMake"
                    required
                    placeholder="Honda"
                    className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bikeModel" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Model
                  </label>
                  <input
                    id="bikeModel"
                    name="bikeModel"
                    required
                    placeholder="CB500F"
                    className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-2xl font-semibold text-white">Service Needed</h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="service" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Service Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-cyan-300/70 focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="description" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Describe The Issue
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Tell us what's going on with your bike..."
                    className="w-full resize-none rounded-xl border border-[var(--line)] bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}