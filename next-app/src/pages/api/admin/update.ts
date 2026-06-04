import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession, SessionData } from '../../../lib/auth'
import { upsertContent } from '../../../lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse, session: SessionData) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!session?.isLoggedIn) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const updates = req.body

  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'Invalid request body' })
  }

  try {
    for (const item of updates) {
      const { section, content_key, content_value, content_json } = item

      if (!section || !content_key) {
        continue
      }

      await upsertContent(
        section,
        content_key,
        content_value || undefined,
        content_json || undefined
      )
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Error updating content:', err)
    return res.status(500).json({ error: 'Database error' })
  }
}

export default withSession(handler)
