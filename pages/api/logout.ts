import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session' // <-- This line is fixed
import type { NextApiRequest, NextApiResponse } from 'next'

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  // Destroy the session
  req.session.destroy()
  
  // Redirect the user to the login page
  res.setHeader('location', '/login')
  res.status(302).end()
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
