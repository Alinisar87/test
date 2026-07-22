// ============================================================================
//  NOTIFICATIONS  —  email + WhatsApp, with a logging fallback
// ============================================================================
//  Real delivery is wired through environment variables so no keys live in
//  code, and the app runs fine without them (it records a LOGGED notification
//  instead of sending). Swap in your provider by setting the env vars below.
//
//    Email (Resend):     RESEND_API_KEY, EMAIL_FROM
//    WhatsApp (Cloud API): WHATSAPP_TOKEN, WHATSAPP_PHONE_ID
//
//  Every attempt is persisted to the Notification table for an audit trail and
//  so staff can see what the taxpayer was told.
// ============================================================================

import { prisma } from "./db";
import { STATUS_LABELS } from "./format";

interface NotifyInput {
  userId: string;
  filingId?: string;
  email?: string | null;
  phone?: string | null;
  subject: string;
  body: string;
}

async function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text: body }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendWhatsApp(to: string, body: string): Promise<boolean> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return false;
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/[^\d]/g, ""),
        type: "text",
        text: { body },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Deliver a notification over every configured channel, recording each attempt.
 * Never throws — notification failures must not break the filing flow.
 */
export async function notify(input: NotifyInput): Promise<void> {
  const targets: {
    channel: "EMAIL" | "WHATSAPP";
    recipient: string;
    send: () => Promise<boolean>;
  }[] = [];

  if (input.email) {
    targets.push({
      channel: "EMAIL",
      recipient: input.email,
      send: () => sendEmail(input.email!, input.subject, input.body),
    });
  }
  if (input.phone) {
    targets.push({
      channel: "WHATSAPP",
      recipient: input.phone,
      send: () => sendWhatsApp(input.phone!, `${input.subject}\n\n${input.body}`),
    });
  }

  // No channel available at all — record a single LOG entry.
  if (targets.length === 0) {
    await safeRecord({
      userId: input.userId,
      filingId: input.filingId,
      channel: "LOG",
      recipient: "n/a",
      subject: input.subject,
      body: input.body,
      status: "LOGGED",
    });
    return;
  }

  for (const target of targets) {
    let sent = false;
    try {
      sent = await target.send();
    } catch {
      sent = false;
    }
    await safeRecord({
      userId: input.userId,
      filingId: input.filingId,
      channel: target.channel,
      recipient: target.recipient,
      subject: input.subject,
      body: input.body,
      // If the provider isn't configured, send() returns false -> treat as LOGGED.
      status: sent ? "SENT" : "LOGGED",
    });
    if (!sent) {
      console.info(
        `[notify:${target.channel}] ${target.recipient} — ${input.subject} (logged; provider not configured)`,
      );
    }
  }
}

async function safeRecord(data: {
  userId: string;
  filingId?: string;
  channel: "EMAIL" | "WHATSAPP" | "LOG";
  recipient: string;
  subject: string;
  body: string;
  status: "SENT" | "FAILED" | "LOGGED";
}) {
  try {
    await prisma.notification.create({ data });
  } catch (e) {
    console.error("[notify] failed to record notification", e);
  }
}

/** Build + send the standard "your return moved to X" message. */
export async function notifyStatusChange(
  filingId: string,
  status: string,
  message?: string | null,
): Promise<void> {
  const filing = await prisma.filing.findUnique({
    where: { id: filingId },
    include: { user: { select: { id: true, email: true, phone: true, name: true } } },
  });
  if (!filing) return;

  const label = STATUS_LABELS[status] ?? status;
  const subject = `Your Tax Year ${filing.taxYear} return: ${label}`;
  const body =
    `Hello ${filing.user.name},\n\n` +
    `Your income tax return is now "${label}".` +
    (message ? `\n\nNote from our team: ${message}` : "") +
    `\n\nTrack it any time in your eFile Pak dashboard.`;

  await notify({
    userId: filing.user.id,
    filingId,
    email: filing.user.email,
    phone: filing.user.phone,
    subject,
    body,
  });
}
