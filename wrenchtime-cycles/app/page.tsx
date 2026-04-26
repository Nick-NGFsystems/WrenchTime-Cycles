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
  const description    = content['hero.description']    ?? 'Professional motorcycle service at your home or location. No towing, no shop waits, no surprises. Every job is personally reviewed before we schedule anything.'
  const heroCta        = content['hero.cta']            ?? 'Request Service'

  // ── How It Works ──────────────────────────────────────────────────────────
  const howTitle = content['how.title'] ?? 'How It Works'
  const rawSteps = getItems(content, 'how.steps')
  const howSteps = rawSteps.length > 0 ? rawSteps : [
    { title: 'Submit a Request',       desc: 'Fill out a quick form with your bike details and what it needs. Takes about two minutes.' },
    { title: 'Personal Review',        desc: 'Every request is reviewed individually. No automated booking, no guessing on scope.' },
    { title: 'Scope Confirmed',        desc: 'We confirm what the job requires and what it will cost before anything is scheduled.' },
    { title: 'We Come to You',         desc: 'For most jobs, we arrive at your location fully equipped to complete the work on-site.' },
    { title: 'Documented Completion',  desc: 'Work is reviewed with you when finished. You know exactly what was done and why.' },
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
        className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

          {/* Left: copy */}
          <div>
            <span
              data-ngf-field="hero.eyebrow"
              data-ngf-label="Eyebrow Tag"
              data-ngf-type="text"
              data-ngf-section="Hero"
              className="brand-chip"
            >
              {eyebrow}
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <span
                data-ngf-field="hero.headlinePrefix"
                data-ngf-label="Headline (first line)"
                data-ngf-type="text"
                data-ngf-section="Hero"
                style={{ color: 'var(--text)' }}
              >
                {headlinePrefix}
              </span>
              <br />
              <span
                data-ngf-field="hero.headlineAccent"
                data-ngf-label="Headline (accent)"
                data-ngf-type="text"
                data-ngf-section="Hero"
                style={{ color: accent }}
              >
                {headlineAccent}
              </span>
            </h1>

            <p
              data-ngf-field="hero.description"
              data-ngf-label="Description"
              data-ngf-type="textarea"
              data-ngf-section="Hero"
              className="mt-6 max-w-lg text-lg leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {description}
            </p>

            <div className="mt-10">
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
            </div>

            {/* Trust line */}
            <p className="mt-6 text-sm" style={{ color: 'var(--muted)' }}>
              Every request personally reviewed · Mobile service by default
            </p>
          </div>

          {/* Right: photo area */}
          <div className="relative hidden lg:block">
            <div
              className="panel flex aspect-[4/3] w-full items-center justify-center rounded-3xl"
              style={{ borderColor: 'var(--line)' }}
            >
              {/* Placeholder — replace with real photo/video once Ryan sends assets */}
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Mobile Service in Action</p>
                <p className="mt-1 text-xs" style={{ color: 'var(--line)' }}>Photo / video coming soon</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Mobile First ── */}
      <section className="border-y px-4 py-16 sm:px-6 lg:px-8" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ backgroundColor: 'var(--brand)', color: '#090c12' }}>
                01
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>On-Site by Default</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>Most jobs are completed at your home, garage, or wherever your bike is. No hauling, no shop drop-off.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: 'var(--brand)', color: '#090c12' }}>
                02
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Shop Space When Needed</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>Larger or multi-day repairs are handled in our dedicated workspace — same professional standard, different location.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: 'var(--brand)', color: '#090c12' }}>
                03
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Transparent Throughout</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>Scope and cost confirmed before work begins. Documented when complete. No invoices that surprise you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how"
        data-ngf-section="How It Works"
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="brand-chip">The Process</span>
            <h2
              data-ngf-field="how.title"
              data-ngf-label="Section Title"
              data-ngf-type="text"
              data-ngf-section="How It Works"
              className="mt-4 text-3xl font-bold sm:text-4xl"
              style={{ color: 'var(--text)' }}
            >
              {howTitle}
            </h2>
          </div>

          <div
            data-ngf-group="how.steps"
            data-ngf-item-label="Step"
            data-ngf-min-items="1"
            data-ngf-max-items="8"
            data-ngf-item-fields='[{"key":"title","label":"Step Title","type":"text"},{"key":"desc","label":"Description","type":"textarea"}]'
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {howSteps.map((step, i) => (
              <div key={i} className="panel p-6">
                <div
                  className="mb-4 text-2xl font-bold"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  data-ngf-field={`how.steps.${i}.title`}
                  data-ngf-label="Step Title"
                  data-ngf-type="text"
                  data-ngf-section="How It Works"
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {step.title ?? ''}
                </h3>
                <p
                  data-ngf-field={`how.steps.${i}.desc`}
                  data-ngf-label="Description"
                  data-ngf-type="textarea"
                  data-ngf-section="How It Works"
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {step.desc ?? ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        id="services"
        data-ngf-section="Services"
        className="px-4 py-20 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="brand-chip">What We Do</span>
            <h2
              data-ngf-field="services.title"
              data-ngf-label="Section Title"
              data-ngf-type="text"
              data-ngf-section="Services"
              className="mt-4 text-3xl font-bold sm:text-4xl"
              style={{ color: 'var(--text)' }}
            >
              {servicesTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: 'var(--muted)' }}>
              Transparent starting prices. Final scope confirmed before work begins. No surprises.
            </p>
          </div>

          <div
            data-ngf-group="services.items"
            data-ngf-item-label="Service"
            data-ngf-min-items="1"
            data-ngf-max-items="16"
            data-ngf-item-fields='[{"key":"name","label":"Service Name","type":"text"},{"key":"price","label":"Price","type":"text"}]'
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((svc, i) => (
              <div
                key={i}
                className="panel flex flex-col justify-between p-5"
              >
                <span
                  data-ngf-field={`services.items.${i}.name`}
                  data-ngf-label="Service Name"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {svc.name ?? ''}
                </span>
                <span
                  data-ngf-field={`services.items.${i}.price`}
                  data-ngf-label="Price"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="mt-4 text-sm font-semibold"
                  style={{ color: accent }}
                >
                  {svc.price ?? ''}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs" style={{ color: 'var(--muted)' }}>
            Prices shown are starting labor rates. Final quote confirmed with you before any work begins.
          </p>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section id="fit" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="brand-chip">The Right Fit</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
              Who We Work With
            </h2>
          </div>

          <div className="panel mt-12 p-8">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                'Riders who want professional service at their door',
                'Owners who value clear communication and confirmed scope',
                'Bikes that deserve proper care without the shop hassle',
                'People who appreciate documented, reliable work they can trust',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-sm font-bold" style={{ color: 'var(--brand)' }}>✓</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="brand-chip">The Work</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
              Some of Our Projects
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: 'var(--muted)' }}>
              Real bikes, real work, real outcomes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="panel overflow-hidden">
                <div
                  className="flex aspect-video items-center justify-center"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--line)' }}>Photo coming soon</p>
                </div>
                <div className="p-5">
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
        className="px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-ngf-field="bottomCta.title"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Call to Action"
            className="text-3xl font-bold sm:text-4xl"
            style={{ color: 'var(--text)' }}
          >
            {ctaTitle}
          </h2>
          <p
            data-ngf-field="bottomCta.description"
            data-ngf-label="Description"
            data-ngf-type="textarea"
            data-ngf-section="Call to Action"
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
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
      </section>

      {/* ── Footer ── */}
      <footer
        id="footer"
        data-ngf-section="Footer"
        className="border-t px-4 py-10 text-center"
        style={{ borderColor: 'var(--line)' }}
      >
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
            className="mt-1 text-xs"
            style={{ color: 'var(--muted)' }}
          >
            {tagline}
          </p>
        )}
        <p
          data-ngf-field="footer.copyright"
          data-ngf-label="Copyright Text"
          data-ngf-type="text"
          data-ngf-section="Footer"
          className="mt-4 text-xs"
          style={{ color: 'var(--muted)' }}
        >
          {copyright}
        </p>
      </footer>

    </div>
  )
}
