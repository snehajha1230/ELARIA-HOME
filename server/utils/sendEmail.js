import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000, 
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('SMTP server is ready to send emails');
  } catch (error) {
    console.error('SMTP connection failed:', error.message);
  }
};

verifyTransporter();

// Send SOS Email
export const sendEmergencyEmail = async (to, userName = 'Your friend') => {
  try {
    const mailOptions = {
      from: `"Elaria SOS" <${process.env.EMAIL_USER}>`,
      to,
      subject: '🚨 SOS Alert from Elaria',
      html: `
        <h2>🚨 Emergency Alert</h2>
        <p><strong>${userName}</strong> may be in distress and needs your help.</p>
        <p>Please check on them immediately.</p>
        <hr />
        <p>Sent via <strong>Elaria</strong></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    return info;

  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email failed: ' + error.message);
  }
};
