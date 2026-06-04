import { useState } from 'react'
import { getIronSession } from 'iron-session'
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, SessionData } from '../../lib/auth'

interface LoginPageProps {
  error: string | null
}

function LoginPage({ error: serverError }: LoginPageProps) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(serverError || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = '/admin'
      } else {
        setError(data.error || 'Login failed')
        setLoading(false)
        setPassword('')
      }
    } catch (err) {
      setError('Network error')
      setLoading(false)
      setPassword('')
    }
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: '100px auto',
      padding: 32,
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Admin Login</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        CORA Landing Page Editor
      </p>

      {error && (
        <p style={{
          color: '#dc2626',
          background: '#fef2f2',
          padding: 12,
          borderRadius: 6,
          marginBottom: 16,
          fontSize: 14
        }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="password"
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 6
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px 16px',
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = (await getIronSession<SessionData>(context.req as NextApiRequest, context.res as NextApiResponse, sessionOptions))

  if (session?.isLoggedIn) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      error: (context.query.error as string) || null,
    },
  }
}

export default LoginPage
