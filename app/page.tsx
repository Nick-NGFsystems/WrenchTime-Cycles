import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import { getNgfContent, getItems } from '@/lib/ngf'

export default async function HomePage() {
  const content = await getNgfContent()

  // ── Brand ─────────────────────────────────────────────────────────────────
  const businessName = content['brand.businessName']   ?? 'WrenchTime Cycles'
  const tagline      = content['brand.tagline']        ?? 'Motorcycle Service & Repair'
  const primary      = content['brand.primaryColor']   ?? '#33d6ff'
  const accent       = content['brand.secondaryColor'] ?? '#ff6b2b'

  // ── Hero ──────────────────────────────────────────────────────────────────
  const eyebrow         = content['hero.eyebrow']        ?? tagline
  const headlinePrefix  = content['hero.headlinePrefix'] ?? 'Your Bike Deserves'
  const headlineAccent  = content['hero.headlineAccent'] ?? 'Honest Work.'
  const description     = content['hero.description']    ?? 'WrenchTime Cycles handles everything from oil changes to full diagnostics. Every job is reviewed before it\'s booked — no guesswork, no wasted trips.'
  const heroCta         = content['hero.cta']            ?? 'Request a Service'

  // ── How It Works ──────────────────────────────────────────────────────────
  const howTitle = content['how.title'] ?? 'How It Works'
  const rawSteps = getItems(content, 'how.steps')
  const howSteps = rawSteps.length > 0 ? rawSteps : [
    { title: 'Submit a Request', desc: 'Fill out a quick form describing your bike and what it needs.' },
    { title: 'Get Reviewed',     desc: 'Every request is personally reviewed before a slot is offered.' },
    { title: 'Pick Your Window', desc: 'Once approved, choose a time range that works for your schedule.' },
    { title: 'Pay a Deposit',    desc: 'A $25 booking fee locks in your slot and goes toward your total.' },
  ]

  // ── Services ──────────────────────────────────────────────────────────────
  const servicesTitle = content['services.title'] ?? 'What We Work On'
  const rawServices   = getItems(content, 'services.items')
  const services      = rawServices.length > 0 ? rawServices : [
    { name: 'Oil & Filter Service',    price: '$55 labor' },
    { name: 'Carburetor Service',      price: 'From $80' },
    { name: 'Valve Train Service',     price: 'From $95' },
    { name: 'Drivetrain Service',      price: 'From $100' },
    { name: 'Brake Service',           price: 'From $45' },
    { name: 'Component Installation',  price: 'From $30' },
    { name: 'Diagnostics / No-Start',  price: '$85 (applied to repair)' },
    { name: 'Pre-Purchase Inspection', price: '$95' },
  ]

  // ── Bottom CTA ────────────────────────────────────────────────────────────
  const ctaTitle       = content['bottomCta.title']       ?? 'Ready to get started?'
  const ctaDescription = content['bottomCta.description'] ?? "Submit a request and we'll take it from there."
  const ctaButton      = content['bottomCta.button']      ?? 'Request a Service'

  // ── Footer ────────────────────────────────────────────────────────────────
  const copyright = content['footer.copyright'] ?? `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <SiteHeader
        businessName={businessName}
        primaryColor={primary}
        accentColor={accent}
      />

      {/* ── Hero ── */}
      <section
        id="hero"
        data-ngf-section="Hero"
        className="border-b border-gray-100 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span
            data-ngf-field="hero.eyebrow"
            data-ngf-label="Eyebrow Tag"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white"
            style={{ backgroundColor: primary }}
          >
            {eyebrow}
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            <span
              data-ngf-field="hero.headlinePrefix"
              data-ngf-label="Headline (first line)"
              data-ngf-type="text"
              data-ngf-section="Hero"
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
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500"
          >
            {description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/intake"
              data-ngf-field="hero.cta"
              data-ngf-label="Button Text"
              data-ngf-type="text"
              data-ngf-section="Hero"
              className="inline-flex min-h-11 items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              {heroCta}
            </Link>
            <Link
              href="#services"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              See Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how"
        data-ngf-section="How It Works"
        className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            data-ngf-field="how.title"
            data-ngf-label="Section Title"
            data-ngf-type="text"
            data-ngf-section="How It Works"
            className="text-center text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            {howTitle}
          </h2>

          {/* Repeatable group — tells the editor this is an add/remove array */}
          <div
            data-ngf-group="how.steps"
            data-ngf-item-label="Step"
            data-ngf-min-items="1"
            data-ngf-max-items="8"
            data-ngf-item-fields='[{"key":"title","label":"Step Title","type":"text"},{"key":"desc","label":"Description","type":"textarea"}]'
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {howSteps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: primary }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  data-ngf-field={`how.steps.${i}.title`}
                  data-ngf-label="Step Title"
                  data-ngf-type="text"
                  data-ngf-section="How It Works"
                  className="text-base font-semibold text-gray-900"
                >
                  {step.title ?? ''}
                </h3>
                <p
                  data-ngf-field={`how.steps.${i}.desc`}
                  data-ngf-label="Description"
                  data-ngf-type="textarea"
                  data-ngf-section="How It Works"
                  className="mt-2 text-sm leading-relaxed text-gray-500"
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
      >
        <div className="mx-auto max-w-6xl">
          <h2
            data-ngf-field="services.title"
            data-ngf-label="Section Title"
            data-ngf-type="text"
            data-ngf-section="Services"
            className="text-center text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            {servicesTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            Transparent labor pricing and straightforward recommendations.
          </p>

          {/* Repeatable group */}
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
                className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                style={{ borderLeftColor: primary, borderLeftWidth: '3px' }}
              >
                <span
                  data-ngf-field={`services.items.${i}.name`}
                  data-ngf-label="Service Name"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="text-sm font-semibold text-gray-900"
                >
                  {svc.name ?? ''}
                </span>
                <span
                  data-ngf-field={`services.items.${i}.price`}
                  data-ngf-label="Price"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="mt-4 text-sm font-semibold uppercase tracking-wide"
                  style={{ color: accent }}
                >
                  {svc.price ?? ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        id="bottomCta"
        data-ngf-section="Call to Action"
        className="bg-gray-900 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-ngf-field="bottomCta.title"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Call to Action"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            {ctaTitle}
          </h2>
          <p
            data-ngf-field="bottomCta.description"
            data-ngf-label="Description"
            data-ngf-type="textarea"
            data-ngf-section="Call to Action"
            className="mx-auto mt-4 max-w-xl text-gray-400"
          >
            {ctaDescription}
          </p>
          <Link
            href="/intake"
            data-ngf-field="bottomCta.button"
            data-ngf-label="Button Text"
            data-ngf-type="text"
            data-ngf-section="Call to Action"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
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
        className="border-t border-gray-100 bg-white px-4 py-10 text-center"
      >
        <p
          data-ngf-field="brand.businessName"
          data-ngf-label="Business Name"
          data-ngf-type="text"
          data-ngf-section="Brand"
          className="text-sm font-semibold text-gray-900"
        >
          {businessName}
        </p>
        {tagline && (
          <p
            data-ngf-field="brand.tagline"
            data-ngf-label="Tagline"
            data-ngf-type="text"
            data-ngf-section="Brand"
            className="mt-1 text-xs text-gray-400"
          >
            {tagline}
          </p>
        )}
        <p
          data-ngf-field="footer.copyright"
          data-ngf-label="Copyright Text"
          data-ngf-type="text"
          data-ngf-section="Footer"
          className="mt-4 text-xs text-gray-400"
        >
          {copyright}
        </p>
      </footer>

    </div>
  )
}
