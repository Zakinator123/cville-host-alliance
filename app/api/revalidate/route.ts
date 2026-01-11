import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const body = await request.json().catch(() => null);

  if (!secret || !body || body.secret !== secret) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const path = typeof body.path === "string" ? body.path : "/";
  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
