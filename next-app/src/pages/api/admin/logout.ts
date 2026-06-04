import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession } from '../../../lib/auth'

async function handler(req: NextApiRequest, res: NextApiResponse, session: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  session.destroy()
  res.redirect('/admin/login')
}

export default withSession(handler)
