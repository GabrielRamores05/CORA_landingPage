import React, { useState, useRef, useEffect } from 'react'
import styles from './BookingForm.module.css'

type Props = { onSuccess?: () => void; demoDate?: string }
type FormElements = HTMLInputElement | HTMLSelectElement

const COOP_TYPES = [
  'Credit',
  'Consumer',
  'Producer',
  'Marketing',
  'Service',
  'Multipurpose',
  'Agrarian Reform',
  'Bank',
  'Dairy',
  'Electric',
  'Fishermen',
  'Housing',
  'Transport',
  'Water Service',
]

const ROLES = [
  'Board Chairman',
  'General Manager',
  'Accountant/Treasurer',
  'Other Officer',
]

export default function BookingForm({ onSuccess, demoDate }: Props & { demoDate?: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [subscribe, setSubscribe] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
    utmFields.forEach(field => {
      const value = urlParams.get(field) || ''
      const input = formRef.current?.querySelector(`input[name="${field}"]`) as HTMLInputElement
      if (input) input.value = value
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    setMessage(null)
    setSuccess(null)

    const requiredFields = [
      'first_name',
      'last_name',
      'from_email',
      'coop',
      'coop_type',
      'role',
      'mobile',
    ]

    for (const fieldName of requiredFields) {
      const field = form.querySelector(`[name="${fieldName}"]`) as FormElements | null
      if (!field || !field.value.trim()) {
        setMessage('Please fill in all required fields before submitting.')
        setSuccess(false)
        setLoading(false)
        return
      }
    }

    try {
      const formData = new FormData(form)
      const templateParams: Record<string, any> = {}
      formData.forEach((v, k) => (templateParams[k] = v))
      templateParams.subscribed = subscribe ? 'Yes' : 'No'

      const serviceId = 'service_aay4edu'
      const templateId = 'template_os99snq'
      const userId = 'wU74bNn0Kht8Sa4J4'

      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const emailjs = (window as any).emailjs
        if (emailjs.init && userId) emailjs.init(userId)
        await emailjs.send(serviceId, templateId, templateParams)
        setMessage('Registration successful! Check your email for the Google Meet link.')
        setSuccess(true)
        if ((window as any).coraTrackLead) {
          (window as any).coraTrackLead()
        }

        if (onSuccess) {
          setTimeout(() => onSuccess(), 2200)
        }
      } else {
        setMessage('Email service not initialized. Please check EmailJS setup.')
        setSuccess(false)
      }
    } catch (err: any) {
      console.error(err)
      setMessage('Something went wrong. Please try again later.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    formRef.current?.reset()
    setSubscribe(false)
    setMessage(null)
    setSuccess(null)
    try {
      (document.activeElement as HTMLElement | null)?.blur()
    } catch {
      /* ignore */
    }
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="first_name" className={styles.label}>First name
          <input id="first_name" name="first_name" className={styles.input} placeholder="First name" required aria-required="true" />
        </label>

        <label htmlFor="last_name" className={styles.label}>Last name
          <input id="last_name" name="last_name" className={styles.input} placeholder="Last name" required aria-required="true" />
        </label>
      </div>

      <div className={styles.row}>
        <label htmlFor="from_email" className={styles.label}>Email
          <input id="from_email" name="from_email" className={styles.input} placeholder="Email (gmail, yahoo accepted)" type="email" required aria-required="true" />
        </label>

        <label htmlFor="coop" className={styles.label}>Cooperative name
          <input id="coop" name="coop" className={styles.input} placeholder="Cooperative name" required aria-required="true" />
        </label>
      </div>

      <div className={styles.row}>
        <label htmlFor="coop_type" className={styles.label}>Cooperative type
          <select id="coop_type" name="coop_type" className={styles.select} required aria-required="true">
            <option value="">Select type</option>
            {COOP_TYPES.map(type => (
              <option key={type} value={type}>{type} Cooperative</option>
            ))}
          </select>
        </label>

        <label htmlFor="role" className={styles.label}>Your role
          <select id="role" name="role" className={styles.select} required aria-required="true">
            <option value="">Select role</option>
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.row}>
        <label htmlFor="mobile" className={styles.label}>Mobile
          <input id="mobile" name="mobile" className={styles.input} placeholder="09xx xxx xxxx" required aria-required="true" />
        </label>

        <label htmlFor="schedule" className={styles.label}>Demo Date
          <input id="schedule" name="schedule" className={styles.input} value={demoDate || 'june 5, 2026'} readOnly aria-readonly="true" placeholder={demoDate || 'june 5, 2026'} />
        </label>
      </div>

      <div>
        <label htmlFor="facebook" className={styles.label}>Facebook (optional)
          <input id="facebook" name="facebook" className={styles.input} placeholder="Facebook page (optional)" />
        </label>
      </div>

      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />

      <label className={styles.checkboxRow} htmlFor="subscribed">
        <input id="subscribed" name="subscribed" type="checkbox" checked={subscribe} onChange={() => setSubscribe(!subscribe)} />
        I agree to receive updates and event announcements from CORA.
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={handleCancel}>Cancel</button>
        <button type="submit" disabled={loading} className={styles.btn}>{loading ? 'Registering...' : 'Book My Free Demo Review'}</button>
      </div>

      {message && (
        <p role="status" aria-live="polite" className={success ? styles.success : styles.error}>
          {message}
        </p>
      )}
    </form>
  )
}