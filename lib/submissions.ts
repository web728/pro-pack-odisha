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
  return true;
}

export function submissionAccess(id: string, type: string) {
  if (type === "visitor-registration")
    return `/view-pass?token=${signToken(id, "pass", 60 * 60 * 24 * 180)}`;
  if (type === "brochure")
    return `/api/brochure?token=${signToken(id, "brochure")}`;
  return undefined;
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
    const config = mailConfig();
    const recipients = config.recipients?.filter(Boolean) || [];

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

      sheet: async (row, values) => {
        // writeSheetRow accepts doc.fields for single-tab mapping
        await writeSheetRow(doc.formType, row, doc.fields || values);
      },

      notify: async (recipient) => {
        const targetEmail = recipients[recipient - 1];
        if (!targetEmail) {
          console.warn(`Recipient index ${recipient} not configured in mailConfig.`);
          return;
        }

        await sendNotification(
          targetEmail,
          recipient,
          id,
          doc.formType,
          doc.fields,
          doc.files,
          doc.createdAt,
          doc.source,
        );
      },
    });

    return true;
  } catch (err) {
    console.error("Delivery processing failed for submission ID:", id, err);

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