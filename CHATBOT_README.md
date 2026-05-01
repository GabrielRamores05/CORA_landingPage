# 🤖 CORA AI Chatbot System

## Overview
The CORA AI Chatbot is an intelligent customer service assistant built into the landing page to handle cooperative inquiries in a friendly, conversational Taglish manner.

**Key Features:**
- ✅ Warm, professional Taglish communication
- ✅ Intent-based conversation flow
- ✅ Lead qualification system
- ✅ Product feature explanation
- ✅ Demo booking guidance
- ✅ Conversation history tracking
- ✅ Mobile-responsive design
- ✅ Modern, polished UI

---

## System Architecture

### Components

1. **Backend (Python/Flask)** - `cora_chatbot.py`
   - RESTful API endpoints for chat
   - Natural language understanding with regex pattern matching
   - Intent recognition
   - Conversation session management
   - Predefined response templates

2. **Frontend (JavaScript)** - `cora-chat.js`
   - Chat widget UI component
   - Message display and formatting
   - API communication
   - Conversation management
   - Typing indicators

3. **Styling (CSS)** - `cora-chat.css`
   - Professional chat interface
   - Responsive design
   - Animations and transitions
   - Dark/Light theme support

---

## Installation & Setup

### Prerequisites
- Python 3.7+
- pip (Python package manager)
- Modern web browser

### Step 1: Install Python Dependencies

```bash
cd d:\Cora\CORA_landingPage
pip install -r requirements.txt
```

**Required packages:**
- Flask==2.3.3
- flask-cors==4.0.0
- Werkzeug==2.3.7

### Step 2: Start the Chatbot Backend

```bash
python cora_chatbot.py
```

You should see:
```
🤖 CORA AI Assistant Starting...
📍 Server running on http://localhost:5000
📊 Chat API: http://localhost:5000/api/chat
```

### Step 3: Start the Frontend Server

In a separate terminal:
```bash
cd d:\Cora\CORA_landingPage
python -m http.server 8000
```

### Step 4: Open in Browser

Navigate to: `http://localhost:8000`

The chatbot will appear in the bottom-right corner of the landing page.

---

## API Endpoints

### 1. Start Chat Session
**POST** `/api/chat/start`

```json
Request:
{
  "user_id": "user_12345"
}

Response:
{
  "success": true,
  "user_id": "user_12345",
  "welcome_message": "👋 Hello po! Welcome to CORA..."
}
```

### 2. Send Message
**POST** `/api/chat`

```json
Request:
{
  "message": "What is CORA?",
  "user_id": "user_12345"
}

Response:
{
  "success": true,
  "response": "CORA po is a cooperative management system...",
  "intent": "what_is_cora",
  "stage": "understanding_current_process"
}
```

### 3. Get Conversation History
**GET** `/api/chat/history/<user_id>`

```json
Response:
{
  "success": true,
  "history": [
    {
      "role": "assistant",
      "content": "Welcome message...",
      "timestamp": "2026-05-01T10:00:00"
    },
    {
      "role": "user",
      "content": "What is CORA?",
      "timestamp": "2026-05-01T10:00:05"
    }
  ]
}
```

### 4. Health Check
**GET** `/api/health`

```json
Response:
{
  "status": "healthy",
  "service": "CORA Chatbot API",
  "timestamp": "2026-05-01T10:00:00"
}
```

---

## Intent Types & Handlers

### Supported Intents

| Intent | Trigger Patterns | Purpose |
|--------|------------------|---------|
| `greeting` | hello, hi, kumusta | Welcome and engage user |
| `what_is_cora` | what is cora, ano ang cora | Explain CORA |
| `features` | features, ano automate | List features |
| `demo` | demo, try, paano demo | Provide demo access |
| `online_offline` | online, offline, internet | Explain connectivity |
| `pricing` | price, magkano, cost | Share pricing info |
| `trusted` | legit, trusted, secure | Build credibility |
| `manual_process` | manual, excel, papelado | Address pain point |
| `challenges` | challenge, problem, hirap | Identify needs |

---

## Conversation Flow

```
1. Greeting
   ↓
2. Interest Assessment
   ├─ What is CORA?
   ├─ Features inquiry
   └─ Demo request
   ↓
3. Challenge Identification
   ├─ Manual process pain points
   └─ Specific needs
   ↓
4. Solution Presentation
   ├─ Feature explanation
   ├─ Pricing
   └─ Demo invitation
   ↓
5. Lead Qualification
   └─ Collect cooperative info
```

---

## Configuration

### Customize Welcome Message
Edit in `cora_chatbot.py`, line ~20:

```python
self.welcome_message = "Your custom welcome message here"
```

### Add New Intent
1. Add pattern and handler in `self.intents` dictionary
2. Implement handler method
3. Update intent matching logic

