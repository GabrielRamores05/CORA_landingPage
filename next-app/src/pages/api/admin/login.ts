import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession, SessionData } from '../../../lib/auth'

async function handler(req: NextApiRequest, res: NextApiResponse, session: SessionData) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { password } = req.body
    const adminPassword = process.env.ADMIN_PASSWORD

    console.log('Login attempt:', { passwordReceived: !!password, adminPasswordSet: !!adminPassword, passwordsMatch: password === adminPassword })

    if (!adminPassword || password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    session.isLoggedIn = true
    await session.save()
    console.log('Session saved successfully')
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Server error: ' + (err instanceof Error ? err.message : 'Unknown') })
  }
}

export default withSession(handler)
