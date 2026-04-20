'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthNavActions from '@/components/layout/AuthNavActions'

interface SiteHeaderProps {
  businessName?: string
  primaryColor?: string
  accentColor?: string
  showBookingCta?: boolean
}

export default function SiteHeader({
  businessName = 'WrenchTime Cycles',
  primaryColor = '#33d6ff',
  accentColor = '#ff6b2b',
  showBookingCta = true,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#process',  label: 'Process' },
    { href: '#services', label: 'Services' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-lg">
      {/* Hidden color field anchors — scraped by portal editor for brand color pickers */}
      <span
        data-ngf-field="brand.primaryColor"
        data-ngf-label="Primary Color"
        data-ngf-type="color"
        data-ngf-section="Brand"
        aria-hidden="true"
        className="sr-only"
      />
      <span
        data-ngf-field="brand.secondaryColor"
        data-ngf-label="Accent Color"
        data-ngf-type="color"
        data-ngf-section="Brand"
        aria-hidden="true"
        className="sr-only"
      />
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          data-ngf-field="brand.businessName"
          data-ngf-label="Business Name"
          data-ngf-type="text"
          data-ngf-section="Brand"
          className="text-xl font-bold text-gray-900 transition-opacity hover:opacity-80"
        >
          {businessName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {showBookingCta && (
            <Link
              href="/intake"
              className="inline-flex min-h-10 items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Request Service
            </Link>
          )}
          <AuthNavActions />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(prev => !prev)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 lg:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-gray-600 transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-gray-600 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-5 bg-gray-600 transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>

      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-nav" className="border-t border-gray-100 px-4 pb-5 pt-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-11 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            {showBookingCta && (
              <Link
                href="/intake"
                onClick={() => setMenuOpen(false)}
                className="min-h-11 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Request Service
              </Link>
            )}
            <AuthNavActions mobile />
          </div>
        </div>
      )}
    </header>
  )
}
