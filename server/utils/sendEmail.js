import dotenv from "dotenv";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

dotenv.config();

const EMAIL_USER = (process.env.EMAIL_USER || "").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || "").trim();
const FROM_EMAIL = (process.env.EMAIL_FROM || process.env.EMAIL_USER || "").trim();
const SENDGRID_API_KEY = (process.env.SENDGRID_API_KEY || "").trim();

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("Email credentials missing (EMAIL_USER/EMAIL_PASS). SOS email will fail.");
}
if (!SENDGRID_API_KEY) {
  console.warn("SendGrid API key missing (SENDGRID_API_KEY). SendGrid email will fail.");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export const sendEmergencyEmail = async (to, userName = "Your friend") => {
  try {
    const toEmail = (to || "").trim();
    if (!toEmail) {
      throw new Error("Missing recipient email address.");
    }

    // Render (and many hosts) block outbound SMTP. Prefer HTTP-based email APIs in production.
    // Selection rules:
    // - If SENDGRID_API_KEY exists: use SendGrid
    // - Otherwise: use SMTP (local dev)
    if (SENDGRID_API_KEY) {
      if (!FROM_EMAIL) {
        throw new Error("Missing EMAIL_FROM (or EMAIL_USER) for SendGrid from address.");
      }

      const msg = {
        to: toEmail,
        from: `Elaria Support <${FROM_EMAIL}>`,
        replyTo: FROM_EMAIL,
        subject: "🚨 SOS Alert from Elaria",
        text: `SOS Alert from Elaria: ${userName} may be in distress and needs your help.`,
        html: `
          <h2>Emergency Alert</h2>
          <p><strong>${userName}</strong> may be in distress and needs your help.</p>
          <p>Please check on them immediately.</p>
          <hr />
          <p>Sent via <strong>Elaria</strong></p>
        `,
      };

      const response = await sgMail.send(msg);
      const first = Array.isArray(response) ? response[0] : response;
      const messageId =
        first?.headers?.["x-message-id"] ||
        first?.headers?.["X-Message-Id"] ||
        null;

      console.log("Email sent via SendGrid:", {
        to: toEmail,
        statusCode: first?.statusCode ?? null,
        messageId,
      });

      return {
        accepted: true,
        provider: "sendgrid",
        messageId,
        response: first || response || null,
      };
    }

    // SMTP fallback (best for local only)
    if (!EMAIL_USER) throw new Error("Missing EMAIL_USER in environment variables.");
    if (!EMAIL_PASS) throw new Error("Missing EMAIL_PASS in environment variables.");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    const info = await transporter.sendMail({
      to: toEmail,
      from: `Elaria Support <${EMAIL_USER}>`,
      replyTo: FROM_EMAIL || EMAIL_USER,
      subject: "🚨 SOS Alert from Elaria",
      text: `SOS Alert from Elaria: ${userName} may be in distress and needs your help.`,
      html: `
          <h2>Emergency Alert</h2>
          <p><strong>${userName}</strong> may be in distress and needs your help.</p>
          <p>Please check on them immediately.</p>
          <hr />
          <p>Sent via <strong>Elaria</strong></p>
        `,
    });

    console.log("Email sent via Nodemailer (SMTP):", {
      to: toEmail,
      messageId: info?.messageId,
      response: info?.response,
    });

    return {
      accepted: true,
      provider: "smtp",
      messageId: info?.messageId || null,
      response: info || null,
    };

  } catch (error) {
    console.error("Nodemailer Error:", {
      message: error?.message,
      code: error?.code,
      response: error?.response?.body || error?.response || null,
    });
    throw new Error("Email failed: " + (error?.code ? `${error.code} - ${error.message}` : error?.message || 'Unknown'));
  }
};
