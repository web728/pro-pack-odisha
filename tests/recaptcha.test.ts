import test from "node:test";
import assert from "node:assert/strict";
import { verifyRecaptcha } from "../lib/recaptcha";
const hostname = "example.com";
const mock = (body: object, status = 200) =>
  (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;
test("captcha rejects absent and oversized tokens without network calls", async () => {
  const never = (async () => {
    throw Error("Unexpected request");
  }) as typeof fetch;
  assert.equal(await verifyRecaptcha("", "secret", hostname, never), "invalid");
  assert.equal(
    await verifyRecaptcha("x".repeat(4097), "secret", hostname, never),
    "invalid",
  );
  assert.equal(
    await verifyRecaptcha("token", undefined, hostname, never),
    "unavailable",
  );
});
test("captcha requires successful provider verification for the exact hostname", async () => {
  const valid = {
    success: true,
    hostname,
    challenge_ts: new Date().toISOString(),
  };
  assert.equal(
    await verifyRecaptcha("token", "secret", hostname, mock(valid)),
    "verified",
  );
  assert.equal(await verifyRecaptcha("fresh-token", "secret", hostname, mock({...valid, challenge_ts: new Date(Date.now()-600000).toISOString()})), "verified");
  for (const body of [
    { ...valid, success: false },
    { ...valid, hostname: "other.example" },
    { ...valid, success: false, "error-codes": ["timeout-or-duplicate"] },
  ])
    assert.equal(
      await verifyRecaptcha("token", "secret", hostname, mock(body)),
      "invalid",
    );
});
test("captcha provider errors fail closed", async () => {
  assert.equal(
    await verifyRecaptcha("token", "secret", hostname, mock({}, 503)),
    "unavailable",
  );
  assert.equal(
    await verifyRecaptcha(
      "token",
      "secret",
      hostname,
      mock({ success: false, "error-codes": ["invalid-input-secret"] }),
    ),
    "unavailable",
  );
  assert.equal(
    await verifyRecaptcha("token", "secret", hostname, (async () => {
      throw Error("timeout");
    }) as typeof fetch),
    "unavailable",
  );
});
