import Link from 'next/link'

const SECTIONS = [
  { title: 'Information We Collect', body: 'We collect information you provide directly: name, email, company, project details, and usage data. We also collect technical data such as IP addresses, browser type, device identifiers, and usage patterns through cookies and analytics tools. All collection is transparent and documented.' },
  { title: 'How We Use Your Information', body: 'We use your data to deliver our services, communicate with you about your project, send product updates (with your consent), improve our platform, comply with legal obligations, and detect fraud or abuse. We never sell your data to third parties.' },
  { title: 'Data Sharing', body: 'We share data only with: (a) sub-processors necessary to run our services (AWS, Stripe, Mailgun), all bound by GDPR-compliant DPAs; (b) legal authorities when required by law; (c) business transferees in the event of merger or acquisition, with prior notice.' },
  { title: 'Data Retention', body: 'We retain account data for the duration of your contract plus 7 years for financial records. Project source code and deliverables are retained until formal handover. You may request earlier deletion under GDPR Article 17 ("right to erasure").' },
  { title: 'Security', body: 'Your data is encrypted at rest using AES-256 and in transit using TLS 1.3. We are SOC 2 Type II certified, conduct quarterly penetration testing, enforce MFA for all internal staff, and use hardware security modules (HSMs) for key management.' },
  { title: 'Your Rights (GDPR / UK GDPR)', body: 'If you are based in the UK or EEA you have the right to: access your personal data, correct inaccuracies, request deletion, restrict processing, object to automated decisions, and data portability. Submit requests to privacy@stack46.co.uk. We respond within 30 days.' },
  { title: 'Cookies', body: 'We use essential cookies (required for authentication), analytics cookies (PostHog, opted-in), and preference cookies (theme, language). You can manage cookie preferences via our cookie banner or browser settings. We do not use advertising or tracking cookies.' },
  { title: 'Changes to This Policy', body: 'We will notify you of material changes by email or prominent notice at least 30 days before they take effect. Your continued use of our services after changes constitutes acceptance. Archived versions of this policy are available on request.' },
  { title: 'Contact Us', body: 'For privacy enquiries, contact our Data Protection Officer at privacy@stack46.co.uk, or write to FourSix46 Global Ltd, 1 Canada Square, Canary Wharf, London E14 5AB. We are registered with the ICO (Information Commissioner\'s Office).' },
]

export default function PrivacyPage() {
  return (
    <div className="relative z-10">
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
          <p className="text-[#8892B0]">Effective date: 1 January 2026 · FourSix46 Global Ltd</p>
        </div>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-md rounded-2xl p-7 mb-5">
            <p className="text-[#8892B0] leading-relaxed">
              STACK46 (FourSix46 Global Ltd, company no. 16712658) is committed to protecting your personal data. This policy explains how we collect, use, and protect your information when you use our services or visit our website. We comply with the UK GDPR, Data Protection Act 2018, and EU GDPR.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {SECTIONS.map((s, i) => (
              <div key={s.title} className="glass-md rounded-2xl p-7">
                <h2 className="font-bold text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>
                  <span style={{ color: '#2AACE2' }}>{i + 1}.</span> {s.title}
                </h2>
                <p className="text-[#8892B0] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-[#8892B0]">
            Questions? Email <a href="mailto:privacy@stack46.co.uk" className="text-[#2AACE2] hover:underline">privacy@stack46.co.uk</a>
            {' '}or visit our <Link href="/security" className="text-[#2AACE2] hover:underline">Security</Link> page.
          </div>
        </div>
      </section>
    </div>
  )
}
