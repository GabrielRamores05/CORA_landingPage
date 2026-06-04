import { useState, useEffect } from 'react'
import { getIronSession } from 'iron-session'
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, SessionData } from '../../lib/auth'
import { getAllContent } from '../../lib/db'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = (await getIronSession<SessionData>(context.req as NextApiRequest, context.res as NextApiResponse, sessionOptions))
  if (!session?.isLoggedIn) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }
  try {
    const rows = await getAllContent()
    const props: Record<string, any> = {}
    for (const row of rows) {
      const key = row.section + '_' + row.content_key
      props[key] = row.content_json ?? row.content_value ?? ''
    }
    return { props }
  } catch {
    return { props: {} }
  }
}

type ContentProps = Record<string, any>

const FALLBACKS: ContentProps = {
  hero_demo_date: 'june 5, 2026',
  hero_headline: 'Stress-Free Cooperative Records',
  hero_subheadline: 'Discover how CORA helps Multi-Purpose, Credit, and Agricultural cooperatives across the Philippines manage member records, compute accurate dividends, and prepare for CDA evaluations with zero technical hassle.',
  hero_cta_text: 'Request a Free System Demonstration',
  hero_modal_title: 'Book Your Free Demo Review',
  hero_modal_sub: 'Free Google Meet Demo • june 5, 2026 • Check your email for the link',
  steps_step1: 'Fill out the form — takes less than 60 seconds',
  steps_step2: 'Receive Google Meet link via email within 15 minutes',
  steps_step3: 'Join the june 5, 2026 Google Meet demo',
  trust_badge1: 'CDA-Aligned',
  trust_badge2: 'DPA-Compliant',
  trust_badge3: 'Secure Cloud',
  footer_contact_email: 'edgepoint.solutions.inc@gmail.com',
  footer_contact_phone: '0962 807 3120',
  footer_contact_office: '2/F Edgepoint Building, P. Burgos St., Naga City, Camarines Sur 4400',
  footer_contact_hours: 'Mondays to Fridays, 8:00 AM – 5:00 PM PHT',
  multi_dates: [],
}

function getInitial(prop: any, fallback: any) {
  if (prop !== undefined && prop !== null) return prop
  return fallback
}

