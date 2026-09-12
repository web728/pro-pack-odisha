import type { Submission } from "./submissions";

export type DeliveryPorts = {
  reserveRow: () => Promise<number>;
  checkpoint: (patch: Partial<Submission>) => Promise<void>;
  sheet: (row: number, values: string[]) => Promise<void>;
  notify: (recipient: 1 | 2) => Promise<void>;
};

/** Checkpoint each completed external operation so a retry resumes safely. */
export async function runDelivery(doc: Submission, ports: DeliveryPorts) {
  let row = doc.sheetRow;
  if (!row) {
    row = await ports.reserveRow();
    await ports.checkpoint({ sheetRow: row });
  }
  if (!doc.sheetDone) {
    await ports.sheet(row, [
      doc._id,
      doc.createdAt.toISOString(),
      doc.formType,
      doc.source,
      JSON.stringify(doc.fields),
      doc.files.map((file) => `${file.field}: ${file.name}`).join("; "),
    ]);
    await ports.checkpoint({ sheetDone: true });
  }
  if (!doc.email1Done) {
    await ports.notify(1);
    await ports.checkpoint({ email1Done: true });
  }
  if (!doc.email2Done) {
    await ports.notify(2);
    await ports.checkpoint({ email2Done: true });
  }
  await ports.checkpoint({
    deliveryComplete: true,
    status: "delivered",
    leaseUntil: new Date(0),
  });
}
