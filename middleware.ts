import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/', '/index'],
}

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'Density006' && pwd === 'dense') {
      return NextResponse.redirect('https://sites.google.com/studio.digital/multitool/hw')
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
