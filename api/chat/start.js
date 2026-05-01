import { initConversation, welcomeMessage } from '../../utils/chatbot.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id } = req.body;
    const userId = user_id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    initConversation(userId);
    
    res.status(200).json({
      success: true,
      user_id: userId,
      welcome_message: welcomeMessage
    });
  } catch (error) {
    console.error('Start chat error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
}