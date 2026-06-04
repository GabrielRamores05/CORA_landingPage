import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession } from '../../../lib/auth'
import { getAllContent } from '../../../lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const rows = await getAllContent()
    return res.status(200).json(rows)
  } catch (err) {
    console.error('Error fetching content:', err)
    return res.status(500).json({ error: 'Database error' })
  }
}

export default withSession(handler)
