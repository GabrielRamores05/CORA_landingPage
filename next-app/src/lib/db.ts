import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

export async function query(text: string, params?: any[]) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('Executed query', { text, duration, rows: res.rowCount })
  return res
}

export async function getAllContent() {
  const result = await query('SELECT section, content_key, content_value, content_json FROM site_content')
  return result.rows
}

export async function getContentBySection(section: string) {
  const result = await query(
    'SELECT content_key, content_value, content_json FROM site_content WHERE section = $1',
    [section]
  )
  return result.rows
}

export async function upsertContent(section: string, contentKey: string, contentValue?: string, contentJson?: any) {
  await query(
    `INSERT INTO site_content (section, content_key, content_value, content_json, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (section, content_key) 
     DO UPDATE SET content_value = $3, content_json = $4, updated_at = NOW()`,
    [section, contentKey, contentValue, contentJson ? JSON.stringify(contentJson) : null]
  )
}
