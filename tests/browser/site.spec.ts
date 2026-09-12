import { test, expect } from "@playwright/test";
import { publicRoutes } from "../../lib/site";
for (const route of publicRoutes) {
  test(`route /${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto("/" + route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Propack Odisha/);
    expect(await page.locator("main").innerText()).not.toContain(
      "Updating Soon",
    );
    expect(errors).toEqual([]);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      expect(
        await image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      ).toBeTruthy();
    }
  });
}
for (const width of [360, 375, 390, 414, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    for (const route of publicRoutes.map((route) => "/" + route)) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBeTruthy();
    }
    if (width < 801) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toBeFocused();
    }
  });
}
test("validation, unavailable backend, navigation and private access", async ({
  page,
  request,
}) => {
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("This field is required.").first()).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByLabel("Full name").fill("QA Test");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Mobile number").fill("9876543210");
  await page.getByLabel("Company / organization").fill("QA Company");
  await page.getByLabel("Enquiry about").selectOption("Other");
  await page
    .getByLabel("Your message")
    .fill("Local automated validation test.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Online submissions are not available yet",
  );
  expect((await request.get("/api/brochure?token=invalid")).status()).toBe(403);
  expect((await request.get("/api/files/logo?token=invalid")).status()).toBe(
    403,
  );
  expect((await request.post("/api/jobs/retry")).status()).toBe(401);
  for (const route of [
    "/test",
    "/home-cloned-127",
    "/exhibition-directory",
    "/additional-order-form",
  ])
    expect((await request.get(route)).status()).toBe(404);
  await page.goto("/view-pass?token=invalid");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "invalid or expired",
  );
});
test("keyboard and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
