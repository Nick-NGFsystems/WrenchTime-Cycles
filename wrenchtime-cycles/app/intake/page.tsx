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
  'Accessory Installation',
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
      name:        (form.elements.namedItem('name')        as HTMLInputElement).value,
      email:       (form.elements.namedItem('email')       as HTMLInputElement).value,
      phone:       (form.elements.namedItem('phone')       as HTMLInputElement).value,
      bikeYear:    (form.elements.namedItem('bikeYear')    as HTMLInputElement).value,
      bikeMake:    (form.elements.namedItem('bikeMake')    as HTMLInputElement).value,
      bikeModel:   (form.elements.namedItem('bikeModel')   as HTMLInputElement).value,
      bikeStarts:  (form.elements.namedItem('bikeStarts')  as HTMLSelectElement).value,
      location:    (form.elements.namedItem('location')    as HTMLInputElement).value,
      service:     (form.elements.namedItem('service')     as HTMLSelectElement).value,
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
      <main className="min-h-screen" style={{ color: 'var(--text)' }}>
        <SiteHeader showBookingCta={false} />
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl" style={{ borderColor: 'rgba(51,214,255,0.3)', backgroundColor: 'rgba(51,214,255,0.1)', color: 'var(--brand)' }}>
            ✓
          </span>
          <h1 className="text-4xl font-bold sm:text-5xl" style={{ color: 'var(--text)' }}>Request Received</h1>
          <p className="max-w-lg text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Your request is in. We review every submission personally — you&apos;ll hear from us by phone or email with availability and next steps.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
            style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
          >
            ← Back to Home
          </Link>
        </section>
      </main>
    )
  }

  const inputClass = "min-h-11 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none transition"
  const inputStyle = { borderColor: 'var(--line)', backgroundColor: 'rgba(17,24,39,0.6)', color: 'var(--text)' }
  const labelClass = "text-xs font-semibold uppercase tracking-[0.15em]"
  const labelStyle = { color: 'var(--muted)' }

  return (
    <main className="min-h-screen" style={{ color: 'var(--text)' }}>
      <SiteHeader showBookingCta={false} />

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">

          {/* Sidebar */}
          <aside className="panel h-fit space-y-5 p-6">
            <span className="brand-chip">Service Intake</span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl" style={{ color: 'var(--text)' }}>
              Request a Service Review
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Tell us about your bike and what it needs. Every request is personally reviewed before we schedule anything — mobile service is the default.
            </p>
            <div className="space-y-3 text-sm" style={{ color: 'var(--muted)' }}>
              <p className="rounded-xl border px-4 py-3" style={{ borderColor: 'var(--line)', backgroundColor: 'rgba(9,12,18,0.5)' }}>1. Fill out your contact and bike details.</p>
              <p className="rounded-xl border px-4 py-3" style={{ borderColor: 'var(--line)', backgroundColor: 'rgba(9,12,18,0.5)' }}>2. We review scope and confirm the cost.</p>
              <p className="rounded-xl border px-4 py-3" style={{ borderColor: 'var(--line)', backgroundColor: 'rgba(9,12,18,0.5)' }}>3. You receive your booking confirmation.</p>
            </div>
            <Link href="/" className="inline-flex text-sm font-semibold uppercase tracking-[0.08em] transition hover:opacity-80" style={{ color: 'var(--brand)' }}>
              ← Back to Home
            </Link>
          </aside>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Your Info */}
            <div className="panel p-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Your Info</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="name" className={labelClass} style={labelStyle}>Full Name</label>
                  <input id="name" name="name" required className={inputClass} style={inputStyle} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className={labelClass} style={labelStyle}>Phone Number</label>
                  <input id="phone" name="phone" type="tel" required className={inputClass} style={inputStyle} />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="email" className={labelClass} style={labelStyle}>Email Address</label>
                  <input id="email" name="email" type="email" required className={inputClass} style={inputStyle} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="location" className={labelClass} style={labelStyle}>City / Zip Code</label>
                  <input
                    id="location"
                    name="location"
                    placeholder="e.g. Austin, TX or 78701"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Your Bike */}
            <div className="panel p-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Your Bike</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="bikeYear" className={labelClass} style={labelStyle}>Year</label>
                  <input id="bikeYear" name="bikeYear" required maxLength={4} placeholder="2019" className={inputClass} style={inputStyle} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bikeMake" className={labelClass} style={labelStyle}>Make</label>
                  <input id="bikeMake" name="bikeMake" required placeholder="Honda" className={inputClass} style={inputStyle} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bikeModel" className={labelClass} style={labelStyle}>Model</label>
                  <input id="bikeModel" name="bikeModel" required placeholder="CB500F" className={inputClass} style={inputStyle} />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <label htmlFor="bikeStarts" className={labelClass} style={labelStyle}>Does the Bike Start?</label>
                <select id="bikeStarts" name="bikeStarts" className={inputClass} style={inputStyle}>
                  <option value="">Select...</option>
                  <option value="Yes">Yes — starts normally</option>
                  <option value="Sometimes">Sometimes / intermittently</option>
                  <option value="No">No — does not start</option>
                </select>
              </div>
            </div>

            {/* Service Needed */}
            <div className="panel p-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Service Needed</h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="service" className={labelClass} style={labelStyle}>Service Type</label>
                  <select id="service" name="service" required className={inputClass} style={inputStyle}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="description" className={labelClass} style={labelStyle}>Describe the Issue</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Tell us what's going on with your bike — the more detail, the better we can plan the job."
                    className="w-full resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none transition"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: '#ff6b2b' }}
            >
              {loading ? 'Submitting...' : 'Request Service Review'}
            </button>

            <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
              Every request is personally reviewed before we reach out. No automated booking.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
