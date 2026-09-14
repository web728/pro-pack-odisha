import { mailConfig } from "./integration-config";
import "server-only";
import nodemailer from "nodemailer";
import { forms } from "./forms";
import { siteUrl } from "./site";
import { signToken } from "./tokens";

export function escapeHtml(s: string) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}

// Clean mapping of technical form keys to readable titles
const formDisplayTitles: Record<string, string> = {
  "contact-us": "Contact Enquiry",
  "visitor-registration": "Visitor Registration",
  "exhibitor-registration": "Exhibitor Booth Booking",
  "brochure": "Brochure Request",
  "exhibitor-badges": "Exhibitor Badges Request",
};

export async function sendNotification(
  to: string,
  index: number,
  id: string,
  type: string,
  fields: Record<string, string>,
  files: { name: string; field: string }[],
  _createdAt: Date,
  _source: string,
) {
  const config = mailConfig();

  // Support direct Gmail authentication or standard SMTP
  const user = process.env.GMAIL_USER || config.user;
  const pass = process.env.GMAIL_APP_PASSWORD || config.password;
  const host = config.host || "smtp.gmail.com";
  const port = Number(config.port) || 465;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    socketTimeout: 15000,
  });

  const formTitle = formDisplayTitles[type] || "Website Enquiry";
  const personName = fields.name || fields.fullName || fields.contactPerson || "Visitor";
  const companyName = fields.company || fields.organization || "";

  // Dynamic Subject Line
  const subject = companyName
    ? `[Propack Odisha 2027] ${formTitle} from ${personName} (${companyName})`
    : `[Propack Odisha 2027] New ${formTitle} from ${personName}`;

  // Filter out internal/system form keys
  const excludedKeys = [
    "consent",
    "g-recaptcha-response",
    "submissionKey",
    "website_check",
  ];

  const fieldEntries = Object.entries(fields).filter(
    ([k, v]) => !excludedKeys.includes(k) && Boolean(v)
  );

  const rows = fieldEntries.map(([key, value]) => [
    forms[type]?.fields?.find((f) => f.name === key)?.label ||
      key.charAt(0).toUpperCase() + key.slice(1),
    value,
  ]);

  const attachments = files.map((file) => ({
    name: file.name,
    url: `${siteUrl}/api/files/${encodeURIComponent(file.field)}?token=${signToken(id, `file:${file.field}`, 604800)}`,
  }));

  const fieldsTableRows = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #eef2f6; color: #475569; font-size: 13px; font-weight: 600; width: 35%; vertical-align: top;">
          ${escapeHtml(k)}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #eef2f6; color: #0f172a; font-size: 13px; font-weight: 500; line-height: 1.5;">
          ${escapeHtml(v)}
        </td>
      </tr>
    `
    )
    .join("");

  const filesHtml = attachments.length
    ? `
      <div style="margin-top: 18px; padding: 14px 18px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px;">
        <strong style="display: block; font-size: 12px; color: #334155; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Attached Documents:</strong>
        ${attachments
          .map(
            (f) =>
              `<a href="${escapeHtml(f.url)}" style="display: inline-block; margin-right: 12px; margin-top: 4px; color: #dc2626; font-size: 12px; font-weight: 700; text-decoration: underline;">📎 ${escapeHtml(f.name)} (Download)</a>`
          )
          .join("")}
      </div>
    `
    : "";

  const emailHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${escapeHtml(subject)}</title>
    </head>
    <body style="margin: 0; padding: 24px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
        
        <!-- Header Strip -->
        <tr>
          <td style="background-color: #dc2626; padding: 24px 30px; text-align: left;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <span style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; display: block;">
                    PROPACK ODISHA 2027
                  </span>
                  <span style="color: rgba(255,255,255,0.85); font-size: 12px; font-weight: 500; display: block; margin-top: 3px;">
                    International Expo on Packaging & Converting Machinery
                  </span>
                </td>
                <td align="right">
                  <span style="background-color: rgba(255,255,255,0.22); color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">
                    ${escapeHtml(formTitle)}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Lead Summary -->
        <tr>
          <td style="padding: 24px 30px 10px 30px;">
            <h2 style="margin: 0 0 6px 0; color: #0f172a; font-size: 17px; font-weight: 700;">
              New Website Lead Received
            </h2>
            <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
              A submission has been received from the official portal. Details are recorded below:
            </p>
          </td>
        </tr>

        <!-- Data Table -->
        <tr>
          <td style="padding: 14px 30px 20px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafbfb; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              ${fieldsTableRows}
            </table>
            ${filesHtml}
          </td>
        </tr>

        <!-- Action CTA -->
        <tr>
          <td style="padding: 0 30px 28px 30px;" align="center">
            <a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 12px; font-weight: 700; padding: 11px 22px; border-radius: 8px; text-decoration: none;">
              Open Lead in Google Sheet →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; padding: 16px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #94a3b8; font-size: 11px; line-height: 1.5;">
              Janata Maidan, Bhubaneswar, Odisha | 25–28 February 2027<br />
              This is an automated notification from Propack Odisha Lead Management System.
            </p>
          </td>
        </tr>

      </table>
    </body>
  </html>
  `;

  const fromEmail = config.from || process.env.GMAIL_USER || "no-reply@propackodisha.com";

  await transport.sendMail({
    from: `"Propack Odisha Lead Desk" <${fromEmail}>`,
    to,
    replyTo: fields.email || undefined,
    subject,
    messageId: `<${id}.${index}@${new URL(siteUrl).hostname}>`,
    text: `Propack Odisha - New ${formTitle}\n\n${rows.map((r) => r.join(": ")).join("\n")}\n\nSheet: https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit`,
    html: emailHtml,
  });
}