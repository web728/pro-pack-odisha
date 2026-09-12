import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokens";
import { database } from "@/lib/mongodb";
import type { Submission } from "@/lib/submissions";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ field: string }> },
) {
  const { field } = await params;
  const id = verifyToken(
    req.nextUrl.searchParams.get("token") || "",
    `file:${field}`,
  );
  if (!id) return new NextResponse(null, { status: 403 });
  try {
    const db = await database();
    const doc = await db
      .collection<Submission>("submissions")
      .findOne({ _id: id });
    const file = doc?.files.find((f) => f.field === field);
    if (!file) return new NextResponse(null, { status: 404 });
    return new NextResponse(Buffer.from(file.data.buffer), {
      headers: {
        "Content-Type": file.mime,
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Cache-Control": "private, no-store",
        "Referrer-Policy": "no-referrer",
        "Content-Security-Policy": "sandbox; default-src 'none'",
      },
    });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
