import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit, recordSubmission } from '../../lib/rateLimit'

type Response = {
  success: boolean
  message?: string
  score?: number
  waitHours?: number
  debug?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { token, email } = req.body

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is required' })
  }

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' })
  }

  try {
    // Skip reCAPTCHA verification in development
    if (token.startsWith('dev-token-')) {
      console.log('Development mode: reCAPTCHA verification skipped')
      
      // Still check rate limit
      const rateLimitCheck = checkRateLimit(email)
      if (!rateLimitCheck.allowed) {
        return res.status(429).json({
          success: false,
          message: `You have already submitted. Please try again in ${rateLimitCheck.waitHours} hour(s).`,
          waitHours: rateLimitCheck.waitHours,
        })
      }

      recordSubmission(email)
      return res.status(200).json({
        success: true,
        message: 'Verification successful (dev mode)',
      })
    }

    // Check rate limit first (before reCAPTCHA verification)
    const rateLimitCheck = checkRateLimit(email)
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: `You have already submitted. Please try again in ${rateLimitCheck.waitHours} hour(s).`,
        waitHours: rateLimitCheck.waitHours,
      })
    }

    // Verify reCAPTCHA token
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LfHDvYsAAAAAMd-afaCejcKuEyv2KkVieK5HLqt'

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const formData = new URLSearchParams()
    formData.append('secret', secretKey)
    formData.append('response', token)

    const response = await fetch(verifyUrl, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    console.log('reCAPTCHA response:', data)

    // reCAPTCHA v2 Invisible returns success: true/false
    if (data.success) {
      // Record the submission for rate limiting
      recordSubmission(email)
      
      return res.status(200).json({
        success: true,
        message: 'Verification successful',
      })
    } else {
      console.error('reCAPTCHA verification failed:', data)
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.',
        debug: `reCAPTCHA error codes: ${data['error-codes']?.join(', ') || 'unknown'}`,
      })
    }
  } catch (error) {
    console.error('reCAPTCHA API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      debug: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
