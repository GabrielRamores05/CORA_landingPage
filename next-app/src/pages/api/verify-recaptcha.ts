import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit, recordSubmission } from '../../lib/rateLimit'

type Response = {
  success: boolean
  message?: string
  score?: number
  waitHours?: number
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
    const secretKey = '6LfHDvYsAAAAAMd-afaCejcKuEyv2KkVieK5HLqt'

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

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
        message: 'reCAPTCHA verification failed',
      })
    }
  } catch (error) {
    console.error('reCAPTCHA API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
