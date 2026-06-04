import { useState, createElement } from 'react'
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
  if (prop !== undefined && prop !== null && prop !== '') return prop
  return fallback
}

export default function AdminPage({ initialContent = {} }: { initialContent: ContentProps }) {
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const data: ContentProps = {}
  for (const key of Object.keys(FALLBACKS)) {
    data[key] = getInitial(initialContent[key], FALLBACKS[key])
  }
  if (initialContent.multi_dates) data.multi_dates = initialContent.multi_dates

  const [fields, setFields] = useState<ContentProps>(data)
  const [demoDates, setDemoDates] = useState<string[]>(data.multi_dates || [])
  const [newDate, setNewDate] = useState('')

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
      setDemoDates([...demoDates, trimmed])
      updateField('multi_dates', [...demoDates, trimmed])
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
        const [section, contentKey] = key.split('_', 2)
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

  function EditableText({ fieldKey, value, tag: Tag = 'span', style = {} }: { fieldKey: string; value: any; tag?: string; style?: React.CSSProperties }) {
    const isEditing = editingField === fieldKey
    if (isEditing) {
      return (
        <textarea
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
            ...style,
          }}
        />
      )
    }
    return createElement(Tag, {
      onClick: () => startEdit(fieldKey, value),
      title: 'Click to edit',
      style: {
        cursor: 'pointer',
        borderBottom: '2px dashed transparent',
        transition: 'border-color 150ms',
        ...style,
      },
      onMouseEnter: (e: any) => (e.currentTarget.style.borderBottomColor = '#1B4D3E'),
      onMouseLeave: (e: any) => (e.currentTarget.style.borderBottomColor = 'transparent'),
    }, value || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Click to add text</span>)
  }

  function EditableInput({ fieldKey, value, placeholder = '' }: { fieldKey: string; value: any; placeholder?: string }) {
    const isEditing = editingField === fieldKey
    if (isEditing) {
      return (
        <input
          autoFocus
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={() => commitEdit(fieldKey)}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); commitEdit(fieldKey) }
            if (e.key === 'Escape') { setEditingField(null); setEditValue('') }
          }}
          style={{
            width: '100%', padding: 8, border: '2px solid #1B4D3E', borderRadius: 6,
            fontSize: 14, fontFamily: 'inherit', background: '#fff', color: '#1d1d1f',
            boxSizing: 'border-box', outline: 'none',
          }}
        />
      )
    }
    return (
      <input
        readOnly
        value={value || ''}
        placeholder={placeholder}
        onClick={() => startEdit(fieldKey, value)}
        style={{
          cursor: 'pointer',
          border: '2px dashed transparent',
          borderRadius: 6,
          padding: 8,
          fontSize: 14,
          fontFamily: 'inherit',
          background: 'transparent',
          color: value ? 'inherit' : '#9ca3af',
          fontStyle: value ? 'normal' : 'italic',
          boxSizing: 'border-box',
          width: '100%',
          transition: 'border-color 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#1B4D3E')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
      />
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
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>🖊️ Landing Page Editor</h1>
          <p style={{ fontSize: 12, opacity: 0.8, margin: '2px 0 0' }}>Click any text on the page to edit it. Changes save to the database.</p>
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
        </div>
      </div>

      {/* WYSIWYG Page Preview */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '24px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

        {/* Trust Bar */}
        <div style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <EditableText fieldKey="trust_badge1" value={fields.trust_badge1} tag="span" style={{ fontSize: 12, fontWeight: 600, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
          <EditableText fieldKey="trust_badge2" value={fields.trust_badge2} tag="span" style={{ fontSize: 12, fontWeight: 600, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
          <EditableText fieldKey="trust_badge3" value={fields.trust_badge3} tag="span" style={{ fontSize: 12, fontWeight: 600, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
        </div>

        {/* Hero */}
        <div style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block', padding: '8px 16px', borderRadius: 999,
                background: 'rgba(27,77,62,0.08)', border: '1.5px solid #1B4D3E',
                fontSize: 11, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase',
                letterSpacing: '0.05em', marginBottom: 24,
              }}>
                MODERN, CDA-COMPLIANT SYSTEM
              </div>
              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1,
                color: '#1d1d1f', margin: '0 0 24px',
              }}>
                <EditableText fieldKey="hero_headline" value={fields.hero_headline} tag="span" />
              </h1>
              <p style={{ fontSize: 16, color: '#525252', lineHeight: 1.6, margin: '0 0 32px', maxWidth: 600 }}>
                <EditableText fieldKey="hero_subheadline" value={fields.hero_subheadline} tag="span" />
              </p>
              <div style={{
                background: 'rgba(27,77,62,0.04)', borderLeft: '4px solid #1B4D3E',
                padding: '16px 20px', marginBottom: 32, maxWidth: 540,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  <EditableText fieldKey="hero_cta_text" value={fields.hero_cta_text} tag="span" style={{ fontSize: 10, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                </div>
                <p style={{ fontSize: 14, color: '#1d1d1f', margin: 0 }}>
                  Built for PH Cooperatives — No credit card required. Receive Google Meet link via email.
                </p>
              </div>
              <button style={{
                padding: '18px 42px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2818 100%)', color: '#fff',
                fontSize: 18, fontWeight: 700, boxShadow: '0 4px 16px rgba(27,77,62,0.25)',
              }}>
                <EditableText fieldKey="hero_cta_text" value={fields.hero_cta_text} tag="span" style={{ fontSize: 18, fontWeight: 700 }} />
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
        <div style={{ padding: '80px 0', background: '#fff' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', margin: '0 0 40px', color: '#1d1d1f' }}>
            What Happens Next
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[fields.steps_step1, fields.steps_step2, fields.steps_step3].map((step: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#1d1d1f', maxWidth: 250 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%', background: '#1B4D3E', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0,
                }}>{i + 1}</span>
                <EditableText fieldKey={'steps_step' + (i + 1)} value={step} tag="span" />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Bar (alt) */}
        <div style={{ padding: '60px 0', background: '#f8f9fa' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', margin: '0 0 40px', color: '#1d1d1f' }}>
            Trust Bar Badges
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[fields.trust_badge1, fields.trust_badge2, fields.trust_badge3].map((badge: any, i: number) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1B4D3E', marginBottom: 4 }}>
                  <EditableText fieldKey={'trust_badge' + (i + 1)} value={badge} tag="span" style={{ fontSize: 32, fontWeight: 700, color: '#1B4D3E' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '56px 0', background: '#1B4D3E', color: '#fff' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              <EditableText fieldKey="footer_contact_email" value={fields.footer_contact_email} tag="span" style={{ fontSize: 24, fontWeight: 700 }} />
            </div>
            <p style={{ fontSize: 14, color: '#e5e5e5', marginBottom: 4 }}>
              <EditableText fieldKey="footer_contact_phone" value={fields.footer_contact_phone} tag="span" style={{ fontSize: 14, color: '#e5e5e5' }} />
            </p>
            <p style={{ fontSize: 13, color: '#e5e5e5', marginBottom: 4 }}>
              <EditableText fieldKey="footer_contact_office" value={fields.footer_contact_office} tag="span" style={{ fontSize: 13, color: '#e5e5e5' }} />
            </p>
            <p style={{ fontSize: 13, color: '#e5e5e5' }}>
              <EditableText fieldKey="footer_contact_hours" value={fields.footer_contact_hours} tag="span" style={{ fontSize: 13, color: '#e5e5e5' }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
