'use client'

import { SignedIn, SignOutButton } from '@clerk/nextjs'

interface AuthNavActionsProps {
  mobile?: boolean
}

/**
 * Shows Sign Out when a Clerk session exists. Currently the only signed-in
 * user of this site is the shop owner, who is redirected to /admin on
 * sign-in (see NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL). There's no customer-
 * facing "My Booking" concept because customers get a single-use booking
 * link via email and are never asked to authenticate.
 */
export default function AuthNavActions({ mobile = false }: AuthNavActionsProps) {
  const containerClasses = mobile
    ? 'flex w-full flex-col gap-3'
    : 'flex items-center gap-3'

  const signOutButtonClasses = mobile
    ? 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50'
    : 'rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50'

  return (
    <SignedIn>
      <div className={containerClasses}>
        <SignOutButton>
          <button type="button" className={signOutButtonClasses}>
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </SignedIn>
  )
}
