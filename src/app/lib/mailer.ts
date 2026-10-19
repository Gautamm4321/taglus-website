import nodemailer from "nodemailer";
import { CONTACT, SITE_URL } from "./site";

/**
 * Sends website enquiries to the business inbox over SMTP.
 *
 * Works with any mail provider (Google Workspace / Gmail, Zoho, Outlook / Microsoft 365,
 * Hostinger, GoDaddy…). Configure these environment variables (locally in .env, and in Vercel):
 *   SMTP_HOST            e.g. smtp.gmail.com / smtp.zoho.in / smtp.office365.com
 *   SMTP_PORT            465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER            the mailbox that sends, e.g. info@taglus.com
 *   SMTP_PASS            that mailbox's app password (never your normal login password)
 *   CONTACT_NOTIFY_TO    optional, who receives enquiries (comma-separated). Defaults to info@taglus.com
 *   SMTP_FROM            optional, sender address. Defaults to SMTP_USER
 * If SMTP isn't configured, emails are skipped and messages are still saved in Admin → Messages.
 */

export type Enquiry = { name: string; email: string; subject: string; message: string };

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Strip line breaks so user input can never inject extra email headers
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendEnquiryEmail(enquiry: Enquiry) {
  if (!isMailConfigured()) {
    console.warn("Contact email skipped: SMTP_HOST / SMTP_USER / SMTP_PASS are not set.");
    return { sent: false as const };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const to = process.env.CONTACT_NOTIFY_TO?.trim() || CONTACT.email;
  const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER!;
  const name = oneLine(enquiry.name);
  const subject = oneLine(enquiry.subject);
  const adminUrl = `${SITE_URL}/admin/messages`;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>` +
    `<td style="padding:6px 0;color:#111827;font-size:14px">${value}</td></tr>`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff">
    <h2 style="margin:0 0 4px;color:#020612;font-size:20px">New website enquiry</h2>
    <p style="margin:0 0 20px;color:#6b7280;font-size:13px">Sent from the Taglus contact form</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Name", esc(name))}
      ${row("Email", `<a href="mailto:${esc(enquiry.email)}" style="color:#0369a1">${esc(enquiry.email)}</a>`)}
      ${row("Subject", esc(subject))}
    </table>
    <div style="margin:20px 0;padding:16px;background:#f3f4f6;border-radius:8px;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(enquiry.message)}</div>
    <p style="margin:0;color:#6b7280;font-size:12px">Press <b>Reply</b> to answer ${esc(name)} directly. All enquiries are also saved in
      <a href="${adminUrl}" style="color:#0369a1">Taglus CMS → Messages</a>.</p>
  </div>`;

  const text =
    `New website enquiry\n\nName: ${name}\nEmail: ${enquiry.email}\nSubject: ${subject}\n\n${enquiry.message}\n\n` +
    `Reply to this email to answer ${name} directly. Also saved in Taglus CMS → Messages: ${adminUrl}`;

  await transporter.sendMail({
    from: `"Taglus Website" <${from}>`,
    to,
    replyTo: { name, address: enquiry.email },
    subject: `New enquiry: ${subject}`,
    text,
    html,
  });
  return { sent: true as const };
}
