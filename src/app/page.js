'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const push = useRouter().push
  useEffect(() => {
    push('/landing');
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">Loading...</main>
  )
}
