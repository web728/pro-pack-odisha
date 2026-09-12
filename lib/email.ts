import { mailConfig } from "./integration-config";
import "server-only";
import nodemailer from "nodemailer";
import { forms } from "./forms";
import { siteUrl } from "./site";
import { signToken } from "./tokens";
export function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
export async function sendNotification(
  to: string,
  index: number,
  id: string,
  type: string,
  fields: Record<string, string>,
  files: { name: string; field: string }[],
  createdAt: Date,
  source: string,
) {
  const config = mailConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10000,
    socketTimeout: 15000,
  });
  const rows = Object.entries(fields)
    .filter(([k]) => k !== "consent")
    .map(([key, value]) => [
      forms[type].fields.find((f) => f.name === key)?.label || key,
      value,
    ]);
  rows.unshift(
    ["Submitted at (UTC)", createdAt.toISOString()],
    ["Source page", source],
    ["Form type", type],
  );
  const attachments = files.map((file) => ({
    name: file.name,
    url: `${siteUrl}/api/files/${encodeURIComponent(file.field)}?token=${signToken(id, `file:${file.field}`, 604800)}`,
  }));
  await transport.sendMail({
    from: config.from,
    to,
    replyTo: fields.email,
    subject: `New ${type.replaceAll("-", " ")} — Propack Odisha`,
    messageId: `<${id}.${index}@${new URL(siteUrl).hostname}>`,
    text: `Propack Odisha\nReference: ${id}\n\n${rows.map((r) => r.join(": ")).join("\n")}\n\n${attachments.map((f) => `${f.name}: ${f.url}`).join("\n")}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:640px;color:#202527"><h1 style="border-bottom:4px solid #d9192b;padding-bottom:20px">Propack Odisha</h1><h2>New ${escapeHtml(type.replaceAll("-", " "))}</h2><p>Reference: ${escapeHtml(id)}</p><table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><th style="padding:12px;text-align:left;border-bottom:1px solid #ddd">${escapeHtml(k)}</th><td style="padding:12px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join("")}</table>${attachments.map((f) => `<p><a href="${escapeHtml(f.url)}">${escapeHtml(f.name)} — private download (7 days)</a></p>`).join("")}</div>`,
  });
}
