import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmergencyWhatsApp = async (phone, userName = 'Your friend') => {
  const apiKey = process.env.GUPSHUP_API_KEY;
  const source = process.env.GUPSHUP_SOURCE_NUMBER; // Your WhatsApp business number ID
  const destination = `91${phone}`; // Assuming India. Prefix with country code.
  const message = `🚨 SOS ALERT:\n${userName} may be in distress. Please check on them immediately.\n- Elaria`;

  try {
    const response = await axios.post('https://api.gupshup.io/sm/api/v1/msg', null, {
      params: {
        channel: 'whatsapp',
        source,
        destination,
        message,
        'src.name': 'ELARIA',
      },
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Gupshup WhatsApp Error:', error?.response?.data || error);
    return null;
  }
};
