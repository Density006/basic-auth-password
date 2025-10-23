import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  // By adding a unique timestamp, the "realm" is different on every request.
  // This forces the browser to re-prompt for login.
  const uniqueRealm = `Secure Area - ${Date.now()}`
  
  res.setHeader('WWW-authenticate', `Basic realm="${uniqueRealm}"`)
  res.statusCode = 401
  res.end(`Auth Required.`)
}
