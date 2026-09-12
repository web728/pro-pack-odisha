import { test } from "node:test";
import assert from "node:assert/strict";
import { schemaFor } from "../lib/forms";
import { signToken, verifyToken } from "../lib/tokens";
test("visitor schema rejects malformed contact details and invalid selections", () => {
  const valid = {
    name: "A Visitor",
    email: "visitor@example.com",
    phone: "+91 9876543210",
    company: "Example",
    designation: "Manager",
    city: "Cuttack",
    country: "India",
    sector: "Packaging",
    interest: "",
    consent: "yes",
  };
  assert.equal(
    schemaFor("visitor-registration").safeParse(valid).success,
    true,
  );
  for (const invalid of [
    { email: "broken" },
    { phone: "abc" },
    { sector: "not-an-option" },
    { consent: "no" },
  ])
    assert.equal(
      schemaFor("visitor-registration").safeParse({ ...valid, ...invalid })
        .success,
      false,
    );
});
test("requested badges require matching people", () => {
  const data = {
    company: "Example",
    stall: "A1",
    email: "a@example.com",
    phone: "9876543210",
    name: "Requester",
    designation: "Manager",
    badgeCount: "2",
    consent: "yes",
    ...Object.fromEntries(
      Array.from({ length: 6 }, (_, i) => [
        [`person${i + 1}Name`, ""],
        [`person${i + 1}Designation`, ""],
      ]).flat(),
    ),
  };
  assert.equal(schemaFor("exhibitor-badges").safeParse(data).success, false);
  assert.equal(
    schemaFor("exhibitor-badges").safeParse({
      ...data,
      person1Name: "A",
      person1Designation: "Sales",
      person2Name: "B",
      person2Designation: "Sales",
    }).success,
    true,
  );
});
test("tokens enforce signature, purpose and expiry", () => {
  process.env.TOKEN_SECRET = "local-test-key-at-least-thirty-two-characters";
  const token = signToken("submission", "pass");
  assert.equal(verifyToken(token, "pass"), "submission");
  assert.equal(verifyToken(token + "x", "pass"), null);
  assert.equal(verifyToken(token, "brochure"), null);
  assert.equal(verifyToken(signToken("submission", "pass", -1), "pass"), null);
});

test("optional API fields may be omitted and unpowered stalls can declare zero", () => {
  const visitor = {
    name: "A Visitor",
    email: "visitor@example.com",
    phone: "+91 9876543210",
    company: "Example",
    designation: "Manager",
    city: "Cuttack",
    country: "India",
    sector: "Packaging",
    consent: "yes",
  };
  assert.equal(
    schemaFor("visitor-registration").safeParse(visitor).success,
    true,
  );
  const power = {
    company: "Example",
    stall: "A1",
    email: "a@example.com",
    name: "A",
    phone: "9876543210",
    compressor: "No",
    booth: "Shell scheme",
    buildupPhase: "1 Phase",
    showPhase: "1 Phase",
    buildupPower: "0",
    showPower: "0",
    machines: "0",
    machineWeight: "0",
    consent: "yes",
  };
  assert.equal(schemaFor("power-requirement").safeParse(power).success, true);
  assert.equal(
    schemaFor("power-requirement").safeParse({ ...power, machines: "-1" })
      .success,
    false,
  );
});
