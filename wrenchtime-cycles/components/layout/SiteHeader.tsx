'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthNavActions from '@/components/layout/AuthNavActions'

interface SiteHeaderProps {
  showBookingCta?: boolean
}

export default function SiteHeader({ showBookingCta = true }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/#process', label: 'Process' },
    { href: '/#services', label: 'Services' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:var(--bg)]/80 backdrop-blur-lg">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold leading-none tracking-tight">
          <span className="text-cyan-300">Wrench</span>
          <span className="text-[var(--accent)]">Time</span>
          <span className="text-white"> Cycles</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {showBookingCta && (
            <Link
              href="/intake"
              className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
            >
              Request Service
            </Link>
          )}
          <AuthNavActions />
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--line)] text-white transition-colors hover:bg-white/5 lg:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-5 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-[var(--line)] px-4 pb-5 pt-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-11 rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-gray-200 transition-colors hover:border-cyan-300/50 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            {showBookingCta && (
              <Link
                href="/intake"
                onClick={() => setMenuOpen(false)}
                className="min-h-11 rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-orange-500"
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