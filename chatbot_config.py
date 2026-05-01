"""
CORA Chatbot Configuration
Easy customization without editing core code
"""

# Brand Configuration
BRAND_CONFIG = {
    "name": "CORA",
    "full_name": "Cooperative Operations and Record Automation",
    "company": "Edgepoint Solutions, Inc.",
    "website": "https://cora-cooperative.vercel.app/",
    "demo_link": "https://cora-cooperative.vercel.app/",
}

# Pricing Configuration
PRICING_CONFIG = {
    "base_price": 30000,
    "currency": "PHP",
    "pricing_period": "annually",
    "description": "Helps automate cooperative operations, accounting, records, and reporting",
}

# Features List
FEATURES = [
    "Member records",
    "Savings & loans",
    "Accounting",
    "Financial reports",
    "Patronage refund computation",
    "Surplus computation",
    "CDA-related reports",
    "Transaction monitoring",
]

# Pain Points Solved
PAIN_POINTS_SOLVED = [
    "Manual records",
    "Delayed reports",
    "Spreadsheet errors",
    "Lost files",
    "Stressful accounting process",
    "Compliance problems",
    "Time-consuming computations",
]

# Target Users
TARGET_USERS = [
    "Cooperative officers",
    "Managers",
    "Bookkeepers",
    "Treasurers",
    "Board members",
    "Staff",
]

# Response Templates
RESPONSE_TEMPLATES = {
    "greeting": {
        "variants": [
            "Hello po! 😊 Salamat sa interes sa CORA. May tanong po kayo about cooperative automation?",
            "Hi po! Great to connect with you 😊 How can I help your cooperative ngayon?",
            "Kumusta po! Welcome sa CORA 😊 What brings you here today?",
        ],
        "default": "Hello po! How can I assist you today 😊"
    },
    
    "what_is_cora": {
        "main": (
            "CORA po is a cooperative management system designed para ma-automate ang operations, "
            "accounting, at records ng cooperative 😊\n\n"
            "It helps reduce manual work, pabilisin ang reports, at mas maging organized and CDA-compliant ang processes.\n\n"
        ),
        "follow_up": "Currently po ba manual pa rin ang process ninyo or gumagamit na kayo ng system?"
    },
    
    "manual_process": {
        "empathy": "That's actually very common po 😊\n\n",
        "details": (
            "Maraming cooperatives ang nakaka-experience ng delayed reports, duplicate records, "
            "at stressful computations dahil manual process pa rin.\n\n"
            "CORA helps automate these tasks para mas mabilis, organized, at less hassle ang operations."
        ),
        "follow_up": "What is your biggest challenge po ngayon sa operations or reporting?"
    },
    
    "demo": {
        "intro": "You can access the CORA demo here po 😊\n\n",
        "cta": "Feel free po to explore the features. We also conduct FREE online demo presentations if gusto ninyo ng guided walkthrough 😊\n\n",
        "follow_up": "Would you like po ba to join our free online demo presentation?"
    },
    
    "pricing": {
        "intro": "Ang CORA po starts at ₱30,000 annually 😊\n\n",
        "details": (
            "This helps automate cooperative operations, accounting, records, and reporting "
            "para mas mabilis at organized ang workflow.\n\n"
            "We can also guide you po based sa size and needs ng cooperative ninyo 😊"
        ),
        "follow_up": "Would you like po ba makita ang actual demo or mas malaman ang package options?"
    },
    
    "online_offline": {
        "main": (
            "CORA po is an online system with offline capability 😊\n\n"
            "Meaning kahit mawalan ng internet temporarily, pwede pa rin mag-work then "
            "automatic mag-uupdate/sync ang data once connected ulit sa internet.\n\n"
            "So no worries about connectivity issues, your cooperative can still operate seamlessly po!"
        )
    },
    
    "trusted": {
        "main": (
            "Yes po 😊 CORA is designed specifically for cooperatives to help simplify operations, "
            "improve organization, and make reporting easier.\n\n"
            "The goal po is to reduce manual workload and help cooperatives become more efficient and compliant.\n\n"
            "We're backed by Edgepoint Solutions, Inc., a trusted IT solutions provider 😊"
        ),
        "follow_up": "Interested po ba to see CORA in action?"
    },
}

# Emojis Configuration
EMOJIS = {
    "feature_check": "✅",
    "problem": "❌",
    "cursor": "→",
    "phone": "📱",
    "chart": "📊",
    "alert": "⚠️",
    "wave": "👋",
    "smile": "😊",
    "rocket": "🚀",
    "target": "🎯",
    "check": "✓",
}

