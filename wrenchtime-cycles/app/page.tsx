import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* NAVBAR */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-[#38BDF8]">Wrench</span>
          <span className="text-[#E97132]">Time</span>
          <span className="text-white"> Cycles</span>
        </span>
        <Link
          href="/intake"
          className="bg-[#E97132] hover:bg-[#d4612a] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Book a Service
        </Link>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <span className="text-[#38BDF8] text-sm font-semibold uppercase tracking-widest">
          Motorcycle Service & Repair
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Your Bike Deserves<br />
          <span className="text-[#E97132]">Honest Work.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
          WrenchTime Cycles handles everything from oil changes to full diagnostics. 
          Every job is reviewed before it&apos;s booked — no guesswork, no wasted trips.
        </p>
        <Link
          href="/intake"
          className="mt-4 bg-[#E97132] hover:bg-[#d4612a] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Request a Service
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It <span className="text-[#38BDF8]">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Submit a Request', desc: 'Fill out a quick intake form describing your bike and what it needs.' },
              { step: '02', title: 'Get Reviewed', desc: 'Every request is personally reviewed before a booking slot is offered.' },
              { step: '03', title: 'Pick Your Window', desc: 'Once approved, choose a time range that works for your schedule.' },
              { step: '04', title: 'Pay a Small Deposit', desc: 'A $25 booking fee locks in your appointment and goes toward your total.' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="text-[#E97132] text-4xl font-extrabold">{item.step}</span>
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We <span className="text-[#38BDF8]">Work On</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Oil & Filter Service', price: '$55 labor' },
              { name: 'Carburetor Service', price: 'From $70' },
              { name: 'Valve Train Service', price: 'From $95' },
              { name: 'Drivetrain Service', price: 'From $100' },
              { name: 'Brake Service', price: 'From $45' },
              { name: 'Component Installation', price: 'From $30' },
              { name: 'Diagnostics / No-Start', price: '$85 (applied to repair)' },
              { name: 'Pre-Purchase Inspection', price: '$95' },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between"
              >
                <span className="text-white font-medium">{service.name}</span>
                <span className="text-[#38BDF8] text-sm font-semibold">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gray-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-400 mb-8">Submit a request and we&apos;ll take it from there.</p>
        <Link
          href="/intake"
          className="bg-[#E97132] hover:bg-[#d4612a] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Request a Service
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 px-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} WrenchTime Cycles. All rights reserved.
      </footer>

    </main>
  )
}
