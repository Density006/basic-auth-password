import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { sessionOptions } from './lib/session' // Import our session config

export const config = {
  // The middleware will run on these paths
  // We want to protect the root, but not the login page or API routes
  matcher: ['/', '/index', '/protected'],
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, sessionOptions)

  const { user } = session
  const url = req.nextUrl

  // ---
  // Main Logic
  // ---

  // 1. If the user is logged IN
  if (user && user.isLoggedIn) {
    // If they are trying to access the root, redirect them to their special page
    if (url.pathname === '/' || url.pathname === '/index') {
      return NextResponse.redirect(new URL(user.redirectUrl, req.url))
    }

    // Otherwise, let them access the page (e.g., /protected)
    return res
  }

  // 2. If the user is logged OUT
  // Redirect them to the /login page
  return NextResponse.redirect(new URL('/login', req.url))
}
