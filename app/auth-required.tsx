'use client'
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import SignInPage from "./auth/signin/page" // adjust path if needed

export default function AuthRequired({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const allowed = ["/auth/signin", "/auth/signup"]

  useEffect(() => {
    if (status === "authenticated" && allowed.includes(pathname)) {
      // Prevent authenticated users from seeing sign-in/up page
      router.replace("/")
    }
  }, [status, pathname, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-2xl font-bold">Loading...</span>
      </div>
    )
  }

  if (status === "unauthenticated" && !allowed.includes(pathname)) {
    // Always render sign-in card as "home" for unauthenticated users
    return <SignInPage />
  }

  return <>{children}</>
}
