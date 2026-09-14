import "server-only";
import { GoogleAuth } from "google-auth-library";

// Helper to resolve credentials via Base64 or standard env keys
function getGoogleCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    try {
      const decoded = Buffer.from(
        process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
        "base64"
      ).toString("utf-8");
      return JSON.parse(decoded);
    } catch (err) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_BASE64:", err);
    }
  }

  return {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
}

const auth = () =>
  new GoogleAuth({
    credentials: getGoogleCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

// Human-friendly Register As labels
function getRegisterAsLabel(formType: string): string {
  switch (formType) {
    case "contact-us":
      return "Contact Enquiry";
    case "visitor-registration":
      return "Visitor Registration";
    case "exhibitor-registration":
      return "Exhibitor Registration";
    case "brochure":
      return "Brochure Request";
    case "exhibitor-badges":
      return "Exhibitor Badges";
    default:
      return formType
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
  }
}

export async function writeSheetRow(
  formType: string,
  _row: number,
  rawFields: Record<string, string | undefined> | string[]
) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    console.warn("GOOGLE_SHEET_ID missing; skipping Google Sheet write.");
    return false;
  }

  const client = await auth().getClient();
  const tabName = "Website-Enquries";

  // Indian Standard Time (IST) timestamp
  const istDateTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Normalize incoming fields
  const fields = Array.isArray(rawFields) ? {} : (rawFields as Record<string, string | undefined>);

  const registerAs = getRegisterAsLabel(formType);
  const company = fields.company || fields.organization || fields.companyName || "";
  const person = fields.name || fields.fullName || fields.contactPerson || "";
  const designation = fields.designation || fields.jobTitle || "";
  const email = fields.email || fields.emailId || "";
  const mobile = fields.phone || fields.mobile || fields.mobileNo || "";
  const website = fields.website || "";
  const address = fields.address || fields.city || "";
  const country = fields.country || "India";
  const boothSize = fields.stallSize || fields.boothSize || fields.spaceRequirement || "";
  const areaOfInterest = fields.sector || fields.industry || fields.areaOfInterest || "";
  const infoGetFrom = fields.source || fields.referral || fields.infoFrom || "Website";
  const message = fields.message || fields.query || fields.remarks || fields.subject || "";

  // Exact 25 Columns (A to Y) Mapping
  const rowValues = [
    istDateTime,          // A: Date & Time
    "Website",            // B: Platform
    registerAs,           // C: Register As
    company,              // D: Company Name
    person,               // E: Contact Person
    designation,          // F: Designation
    email,                // G: Email Id
    mobile,               // H: Mobile No.
    website,              // I: Website
    address,              // J: Address
    country,              // K: Country
    boothSize,            // L: Booth Size Requirement
    areaOfInterest,       // M: Area of Interest
    infoGetFrom,          // N: Info. Get From
    message,              // O: Message
    "",                   // P: Correction
    "New",                // Q: STATUS 1
    "",                   // R: STATUS 2
    "",                   // S: STATUS 3
    "",                   // T: STATUS 4
    "",                   // U: STATUS 5
    "",                   // V: STATUS 6
    "",                   // W: STATUS 7
    "",                   // X: STATUS 8
    "",                   // Y: STATUS 9
  ];

  const range = encodeURIComponent(`'${tabName}'!A:Y`);
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

  await client.request({
    url: `${base}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    method: "POST",
    data: { values: [rowValues] },
    timeout: 15000,
  });

  return true;
}