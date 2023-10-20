import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/contacts">
        <h6>Go to Contacts -></h6>
      </Link>
    </main>
  )
}
