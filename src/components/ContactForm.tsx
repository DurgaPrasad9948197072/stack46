'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECT_TYPES = ['Web Application','Mobile App','AI / ML Solution','Cloud Infrastructure','UI/UX Design','SaaS Product','Other']
const BUDGETS = ['Under £10k','£10k–£30k','£30k–£80k','£80k–£200k','£200k+']

export default function ContactForm() {
  const [data, setData] = useState({ name:'', email:'', company:'', type:'', budget:'', message:'' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setData(d => ({ ...d, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity:0, scale:.95 }}
        animate={{ opacity:1, scale:1 }}
        className="flex flex-col items-center justify-center py-20 text-center gap-5"
      >
        <motion.div
          initial={{ scale:0 }}
          animate={{ scale:1 }}
          transition={{ type:'spring', stiffness:200, damping:15, delay:.1 }}
        >
          <CheckCircle size={60} style={{ color:'#4DD0C4' }} />
        </motion.div>
        <h3 className="text-2xl font-bold text-[#F0F4FF]" style={{ fontFamily:'var(--font-grotesk)' }}>Message Sent!</h3>
        <p className="text-[#8892B0] max-w-xs">We&apos;ll review your project and get back to you within 24 hours.</p>
        <button onClick={()=>{setDone(false);setData({name:'',email:'',company:'',type:'',budget:'',message:''})}}
          className="mt-2 px-6 py-2.5 rounded-xl text-sm btn-ghost">
          Send Another
        </button>
      </motion.div>
    )
  }

  const labelCls = "block text-xs font-semibold text-[#8892B0] uppercase tracking-wide mb-1.5"
  const rowCls   = "grid sm:grid-cols-2 gap-4"

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className={rowCls}>
        <div>
          <label className={labelCls}>Name *</label>
          <input required value={data.name} onChange={e=>set('name',e.target.value)}
            placeholder="Jane Smith" className="input-field" />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input required type="email" value={data.email} onChange={e=>set('email',e.target.value)}
            placeholder="jane@company.com" className="input-field" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Company</label>
        <input value={data.company} onChange={e=>set('company',e.target.value)}
          placeholder="Your Company Ltd" className="input-field" />
      </div>

      <div className={rowCls}>
        <div>
          <label className={labelCls}>Project Type *</label>
          <select required value={data.type} onChange={e=>set('type',e.target.value)} className="input-field cursor-pointer"
            style={{ appearance:'none' }}>
            <option value="" disabled>Select type…</option>
            {PROJECT_TYPES.map(t=><option key={t} value={t} style={{ background:'#0D1530' }}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Budget Range</label>
          <select value={data.budget} onChange={e=>set('budget',e.target.value)} className="input-field cursor-pointer"
            style={{ appearance:'none' }}>
            <option value="" disabled>Select budget…</option>
            {BUDGETS.map(b=><option key={b} value={b} style={{ background:'#0D1530' }}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Tell Us About Your Project *</label>
        <textarea required rows={5} value={data.message} onChange={e=>set('message',e.target.value)}
          placeholder="Describe your project, goals, timeline, and any specific requirements…"
          className="input-field" style={{ resize:'vertical', minHeight:120 }} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-semibold btn-primary mt-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Sending…
          </>
        ) : (
          <>Send Message <Send size={16} /></>
        )}
      </button>

      <p className="text-[11px] text-[#8892B0] text-center">
        By submitting, you agree to our Privacy Policy. We never share your data.
      </p>
    </form>
  )
}
