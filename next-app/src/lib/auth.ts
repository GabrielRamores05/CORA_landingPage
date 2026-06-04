import { IronSession, getIronSession } from 'iron-session'

export interface SessionData {
  isLoggedIn: boolean
}

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: 'cora_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
}

export function withSession(handler: any) {
  return async (req: any, res: any) => {
    const session = (await getIronSession(req, res, sessionOptions)) as IronSession<SessionData> & SessionData
    return handler(req, res, session)
  }
}
