export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    service: 'CORA Chatbot API',
    timestamp: new Date().toISOString()
  });
}