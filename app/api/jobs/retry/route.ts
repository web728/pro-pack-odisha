import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { database } from "@/lib/mongodb";
import { deliver, type Submission } from "@/lib/submissions";
export const maxDuration = 300;
export async function POST(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const actual = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (
    !expected ||
    !actual ||
    Buffer.byteLength(expected) !== Buffer.byteLength(actual) ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(actual))
  )
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await database();
  const pending = await db
    .collection<Submission>("submissions")
    .find({ deliveryComplete: false, leaseUntil: { $lte: new Date() } })
    .limit(3)
    .toArray();
  let delivered = 0;
  for (const doc of pending) if (await deliver(doc._id)) delivered++;
  return NextResponse.json({ checked: pending.length, delivered });
}
