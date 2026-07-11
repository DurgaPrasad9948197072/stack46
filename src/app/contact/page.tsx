'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import AnimatedText from '@/components/ui/AnimatedText'
import Link from 'next/link'
import { CheckCircle2, Send } from 'lucide-react'

const INFO_CARDS = [
  { icon: '🚀', title: 'Free discovery call', sub: '30-minute strategy session, no commitment' },
  { icon: '💬', title: 'Response under 2 hours', sub: 'Mon–Fri 8am–8pm GMT. We reply fast.' },
  { icon: '📞', title: 'Book a live demo', sub: 'See our platform and team in action' },
  { icon: '🔒', title: 'Your data is safe', sub: 'SOC 2 Type II · GDPR compliant · UK registered' },
]

export default function ContactPage() {
  useReveal()
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <div className="relative z-10 overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(42,172,226,.1)', border: '1px solid rgba(42,172,226,.25)', color: '#2AACE2' }}>Contact</span>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-[1.06]" style={{ fontFamily: 'var(--font-grotesk)', letterSpacing: '-0.02em' }}>
            <span className="block"><AnimatedText segments={[{ text: "Let's get your project" }]} /></span>
            <span className="block"><AnimatedText delay={0.24} segments={[{ text: 'moving.', style: { background: 'linear-gradient(135deg,#2AACE2,#FFC845)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } }]} /></span>
          </h1>
          <p className="text-[#8892B0] text-lg">Tell us about your project — we will have a proposal to you within 48 hours.</p>
        </div>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="reveal-left d1">
            <div className="glass-md rounded-3xl p-8 md:p-10">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(34,197,94,.15)', border: '2px solid rgba(34,197,94,.4)' }}>
                    <CheckCircle2 size={30} style={{ color: '#22c55e' }} />
                  </div>
                  <h2 className="text-xl font-black text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>Message sent!</h2>
                  <p className="text-[#8892B0]">Our team will reach out within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h2 className="text-xl font-black text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>Send us a message</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Full name *</label>
                      <input type="text" required value={form.name} onChange={set('name')} placeholder="Jane Smith" className="input-field" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Work email *</label>
                      <input type="email" required value={form.email} onChange={set('email')} placeholder="jane@company.com" className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Company name</label>
                    <input type="text" value={form.company} onChange={set('company')} placeholder="Acme Corp" className="input-field" />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Service you need</label>
                    <select value={form.service} onChange={set('service')} className="input-field cursor-pointer"
                      style={{ appearance: 'none', colorScheme: 'dark' }}>
                      <option value="">Select a service…</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="ai">AI / ML Solution</option>
                      <option value="cloud">Cloud &amp; DevOps</option>
                      <option value="design">UI/UX Design</option>
                      <option value="other">Other / Full Product</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Tell us about your project *</label>
                    <textarea required rows={5} value={form.message} onChange={set('message')}
                      placeholder="What are you building? What is the timeline? What is the main challenge?"
                      className="input-field resize-none" style={{ minHeight: '120px' }} />
                  </div>

                  <button type="submit"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:scale-[1.01]"
                    style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 24px rgba(42,172,226,.3)' }}>
                    Send Message <Send size={15} />
                  </button>
                  <p className="text-xs text-[#8892B0] text-center">We respect your privacy and never share your information.</p>
                </form>
              )}
            </div>
          </div>

          {/* Right info */}
          <div className="flex flex-col gap-5">
            {INFO_CARDS.map((card, i) => (
              <div key={card.title} className={`glass-md rounded-2xl p-5 card-hover border border-transparent reveal-right d${i + 1}`}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">{card.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm text-[#F0F4FF] mb-1">{card.title}</h3>
                    <p className="text-xs text-[#8892B0]">{card.sub}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="glass-md rounded-2xl p-6 mt-2">
              <h3 className="font-bold text-sm text-[#F0F4FF] mb-4" style={{ fontFamily: 'var(--font-grotesk)' }}>Direct contact</h3>
              <div className="flex flex-col gap-3 text-sm text-[#8892B0]">
                <a href="mailto:hello@stack46.co.uk" className="hover:text-[#2AACE2] transition-colors">hello@stack46.co.uk</a>
                <a href="tel:+442012345678" className="hover:text-[#2AACE2] transition-colors">+44 (0) 20 1234 5678</a>
                <span>London, United Kingdom · Remote-first</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
