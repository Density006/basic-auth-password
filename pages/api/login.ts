import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions, SessionData } from '@/lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'

// ---
// These are the same credentials and URLs from your original middleware.ts
// ---
const DEFAULT_REDIRECT_URL = '/protected' // We'll create this page next
const DENSITY_REDIRECT_URL = 'https://sites.google.com/studio.digital/multitool/Admin'
const ETHAN_REDIRECT_URL = 'https://ethans-page.com'
const ADMIN_REDIRECT_URL = 'https://vercel.com/density006'
const DISALLOWED_REDIRECT_URL = 'https://sites.google.com/studio.digital/hmmm/home'

const validCredentials = new Map([
  ['Density006', { pwd: 'dense', redirect: DENSITY_REDIRECT_URL }],
  ['Ethan', { pwd: 'ethan', redirect: ETHAN_REDIRECT_URL }],
  ['Jimmy', { pwd: 'germanleader' }], // Will go to default
  ['4dmin', { pwd: 'NATE', redirect: ADMIN_REDIRECT_URL }],
  ['Duke', { pwd: 'danby', redirect: DISALLOWED_REDIRECT_URL }],
])
// ---

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' })
  }

  const credentials = validCredentials.get(username)

  // Check if user exists and password is correct
  if (credentials && credentials.pwd === password) {
    // 1. Get the user's special redirect URL or use the default
    const redirectUrl = credentials.redirect || DEFAULT_REDIRECT_URL

    // 2. Create the session data
    const sessionData: SessionData = {
      user: username,
      redirectUrl: redirectUrl,
      isLoggedIn: true,
    }
    
    // 3. Save session data to the encrypted cookie
    req.session.user = sessionData
    await req.session.save()

    // 4. Send back the redirect URL for the client to use
    return res.status(200).json({ redirectUrl: redirectUrl })
  }

  // If login is invalid
  return res.status(401).json({ message: 'Invalid username or password' })
}
