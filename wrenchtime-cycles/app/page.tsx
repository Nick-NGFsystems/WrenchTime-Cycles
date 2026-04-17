import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import { getNgfContent } from '@/lib/ngf'

export default async function HomePage() {
  const content = await getNgfContent()

  const heroEyebrow = content['hero.eyebrow'] ?? 'Motorcycle Service & Repair'
  const heroHeadlinePrefix = content['hero.headlinePrefix'] ?? 'Your Bike Deserves'
  const heroHeadlineAccent = content['hero.headlineAccent'] ?? 'Honest Work.'
  const heroDescription = content['hero.description'] ?? 'WrenchTime Cycles handles everything from oil changes to full diagnostics. Every job is reviewed before it\'s booked - no guesswork, no wasted trips.'
  const heroCta = content['hero.cta'] ?? 'Request a Service'

  const howTitle = content['how.title'] ?? 'How It Works'
  const howSteps = [
    {
      key: '01',
      title: content['how.step1.title'] ?? 'Submit a Request',
      desc: content['how.step1.desc'] ?? 'Fill out a quick intake form describing your bike and what it needs.',
    },
    {
      key: '02',
      title: content['how.step2.title'] ?? 'Get Reviewed',
      desc: content['how.step2.desc'] ?? 'Every request is personally reviewed before a booking slot is offered.',
    },
    {
      key: '03',
      title: content['how.step3.title'] ?? 'Pick Your Window',
      desc: content['how.step3.desc'] ?? 'Once approved, choose a time range that works for your schedule.',
    },
    {
      key: '04',
      title: content['how.step4.title'] ?? 'Pay a Small Deposit',
      desc: content['how.step4.desc'] ?? 'A $25 booking fee locks in your appointment and goes toward your total.',
    },
  ]

  const servicesTitle = content['services.title'] ?? 'What We Work On'
  const services = [
    { name: content['services.item1.name'] ?? 'Oil & Filter Service', price: content['services.item1.price'] ?? '$55 labor' },
    { name: content['services.item2.name'] ?? 'Carburetor Service', price: content['services.item2.price'] ?? 'From $70' },
    { name: content['services.item3.name'] ?? 'Valve Train Service', price: content['services.item3.price'] ?? 'From $95' },
    { name: content['services.item4.name'] ?? 'Drivetrain Service', price: content['services.item4.price'] ?? 'From $100' },
    { name: content['services.item5.name'] ?? 'Brake Service', price: content['services.item5.price'] ?? 'From $45' },
    { name: content['services.item6.name'] ?? 'Component Installation', price: content['services.item6.price'] ?? 'From $30' },
    { name: content['services.item7.name'] ?? 'Diagnostics / No-Start', price: content['services.item7.price'] ?? '$85 (applied to repair)' },
    { name: content['services.item8.name'] ?? 'Pre-Purchase Inspection', price: content['services.item8.price'] ?? '$95' },
  ]

  const bottomTitle = content['bottomCta.title'] ?? 'Ready to get started?'
  const bottomDescription = content['bottomCta.description'] ?? 'Submit a request and we\'ll take it from there.'
  const bottomButton = content['bottomCta.button'] ?? 'Request a Service'

  const footerCopyright = content['footer.copyright'] ?? `© ${new Date().getFullYear()} WrenchTime Cycles. All rights reserved.`

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <span data-ngf-field="hero.eyebrow" className="text-[#38BDF8] text-sm font-semibold uppercase tracking-widest">
          {heroEyebrow}
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span data-ngf-field="hero.headlinePrefix">{heroHeadlinePrefix}</span><br />
          <span data-ngf-field="hero.headlineAccent" className="text-[#E97132]">{heroHeadlineAccent}</span>
        </h1>
        <p data-ngf-field="hero.description" className="text-gray-400 text-lg md:text-xl max-w-2xl">
          {heroDescription}
        </p>
        <Link
          href="/intake"
          data-ngf-field="hero.cta"
          className="mt-4 bg-[#E97132] hover:bg-[#d4612a] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          {heroCta}
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 data-ngf-field="how.title" className="text-3xl font-bold text-center mb-12">
            {howTitle.split('Works')[0] || 'How It '}<span className="text-[#38BDF8]">{howTitle.includes('Works') ? 'Works' : howTitle}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howSteps.map((item, index) => (
              <div key={item.key} className="flex flex-col gap-3">
                <span className="text-[#E97132] text-4xl font-extrabold">{item.key}</span>
                <h3 data-ngf-field={`how.step${index + 1}.title`} className="text-white font-semibold text-lg">{item.title}</h3>
                <p data-ngf-field={`how.step${index + 1}.desc`} className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 data-ngf-field="services.title" className="text-3xl font-bold text-center mb-12">
            {servicesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between"
              >
                <span data-ngf-field={`services.item${index + 1}.name`} className="text-white font-medium">{service.name}</span>
                <span data-ngf-field={`services.item${index + 1}.price`} className="text-[#38BDF8] text-sm font-semibold">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gray-900 py-20 px-6 text-center">
        <h2 data-ngf-field="bottomCta.title" className="text-3xl font-bold mb-4">{bottomTitle}</h2>
        <p data-ngf-field="bottomCta.description" className="text-gray-400 mb-8">{bottomDescription}</p>
        <Link
          href="/intake"
          data-ngf-field="bottomCta.button"
          className="bg-[#E97132] hover:bg-[#d4612a] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          {bottomButton}
        </Link>
      </section>

      {/* FOOTER */}
      <footer data-ngf-field="footer.copyright" className="border-t border-gray-800 py-8 px-6 text-center text-gray-600 text-sm">
        {footerCopyright}
      </footer>

    </main>
  )
}
