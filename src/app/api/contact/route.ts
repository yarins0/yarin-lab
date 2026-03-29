import { Resend } from "resend";
import { NextResponse } from "next/server";

/*
  POST /api/contact

  Request body (JSON):
    { name: string, email: string, message: string }

  Responses:
    200 — email sent successfully
    400 — missing or empty required fields
    500 — server misconfiguration (RESEND_API_KEY not set)
    503 — Resend API call failed

  The Resend client is initialised here (server-only module) so the API key
  is never included in the client bundle.
*/

function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function parseAndValidateBody(body: unknown): {
  name: string;
  email: string;
  message: string;
} | null {
  if (!body || typeof body !== "object") return null;
  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return null;
  }
  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(name: string, email: string, message: string): string {
  return `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
  `;
}

export async function POST(request: Request) {
  const resend = createResendClient();
  if (!resend) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fields = parseAndValidateBody(rawBody);
  if (!fields) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? "yarinso39@gmail.com";

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: fields.email,
      subject: `Portfolio message from ${fields.name}`,
      html: buildEmailHtml(fields.name, fields.email, fields.message),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 503 }
    );
  }
}
