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

  const inputClass =
    'min-h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10'
  const labelClass = 'text-xs font-semibold uppercase tracking-[0.15em] text-gray-500'

  if (submitted) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <SiteHeader />
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-3xl text-emerald-600">
            ✓
          </span>
          <h1 className="text-5xl font-bold text-gray-900">Request Received</h1>
          <p className="max-w-lg text-gray-600">
            Your service request is in queue. We&apos;ll review the details, then contact you by phone or email with next steps and availability.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back To Home
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <aside className="h-fit space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <span className="inline-block rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
              Service Intake
            </span>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Start Your Service Request
            </h1>
            <p className="text-gray-600">
              Tell us about your bike and what it needs. We review every request before sending a booking link.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">1. Fill out contact and bike details.</p>
              <p className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">2. We review and confirm service scope.</p>
              <p className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">3. You receive your booking confirmation link.</p>
            </div>
            <Link href="/" className="inline-flex text-sm font-medium text-gray-500 hover:text-gray-900">
              ← Back To Home
            </Link>
          </aside>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">Your Info</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="name" className={labelClass}>Full Name</label>
                  <input id="name" name="name" required className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className={labelClass}>Phone Number</label>
                  <input id="phone" name="phone" type="tel" required className={inputClass} />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <label htmlFor="email" className={labelClass}>Email Address</label>
                <input id="email" name="email" type="email" required className={inputClass} />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">Your Bike</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="bikeYear" className={labelClass}>Year</label>
                  <input id="bikeYear" name="bikeYear" required maxLength={4} placeholder="2019" className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bikeMake" className={labelClass}>Make</label>
                  <input id="bikeMake" name="bikeMake" required placeholder="Honda" className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bikeModel" className={labelClass}>Model</label>
                  <input id="bikeModel" name="bikeModel" required placeholder="CB500F" className={inputClass} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">Service Needed</h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="service" className={labelClass}>Service Type</label>
                  <select id="service" name="service" required className={inputClass}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="description" className={labelClass}>Describe The Issue</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Tell us what's going on with your bike..."
                    className={`${inputClass} resize-none min-h-[7rem]`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gray-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