export default function AdminPage({ initialContent = {} }: { initialContent: ContentProps }) {
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [dbContent, setDbContent] = useState<ContentProps>({})

  // Reload from database on mount to ensure we have the latest data
  useEffect(() => {
    async function reload() {
      try {
        const res = await fetch('/api/admin/content')
        if (res.ok) {
          const rows = await res.json()
          const props: ContentProps = {}
          for (const row of rows) {
            const key = row.section + '_' + row.content_key
            props[key] = row.content_json ?? row.content_value ?? ''
          }
          setDbContent(props)
        }
      } catch { /* ignore */ }
    }
    reload()
  }, [])

  // Merge DB content with fallbacks — DB content ALWAYS takes priority
  const merged: ContentProps = {}
  for (const key of Object.keys(FALLBACKS)) {
    const dbVal = dbContent[key]
    merged[key] = (dbVal !== undefined && dbVal !== null && dbVal !== '') ? dbVal : FALLBACKS[key]
  }
  if (dbContent.multi_dates) merged.multi_dates = dbContent.multi_dates

  const [fields, setFields] = useState<ContentProps>(merged)
  const [demoDates, setDemoDates] = useState<string[]>(merged.multi_dates || [])
  const [newDate, setNewDate] = useState('')

  // Sync fields when dbContent updates from the API
  useEffect(() => {
    setFields(merged)
    setDemoDates(merged.multi_dates || [])
  }, [dbContent])

  function startEdit(fieldKey: string, currentValue: any) {
    setEditingField(fieldKey)
    setEditValue(typeof currentValue === 'object' ? JSON.stringify(currentValue, null, 2) : currentValue)
  }

  function commitEdit(fieldKey: string) {
    if (!editingField) return
    setFields((prev: ContentProps) => {
      const next = { ...prev }
      try {
        next[fieldKey] = JSON.parse(editValue)
      } catch {
        next[fieldKey] = editValue
      }
      return next
    })
    setEditingField(null)
    setEditValue('')
  }

  function updateField(fieldKey: string, value: any) {
    setFields((prev: ContentProps) => ({ ...prev, [fieldKey]: value }))
  }

  function addDate() {
    const trimmed = newDate.trim()
    if (trimmed && !demoDates.includes(trimmed)) {
      const next = [...demoDates, trimmed]
      setDemoDates(next)
      updateField('multi_dates', next)
      setNewDate('')
    }
  }

  function removeDate(index: number) {
    const next = demoDates.filter((_, i) => i !== index)
    setDemoDates(next)
    updateField('multi_dates', next)
  }

  async function handleSave() {
    setSaving(true)
    setErr('')
    setMsg('')
    try {
      const body: any[] = []
      for (const [key, value] of Object.entries(fields)) {
        const parts = key.split('_')
        const section = parts[0]
        const contentKey = parts.slice(1).join('_')
        if (!section || !contentKey) continue
        body.push({
          section,
          content_key: contentKey,
          content_value: typeof value === 'object' ? null : String(value),
          content_json: typeof value === 'object' ? value : null,
        })
      }
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setMsg('Saved! Live page updated.')
        setTimeout(() => setMsg(''), 3000)
      } else {
        const data = await res.json()
        setErr(data.error || 'Save failed')
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

  async function reloadFromDb() {
    setMsg('Reloading from database...')
    setErr('')
    try {
      const res = await fetch('/api/admin/content')
      if (res.ok) {
        const rows = await res.json()
        const props: ContentProps = {}
        for (const row of rows) {
          const key = row.section + '_' + row.content_key
          props[key] = row.content_json ?? row.content_value ?? ''
        }
        const merged: ContentProps = {}
        for (const key of Object.keys(FALLBACKS)) {
          merged[key] = props[key] !== undefined && props[key] !== null ? props[key] : FALLBACKS[key]
        }
        if (props.multi_dates) merged.multi_dates = props.multi_dates
        setFields(merged)
        setDemoDates(merged.multi_dates || [])
        setMsg('Reloaded from database.')
        setTimeout(() => setMsg(''), 2000)
      } else {
        setErr('Failed to reload')
      }
    } catch {
      setErr('Network error')
    }
  }

  // Inline editable text component — mimics the real page's typography
  function Editable({ fieldKey, value, tag: Tag = 'span', style = {}, placeholder = 'Click to add text', multiline = false }: any) {
    const isEditing = editingField === fieldKey
    if (isEditing) {
      const Input: any = multiline ? 'textarea' : 'input'
      return (
        <Input
          autoFocus
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={() => commitEdit(fieldKey)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitEdit(fieldKey) }
            if (e.key === 'Escape') { setEditingField(null); setEditValue('') }
          }}
          style={{
            width: '100%', padding: 8, border: '2px solid #1B4D3E', borderRadius: 6,
            fontSize: 14, fontFamily: 'inherit', background: '#fff', color: '#1d1d1f',
            boxSizing: 'border-box', resize: 'vertical', minHeight: 40, outline: 'none',
            ...(multiline ? { minHeight: 60, lineHeight: 1.5 } : {}),
            ...style,
          }}
        />
      )
    }
    return (
      <Tag
        onClick={() => startEdit(fieldKey, value)}
        title="Click to edit"
        style={{
          cursor: 'pointer',
          borderBottom: '2px dashed transparent',
          transition: 'border-color 150ms',
          ...style,
        }}
        onMouseEnter={(e: any) => (e.currentTarget.style.borderBottomColor = '#1B4D3E')}
        onMouseLeave={(e: any) => (e.currentTarget.style.borderBottomColor = 'transparent')}
      >
        {value || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>{placeholder}</span>}
      </Tag>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sticky Toolbar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100, background: '#1B4D3E', color: '#fff',
        padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>🖊️ Landing Page Editor — WYSIWYG</h1>
          <p style={{ fontSize: 12, opacity: 0.8, margin: '2px 0 0' }}>Click any text on the page to edit it inline. Press Enter to confirm, Escape to cancel. Then click Save Changes.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {msg && <span style={{ color: '#86efac', fontSize: 13, fontWeight: 500 }}>{msg}</span>}
          {err && <span style={{ color: '#fca5a5', fontSize: 13 }}>{err}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '10px 24px', background: saving ? '#9ca3af' : '#fff', color: saving ? '#fff' : '#1B4D3E',
              border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 16px', background: 'rgba(255,255,255,0.15)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, fontSize: 13, cursor: 'pointer',
            }}
          >
            Logout
          </button>
          <button
            onClick={reloadFromDb}
            style={{
              padding: '10px 16px', background: 'rgba(255,255,255,0.15)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, fontSize: 13, cursor: 'pointer',
            }}
          >
            🔄 Reload
          </button>
        </div>
      </div>

      {/* Multi-Date Manager */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '24px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#1d1d1f' }}>📅 Demo Dates (Automated Workflows)</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>Add multiple dates for automated reminders, scheduling, and date-based workflows.</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            placeholder="e.g., june 12, 2026"
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDate() } }}
          />
          <button onClick={addDate} style={{ padding: '10px 20px', background: '#1B4D3E', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add Date</button>
        </div>
        {demoDates.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {demoDates.map((date, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, fontSize: 13, color: '#166534' }}>
                {date}
                <button onClick={() => removeDate(i)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* WYSIWYG Landing Page — mirrors the real page layout */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px 24px' }}>
        <div style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 8, overflow: 'hidden' }}>

          {/* Nav */}
          <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 0', zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1B4D3E', letterSpacing: '-0.02em' }}>CORA</div>
              <button style={{ padding: '10px 24px', borderRadius: 999, background: '#e60000', color: '#fff', border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                <Editable fieldKey="nav_cta_text" value={fields.nav_cta_text || 'Book Free Demo'} tag="span" style={{ fontSize: 14, fontWeight: 500, color: '#fff' }} />
              </button>
            </div>
          </div>

          {/* Trust Bar */}
          <div style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Editable fieldKey="trust_badge1" value={fields.trust_badge1} tag="span" style={{ fontSize: 12, fontWeight: 600, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
            <Editable fieldKey="trust_badge2" value={fields.trust_badge2} tag="span" style={{ fontSize: 12, fontWeight: 600, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
            <Editable fieldKey="trust_badge3" value={fields.trust_badge3} tag="span" style={{ fontSize: 12, fontWeight: 600, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
          </div>

          {/* Hero */}
          <div style={{ padding: '80px 24px', background: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 60, alignItems: 'center', maxWidth: 1140, margin: '0 auto' }}>
              <div>
                <div style={{
                  display: 'inline-block', padding: '8px 16px', borderRadius: 999,
                  background: 'rgba(27,77,62,0.08)', border: '1.5px solid #1B4D3E',
                  fontSize: 11, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase',
                  letterSpacing: '0.05em', marginBottom: 24,
                }}>
                  MODERN, CDA-COMPLIANT SYSTEM
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, color: '#1d1d1f', margin: '0 0 24px' }}>
                  <Editable fieldKey="hero_headline" value={fields.hero_headline} tag="span" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, color: '#1d1d1f' }} />
                </h1>
                <p style={{ fontSize: 16, color: '#525252', lineHeight: 1.6, margin: '0 0 32px', maxWidth: 600 }}>
                  <Editable fieldKey="hero_subheadline" value={fields.hero_subheadline} tag="span" style={{ fontSize: 16, color: '#525252', lineHeight: 1.6 }} multiline />
                </p>
                <div style={{
                  background: 'rgba(27,77,62,0.04)', borderLeft: '4px solid #1B4D3E',
                  padding: '16px 20px', marginBottom: 32, maxWidth: 540,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    <Editable fieldKey="hero_cta_text" value={fields.hero_cta_text} tag="span" style={{ fontSize: 10, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                  </div>
                  <p style={{ fontSize: 14, color: '#1d1d1f', margin: 0 }}>Built for PH Cooperatives — No credit card required. Receive Google Meet link via email.</p>
                </div>
                <button style={{
                  padding: '18px 42px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2818 100%)', color: '#fff',
                  fontSize: 18, fontWeight: 700, boxShadow: '0 4px 16px rgba(27,77,62,0.25)',
                }}>
                  <Editable fieldKey="hero_cta_text" value={fields.hero_cta_text} tag="span" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }} />
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  background: '#f0f0f0', borderRadius: 16, aspectRatio: '4/3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 14,
                }}>
                  [Hero Image Placeholder]
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ padding: '80px 24px', background: '#fff' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', margin: '0 0 40px', color: '#1d1d1f' }}>
              What Happens Next
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', maxWidth: 1140, margin: '0 auto' }}>
              {[fields.steps_step1, fields.steps_step2, fields.steps_step3].map((step: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#1d1d1f', maxWidth: 250 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%', background: '#1B4D3E', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0,
                  }}>{i + 1}</span>
                  <Editable fieldKey={'steps_step' + (i + 1)} value={step} tag="span" style={{ fontSize: 15, color: '#1d1d1f' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Trust Bar (alt) */}
          <div style={{ padding: '60px 24px', background: '#f8f9fa' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', margin: '0 0 40px', color: '#1d1d1f' }}>
              Trust Bar Badges
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
              {[fields.trust_badge1, fields.trust_badge2, fields.trust_badge3].map((badge: any, i: number) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#1B4D3E', marginBottom: 4 }}>
                    <Editable fieldKey={'trust_badge' + (i + 1)} value={badge} tag="span" style={{ fontSize: 32, fontWeight: 700, color: '#1B4D3E' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '56px 24px', background: '#1B4D3E', color: '#fff' }}>
            <div style={{ textAlign: 'center', maxWidth: 1140, margin: '0 auto' }}>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
                <Editable fieldKey="footer_contact_email" value={fields.footer_contact_email} tag="span" style={{ fontSize: 24, fontWeight: 700 }} />
              </div>
              <p style={{ fontSize: 14, color: '#e5e5e5', marginBottom: 4 }}>
                <Editable fieldKey="footer_contact_phone" value={fields.footer_contact_phone} tag="span" style={{ fontSize: 14, color: '#e5e5e5' }} />
              </p>
              <p style={{ fontSize: 13, color: '#e5e5e5', marginBottom: 4 }}>
                <Editable fieldKey="footer_contact_office" value={fields.footer_contact_office} tag="span" style={{ fontSize: 13, color: '#e5e5e5' }} />
              </p>
              <p style={{ fontSize: 13, color: '#e5e5e5' }}>
                <Editable fieldKey="footer_contact_hours" value={fields.footer_contact_hours} tag="span" style={{ fontSize: 13, color: '#e5e5e5' }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
