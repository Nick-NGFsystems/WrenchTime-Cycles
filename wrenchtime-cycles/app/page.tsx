import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import { getNgfContent, getItems } from '@/lib/ngf'

export default async function HomePage() {
  const content = await getNgfContent()

  const heroEyebrow = content['hero.eyebrow'] || 'Motorcycle Service & Repair'
  const heroHeadlinePrefix = content['hero.headlinePrefix'] || 'Your Bike Deserves'
  const heroHeadlineAccent = content['hero.headlineAccent'] || 'Honest Work.'
  const heroDescription = content['hero.description'] || 'WrenchTime Cycles handles everything from oil changes to full diagnostics. Every job is reviewed before it\'s booked — no guesswork, no wasted trips.'
  const heroCta = content['hero.cta'] || 'Request a Service'

  const howTitle = content['how.title'] || 'How It Works'

  // Dynamic steps from portal editor
  const rawSteps = getItems(content, 'how.steps')
  const howSteps = rawSteps.length > 0 ? rawSteps.map((s, i) => ({
    key: String(i + 1).padStart(2, '0'),
    title: s.title ?? '',
    desc: s.desc ?? '',
  })) : [
    { key: '01', title: 'Submit a Request', desc: 'Fill out a quick intake form describing your bike and what it needs.' },
    { key: '02', title: 'Get Reviewed', desc: 'Every request is personally reviewed before a booking slot is offered.' },
    { key: '03', title: 'Pick Your Window', desc: 'Once approved, choose a time range that works for your schedule.' },
    { key: '04', title: 'Pay a Small Deposit', desc: 'A $25 booking fee locks in your appointment and goes toward your total.' },
  ]

  const servicesTitle = content['services.title'] || 'What We Work On'

  // Dynamic services from portal editor
  const rawServices = getItems(content, 'services.items')
  const services = rawServices.length > 0 ? rawServices.map(s => ({
    name: s.name ?? '',
    price: s.price ?? '',
  })) : [
    { name: 'Oil & Filter Service', price: '$55 labor' },
    { name: 'Carburetor Service', price: 'From $80' },
    { name: 'Valve Train Service', price: 'From $95' },
    { name: 'Drivetrain Service', price: 'From $100' },
    { name: 'Brake Service', price: 'From $45' },
    { name: 'Component Installation', price: 'From $30' },
    { name: 'Diagnostics / No-Start', price: '$85 (applied to repair)' },
    { name: 'Pre-Purchase Inspection', price: '$95' },
  ]

  const bottomTitle = content['bottomCta.title'] || 'Ready to get started?'
  const bottomDescription = content['bottomCta.description'] || 'Submit a request and we\'ll take it from there.'
  const bottomButton = content['bottomCta.button'] || 'Request a Service'
  const footerCopyright = content['footer.copyright'] || `© ${new Date().getFullYear()} WrenchTime Cycles. All rights reserved.`

  return (
    <main className="relative min-h-screen overflow-x-clip text-[var(--text)]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute right-0 top-56 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      </div>

      <SiteHeader />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <span data-ngf-field="hero.eyebrow" className="brand-chip">
              {heroEyebrow}
            </span>

            <h1 className="text-5xl font-bold leading-[0.94] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span data-ngf-field="hero.headlinePrefix">{heroHeadlinePrefix}</span>
              <span className="block text-[var(--accent)]" data-ngf-field="hero.headlineAccent">
                {heroHeadlineAccent}
              </span>
            </h1>

            <p data-ngf-field="hero.description" className="max-w-2xl text-base text-slate-300 sm:text-lg">
              {heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/intake"
                data-ngf-field="hero.cta"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-orange-500"
              >
                {heroCta}
              </Link>
              <Link
                href="/#services"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-200 transition-colors hover:border-cyan-300/60 hover:text-cyan-200"
              >
                See Services
              </Link>
            </div>
          </div>

          <div className="panel bg-grid-tech relative ride-shift overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-sky-500 to-[var(--accent)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Live Shop Snapshot
            </p>
            <div className="mt-6 space-y-4">
              <div className="surface-2 rounded-xl border border-slate-700/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Turnaround</p>
                <p className="mt-2 text-3xl font-bold text-white">2-4 Days</p>
                <p className="mt-1 text-sm text-slate-300">Typical service completion window.</p>
              </div>
              <div className="surface-2 rounded-xl border border-slate-700/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Diagnostic Clarity</p>
                <p className="mt-2 text-3xl font-bold text-white">100%</p>
                <p className="mt-1 text-sm text-slate-300">Every estimate is reviewed before booking.</p>
              </div>
              <div className="surface-2 rounded-xl border border-slate-700/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Booking Deposit</p>
                <p className="mt-2 text-3xl font-bold text-[var(--accent)]">$25</p>
                <p className="mt-1 text-sm text-slate-300">Applied directly to your final invoice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-[var(--line)] bg-slate-900/35 py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 data-ngf-field="how.title" className="text-center text-4xl font-bold text-white sm:text-5xl">
            {howTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {howSteps.map((item, index) => (
              <div key={index} className="panel p-5">
                <p className="text-3xl font-bold text-[var(--accent)]">{item.key}</p>
                <h3 data-ngf-field={`how.steps.${index}.title`} className="mt-4 text-2xl font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <p data-ngf-field={`how.steps.${index}.desc`} className="mt-3 text-sm leading-relaxed text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 data-ngf-field="services.title" className="text-center text-4xl font-bold text-white sm:text-5xl">
            {servicesTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm uppercase tracking-[0.14em] text-slate-400">
            Transparent labor pricing and straightforward recommendations.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="panel flex h-full flex-col justify-between p-5">
                <span data-ngf-field={`services.items.${index}.name`} className="text-xl font-semibold text-white">
                  {service.name}
                </span>
                <span data-ngf-field={`services.items.${index}.price`} className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[var(--line)] bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-cyan-950/50 p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.42)] sm:p-12">
          <h2 data-ngf-field="bottomCta.title" className="text-4xl font-bold text-white sm:text-5xl">
            {bottomTitle}
          </h2>
          <p data-ngf-field="bottomCta.description" className="mx-auto mt-4 max-w-2xl text-slate-300">
            {bottomDescription}
          </p>
          <Link
            href="/intake"
            data-ngf-field="bottomCta.button"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-orange-500"
          >
            {bottomButton}
          </Link>
        </div>
      </section>

      <footer
        data-ngf-field="footer.copyright"
        className="border-t border-[var(--line)] px-6 py-10 text-center text-xs uppercase tracking-[0.16em] text-slate-500"
      >
        {footerCopyright}
      </footer>
    </main>
  )
}
