import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Booking routes are token-authenticated (not Clerk) — customers who receive
// a booking link via email have no Clerk account and must not be challenged.
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/intake(.*)',
  '/booking(.*)',
  '/api/booking(.*)',
  '/api/revalidate(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // All remaining routes require Clerk auth (e.g. future /admin)
  await auth.protect()
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api)(.*)'],
}