### Change API Port
In `cora_chatbot.py`, last line:
```python
app.run(debug=True, port=5000)  # Change 5000 to desired port
```

### Update Frontend API URL
In `cora-chat.js`, line ~15:
```javascript
this.apiUrl = options.apiUrl || 'http://localhost:5000/api';
```

---

## Conversation Session Management

Each user gets a unique session stored in memory:

```python
conversations = {
  'user_id': {
    'history': [...],
    'stage': 'current_stage',
    'challenges_noted': 'user challenges',
    'timestamp': 'ISO timestamp'
  }
}
```

**Session Data:**
- `history` - Array of all messages (user and bot)
- `stage` - Current conversation stage
- `challenges_noted` - Identified cooperative challenges
- `timestamp` - When session started

---

## Customization Guide

### 1. Change Chatbot Personality
Modify response templates in intent handlers:

```python
def handle_greeting(self, user_input, session_data):
    responses = [
        "Your custom response 1",
        "Your custom response 2",
    ]
    return responses[0]
```

### 2. Add New Features to Explain
Update features list in `handle_features()`:

```python
response = (
    "CORA can automate:\n"
    "✅ New Feature 1\n"
    "✅ New Feature 2\n"
    # ... add more
)
```

### 3. Customize UI Theme
Edit `cora-chat.css` variables:

```css
:root {
  --cora-orange: #E78C13;  /* Change brand color */
  --cora-dark: #0F1419;
  /* ... update other colors */
}
```

### 4. Change Chat Widget Size
In `cora-chat.css`:

```css
.cora-chat-widget {
  width: 420px;    /* Change width */
  height: 600px;   /* Change height */
}
```

---

## Analytics & Tracking

### Track User Intents
```python
# View intent frequency
for user_id, conversation in conversations.items():
    for message in conversation['history']:
        if 'intent' in message:
            print(f"Intent: {message['intent']}")
```

### Export Conversation Data
```python
import json

# Save all conversations
with open('conversations.json', 'w') as f:
    json.dump(conversations, f, indent=2)
```

---

## Troubleshooting

### Issue: Chatbot not loading
**Solution:**
- Check if Flask server is running on port 5000
- Verify CORS is enabled in Flask
- Check browser console for errors (F12)

### Issue: API connection errors
**Solution:**
- Verify backend URL in `cora-chat.js`
- Ensure both servers are running
- Check firewall settings

### Issue: Styling not applied
**Solution:**
- Clear browser cache (Ctrl+Shift+Del)
- Verify `cora-chat.css` is linked in HTML
- Check CSS file path

### Issue: CORS errors
**Solution:**
- Ensure `flask-cors` is installed
- CORS is already enabled in `cora_chatbot.py`
- Check server port configuration

---

## Deployment

### Production Deployment Checklist

- [ ] Set Flask `debug=False`
- [ ] Use production WSGI server (Gunicorn)
- [ ] Enable HTTPS
- [ ] Set up database for persistent storage
- [ ] Configure proper logging
- [ ] Set environment variables
- [ ] Test across browsers
- [ ] Optimize API response times

### Deploy with Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 cora_chatbot:app
```

### Deploy Frontend to Vercel/Netlify
```bash
# Build and deploy index.html with chatbot files
vercel deploy
```

---

## Performance Optimization

### Backend Optimization
- Implement caching for common responses
- Add response time logging
- Monitor API performance

### Frontend Optimization
- Lazy load chatbot widget
- Minimize CSS/JS files
- Use service workers for offline support

---

## Security Considerations

- Sanitize user input before processing
- Implement rate limiting for API calls
- Validate all incoming requests
- Use HTTPS in production
- Store sensitive data securely
- Implement user authentication for sensitive features

---

## Future Enhancements

- [ ] Machine learning-based intent recognition
- [ ] Multi-language support (English, Filipino)
- [ ] Integration with CRM system
- [ ] Persistent database storage
- [ ] Real human handoff capability
- [ ] Sentiment analysis
- [ ] Advanced lead scoring
- [ ] Email/SMS integration

---

## Support & Contact

For issues or questions about the CORA chatbot:
- Check this README first
- Review browser console for errors
- Contact Edgepoint Solutions, Inc.

---

## License

CORA AI Chatbot © 2026 Edgepoint Solutions, Inc.
All rights reserved.

---

## Version History

**v1.0.0** (May 2026)
- Initial release
- Core intent recognition
- Conversation flow
- Web UI integration

---

## Quick Start Commands

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Terminal 1: Start backend
python cora_chatbot.py

# 3. Terminal 2: Start frontend
python -m http.server 8000

# 4. Open browser
# http://localhost:8000

# Done! Chat with CORA 🤖
```

---

**Built with ❤️ for Philippine cooperatives**
