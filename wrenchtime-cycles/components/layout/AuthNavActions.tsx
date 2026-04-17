'use client'

import Link from 'next/link'
import { SignedIn, SignOutButton } from '@clerk/nextjs'

interface AuthNavActionsProps {
  mobile?: boolean
}

export default function AuthNavActions({ mobile = false }: AuthNavActionsProps) {
  const containerClasses = mobile
    ? 'flex w-full flex-col gap-3'
    : 'flex items-center gap-3'

  const secondaryLinkClasses = mobile
    ? 'rounded-xl border border-[var(--line)] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-cyan-300/50 hover:bg-white/5'
    : 'text-sm font-semibold text-white transition-colors hover:text-cyan-300'

  const signOutButtonClasses = mobile
    ? 'w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-400 hover:bg-white/5'
    : 'rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gray-400 hover:bg-gray-900'

  return (
    <>
      <SignedIn>
        <div className={containerClasses}>
          <Link
            href="/booking"
            className={secondaryLinkClasses}
          >
            My Booking
          </Link>
          <SignOutButton>
            <button
              type="button"
              className={signOutButtonClasses}
            >
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </>
  )
}