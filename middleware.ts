import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/', '/index'],
}

// 1. Store your credentials in a Map for easy lookup
// (Key: username, Value: password)
const validCredentials = new Map([
  ['Density006', 'dense'],
  ['Jimmy', 'germanleader'],
  ['Ethan', 'ethan'],
  // Add as many users as you like here
])

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    
    // Use Buffer.from() for Base64 decoding, as atob() is deprecated in Node.js
    const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':')

    // 2. Check if the provided user exists in the Map and if the password matches
    if (validCredentials.get(user) === pwd) {
      // If credentials are valid, redirect to the target URL
      return NextResponse.redirect('https://sites.google.com/studio.digital/multitool/Hw2')
    }
  }

  // If auth is missing or invalid, rewrite to the auth API route
  url.pathname = '/api/auth'
  return NextResponse.rewrite(url)
}
