'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'

const PLANS = [
  { name: 'Starter',    price: '£2,999/mo', desc: '1 project stream',           accent: '#6b7280' },
  { name: 'Growth',     price: '£5,999/mo', desc: 'AI & Cloud included',        accent: '#2AACE2', popular: true },
  { name: 'Enterprise', price: 'Custom',    desc: 'Unlimited capacity',          accent: '#a855f7' },
]

function strengthColor(len: number) {
  if (len === 0) return '#1f2937'
  if (len < 6)   return '#ef4444'
  if (len < 10)  return '#f97316'
  if (len < 14)  return '#FFC845'
  return '#22c55e'
}
function strengthWidth(len: number) {
  if (len === 0) return '0%'
  if (len < 6)   return '25%'
  if (len < 10)  return '50%'
  if (len < 14)  return '75%'
  return '100%'
}

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [plan, setPlan] = useState('Growth')
  const [company, setCompany] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const nextStep = () => {
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setError(''); setStep(2)
  }

  const submit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(3) }, 1400)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div className="orb-a" style={{ position: 'fixed' }} />
      <div className="orb-b" style={{ position: 'fixed' }} />
      <div className="grid-overlay" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="relative w-9 h-9"><Image src="/logo.png" alt="STACK46" fill className="object-contain" /></div>
          <span className="font-bold text-[1.05rem] tracking-[.18em] grad" style={{ fontFamily: 'var(--font-grotesk)' }}>STACK46</span>
        </Link>

        {/* Step indicator */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: step > s ? '#22c55e' : step === s ? '#2AACE2' : 'rgba(255,255,255,.06)',
                    color: step >= s ? '#fff' : '#8892B0',
                    border: step === s ? '2px solid #2AACE2' : '1px solid rgba(255,255,255,.1)',
                  }}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                {s < 2 && <div className="w-12 h-px" style={{ background: step > s ? '#22c55e' : 'rgba(255,255,255,.12)' }} />}
              </div>
            ))}
          </div>
        )}

        <div className="glass-md rounded-3xl p-8 md:p-10">
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>Create your account</h1>
                <p className="text-sm text-[#8892B0]">14-day free trial · No credit card required</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Google', icon: <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
                  { label: 'GitHub', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
                ].map(btn => (
                  <button key={btn.label} className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium glass cursor-pointer transition-all hover:border-[rgba(42,172,226,.3)]" style={{ color: '#8892B0' }}>
                    {btn.icon}{btn.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,.08)' }} />
                <span className="text-xs text-[#8892B0]">or with email</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,.08)' }} />
              </div>

              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', color: '#f87171' }}>
                  <AlertCircle size={15} />{error}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Full name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Work email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@company.com" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Password</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" className="input-field pr-12" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8892B0] hover:text-[#F0F4FF] transition-colors cursor-pointer">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  <div className="mt-2 flex gap-1">
                    {[...Array(4)].map((_, si) => (
                      <div key={si} className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: password.length > si * 4 ? strengthColor(password.length) : 'rgba(255,255,255,.08)' }} />
                    ))}
                  </div>
                </div>
                <button onClick={nextStep} className="w-full py-4 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff', boxShadow: '0 0 24px rgba(42,172,226,.3)' }}>
                  Continue →
                </button>
              </div>

              <p className="text-center text-sm text-[#8892B0] mt-6">
                Already have an account?{' '}<Link href="/login" className="text-[#2AACE2] hover:text-[#4DD0C4] transition-colors font-medium">Sign in</Link>
              </p>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-[#F0F4FF] mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>Choose your plan</h1>
                <p className="text-sm text-[#8892B0]">Trial starts today · No payment for 14 days</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {PLANS.map(p => (
                  <button key={p.name} onClick={() => setPlan(p.name)}
                    className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: plan === p.name ? `${p.accent}12` : 'rgba(255,255,255,.03)',
                      border: plan === p.name ? `2px solid ${p.accent}` : '1px solid rgba(255,255,255,.08)',
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: p.accent }}>
                        {plan === p.name && <div className="w-2 h-2 rounded-full" style={{ background: p.accent }} />}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#F0F4FF]">{p.name}</span>
                          {'popular' in p && p.popular && <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${p.accent}25`, color: p.accent }}>Popular</span>}
                        </div>
                        <span className="text-xs text-[#8892B0]">{p.desc}</span>
                      </div>
                    </div>
                    <span className="font-bold text-sm" style={{ color: p.accent }}>{p.price}</span>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="text-xs font-medium text-[#8892B0] mb-1.5 block">Company name (optional)</label>
                <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Corp" className="input-field" />
              </div>

              <div className="px-4 py-3 rounded-xl mb-6 text-sm" style={{ background: 'rgba(42,172,226,.07)', border: '1px solid rgba(42,172,226,.2)', color: '#4DD0C4' }}>
                Your 14-day trial starts today — no payment required until it ends.
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl text-sm font-medium glass cursor-pointer hover:border-[rgba(42,172,226,.3)] transition-all" style={{ color: '#8892B0' }}>
                  ← Back
                </button>
                <button onClick={submit} disabled={loading}
                  className="flex-2 flex-1 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all disabled:opacity-60 hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff' }}>
                  {loading ? 'Creating…' : 'Create Account →'}
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: SUCCESS ── */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(34,197,94,.15)', border: '2px solid rgba(34,197,94,.4)' }}>
                <CheckCircle2 size={36} style={{ color: '#22c55e' }} />
              </div>
              <h1 className="text-2xl font-black text-[#F0F4FF] mb-3" style={{ fontFamily: 'var(--font-grotesk)' }}>Welcome to STACK46!</h1>
              <p className="text-[#8892B0] mb-2">Your account is ready.</p>
              <p className="text-sm font-medium" style={{ color: '#2AACE2' }}>{email}</p>
              <div className="flex flex-col gap-3 mt-8">
                <Link href="/login" className="w-full flex items-center justify-center py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg,#1E2A78,#2AACE2)', color: '#fff' }}>
                  Go to Dashboard →
                </Link>
                <Link href="/docs" className="w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-medium glass" style={{ color: '#8892B0' }}>
                  Read the Docs
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#8892B0] mt-6">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="hover:text-[#F0F4FF] transition-colors">Terms</Link>{' '}and{' '}
          <Link href="/privacy" className="hover:text-[#F0F4FF] transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
