import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const EMAIL_USER = (process.env.EMAIL_USER || "").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || "").trim();
const FROM_EMAIL = (process.env.EMAIL_FROM || process.env.EMAIL_USER || "").trim();

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("Email credentials missing (EMAIL_USER/EMAIL_PASS). SOS email will fail.");
}

export const sendEmergencyEmail = async (to, userName = "Your friend") => {
  try {
    const toEmail = (to || "").trim();
    if (!toEmail) {
      throw new Error("Missing recipient email address.");
    }
    if (!EMAIL_USER) {
      throw new Error("Missing EMAIL_USER in environment variables.");
    }

    if (!EMAIL_USER || !EMAIL_PASS) {
      throw new Error("Missing EMAIL_USER/EMAIL_PASS for Nodemailer.");
    }

    // Mirrors the SMTP setup you already use for password reset.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      to: toEmail,
      // Gmail often requires the SMTP-authenticated account as the `from` address.
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

    console.log("Email sent via Nodemailer:", {
      to: toEmail,
      messageId: info?.messageId,
      response: info?.response,
    });
    return { accepted: true, messageId: info?.messageId || null, response: info || null };

  } catch (error) {
    console.error("Nodemailer Error:", error.response?.body || error.message);
    throw new Error("Email failed: " + error.message);
  }
};
