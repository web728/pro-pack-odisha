import { mailConfig } from "./integration-config";
import "server-only";
import { Binary } from "mongodb";
import { database } from "./mongodb";
import { writeSheetRow } from "./googleSheets";
import { sendNotification } from "./email";
import { signToken } from "./tokens";
import { runDelivery } from "./delivery";
export type Submission = {
  _id: string;
  formType: string;
  fields: Record<string, string>;
  files: { name: string; field: string; mime: string; data: Binary }[];
  createdAt: Date;
  source: string;
  status: string;
  sheetRow?: number;
  sheetDone?: boolean;
  email1Done?: boolean;
  email2Done?: boolean;
  deliveryComplete: boolean;
  leaseUntil: Date;
  attempts: number;
  lastAttempt?: Date;
};
export function integrationsConfigured() {
  const mail = mailConfig();
  return (
    [
      process.env.MONGODB_URI,
      process.env.GOOGLE_CLIENT_EMAIL,
      process.env.GOOGLE_PRIVATE_KEY,
      process.env.GOOGLE_SHEET_ID,
      process.env.RECAPTCHA_SECRET_KEY,
      process.env.RECAPTCHA_SITE_KEY,
      mail.host,
      mail.user,
      mail.password,
      mail.from,
      ...mail.recipients,
    ].every(Boolean) && (process.env.TOKEN_SECRET?.length || 0) >= 32
  );
}
export function submissionAccess(id: string, type: string) {
  if (type === "visitor-registration")
    return `/view-pass?token=${signToken(id, "pass", 60 * 60 * 24 * 180)}`;
  if (type === "brochure")
    return `/api/brochure?token=${signToken(id, "brochure")}`;
}
export async function deliver(id: string) {
  const db = await database();
  const collection = db.collection<Submission>("submissions");
  const now = new Date();
  const doc = await collection.findOneAndUpdate(
    { _id: id, deliveryComplete: false, leaseUntil: { $lte: now } },
    {
      $set: { leaseUntil: new Date(Date.now() + 120000), lastAttempt: now },
      $inc: { attempts: 1 },
    },
    { returnDocument: "after" },
  );
  if (!doc) return false;
  try {
    await runDelivery(doc, {
      reserveRow: async () => {
        const counter = await db
          .collection<{ _id: string; value: number }>("counters")
          .findOneAndUpdate(
            { _id: doc.formType },
            { $inc: { value: 1 } },
            { upsert: true, returnDocument: "after" },
          );
        return counter!.value + 1;
      },
      checkpoint: async (patch) => {
        await collection.updateOne({ _id: id }, { $set: patch });
      },
      sheet: (row, values) => writeSheetRow(doc.formType, row, values),
      notify: (recipient) =>
        sendNotification(
          mailConfig().recipients[recipient - 1]!,
          recipient,
          id,
          doc.formType,
          doc.fields,
          doc.files,
          doc.createdAt,
          doc.source,
        ),
    });
    return true;
  } catch {
    await collection.updateOne(
      { _id: id },
      {
        $set: {
          status: "delivery-pending",
          leaseUntil: new Date(
            Date.now() +
              Math.min(3600000, 60000 * 2 ** Math.min(doc.attempts, 6)),
          ),
        },
      },
    );
    return false;
  }
}
