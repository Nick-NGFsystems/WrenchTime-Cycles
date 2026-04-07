'use client'

import { useState } from 'react'
import Link from 'next/link'

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
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-5xl">🔧</span>
        <h1 className="text-3xl font-bold">Request Received</h1>
        <p className="text-gray-400 max-w-md">
          We&apos;ll review your request and reach out to confirm availability. 
          Keep an eye on your phone and email.
        </p>
        <Link href="/" className="text-[#38BDF8] hover:underline text-sm">
          Back to home
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-[#38BDF8] text-sm hover:underline">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-extrabold mt-4 mb-2">Request a Service</h1>
          <p className="text-gray-400">
            Fill out the form below and we&apos;ll review your request before confirming a booking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Contact Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-[#38BDF8]">Your Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Full Name</label>
                <input
                  name="name"
                  required
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {/* Bike Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-[#38BDF8]">Your Bike</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Year</label>
                <input
                  name="bikeYear"
                  required
                  maxLength={4}
                  placeholder="2019"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Make</label>
                <input
                  name="bikeMake"
                  required
                  placeholder="Honda"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Model</label>
                <input
                  name="bikeModel"
                  required
                  placeholder="CB500F"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-[#38BDF8]">Service Needed</h2>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Service Type</label>
              <select
                name="service"
                required
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="">Select a service...</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Describe the Issue</label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Tell us what's going on with your bike..."
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#38BDF8] resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#E97132] hover:bg-[#d4612a] disabled:opacity-50 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>

        </form>
      </div>
    </main>
  )
}