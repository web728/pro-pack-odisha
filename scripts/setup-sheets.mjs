import { GoogleAuth } from "google-auth-library";
const titles = [
  "contact-us",
  "exhibitor-registration",
  "visitor-registration",
  "brochure",
  "power-requirement",
  "fasisca-name",
  "exhibitor-badges",
  "profile-for-exhibitor-directory",
  "stall-design",
].map((title) =>
  process.env.GOOGLE_SHEET_NAME?.trim()
    ? `${process.env.GOOGLE_SHEET_NAME.trim()}-${title}`
    : title,
);
const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } =
  process.env;
if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID)
  throw new Error("Set Google Sheets environment variables first.");
const auth = new GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const client = await auth.getClient();
const base = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}`;
const { data } = await client.request({ url: base });
const existing = new Set(data.sheets.map((s) => s.properties.title));
const requests = titles
  .filter((t) => !existing.has(t))
  .map((title) => ({
    addSheet: { properties: { title, gridProperties: { frozenRowCount: 1 } } },
  }));
if (requests.length)
  await client.request({
    url: base + ":batchUpdate",
    method: "POST",
    data: { requests },
  });
for (const title of titles)
  await client.request({
    url: `${base}/values/${encodeURIComponent(`'${title}'!A1:F1`)}?valueInputOption=RAW`,
    method: "PUT",
    data: {
      values: [
        [
          "Submission ID",
          "Submitted at (UTC)",
          "Form type",
          "Source page",
          "Submitted fields (JSON)",
          "Private attachment names",
        ],
      ],
    },
  });
console.log("All nine submission tabs and headers are ready.");
