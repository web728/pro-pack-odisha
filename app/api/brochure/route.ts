import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { verifyToken } from "@/lib/tokens";
import { database } from "@/lib/mongodb";
import type { Submission } from "@/lib/submissions";
export async function GET(req: NextRequest) {
  const id = verifyToken(
    req.nextUrl.searchParams.get("token") || "",
    "brochure",
  );
  if (!id)
    return NextResponse.json(
      {
        message:
          "This access link is invalid or expired. Please request the brochure again.",
      },
      { status: 403 },
    );
  try {
    const db = await database();
    const record = await db
      .collection<Submission>("submissions")
      .findOne({ _id: id, formType: "brochure" });
    if (!record) return new NextResponse(null, { status: 404 });
    if (!record.deliveryComplete)
      return NextResponse.json(
        {
          message:
            "Your request is still processing. Please try again shortly.",
        },
        { status: 409 },
      );
    const file = await readFile(
      join(process.cwd(), "private", "brochure-2023.pdf"),
    );
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Propack-Odisha-2023-Archive.pdf"',
        "Cache-Control": "private, no-store",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "The brochure is temporarily unavailable. Please contact the organizers.",
      },
      { status: 503 },
    );
  }
}
