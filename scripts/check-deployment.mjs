import { existsSync } from "node:fs";
const failures = [];
const required = [
  "SITE_URL",
  "NEXT_PUBLIC_SITE_URL",
  "MONGODB_URI",
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_ID",
  "NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
  "RECAPTCHA_SECRET_KEY",
  "TOKEN_SECRET",
  "CRON_SECRET",
];
for (const key of required)
  if (!process.env[key]?.trim()) failures.push(`${key} is missing`);
const alternatives = [
  ["MONGODB_DB_NAME", "MONGODB_DATABASE"],
  ["GMAIL_USER", "SMTP_USER"],
  ["GMAIL_APP_PASSWORD", "SMTP_PASSWORD"],
  ["CONTACT_EMAIL_1", "EMAIL_TO_1"],
  ["CONTACT_EMAIL_2", "EMAIL_TO_2"],
];
for (const keys of alternatives)
  if (!keys.some((k) => process.env[k]?.trim()))
    failures.push(`${keys.join(" or ")} is required`);
if (!process.env.GMAIL_USER)
  for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_FROM"])
    if (!process.env[key]) failures.push(`${key} is missing`);
for (const key of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  try {
    const url = new URL(process.env[key]);
    if (
      url.protocol !== "https:" ||
      ["localhost", "127.0.0.1"].includes(url.hostname) ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      failures.push(
        `${key} must be the public HTTPS origin without path/query`,
      );
  } catch {
    failures.push(`${key} must be a valid origin`);
  }
}
if (
  process.env.SITE_URL?.replace(/\/$/, "") !==
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
)
  failures.push("SITE_URL and NEXT_PUBLIC_SITE_URL must agree in production");
for (const key of ["TOKEN_SECRET", "CRON_SECRET"])
  if ((process.env[key]?.length || 0) < 32)
    failures.push(`${key} needs at least 32 characters`);
if (
  process.env.TOKEN_SECRET &&
  process.env.TOKEN_SECRET === process.env.CRON_SECRET
)
  failures.push("Use different token and retry secrets");
if (
  process.env.MONGODB_URI &&
  !/^mongodb(?:\+srv)?:\/\//.test(process.env.MONGODB_URI)
)
  failures.push("MONGODB_URI has an invalid scheme");
if (process.env.SMTP_PORT && !["465", "587"].includes(process.env.SMTP_PORT))
  failures.push("Review SMTP_PORT: expected 465 or 587");
if (!existsSync("private/brochure-2023.pdf"))
  failures.push("Private brochure PDF is missing");
if (failures.length) {
  console.error(
    "Deployment configuration needs attention:\n" +
      failures.map((x) => " - " + x).join("\n"),
  );
  process.exitCode = 1;
} else
  console.log(
    "Configuration shape and required brochure passed. No network calls or test submissions made. Complete the live integration checklist before launch.",
  );
