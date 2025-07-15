import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

export const talkToAi = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided.' });
  }

  console.log("Hugging Face API Key:", process.env.HF_API_KEY);

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        inputs: `You are Elaria, a kind and empathetic AI helping users with mental health. Be supportive, warm, and gentle. User says: "${message}"`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiReply = response.data[0]?.generated_text || "I'm here to listen. Please share more with me.";

    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error('Hugging Face API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI failed to respond. Please try again later.' });
  }
};
