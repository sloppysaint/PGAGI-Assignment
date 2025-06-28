import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust if needed
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favorites: true }
  });

  // Return all favorites for this user, with full data
  return NextResponse.json(user?.favorites ?? []);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const data = body.data;

  // Determine itemId and type
  let itemId = "";
  let type = "";
  if (data.url) {
    itemId = data.url;
    type = "news";
  } else if (data.id) {
    itemId = String(data.id);
    type = "movie";
  } else {
    return NextResponse.json({ error: "itemId/type missing" }, { status: 400 });
  }

  // Prevent duplicates
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favorites: true }
  });
  const already = user?.favorites.find(
    fav => fav.itemId === itemId && fav.type === type
  );
  if (already) return NextResponse.json(already);

  const favorite = await prisma.favorite.create({
    data: {
      user: { connect: { email: session.user.email } },
      itemId,
      type,
      data, // stores the whole object
    }
  });
  return NextResponse.json(favorite);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { itemId, type } = await req.json();
  if (!itemId || !type)
    return NextResponse.json({ error: "itemId/type missing" }, { status: 400 });

  await prisma.favorite.deleteMany({
    where: {
      user: { email: session.user.email },
      itemId,
      type,
    },
  });

  return NextResponse.json({ ok: true });
}
