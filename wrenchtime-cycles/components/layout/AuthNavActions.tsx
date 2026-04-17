'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs'

export default function AuthNavActions() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-white transition-colors hover:text-[#38BDF8]"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-[#38BDF8] px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-[#67cdf7]"
          >
            Create Account
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="text-sm font-semibold text-white transition-colors hover:text-[#38BDF8]"
          >
            My Booking
          </Link>
          <SignOutButton>
            <button
              type="button"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gray-500 hover:bg-gray-900"
            >
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </>
  )
}