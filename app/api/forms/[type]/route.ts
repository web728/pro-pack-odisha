import { verifyRecaptcha } from "@/lib/recaptcha";
import { NextRequest, NextResponse } from "next/server";
import { Binary, MongoServerError } from "mongodb";
import { createHash, createHmac } from "node:crypto";
import { forms, schemaFor } from "@/lib/forms";
import { database, ensureIndexes } from "@/lib/mongodb";
import {
  deliver,
  integrationsConfigured,
  submissionAccess,
  type Submission,
} from "@/lib/submissions";
import { signToken } from "@/lib/tokens";
import { siteUrl } from "@/lib/site";
export const runtime = "nodejs";
export const maxDuration = 120;
const reply = (data: object, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  if (!forms[type]) return reply({ message: "Form not found." }, 404);
  if (req.headers.get("origin") !== new URL(siteUrl).origin)
    return reply({ message: "Request origin is not allowed." }, 403);
  try {
    const maxBytes = 5 * 1024 * 1024;
    if (Number(req.headers.get("content-length")) > maxBytes)
      return reply({ message: "Submission is too large." }, 413);
    const reader = req.body?.getReader();
    if (!reader) return reply({ message: "Empty request." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.length;
      if (size > maxBytes) {
        await reader.cancel();
        return reply({ message: "Submission is too large." }, 413);
      }
      chunks.push(chunk.value);
    }
    const bytes = Buffer.concat(chunks);
    const form = await new Response(bytes, {
      headers: { "Content-Type": req.headers.get("content-type") || "" },
    }).formData();
    if (form.get("website_check"))
      return reply({ message: "Unable to process this request." }, 400);
    const key = String(form.get("submissionKey") || "");
    if (
      !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(
        key,
      )
    )
      return reply({ message: "Please refresh the page and try again." }, 400);
    const parsed = schemaFor(type).safeParse(
      Object.fromEntries(form.entries()),
    );
    if (!parsed.success)
      return reply(
        {
          message: "Please check the highlighted fields.",
          errors: Object.fromEntries(
            parsed.error.issues.map((i) => [i.path[0], i.message]),
          ),
        },
        422,
      );
    const files: Submission["files"] = [];
    for (const field of forms[type].fields.filter((f) => f.type === "file")) {
      const file = form.get(field.name);
      if (!(file instanceof File) || !file.size) {
        if (field.required)
          return reply(
            {
              message: "Please attach the required file.",
              errors: { [field.name]: "Please attach a file." },
            },
            422,
          );
        continue;
      }
      if (file.size > 2 * 1024 * 1024)
        return reply(
          {
            message: "Files must be 2 MB or smaller.",
            errors: { [field.name]: "Maximum file size is 2 MB." },
          },
          422,
        );
      const data = Buffer.from(await file.arrayBuffer());
      const mime = data
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        ? "image/png"
        : data[0] === 255 && data[1] === 216 && data[2] === 255
          ? "image/jpeg"
          : data.subarray(0, 5).toString() === "%PDF-"
            ? "application/pdf"
            : "";
      if (!mime || (field.name === "logo" && mime === "application/pdf"))
        return reply(
          {
            message: "Unsupported file format.",
            errors: {
              [field.name]:
                "Use a PNG or JPEG image" +
                (field.name === "design" ? ", or PDF." : "."),
            },
          },
          422,
        );
      files.push({
        field: field.name,
        name: file.name.replace(/[^\w .-]/g, "_").slice(0, 120),
        mime,
        data: new Binary(data),
      });
    }
    if (!integrationsConfigured())
      return reply(
        {
          message:
            "Online submissions are not available yet. Please contact +91 70083 41944 or +91 77518 09433. Your details have not been saved.",
        },
        503,
      );
    const captcha = await verifyRecaptcha(
      String(form.get("g-recaptcha-response") || ""),
      process.env.RECAPTCHA_SECRET_KEY,
      new URL(siteUrl).hostname,
    );
    if (captcha !== "verified")
      return reply(
        {
          message:
            captcha === "invalid"
              ? "Please complete a fresh security check and try again."
              : "Verification is temporarily unavailable. Your details have not been saved. Please try again later.",
        },
        captcha === "invalid" ? 422 : 503,
      );
    const db = await database();
    await ensureIndexes();
    const id = createHash("sha256")
      .update(`${type}:${key}`)
      .digest("hex")
      .slice(0, 32);
    const collection = db.collection<Submission>("submissions");
    const existing = await collection.findOne({ _id: id });
    if (existing)
      return reply({
        message: "Your submission is already recorded.",
        id,
        access: existing.deliveryComplete
          ? submissionAccess(id, type)
          : undefined,
        statusUrl: existing.deliveryComplete
          ? undefined
          : "/api/submission-status?token=" + signToken(id, "status"),
      });
    // TRUSTED_PROXY_IP_HEADER must only name a header overwritten by your hosting edge.
    const header = process.env.TRUSTED_PROXY_IP_HEADER;
    const network = header ? req.headers.get(header) || "unknown" : "shared";
    const bucket = createHmac("sha256", process.env.TOKEN_SECRET!)
      .update(`${network}:${Math.floor(Date.now() / 600000)}`)
      .digest("hex");
    const limit = await db
      .collection<{ _id: string; count: number; expiresAt: Date }>("rateLimits")
      .findOneAndUpdate(
        { _id: bucket },
        {
          $inc: { count: 1 },
          $setOnInsert: { expiresAt: new Date(Date.now() + 1200000) },
        },
        { upsert: true, returnDocument: "after" },
      );
    if (limit!.count > (header ? 10 : 100))
      return reply(
        {
          message:
            "Too many requests. Please wait a few minutes before trying again.",
        },
        429,
      );
    const doc: Submission = {
      _id: id,
      formType: type,
      fields: parsed.data as Record<string, string>,
      files,
      createdAt: new Date(),
      source: `/${type}`,
      status: "recorded",
      deliveryComplete: false,
      leaseUntil: new Date(0),
      attempts: 0,
    };
    try {
      await collection.insertOne(doc);
    } catch (e) {
      if (!(e instanceof MongoServerError && e.code === 11000)) throw e;
    }
    // Stored first. Delivery is durable and independently retried by the protected job route.
    const delivered = await deliver(id);
    return reply(
      {
        message: delivered
          ? "Your details have been recorded and sent to the organizers."
          : "Your details have been recorded. Organizer notifications are still processing; there is no need to resubmit.",
        id,
        access: delivered ? submissionAccess(id, type) : undefined,
        statusUrl: delivered
          ? undefined
          : "/api/submission-status?token=" + signToken(id, "status"),
      },
      201,
    );
  } catch {
    return reply(
      {
        message:
          "We could not confirm your submission. Please retry or call the organizers for assistance.",
      },
      503,
    );
  }
}
