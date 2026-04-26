import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import { getNgfContent, getItems } from '@/lib/ngf'

export default async function HomePage() {
  const content = await getNgfContent()

  // ── Brand ─────────────────────────────────────────────────────────────────
  const businessName = content['brand.businessName']   ?? 'WrenchTime Cycles'
  const tagline      = content['brand.tagline']        ?? 'Mobile Motorcycle Service'
  const accent       = content['brand.secondaryColor'] ?? '#ff6b2b'

  // ── Hero ──────────────────────────────────────────────────────────────────
  const eyebrow        = content['hero.eyebrow']        ?? 'Mobile Motorcycle Service'
  const headlinePrefix = content['hero.headlinePrefix'] ?? 'We Come'
  const headlineAccent = content['hero.headlineAccent'] ?? 'To You.'
  const description    = content['hero.description']    ?? 'Professional motorcycle service at your home or location. No towing, no shop waits, no surprises. Every job personally reviewed before anything is scheduled.'
  const heroCta        = content['hero.cta']            ?? 'Request Service'

  // ── How It Works ──────────────────────────────────────────────────────────
  const howTitle = content['how.title'] ?? 'How It Works'
  const rawSteps = getItems(content, 'how.steps')
  const howSteps = rawSteps.length > 0 ? rawSteps : [
    { title: 'Submit a Request',      desc: 'Fill out a quick form with your bike details and what it needs. Takes about two minutes.' },
    { title: 'Personal Review',       desc: 'Every request is reviewed individually. No automated booking, no guessing on scope.' },
    { title: 'Scope Confirmed',       desc: 'We confirm what the job requires and what it will cost before anything is scheduled.' },
    { title: 'We Come to You',        desc: 'For most jobs, we arrive at your location fully equipped to complete the work on-site.' },
    { title: 'Documented Completion', desc: 'Work is reviewed with you when finished. You know exactly what was done and why.' },
  ]

  // ── Services ──────────────────────────────────────────────────────────────
  const servicesTitle = content['services.title'] ?? 'Services & Pricing'
  const rawServices   = getItems(content, 'services.items')
  const services      = rawServices.length > 0 ? rawServices : [
    { name: 'Oil & Filter Service',    price: '$65 labor' },
    { name: 'Carburetor Service',      price: 'From $120 single · $180+ multi' },
    { name: 'Valve Train Service',     price: 'From $95' },
    { name: 'Drivetrain Service',      price: 'From $100' },
    { name: 'Brake Service',           price: 'From $60' },
    { name: 'Accessory Installation',  price: 'From $60' },
    { name: 'Diagnostics / No-Start',  price: '$85 · applied to repair' },
    { name: 'Pre-Purchase Inspection', price: '$95' },
  ]

  // ── Bottom CTA ────────────────────────────────────────────────────────────
  const ctaTitle       = content['bottomCta.title']       ?? 'Ready for professional mobile service?'
  const ctaDescription = content['bottomCta.description'] ?? 'Submit a request. Every job is reviewed personally — we reach out with next steps and availability.'
  const ctaButton      = content['bottomCta.button']      ?? 'Request Service Review'

  // ── Footer ────────────────────────────────────────────────────────────────
  const copyright = content['footer.copyright'] ?? `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`

  return (
    <div className="min-h-screen" style={{ color: 'var(--text)' }}>

      <SiteHeader businessName={businessName} accentColor={accent} />

      {/* ── Hero ── */}
      <section
        id="hero"
        data-ngf-section="Hero"
        className="relative overflow-hidden px-4 pb-28 pt-16 sm:px-6 lg:px-8"
      >
        {/* Grid texture */}
        <div className="bg-grid-tech pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-6xl">

          {/* Eyebrow */}
          <span
            data-ngf-field="hero.eyebrow"
            data-ngf-label="Eyebrow Tag"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="brand-chip"
          >
            {eyebrow}
          </span>

          {/* Headline — very large, left-aligned */}
          <h1 className="mt-6 max-w-4xl text-7xl font-black leading-[0.92] tracking-tighter sm:text-8xl lg:text-9xl">
            <span
              data-ngf-field="hero.headlinePrefix"
              data-ngf-label="Headline (first line)"
              data-ngf-type="text"
              data-ngf-section="Hero"
              className="block"
              style={{ color: 'var(--text)' }}
            >
              {headlinePrefix}
            </span>
            <span
              data-ngf-field="hero.headlineAccent"
              data-ngf-label="Headline (accent)"
              data-ngf-type="text"
              data-ngf-section="Hero"
              className="block"
              style={{ color: accent }}
            >
              {headlineAccent}
            </span>
          </h1>

          {/* Description + CTA row */}
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p
                data-ngf-field="hero.description"
                data-ngf-label="Description"
                data-ngf-type="textarea"
                data-ngf-section="Hero"
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: 'var(--muted)' }}
              >
                {description}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
              <Link
                href="/intake"
                data-ngf-field="hero.cta"
                data-ngf-label="Button Text"
                data-ngf-type="text"
                data-ngf-section="Hero"
                className="inline-flex min-h-12 items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                {heroCta}
              </Link>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                Every request personally reviewed · Mobile by default
              </p>
            </div>
          </div>

          {/* Divider with stat strip */}
          <div className="mt-16 grid grid-cols-1 gap-px border-t sm:grid-cols-3" style={{ borderColor: 'var(--line)' }}>
            {[
              { label: 'At Your Location',    sub: 'Most jobs completed on-site' },
              { label: 'Reviewed First',       sub: 'No automated booking' },
              { label: 'Transparent Pricing',  sub: 'Confirmed before work begins' },
            ].map((stat) => (
              <div key={stat.label} className="px-0 pt-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{stat.label}</p>
                <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statement Strip ── */}
      <div className="overflow-hidden border-y" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl" style={{ color: 'var(--text)' }}>
            At your location. By appointment.{' '}
            <span style={{ color: 'var(--brand)' }}>Done right.</span>{' '}
            Larger jobs handled in our dedicated workspace when the job calls for it.
          </p>
        </div>
      </div>

      {/* ── How It Works ── */}
      <section
        id="how"
        data-ngf-section="How It Works"
        className="px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex items-end justify-between border-b pb-6" style={{ borderColor: 'var(--line)' }}>
            <h2
              data-ngf-field="how.title"
              data-ngf-label="Section Title"
              data-ngf-type="text"
              data-ngf-section="How It Works"
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: 'var(--text)' }}
            >
              {howTitle}
            </h2>
            <span className="hidden text-xs font-semibold uppercase tracking-widest sm:block" style={{ color: 'var(--muted)' }}>
              {howSteps.length} steps
            </span>
          </div>

          {/* Vertical numbered list */}
          <div
            data-ngf-group="how.steps"
            data-ngf-item-label="Step"
            data-ngf-min-items="1"
            data-ngf-max-items="8"
            data-ngf-item-fields='[{"key":"title","label":"Step Title","type":"text"},{"key":"desc","label":"Description","type":"textarea"}]'
          >
            {howSteps.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 border-b py-8 sm:gap-10"
                style={{ borderColor: 'var(--line)' }}
              >
                {/* Large faded number */}
                <div
                  className="w-16 shrink-0 select-none text-right text-5xl font-black leading-none sm:w-24 sm:text-7xl"
                  style={{ color: 'var(--brand)', opacity: 0.18 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pt-1">
                  <h3
                    data-ngf-field={`how.steps.${i}.title`}
                    data-ngf-label="Step Title"
                    data-ngf-type="text"
                    data-ngf-section="How It Works"
                    className="text-lg font-semibold sm:text-xl"
                    style={{ color: 'var(--text)' }}
                  >
                    {step.title ?? ''}
                  </h3>
                  <p
                    data-ngf-field={`how.steps.${i}.desc`}
                    data-ngf-label="Description"
                    data-ngf-type="textarea"
                    data-ngf-section="How It Works"
                    className="mt-2 max-w-xl text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {step.desc ?? ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        id="services"
        data-ngf-section="Services"
        className="px-4 py-24 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 border-b pb-6 sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: 'var(--line)' }}>
            <h2
              data-ngf-field="services.title"
              data-ngf-label="Section Title"
              data-ngf-type="text"
              data-ngf-section="Services"
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: 'var(--text)' }}
            >
              {servicesTitle}
            </h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Starting prices · Scope confirmed before work begins
            </p>
          </div>

          {/* Menu-style service list */}
          <div
            data-ngf-group="services.items"
            data-ngf-item-label="Service"
            data-ngf-min-items="1"
            data-ngf-max-items="16"
            data-ngf-item-fields='[{"key":"name","label":"Service Name","type":"text"},{"key":"price","label":"Price","type":"text"}]'
          >
            {services.map((svc, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-4 border-b py-5"
                style={{ borderColor: 'var(--line)' }}
              >
                <span
                  data-ngf-field={`services.items.${i}.name`}
                  data-ngf-label="Service Name"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="text-base font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {svc.name ?? ''}
                </span>
                <span
                  data-ngf-field={`services.items.${i}.price`}
                  data-ngf-label="Price"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="shrink-0 text-sm font-semibold"
                  style={{ color: accent }}
                >
                  {svc.price ?? ''}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs" style={{ color: 'var(--muted)' }}>
            Transparent pricing. No surprises. Final quote confirmed with you before any work begins.
          </p>
        </div>
      </section>

      {/* ── Who We Work With ── */}
      <section id="fit" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <span className="brand-chip">The Right Fit</span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
                Who We Work With
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                We work best with riders who want professional, convenient service and value clear communication over a cheap quote.
              </p>
              <Link
                href="/intake"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                Request Service
              </Link>
            </div>
            <ul className="divide-y" style={{ borderColor: 'var(--line)' }}>
              {[
                { title: 'Convenience matters to you',       desc: 'You want service at your door — not another trip to drop off your bike.' },
                { title: 'You want confirmed scope upfront', desc: 'No surprises. Every job is reviewed and quoted before we show up.' },
                { title: 'You value documented work',        desc: 'You want to know what was done, why it was done, and what it cost.' },
                { title: 'Your bike deserves proper care',   desc: 'You\'re not looking for a quick patch — you want it done right.' },
              ].map((item, i) => (
                <li key={i} className="py-6" style={{ borderColor: 'var(--line)' }}>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 border-b pb-6" style={{ borderColor: 'var(--line)' }}>
            <span className="brand-chip">The Work</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
              Some of Our Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: 'var(--line)' }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ backgroundColor: 'var(--surface)' }}>
                <div
                  className="flex aspect-video items-center justify-center"
                  style={{ backgroundColor: 'var(--bg)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--line)' }}>Photo coming soon</p>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Job {n}</p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>Details and outcome coming soon.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        id="bottomCta"
        data-ngf-section="Call to Action"
        className="px-4 py-28 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto max-w-6xl">
          <div className="bg-grid-tech pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative">
            <h2
              data-ngf-field="bottomCta.title"
              data-ngf-label="Headline"
              data-ngf-type="text"
              data-ngf-section="Call to Action"
              className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: 'var(--text)' }}
            >
              {ctaTitle}
            </h2>
            <p
              data-ngf-field="bottomCta.description"
              data-ngf-label="Description"
              data-ngf-type="textarea"
              data-ngf-section="Call to Action"
              className="mt-6 max-w-xl text-base leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {ctaDescription}
            </p>
            <Link
              href="/intake"
              data-ngf-field="bottomCta.button"
              data-ngf-label="Button Text"
              data-ngf-type="text"
              data-ngf-section="Call to Action"
              className="mt-10 inline-flex min-h-12 items-center justify-center rounded-xl px-10 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              {ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="footer"
        data-ngf-section="Footer"
        className="border-t px-4 py-10"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p
              data-ngf-field="brand.businessName"
              data-ngf-label="Business Name"
              data-ngf-type="text"
              data-ngf-section="Brand"
              className="text-sm font-semibold"
              style={{ color: 'var(--text)' }}
            >
              {businessName}
            </p>
            {tagline && (
              <p
                data-ngf-field="brand.tagline"
                data-ngf-label="Tagline"
                data-ngf-type="text"
                data-ngf-section="Brand"
                className="mt-0.5 text-xs"
                style={{ color: 'var(--muted)' }}
              >
                {tagline}
              </p>
            )}
          </div>
          <p
            data-ngf-field="footer.copyright"
            data-ngf-label="Copyright Text"
            data-ngf-type="text"
            data-ngf-section="Footer"
            className="text-xs"
            style={{ color: 'var(--muted)' }}
          >
            {copyright}
          </p>
        </div>
      </footer>

    </div>
  )
}
