# 🚀 QUICK START GUIDE - CORA Chatbot

## ⚡ Get Started in 3 Steps

### Step 1️⃣: Install Dependencies (2 min)

Open PowerShell and navigate to the project folder:

```powershell
cd d:\Cora\CORA_landingPage
pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed Flask-2.3.3 flask-cors-4.0.0 Werkzeug-2.3.7
```

---

### Step 2️⃣: Start Backend Server (1 min)

Keep this terminal open:

```powershell
python cora_chatbot.py
```

**Expected output:**
```
🤖 CORA AI Assistant Starting...
📍 Server running on http://localhost:5000
📊 Chat API: http://localhost:5000/api/chat
 * Running on http://127.0.0.1:5000
```

---

### Step 3️⃣: Start Frontend Server (1 min)

Open a NEW PowerShell terminal:

```powershell
cd d:\Cora\CORA_landingPage
python -m http.server 8000
```

**Expected output:**
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

---

### Step 4️⃣: Open in Browser (Instant! 🎉)

Go to: **http://localhost:8000**

You should see:
- ✅ Landing page loads
- ✅ Chatbot widget appears in bottom-right corner
- ✅ Click to open and start chatting!

---

## 💬 Test the Chatbot

Try these messages:

| Message | Expected Response |
|---------|-------------------|
| "Hello" | Greeting + ask about cooperative |
| "What is CORA?" | Explain CORA functionality |
| "Manual pa rin kami" | Acknowledge pain point, ask about challenges |
| "How much?" | Share pricing info |
| "Can we try demo?" | Provide demo link |

---

## 🛠️ Troubleshooting

### ❌ Backend won't start
```
Error: "Address already in use"
Solution: 
  - Kill process: taskkill /F /IM python.exe
  - Or use different port: Change port=5000 in cora_chatbot.py
```

### ❌ Chatbot widget not appearing
```
Check in browser (F12 Console):
  - Look for error messages
  - Verify backend URL is correct
  - Make sure both servers are running
```

### ❌ Messages not being sent
```
Solution:
  - Refresh page (Ctrl+F5)
  - Clear cache (Ctrl+Shift+Del)
  - Check network tab in browser DevTools
```

---

## 📁 Files Created

```
d:\Cora\CORA_landingPage\
├── cora_chatbot.py           ← Python backend
├── cora-chat.js              ← JavaScript frontend
├── cora-chat.css             ← Chat styling
├── requirements.txt          ← Python dependencies
├── CHATBOT_README.md         ← Full documentation
└── QUICK_START.md            ← This file
```

---

## 🎯 Key Features

✅ **Conversational AI** - Natural Taglish responses
✅ **Intent Recognition** - Understands user intent
✅ **Lead Qualification** - Gathers cooperative info
✅ **Demo Booking** - Guides users to demo
✅ **Session Management** - Tracks conversation history
✅ **Mobile Responsive** - Works on all devices
✅ **Professional UI** - Modern, polished design

---

## 📊 Monitoring

### Check if services are running:

```powershell
# Test backend
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost:8000

# View Python processes
Get-Process python
```

---

## 🔧 Customization

### Change Welcome Message
Edit `cora_chatbot.py` line 20

### Add New Intents
Add patterns in `self.intents` dictionary (line ~30)

### Customize UI
Edit `cora-chat.css` (colors, size, animations)

### Change API Port
Edit `cora_chatbot.py` last line + `cora-chat.js` line 15

---

## 🚀 Production Deployment

### Using Vercel (Recommended)
```bash
# Deploy frontend
vercel deploy

# Deploy backend (use Vercel serverless functions)
# Or use Railway/Render for Flask app
```

### Using Local Server
```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 cora_chatbot:app
```

---

## 📞 Support

**Need help?**
- Check console errors (F12)
- Review CHATBOT_README.md for detailed docs
- Verify both servers are running
- Test API endpoints manually

---

## ✨ Next Steps

1. ✅ Get it running locally
2. ✅ Test different user messages
3. ✅ Customize responses (if needed)
4. ✅ Deploy to production
5. ✅ Monitor conversations
6. ✅ Collect leads!

---

**🎉 You're all set! Start chatting with CORA!**

```
Frontend: http://localhost:8000
Backend:  http://localhost:5000/api
```

Keep both terminals open while developing! 🚀