# Conversation Stages
CONVERSATION_STAGES = {
    "greeting": "User has greeted the bot",
    "understanding_current_process": "Learning about current operations",
    "identifying_challenges": "Discovering pain points",
    "feature_exploration": "Discussing CORA features",
    "demo_offered": "Demo has been offered",
    "pricing_shared": "Pricing information shared",
    "trust_established": "User trust has been built",
    "ready_for_demo": "Ready to schedule demo",
    "qualified_lead": "Lead is sales-ready",
}

# Tone Guidelines
TONE_GUIDELINES = {
    "warmth": "Always sound friendly and approachable",
    "professionalism": "Maintain professional standards",
    "simplicity": "Use simple, easy-to-understand language",
    "taglish": "Mix Filipino, English, and Tagalog naturally",
    "human_like": "Never sound robotic or automated",
    "helpfulness": "Always try to be helpful and supportive",
    "conversational": "Keep it like a natural conversation",
}

# Question Limits
QUESTION_LIMITS = {
    "max_questions_per_message": 1,
    "context_history_limit": 10,  # Keep last 10 messages
}

# Demo Dates Configuration
DEMO_DATES = [
    {"date": "May 8, 2026", "day": "Friday", "available": True},
    {"date": "May 15, 2026", "day": "Friday", "available": True},
    {"date": "May 22, 2026", "day": "Friday", "available": True},
    {"date": "May 29, 2026", "day": "Friday", "available": True},
]

# API Configuration
API_CONFIG = {
    "host": "127.0.0.1",
    "port": 5000,
    "debug": True,
    "cors_origins": ["*"],  # In production, specify exact domains
}

# Lead Qualification Questions
QUALIFICATION_QUESTIONS = [
    {
        "id": 1,
        "question": "What type of cooperative po are you handling?",
        "type": "text",
        "required": True,
    },
    {
        "id": 2,
        "question": "Approximately ilan po members ninyo?",
        "type": "number",
        "required": False,
    },
    {
        "id": 3,
        "question": "Manual records pa rin po ba or may existing system?",
        "type": "choice",
        "options": ["Manual pa rin", "May existing system", "Mix ng both"],
        "required": True,
    },
    {
        "id": 4,
        "question": "Ano po biggest challenge ninyo ngayon?",
        "type": "text",
        "required": False,
    },
    {
        "id": 5,
        "question": "Sino usually naghahandle ng accounting/reporting?",
        "type": "text",
        "required": False,
    },
]

# Follow-up Messages
FOLLOW_UP_MESSAGES = {
    "first_follow_up": (
        "Hi po 😊 Just checking in. If interested po kayo, we can also send demo details "
        "or assist you in exploring CORA features."
    ),
    "second_follow_up": (
        "We'd be happy po to help your cooperative become more organized and automated 😊 "
        "Feel free to message anytime."
    ),
}

# Logger Configuration
LOG_CONFIG = {
    "log_level": "INFO",
    "log_file": "chatbot_logs.txt",
    "log_conversations": True,
    "log_intents": True,
}

# Performance Settings
PERFORMANCE_CONFIG = {
    "max_response_time": 2.0,  # seconds
    "cache_responses": True,
    "cache_duration": 3600,  # seconds
}

# Keywords for Intent Matching
INTENT_KEYWORDS = {
    "greeting": ["hello", "hi", "hey", "good morning", "kumusta", "halo", "maayos"],
    "what_is_cora": ["what is cora", "ano cora", "explain cora", "tulungan", "ano"],
    "features": ["features", "automate", "kaya", "ano features", "pwede", "what can"],
    "demo": ["demo", "try", "test", "paano demo", "makita", "access", "login"],
    "online_offline": ["online", "offline", "internet", "connection", "kailangan"],
    "pricing": ["price", "magkano", "cost", "how much", "fee", "bayad", "presyo"],
    "trusted": ["legit", "trusted", "secure", "safe", "real", "tunay"],
    "manual_process": ["manual", "excel", "naka excel", "papelado", "walang system"],
    "challenges": ["challenge", "problem", "issue", "hirap", "problema", "struggling"],
}

# Export all configurations
CONFIG = {
    "brand": BRAND_CONFIG,
    "pricing": PRICING_CONFIG,
    "features": FEATURES,
    "pain_points": PAIN_POINTS_SOLVED,
    "target_users": TARGET_USERS,
    "responses": RESPONSE_TEMPLATES,
    "emojis": EMOJIS,
    "stages": CONVERSATION_STAGES,
    "tone": TONE_GUIDELINES,
    "demo_dates": DEMO_DATES,
    "api": API_CONFIG,
    "qualification": QUALIFICATION_QUESTIONS,
    "follow_up": FOLLOW_UP_MESSAGES,
    "logging": LOG_CONFIG,
    "performance": PERFORMANCE_CONFIG,
    "keywords": INTENT_KEYWORDS,
}

if __name__ == "__main__":
    import json
    print(json.dumps(CONFIG, indent=2, ensure_ascii=False, default=str))
