import type { Submission } from "./submissions";

export type DeliveryPorts = {
  reserveRow: () => Promise<number>;
  checkpoint: (patch: Partial<Submission>) => Promise<void>;
  sheet: (row: number, values: any) => Promise<void>;
  notify: (recipient: 1 | 2) => Promise<void>;
};

/** Checkpoint each completed external operation so a retry resumes safely. */
export async function runDelivery(doc: Submission, ports: DeliveryPorts) {
  // 1. Reserve sheet row if not assigned
  let row = doc.sheetRow;
  if (!row) {
    row = await ports.reserveRow();
    await ports.checkpoint({ sheetRow: row });
  }

  // 2. Write to Google Sheet (Passing doc.fields directly for 25 columns)
  if (!doc.sheetDone) {
    try {
      await ports.sheet(row, doc.fields);
      await ports.checkpoint({ sheetDone: true });
    } catch (sheetError) {
      console.error("Google Sheets writing failed in delivery:", sheetError);
      throw sheetError; // Retry later if Google API fails
    }
  }

  // 3. Send Email 1 (Primary Admin)
  if (!doc.email1Done) {
    try {
      await ports.notify(1);
      await ports.checkpoint({ email1Done: true });
    } catch (emailError) {
      console.error("Email 1 sending failed in delivery:", emailError);
      throw emailError;
    }
  }

  // 4. Send Email 2 (Secondary Admin - optional, failsafe)
  if (!doc.email2Done) {
    try {
      await ports.notify(2);
    } catch (e) {
      console.warn("Email 2 skipped or failed (optional recipient):", e);
    }
    // Mark email2Done even if skipped/optional so the queue finishes
    await ports.checkpoint({ email2Done: true });
  }

  // 5. Finalize delivery
  await ports.checkpoint({
    deliveryComplete: true,
    status: "delivered",
    leaseUntil: new Date(0),
  });
}