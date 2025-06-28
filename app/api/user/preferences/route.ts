import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { preferences: true }
  })

  let preferences: string[] = []
  if (user?.preferences) {
    try {
      preferences = JSON.parse(user.preferences)
    } catch {
      preferences = []
    }
  }

  return NextResponse.json({ preferences })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { preferences } = await req.json()
  // Store as a stringified array
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { preferences: JSON.stringify(preferences) }
  })

  // Return parsed preferences (as array)
  return NextResponse.json({ preferences })
}
