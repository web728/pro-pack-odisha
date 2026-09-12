import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokens";
import { database } from "@/lib/mongodb";
import { submissionAccess, type Submission } from "@/lib/submissions";
export async function GET(req: NextRequest) {
  const id = verifyToken(req.nextUrl.searchParams.get("token") || "", "status");
  if (!id)
    return NextResponse.json(
      { message: "Invalid or expired status link." },
      { status: 403 },
    );
  try {
    const doc = await (
      await database()
    )
      .collection<Submission>("submissions")
      .findOne({ _id: id });
    if (!doc) return new NextResponse(null, { status: 404 });
    return NextResponse.json(
      {
        complete: doc.deliveryComplete,
        access: doc.deliveryComplete
          ? submissionAccess(id, doc.formType)
          : undefined,
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
          "Referrer-Policy": "no-referrer",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { message: "Please try again later." },
      { status: 503 },
    );
  }
}
