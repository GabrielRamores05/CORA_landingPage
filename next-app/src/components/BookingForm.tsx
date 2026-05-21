import React, { useState, useRef } from 'react'
import styles from './BookingForm.module.css'

type Props = { onSuccess?: () => void }
type CustomWindow = typeof window & { 
  grecaptcha?: any
  emailjs?: any
}

export default function BookingForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [subscribe, setSubscribe] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  function triggerConfetti(): void {
    const win = typeof window !== 'undefined' ? (window as CustomWindow & { confetti?: any }) : null
    if (win?.confetti) {
      try {
        win.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          duration: 3000,
        })
      } catch (err) {
        console.error('Confetti error:', err)
      }
    }
  }

  function getRecaptchaToken(): Promise<string | null> {
    return new Promise((resolve) => {
      // Skip reCAPTCHA in development (localhost)
      const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      if (isDev) {
        console.log('Development mode: reCAPTCHA skipped')
        resolve('dev-token-' + Date.now())
        return
      }

      const win = typeof window !== 'undefined' ? (window as CustomWindow) : null
      if (!win?.grecaptcha) {
        // Wait for grecaptcha to load
        let attempts = 0
        const checkInterval = setInterval(() => {
          attempts++
          if ((window as CustomWindow).grecaptcha) {
            clearInterval(checkInterval)
            executeRecaptcha(resolve)
          } else if (attempts > 50) {
            // Timeout after 5 seconds
            clearInterval(checkInterval)
            console.error('reCAPTCHA script failed to load')
            resolve(null)
          }
        }, 100)
        return
      }
      executeRecaptcha(resolve)
    })
  }

  function executeRecaptcha(resolve: (token: string | null) => void): void {
    try {
      const win = window as CustomWindow
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfHDvYsAAAAAMkthB95TDFTan-ZUi9Jq7ltJdeI'
      
      if (win.grecaptcha && win.grecaptcha.ready) {
        win.grecaptcha.ready(() => {
          win.grecaptcha.execute(siteKey, { action: 'submit' })
            .then((token: string) => {
              console.log('reCAPTCHA token received')
              resolve(token)
            })
            .catch((err: any) => {
              console.error('reCAPTCHA execute error:', err)
              resolve(null)
            })
        })
      } else {
        resolve(null)
      }
    } catch (err) {
      console.error('reCAPTCHA execute exception:', err)
      resolve(null)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    setMessage(null)
    setSuccess(null)

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken()
      if (!recaptchaToken) {
        setMessage('reCAPTCHA verification failed. Please try again.')
        setSuccess(false)
        setLoading(false)
        return
      }

      // Get email from form for rate limiting check
      const emailInput = form.querySelector('input[name="from_email"]') as HTMLInputElement
      const email = emailInput?.value || ''

      if (!email) {
        setMessage('Email is required.')
        setSuccess(false)
        setLoading(false)
        return
      }

      // Verify token with backend (includes rate limit check)
      const verifyResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken, email }),
      })

      const verifyData = await verifyResponse.json()
      console.log('Verification response:', verifyData, 'Status:', verifyResponse.status)
      if (!verifyData.success) {
        setMessage(verifyData.message || 'Verification failed. Please try again.')
        setSuccess(false)
        setLoading(false)
        return
      }

      // Proceed with form submission
      const formData = new FormData(form)
      const templateParams: Record<string, any> = {}
      formData.forEach((v, k) => (templateParams[k] = v))
      templateParams.subscribed = subscribe
        ? 'User has subscribed to receive newsletters and updates.'
        : 'User did not subscribe to receive newsletters.'

      const serviceId = 'service_aay4edu'
      const templateId = 'template_os99snq'
      const userId = 'wU74bNn0Kht8Sa4J4'
      if (typeof window !== 'undefined' && (window as CustomWindow).emailjs) {
        const emailjs = (window as CustomWindow).emailjs
        if (emailjs.init && userId) emailjs.init(userId)
        await emailjs.send(serviceId, templateId, templateParams)
        setMessage('Congratulations! You are now registered for our May 22 demo. We\'ll send you the Google Meet link right away.')
        setSuccess(true)
        form.reset()
        setSubscribe(false)
        
        // Trigger confetti animation
        triggerConfetti()
        
        if (onSuccess) onSuccess()
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
    // blur active element to dismiss virtual keyboards on mobile
    try {
      (document.activeElement as HTMLElement | null)?.blur()
    } catch {
      /* ignore */
    }
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
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
          <input id="from_email" name="from_email" className={styles.input} placeholder="Email" type="email" required aria-required="true" />
        </label>

        <label htmlFor="coop" className={styles.label}>Cooperative name
          <input id="coop" name="coop" className={styles.input} placeholder="Cooperative name" />
        </label>
      </div>

      <div className={styles.row}>
        <label htmlFor="phone" className={styles.label}>Phone
          <input id="phone" name="phone" className={styles.input} placeholder="Phone (11 digits)" />
        </label>

        <label htmlFor="facebook" className={styles.label}>Facebook
          <input id="facebook" name="facebook" className={styles.input} placeholder="Facebook page or contact" />
        </label>
      </div>

      <input type="hidden" name="schedule" value="May 22, 3:00pm-4:00pm" />

      <div>
        <label htmlFor="message" className={styles.label}>Message
          <textarea id="message" name="message" className={styles.textarea} placeholder="Tell us your challenge or message" />
        </label>
      </div>

      <label className={styles.checkboxRow} htmlFor="subscribed">
        <input id="subscribed" name="subscribed" type="checkbox" checked={subscribe} onChange={() => setSubscribe(!subscribe)} />
        I agree to receive updates and event announcements from CORA.
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={handleCancel}>Cancel</button>
        <button type="submit" disabled={loading} className={styles.btn}>{loading ? 'Sending...' : 'Register'}</button>
      </div>

      {message && (
        <p role="status" aria-live="polite" className={success ? styles.success : styles.error}>
          {message}
        </p>
      )}
    </form>
  )
}
