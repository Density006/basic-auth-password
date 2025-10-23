import type { IronSessionOptions } from 'iron-session'

// Define the shape of your session data
export interface SessionData {
  user: string
  redirectUrl: string
  isLoggedIn: boolean
}

export const sessionOptions: IronSessionOptions = {
  // This password must be at least 32 characters long
  // IMPORTANT: Change this to your own secret password
  // You should set this as an environment variable in Vercel
  password: process.env.SECRET_COOKIE_PASSWORD || 'e#9%^3CG6gqAG2t&68eW9VPqyf8yoLNfXSVz',
  cookieName: 'my-app-session-cookie',
  cookieOptions: {
    // secure: true should be used in production (HTTPS)
    secure: process.env.NODE_ENV === 'production',
  },
}

// This is where we specify the typings for the session object
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionData
  }
}
