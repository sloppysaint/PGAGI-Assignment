'use client'
import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  if (status === "loading") return <div>Loading...</div>
  if (!session) return <div className="pt-24 text-center">Please sign in to see your profile.</div>

  return (
    <div className="pt-24 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8">
        <p className="mb-4"><strong>Name:</strong> {session.user?.name}</p>
        <p className="mb-4"><strong>Email:</strong> {session.user?.email}</p>
      </div>
    </div>
  )
}
