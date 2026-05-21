import fs from 'fs'
import path from 'path'

// Simple in-memory store with file persistence for rate limiting
const SUBMISSIONS_FILE = path.join(process.cwd(), '.submissions.json')
const RATE_LIMIT_HOURS = 24

interface Submission {
  email: string
  timestamp: number
}

interface SubmissionLog {
  submissions: Submission[]
}

// Load submissions from file
function loadSubmissions(): SubmissionLog {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading submissions:', error)
  }
  return { submissions: [] }
}

// Save submissions to file
function saveSubmissions(log: SubmissionLog): void {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(log, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving submissions:', error)
  }
}

// Check if email has submitted recently
export function checkRateLimit(email: string): { allowed: boolean; waitHours?: number } {
  const log = loadSubmissions()
  const now = Date.now()
  const rateLimitMs = RATE_LIMIT_HOURS * 60 * 60 * 1000

  // Find the last submission from this email
  const lastSubmission = log.submissions
    .filter((s) => s.email.toLowerCase() === email.toLowerCase())
    .sort((a, b) => b.timestamp - a.timestamp)[0]

  if (!lastSubmission) {
    return { allowed: true }
  }

  const timeSinceSubmission = now - lastSubmission.timestamp
  if (timeSinceSubmission < rateLimitMs) {
    const waitMs = rateLimitMs - timeSinceSubmission
    const waitHours = Math.ceil(waitMs / (60 * 60 * 1000))
    return { allowed: false, waitHours }
  }

  return { allowed: true }
}

// Record a new submission
export function recordSubmission(email: string): void {
  const log = loadSubmissions()
  log.submissions.push({
    email: email.toLowerCase(),
    timestamp: Date.now(),
  })

  // Keep only last 1000 submissions to prevent file from growing too large
  if (log.submissions.length > 1000) {
    log.submissions = log.submissions.slice(-1000)
  }

  saveSubmissions(log)
}

// Clean up old submissions (optional, run periodically)
export function cleanupOldSubmissions(): void {
  const log = loadSubmissions()
  const now = Date.now()
  const rateLimitMs = RATE_LIMIT_HOURS * 60 * 60 * 1000

  log.submissions = log.submissions.filter((s) => now - s.timestamp < rateLimitMs * 2)

  saveSubmissions(log)
}
