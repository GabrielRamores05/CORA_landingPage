"""
CORA AI Chatbot Backend
Built-in chatbot for CORA landing page
Handles customer inquiries with Tagalog conversational flow
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import json
import re
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Initialize OpenAI client (reads from OPENAI_API_KEY env var)
try:
    from openai import OpenAI
    client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY')) if os.environ.get('OPENAI_API_KEY') else None
except:
    client = None

# Store conversation history per user
conversations = {}

class CORAAssistant:
    """CORA AI Assistant chatbot"""
    
    def __init__(self):
        self.name = "CORA AI Assistant"
        self.welcome_message = (
            "👋 Hello po! Welcome to CORA — Cooperative Operations and Record Automation 😊\n\n"
            "We help cooperatives automate:\n"
            "✅ Accounting\n"
            "✅ Member records\n"
            "✅ Savings & Loans\n"
            "✅ Financial reports\n"
            "✅ CDA compliance reports\n\n"
            "Mas mabilis, organized, at less manual work po 😊\n\n"
            "Would you like po ba to receive the CORA All Feature Document? "
            "Just say 'yes' and I'll send you the PDF right away!\n\n"
            "You can also ask me po about:\n"
            "1. What is CORA?\n"
            "2. Ano ang mga features?\n"
            "3. Magkano ang price?\n"
            "4. Paano magdemo?\n"
            "5. Need internet ba?\n"
            "6. Legit ba kayo?\n"
            "7. Para saan bahagi ng cooperative?\n"
            "8. Online or offline?\n"
            "9. Support and training?\n"
            "10. How soon can we start?"
        )
        
        # Intent patterns for matching user input
        self.intents = {
            'greeting': {
                'patterns': [r'hello', r'hi\b', r'hey', r'good morning', r'good afternoon', r'kumusta', r'maayos', r'halo'],
                'response': self.handle_greeting
            },
            'what_is_cora': {
                'patterns': [r'what is cora', r'ano.*cora', r'explain.*cora', r'tulungan.*ano'],
                'response': self.handle_what_is_cora
            },
            'features': {
                'patterns': [r'features', r'ano.*automate', r'kaya.*gawin', r'ano.*features', r'ano.*pwede', r'what can'],
                'response': self.handle_features
            },
            'demo': {
                'patterns': [r'demo', r'try', r'test', r'how.*demo', r'paano.*demo', r'makita.*demo', r'access', r'login'],
                'response': self.handle_demo
            },
            'online_offline': {
                'patterns': [r'online', r'offline', r'internet', r'connection', r'kailangan.*internet'],
                'response': self.handle_online_offline
            },
            'pricing': {
                'patterns': [r'price', r'magkano', r'cost', r'how much', r'fee', r'bayad', r'presyo'],
                'response': self.handle_pricing
            },
            'trusted': {
                'patterns': [r'legit', r'trusted', r'secure', r'safe', r'real', r'authentic', r'tunay'],
                'response': self.handle_trusted
            },
            'manual_process': {
                'patterns': [r'manual', r'excel', r'naka.*excel', r'spreadsheet', r'papelado', r'walang system'],
                'response': self.handle_manual_process
            },
            'challenges': {
                'patterns': [r'challenge', r'problem', r'issue', r'difficult', r'hirap', r'problema', r'struggling'],
                'response': self.handle_challenges
            },
            'yes_response': {
                'patterns': [r'^yes$', r'^yes\s*$', r'^oo$', r'^sige$', r'^sure$', r'^okay$'],
                'response': self.handle_yes
            }
        }
    
    def match_intent(self, user_input):
        """Match user input to an intent"""
        user_input_lower = user_input.lower()
        
        for intent_name, intent_data in self.intents.items():
            for pattern in intent_data['patterns']:
                if re.search(pattern, user_input_lower):
                    return intent_name, intent_data['response']
        
        return None, None
    
    def handle_greeting(self, user_input, session_data):
        """Handle greeting messages"""
        responses = [
            "Hello po! 😊 Salamat sa interes sa CORA. May tanong po kayo about cooperative automation?",
            "Hi po! Great to connect with you 😊 How can I help your cooperative ngayon?",
            "Kumusta po! Welcome sa CORA 😊 What brings you here today?"
        ]
        return responses[0]
    
    def handle_what_is_cora(self, user_input, session_data):
        """Handle 'What is CORA?' questions"""
        response = (
            "CORA po is a cooperative management system designed para ma-automate ang operations, "
            "accounting, at records ng cooperative 😊\n\n"
            "It helps reduce manual work, pabilisin ang reports, at mas maging organized and CDA-compliant ang processes.\n\n"
            "Currently po ba manual pa rin ang process ninyo or gumagamit na kayo ng system?"
        )
        session_data['stage'] = 'understanding_current_process'
        return response
    
    def handle_features(self, user_input, session_data):
        """Handle feature inquiries"""
        response = (
            "CORA can automate:\n"
            "✅ Member records\n"
            "✅ Savings & loans\n"
            "✅ Accounting\n"
            "✅ Financial reports\n"
            "✅ Patronage refund computation\n"
            "✅ Surplus computation\n"
            "✅ CDA-related reports\n"
            "✅ Transaction monitoring\n\n"
            "Goal po ni CORA is gawing mas simple, organized, at efficient ang cooperative operations 😊\n\n"
            "Which of these po is most important sa cooperative ninyo?"
        )
        return response
    
    def handle_demo(self, user_input, session_data):
        """Handle demo requests"""
        response = (
            "You can access the CORA demo here po 😊\n\n"
            "🔗 https://cora-cooperative.vercel.app/\n\n"
            "Feel free po to explore the features. We also conduct FREE online demo presentations "
            "if gusto ninyo ng guided walkthrough 😊\n\n"
            "Would you like po ba to join our free online demo presentation?"
        )
        session_data['stage'] = 'demo_offered'
        return response
    
    def handle_online_offline(self, user_input, session_data):
        """Handle online/offline capability questions"""
        response = (
            "CORA po is an online system with offline capability 😊\n\n"
            "Meaning kahit mawalan ng internet temporarily, pwede pa rin mag-work then "
            "automatic mag-uupdate/sync ang data once connected ulit sa internet.\n\n"
            "So no worries about connectivity issues, your cooperative can still operate seamlessly po!"
        )
        return response
    
    def handle_pricing(self, user_input, session_data):
        """Handle pricing inquiries"""
        response = (
            "Ang CORA po starts at ₱30,000 annually 😊\n\n"
            "This helps automate cooperative operations, accounting, records, and reporting "
            "para mas mabilis at organized ang workflow.\n\n"
            "We can also guide you po based sa size and needs ng cooperative ninyo 😊\n\n"
            "Would you like po ba makita ang actual demo or mas malaman ang package options?"
        )
        session_data['stage'] = 'pricing_shared'
        return response
    
    def handle_trusted(self, user_input, session_data):
        """Handle trust/legitimacy questions"""
        response = (
            "Yes po 😊 CORA is designed specifically for cooperatives to help simplify operations, "
            "improve organization, and make reporting easier.\n\n"
            "The goal po is to reduce manual workload and help cooperatives become more efficient and compliant.\n\n"
            "We're backed by Edgepoint Solutions, Inc., a trusted IT solutions provider 😊\n\n"
            "Interested po ba to see CORA in action?"
        )
        session_data['stage'] = 'trust_established'
        return response
    
    def handle_manual_process(self, user_input, session_data):
        """Handle manual process challenges"""
        response = (
            "That's actually very common po 😊\n\n"
            "Maraming cooperatives ang nakaka-experience ng delayed reports, duplicate records, "
            "at stressful computations dahil manual process pa rin.\n\n"
            "CORA helps automate these tasks para mas mabilis, organized, at less hassle ang operations.\n\n"
            "What is your biggest challenge po ngayon sa operations or reporting?"
        )
        session_data['stage'] = 'identifying_challenges'
        return response
    
    def handle_challenges(self, user_input, session_data):
        """Handle challenge identification"""
        # Extract challenges from user input
        response = (
            "I understand po 😊 That's exactly what CORA was designed to solve.\n\n"
            "Many cooperatives face similar challenges, and CORA has helped them become more efficient.\n\n"
            "Would you be interested po ba to see how CORA can specifically help your cooperative? "
            "We offer a FREE guided demo 😊"
        )
        session_data['stage'] = 'ready_for_demo'
        session_data['challenges_noted'] = user_input
        return response
    
    def handle_yes(self, user_input, session_data):
        """Handle yes response for PDF request"""
        response = (
            "Opo! Narito na po ang CORA All Feature Document 😊\n\n"
            "📄 Download link: /PDF/CORA_PROPOSAL1.pdf\n\n"
            "This document contains all the features and benefits of CORA. "
            "Please review po and let me know if you have any questions!"
        )
        session_data['stage'] = 'pdf_sent'
        return response
    
    def handle_default(self, user_input, session_data):
        """Handle unmatched inputs with a helpful response"""
        responses = [
            "That's a great question po 😊 Can you tell me more po about what you're looking for?",
            "Interesting po 😊 How can CORA help your cooperative with that?",
            "I appreciate po the question 😊 Maybe I can help better if you share po more about your cooperative's current setup?"
        ]
        return responses[0]
    
    def get_response(self, user_input, user_id):
        """Main method to get chatbot response"""
        # Initialize session if new user
        if user_id not in conversations:
            conversations[user_id] = {
                'history': [],
                'stage': 'greeting',
                'timestamp': datetime.now().isoformat()
            }
        
        session_data = conversations[user_id]
        
        # Add user message to history
        session_data['history'].append({
            'role': 'user',
            'content': user_input,
            'timestamp': datetime.now().isoformat()
        })
        
        # Try OpenAI first if API key is available
        try:
            if client is not None:
                messages = [
                    {"role": "system", "content": "You are CORA, a helpful AI assistant for a cooperative management system in the Philippines. Speak in Tagalog/Taglish (mix of Tagalog and English). Always be polite and use 'po' and 'opo'. Keep responses concise but helpful. Use emojis sparingly."}
                ]
                # Add conversation history
                for msg in session_data['history']:
                    messages.append({"role": msg['role'], "content": msg['content']})
                
                completion = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=messages,
                    max_tokens=200,
                    temperature=0.7
                )
                response = completion.choices[0].message.content
                intent = 'openai_response'
            else:
                raise Exception("No OpenAI API key")
        except Exception as e:
            # Fallback to rule-based responses
            intent, handler = self.match_intent(user_input)
            if intent and handler:
                response = handler(user_input, session_data)
            else:
                response = self.handle_default(user_input, session_data)
        
        # Add bot response to history
        session_data['history'].append({
            'role': 'assistant',
            'content': response,
            'timestamp': datetime.now().isoformat(),
            'intent': intent
        })
        
        return {
            'response': response,
            'intent': intent,
            'stage': session_data.get('stage', 'unknown')
        }

# Initialize assistant
assistant = CORAAssistant()

@app.route('/')
@app.route('/index.html')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    return send_from_directory('.', 'index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat endpoint"""
    try:
        data = request.json
        user_input = data.get('message', '').strip()
        user_id = data.get('user_id', 'anonymous')
        
        if not user_input:
            return jsonify({
                'error': 'Message is required',
                'success': False
            }), 400
        
        # Get response from assistant
        result = assistant.get_response(user_input, user_id)
        
        return jsonify({
            'success': True,
            'response': result['response'],
            'intent': result['intent'],
            'stage': result['stage']
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/api/chat/start', methods=['POST'])
def start_chat():
    """Start a new chat session"""
    try:
        user_id = request.json.get('user_id', f"user_{datetime.now().timestamp()}")
        
        # Initialize new conversation
        conversations[user_id] = {
            'history': [],
            'stage': 'greeting',
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'user_id': user_id,
            'welcome_message': assistant.welcome_message
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/api/chat/history/<user_id>', methods=['GET'])
def get_history(user_id):
    """Get conversation history"""
    try:
        if user_id in conversations:
            return jsonify({
                'success': True,
                'history': conversations[user_id]['history']
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Conversation not found'
            }), 404
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'CORA Chatbot API',
        'timestamp': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    print("CORA AI Assistant Starting...")
    print("Server running on http://localhost:5000")
    print("Chat API: http://localhost:5000/api/chat")
    app.run(debug=True, port=5000, threaded=True)
