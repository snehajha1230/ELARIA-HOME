import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmergencyEmail = async (to, userName = "Your friend") => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER, 
      subject: "🚨 SOS Alert from Elaria",
      html: `
        <h2>Emergency Alert</h2>
        <p><strong>${userName}</strong> may be in distress and needs your help.</p>
        <p>Please check on them immediately.</p>
        <hr />
        <p>Sent via <strong>Elaria</strong></p>
      `,
    };

    const response = await sgMail.send(msg);

    console.log("Email sent via SendGrid");
    return response;

  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    throw new Error("Email failed: " + error.message);
  }
};
