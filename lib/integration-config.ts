export function mailConfig() {
  return {
    host:
      process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : ""),
    port: Number(process.env.SMTP_PORT || (process.env.GMAIL_USER ? 465 : 587)),
    user: process.env.GMAIL_USER || process.env.SMTP_USER,
    password: process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM || process.env.GMAIL_USER,
    recipients: [
      process.env.CONTACT_EMAIL_1 || process.env.EMAIL_TO_1,
      process.env.CONTACT_EMAIL_2 || process.env.EMAIL_TO_2,
    ],
  };
}
export function sheetTitle(formType: string) {
  const prefix = process.env.GOOGLE_SHEET_NAME?.trim();
  return prefix ? `${prefix}-${formType}` : formType;
}
