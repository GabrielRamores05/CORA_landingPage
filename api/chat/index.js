import { generateResponse } from '../../utils/chatbot.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, user_id } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required', success: false });
    }

    const response = await generateResponse(message, user_id || 'anonymous');
    
    res.status(200).json({
      success: true,
      response: response.response,
      intent: response.intent,
      stage: response.stage
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
}