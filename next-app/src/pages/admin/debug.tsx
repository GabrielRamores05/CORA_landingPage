import { useState } from 'react'
import { getIronSession } from 'iron-session'
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, SessionData } from '../../lib/auth'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = (await getIronSession<SessionData>(context.req as NextApiRequest, context.res as NextApiResponse, sessionOptions))
  if (!session?.isLoggedIn) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }
  return { props: {} }
}

export default function DebugPage() {
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')
  const [val3, setVal3] = useState('')

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Minimal Input Test</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>If you can type here but not in the editor, the problem is in the editor component. If you can't type here either, the problem is global (CSS, middleware, extension).</p>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#374151' }}>Input 1 (useState)</label>
        <input
          type="text"
          value={val1}
          onChange={(e) => setVal1(e.target.value)}
          placeholder="Type here..."
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #d1d5db',
            borderRadius: 8,
            fontSize: 16,
            boxSizing: 'border-box',
            background: '#fff',
            color: '#1d1d1f',
          }}
        />
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Value: {val1 || '(empty)'}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#374151' }}>Input 2 (uncontrolled)</label>
        <input
          type="text"
          defaultValue=""
          placeholder="Type here..."
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #d1d5db',
            borderRadius: 8,
            fontSize: 16,
            boxSizing: 'border-box',
            background: '#fff',
            color: '#1d1d1f',
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#374151' }}>Textarea</label>
        <textarea
          value={val3}
          onChange={(e) => setVal3(e.target.value)}
          rows={3}
          placeholder="Type here..."
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #d1d5db',
            borderRadius: 8,
            fontSize: 16,
            boxSizing: 'border-box',
            background: '#fff',
            color: '#1d1d1f',
            resize: 'vertical',
          }}
        />
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Value: {val3 || '(empty)'}</p>
      </div>

      <div style={{ padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
        <p style={{ fontWeight: 600, color: '#166534', margin: '0 0 8px' }}>Diagnosis</p>
        <p style={{ fontSize: 14, color: '#166534', margin: 0 }}>
          {val1 || val3
            ? '✅ Typing WORKS here. The problem is in the editor component code.'
            : '❌ Typing does NOT work here either. The problem is global (CSS, middleware, extension, or browser setting).'}
        </p>
      </div>
    </div>
  )
}
