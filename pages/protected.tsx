import { Page, Text, Button, Spacer } from '@vercel/examples-ui'
import Link from 'next/link'

export default function ProtectedPage() {
  return (
    <Page>
      <Text variant="h2" className="mb-6">
        Protected Page
      </Text>
      <Text className="mb-4">
        You are logged in and can see this page.
      </Text>
      <Text>
        Users who do not have a custom redirect URL assigned will land here.
      </Text>
      <Spacer y={1} />

      {/* This is the Logout Button */}
      <Link href="/api/logout">
        <Button>
          Log Out
        </Button>
      </Link>
    </Page>
  )
}
