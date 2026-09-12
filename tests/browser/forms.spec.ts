import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { forms } from "../../lib/forms";
for (const [type, config] of Object.entries(forms))
  test(`backend validates ${type}`, async ({ request }) => {
    const multipart: Record<
      string,
      string | { name: string; mimeType: string; buffer: Buffer }
    > = { submissionKey: randomUUID(), consent: "yes", website_check: "" };
    for (const f of config.fields) {
      multipart[f.name] =
        f.type === "email"
          ? "qa@example.com"
          : f.type === "tel"
            ? "9876543210"
            : f.type === "url"
              ? "https://example.com"
              : f.type === "select"
                ? f.options![0]
                : f.type === "number"
                  ? "1"
                  : f.type === "file"
                    ? {
                        name: "qa.png",
                        mimeType: "image/png",
                        buffer: Buffer.from(
                          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aIZkAAAAASUVORK5CYII=",
                          "base64",
                        ),
                      }
                    : "QA example";
    }
    const response = await request.post(`/api/forms/${type}`, {
      headers: { origin: "http://localhost:3000" },
      multipart,
    });
    expect(response.status()).toBe(503);
    expect((await response.json()).message).toContain(
      "Your details have not been saved",
    );
    multipart.email = "invalid";
    const invalid = await request.post(`/api/forms/${type}`, {
      headers: { origin: "http://localhost:3000" },
      multipart,
    });
    expect(invalid.status()).toBe(422);
  });
test("server rejects forged file content and cross-origin requests", async ({
  request,
}) => {
  expect(
    (
      await request.post("/api/forms/contact-us", {
        headers: { origin: "https://example.org" },
        multipart: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (await request.get("/api/submission-status?token=invalid")).status(),
  ).toBe(403);
});
test("recorded submission UI avoids duplicate submissions", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/forms/brochure", async (route) => {
    calls++;
    await route.fulfill({
      status: 201,
      json: {
        message: "Your details have been recorded and sent to the organizers.",
        id: "local-ui-fixture",
        access: "/api/brochure?token=local-ui-fixture",
      },
    });
  });
  await page.goto("/brochure");
  for (const [label, value] of [
    ["Full name", "QA Visitor"],
    ["Email address", "qa@example.com"],
    ["Mobile number", "9876543210"],
    ["Company / organization", "QA"],
  ])
    await page.getByLabel(label).fill(value);
  await page.getByLabel("I am interested in").selectOption("Visiting");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Request brochure access" }).click();
  await expect(
    page.getByRole("link", { name: "Download archived 2023 brochure" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Request brochure access" }),
  ).toHaveCount(0);
  expect(calls).toBe(1);
});

test("server checks actual attachment signature", async ({ request }) => {
  const multipart: Record<
    string,
    string | { name: string; mimeType: string; buffer: Buffer }
  > = { submissionKey: randomUUID(), consent: "yes" };
  for (const f of forms["stall-design"].fields)
    multipart[f.name] =
      f.type === "file"
        ? {
            name: "pretend.png",
            mimeType: "image/png",
            buffer: Buffer.from("<script>invalid</script>"),
          }
        : f.type === "email"
          ? "qa@example.com"
          : f.type === "tel"
            ? "9876543210"
            : "QA";
  const res = await request.post("/api/forms/stall-design", {
    headers: { origin: "http://localhost:3000" },
    multipart,
  });
  expect(res.status()).toBe(422);
  expect((await res.json()).message).toBe("Unsupported file format.");
});
