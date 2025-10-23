import { useState } from 'react'
import { useRouter } from 'next/router'
import { Page, Text, Input, Button, Spacer } from '@vercel/examples-ui'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.status === 200) {
        // Redirect to the URL sent by the API
        router.push(data.redirectUrl)
      } else {
        setError(data.message || 'Login failed.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Page>
      <Text variant="h2" className="mb-6">
        Login
      </Text>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <Text variant="h4">Username</Text>
        <Input name="username" placeholder="Density006" required />
        <Spacer y={0.5} />
        <Text variant="h4">Password</Text>
        <Input name="password" type="password" placeholder="dense" required />
        <Spacer y={1} />
        <Button type="submit" width="100%">
          Login
        </Button>
      </form>
      {error && (
        <>
          <Spacer y={0.5} />
          <Text className="text-red-500">{error}</Text>
        </>
      )}
    </Page>
  )
}
