import Link from 'next/link'
import AuthNavActions from '@/components/layout/AuthNavActions'

interface SiteHeaderProps {
  showBookingCta?: boolean
}

export default function SiteHeader({ showBookingCta = true }: SiteHeaderProps) {
  return (
    <nav className="flex w-full items-center justify-between border-b border-gray-800 px-6 py-4">
      <Link href="/" className="text-xl font-bold tracking-tight">
        <span className="text-[#38BDF8]">Wrench</span>
        <span className="text-[#E97132]">Time</span>
        <span className="text-white"> Cycles</span>
      </Link>

      <div className="flex items-center gap-3">
        {showBookingCta && (
          <Link
            href="/intake"
            className="rounded-lg bg-[#E97132] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d4612a]"
          >
            Book a Service
          </Link>
        )}
        <AuthNavActions />
      </div>
    </nav>
  )
}