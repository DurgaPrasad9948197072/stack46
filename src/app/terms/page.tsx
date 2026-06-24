import Link from 'next/link'

const SECTIONS = [
  { title: 'Acceptance of Terms', body: 'By engaging STACK46 for services or accessing our platform, you agree to these Terms of Service. If you do not agree, you may not use our services. These terms form a legally binding contract between you (or your organisation) and FourSix46 Global Ltd.' },
  { title: 'Description of Service', body: 'STACK46 provides bespoke software development, cloud infrastructure, AI integration, mobile development, UI/UX design and related consultancy services. Specific deliverables and timelines are defined in individual Statements of Work (SoW) or service agreements.' },
  { title: 'Account Registration', body: 'You must provide accurate, complete information when creating an account. You are responsible for maintaining the security of your credentials. Notify us immediately of any unauthorised access. Accounts may not be transferred without written consent.' },
  { title: 'Subscription and Payment', body: 'Subscription fees are billed monthly in advance and are non-refundable. Project-based fees follow the payment schedule in your SoW. We provide 30 days\' notice of price changes. Late payments accrue interest at 8% per annum above the Bank of England base rate (Late Payment of Commercial Debts Act 1998).' },
  { title: 'Acceptable Use', body: 'You may not: use our services for unlawful purposes; reverse-engineer our platform; resell or sublicence access; use deliverables to build competing products within 12 months without written agreement; or misrepresent your identity or your authority to bind your organisation.' },
  { title: 'Intellectual Property & Data Ownership', body: 'Upon full payment, you own all custom code and deliverables created exclusively for you. You retain full ownership of your data at all times. STACK46 retains ownership of pre-existing tools, frameworks, and general-purpose components ("background IP") but grants you a perpetual licence to use them in your deliverables.' },
  { title: 'Confidentiality', body: 'Both parties agree to keep each other\'s confidential information (business plans, technical architecture, client lists) strictly confidential for 5 years after project completion. NDAs are available on request. Exceptions apply to information already in the public domain or required by law.' },
  { title: 'Service Level Agreement', body: 'For managed hosting and maintenance clients, we guarantee 99.9% monthly uptime. Credits are issued for SLA breaches: 10% for 99.0–99.9%, 25% for 95.0–99.0%, 50% for below 95.0%. Credits do not apply to scheduled maintenance or force majeure events.' },
  { title: 'Limitation of Liability', body: 'STACK46\'s total liability in any 12-month period is limited to the fees paid in that period. We are not liable for indirect, consequential, or punitive damages, loss of profit, or data loss not caused by our negligence. Nothing herein limits liability for fraud or death/personal injury caused by negligence.' },
  { title: 'Governing Law', body: 'These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales. We will attempt to resolve disputes amicably within 30 days before initiating formal proceedings.' },
]

export default function TermsPage() {
  return (
    <div className="relative z-10">
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>Terms of Service</h1>
          <p className="text-[#8892B0]">Effective date: 1 January 2026 · FourSix46 Global Ltd · Company No. 16712658</p>
        </div>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-md rounded-2xl p-7 mb-5">
            <p className="text-[#8892B0] leading-relaxed">
              Please read these Terms of Service carefully before using STACK46 services. These terms constitute a legal agreement between you and FourSix46 Global Ltd, registered in England and Wales.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {SECTIONS.map((s, i) => (
              <div key={s.title} className="glass-md rounded-2xl p-7">
                <h2 className="font-bold text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>
                  <span style={{ color: '#FFC845' }}>{i + 1}.</span> {s.title}
                </h2>
                <p className="text-[#8892B0] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-[#8892B0]">
            Questions? Email <a href="mailto:legal@stack46.co.uk" className="text-[#2AACE2] hover:underline">legal@stack46.co.uk</a>
            {' '}· <Link href="/privacy" className="text-[#2AACE2] hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
