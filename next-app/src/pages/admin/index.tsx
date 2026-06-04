import { useState } from 'react'
import { getIronSession } from 'iron-session'
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, SessionData } from '../../lib/auth'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = (await getIronSession<SessionData>(context.req as NextApiRequest, context.res as NextApiResponse, sessionOptions))
  if (!session?.isLoggedIn) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }
  return { props: {} }
}

export default function AdminPage() {
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  // Each field has its own local state — no complex arrays, no callbacks
  const [demoDate, setDemoDate] = useState('june 5, 2026')
  const [headline, setHeadline] = useState('Stress-Free Cooperative Records')
  const [subheadline, setSubheadline] = useState('Discover how CORA helps Multi-Purpose, Credit, and Agricultural cooperatives across the Philippines manage member records, compute accurate dividends, and prepare for CDA evaluations with zero technical hassle.')
  const [ctaText, setCtaText] = useState('Request a Free System Demonstration')
  const [modalTitle, setModalTitle] = useState('Book Your Free Demo Review')
  const [modalSub, setModalSub] = useState('Free Google Meet Demo • june 5, 2026 • Check your email for the link')
  const [step1, setStep1] = useState('Fill out the form — takes less than 60 seconds')
  const [step2, setStep2] = useState('Receive Google Meet link via email within 15 minutes')
  const [step3, setStep3] = useState('Join the june 5, 2026 Google Meet demo')
  const [badge1, setBadge1] = useState('CDA-Aligned')
  const [badge2, setBadge2] = useState('DPA-Compliant')
  const [badge3, setBadge3] = useState('Secure Cloud')
  const [footerEmail, setFooterEmail] = useState('edgepoint.solutions.inc@gmail.com')
  const [footerPhone, setFooterPhone] = useState('0962 807 3120')
  const [footerAddress, setFooterAddress] = useState('2/F Edgepoint Building, P. Burgos St., Naga City, Camarines Sur 4400')
  const [footerHours, setFooterHours] = useState('Mondays to Fridays, 8:00 AM – 5:00 PM PHT')

  async function handleSave() {
    setSaving(true)
    setErr('')
    setMsg('')
    try {
      const body = [
        { section: 'hero', content_key: 'demo_date', content_value: demoDate },
        { section: 'hero', content_key: 'headline', content_value: headline },
        { section: 'hero', content_key: 'subheadline', content_value: subheadline },
        { section: 'hero', content_key: 'cta_text', content_value: ctaText },
        { section: 'hero', content_key: 'modal_title', content_value: modalTitle },
        { section: 'hero', content_key: 'modal_sub', content_value: modalSub },
        { section: 'steps', content_key: 'step1', content_value: step1 },
        { section: 'steps', content_key: 'step2', content_value: step2 },
        { section: 'steps', content_key: 'step3', content_value: step3 },
        { section: 'trust', content_key: 'badge1', content_value: badge1 },
        { section: 'trust', content_key: 'badge2', content_value: badge2 },
        { section: 'trust', content_key: 'badge3', content_value: badge3 },
        { section: 'footer', content_key: 'contact_email', content_value: footerEmail },
        { section: 'footer', content_key: 'contact_phone', content_value: footerPhone },
        { section: 'footer', content_key: 'contact_office', content_value: footerAddress },
        { section: 'footer', content_key: 'contact_hours', content_value: footerHours },
      ]
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setMsg('Saved! Public page is updated.')
        setTimeout(() => setMsg(''), 3000)
      } else {
        setErr('Save failed')
      }
    } catch {
      setErr('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14,
    boxSizing: 'border-box',
    background: '#fff',
    color: '#1d1d1f',
    marginTop: 4,
    marginBottom: 12,
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: 60,
    resize: 'vertical' as const,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 2,
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: '1px solid #e5e5e5',
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Content Editor</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Edit fields below, then click Save.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {msg && <span style={{ color: '#16a34a', fontSize: 13, fontWeight: 500 }}>{msg}</span>}
          {err && <span style={{ color: '#dc2626', fontSize: 13 }}>{err}</span>}
          <button onClick={handleSave} disabled={saving} style={{ padding: '10px 20px', background: '#1B4D3E', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* HERO */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Hero Section</h2>
        <label style={labelStyle}>Demo Date</label>
        <input style={inputStyle} value={demoDate} onChange={e => setDemoDate(e.target.value)} placeholder="e.g., june 5, 2026" />
        <label style={labelStyle}>Headline</label>
        <textarea style={textareaStyle} value={headline} onChange={e => setHeadline(e.target.value)} rows={2} />
        <label style={labelStyle}>Subheadline</label>
        <textarea style={textareaStyle} value={subheadline} onChange={e => setSubheadline(e.target.value)} rows={3} />
        <label style={labelStyle}>Hero CTA Button Text</label>
        <input style={inputStyle} value={ctaText} onChange={e => setCtaText(e.target.value)} />
        <label style={labelStyle}>Modal Title</label>
        <input style={inputStyle} value={modalTitle} onChange={e => setModalTitle(e.target.value)} />
        <label style={labelStyle}>Modal Subtitle</label>
        <textarea style={textareaStyle} value={modalSub} onChange={e => setModalSub(e.target.value)} rows={2} />
      </div>

      {/* STEPS */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>What Happens Next</h2>
        <label style={labelStyle}>Step 1</label>
        <input style={inputStyle} value={step1} onChange={e => setStep1(e.target.value)} />
        <label style={labelStyle}>Step 2</label>
        <input style={inputStyle} value={step2} onChange={e => setStep2(e.target.value)} />
        <label style={labelStyle}>Step 3</label>
        <input style={inputStyle} value={step3} onChange={e => setStep3(e.target.value)} />
      </div>

      {/* TRUST BAR */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Trust Bar Badges</h2>
        <label style={labelStyle}>Badge 1</label>
        <input style={inputStyle} value={badge1} onChange={e => setBadge1(e.target.value)} />
        <label style={labelStyle}>Badge 2</label>
        <input style={inputStyle} value={badge2} onChange={e => setBadge2(e.target.value)} />
        <label style={labelStyle}>Badge 3</label>
        <input style={inputStyle} value={badge3} onChange={e => setBadge3(e.target.value)} />
      </div>

      {/* FOOTER */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Footer Contact</h2>
        <label style={labelStyle}>Email</label>
        <input style={inputStyle} value={footerEmail} onChange={e => setFooterEmail(e.target.value)} />
        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} value={footerPhone} onChange={e => setFooterPhone(e.target.value)} />
        <label style={labelStyle}>Office Address</label>
        <textarea style={textareaStyle} value={footerAddress} onChange={e => setFooterAddress(e.target.value)} rows={2} />
        <label style={labelStyle}>Office Hours</label>
        <input style={inputStyle} value={footerHours} onChange={e => setFooterHours(e.target.value)} />
      </div>

      <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 24 }}>
        Changes are saved to the database. Visit the public page to see updates.
      </p>
    </div>
  )
}
