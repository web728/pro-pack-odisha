import { test } from "node:test";
import assert from "node:assert/strict";
import { runDelivery, type DeliveryPorts } from "../lib/delivery";
import type { Submission } from "../lib/submissions";

const record = (): Submission => ({
  _id: "test-submission",
  formType: "brochure",
  fields: { email: "qa@example.com", company: "=untrusted formula" },
  files: [],
  createdAt: new Date("2026-09-05T00:00:00Z"),
  source: "/brochure",
  status: "recorded",
  deliveryComplete: false,
  leaseUntil: new Date(0),
  attempts: 0,
});

test("second-recipient outage resumes without repeating confirmed operations", async () => {
  const saved = record();
  const operations: string[] = [];
  let failSecond = true;
  const ports: DeliveryPorts = {
    reserveRow: async () => {
      operations.push("reserve");
      return 2;
    },
    checkpoint: async (patch) => {
      Object.assign(saved, patch);
    },
    sheet: async () => {
      operations.push("sheet");
    },
    notify: async (recipient) => {
      operations.push(`email${recipient}`);
      if (recipient === 2 && failSecond) throw new Error("SMTP unavailable");
    },
  };
  await assert.rejects(runDelivery({ ...saved }, ports));
  assert.equal(saved.deliveryComplete, false);
  assert.equal(saved.sheetDone, true);
  assert.equal(saved.email1Done, true);
  assert.equal(saved.email2Done, undefined);
  failSecond = false;
  await runDelivery({ ...saved }, ports);
  assert.deepEqual(operations, [
    "reserve",
    "sheet",
    "email1",
    "email2",
    "email2",
  ]);
  assert.equal(saved.deliveryComplete, true);
});

test("ambiguous sheet acknowledgement reuses the reserved row", async () => {
  const saved = record();
  const rows = new Map<number, string[]>();
  let interrupted = true;
  let allocations = 0;
  const ports: DeliveryPorts = {
    reserveRow: async () => {
      allocations++;
      return 42;
    },
    checkpoint: async (patch) => {
      Object.assign(saved, patch);
    },
    sheet: async (row, values) => {
      rows.set(row, values);
      if (interrupted) throw new Error("Connection lost after write");
    },
    notify: async () => {},
  };
  await assert.rejects(runDelivery({ ...saved }, ports));
  assert.equal(saved.sheetRow, 42);
  assert.equal(saved.sheetDone, undefined);
  interrupted = false;
  await runDelivery({ ...saved }, ports);
  assert.equal(rows.size, 1);
  assert.equal(allocations, 1);
  assert.equal(saved.deliveryComplete, true);
  assert.ok(rows.get(42)![4].includes("=untrusted formula"));
});

test("a failed database checkpoint prevents later external side effects", async () => {
  const effects: string[] = [];
  const ports: DeliveryPorts = {
    reserveRow: async () => 2,
    checkpoint: async () => {
      throw new Error("Database disconnected");
    },
    sheet: async () => {
      effects.push("sheet");
    },
    notify: async () => {
      effects.push("mail");
    },
  };
  await assert.rejects(runDelivery(record(), ports));
  assert.deepEqual(effects, []);
});
