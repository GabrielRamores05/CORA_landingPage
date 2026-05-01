// Conversation storage (in-memory, resets between requests)
let conversations = {};

// Welcome message
export const welcomeMessage = `👋 Hello po! Welcome to CORA — Cooperative Operations and Record Automation 😊

We help cooperatives automate:
✅ Accounting
✅ Member records
✅ Savings & Loans
✅ Financial reports
✅ CDA compliance reports

Mas mabilis, organized, at less manual work po 😊

Would you like po ba to receive the CORA All Feature Document? Just say 'yes' and I'll send you the PDF right away!

You can also ask me po about (1-15):
1. What is CORA?
2. Ano ang mga features?
3. Magkano ang price?
4. Paano magdemo?
5. Need internet ba?
6. Legit ba kayo?
7. Para saan bahagi ng cooperative?
8. Online or offline?
9. Support and training?
10. How soon can we start?
11. How to migrate from manual?
12. Ano ang requirements?
13. May contract ba?
14. Support after implementation?
15. Mga payment terms?`;

// Initialize new conversation
export function initConversation(userId) {
  conversations[userId] = {
    history: [],
    stage: 'greeting',
    timestamp: new Date().toISOString()
  };
}

// Pattern matching for intent detection
function matchIntent(userInput) {
  const input = userInput.toLowerCase();
  
  const intents = {
    greeting: [/hello/, /hi\b/, /hey/, /good morning/, /kumusta/, /halo/],
    what_is_cora: [/what is cora/, /ano.*cora/, /explain/],
    features: [/features/, /ano.*automate/, /kaya.*gawin/, /ano.*pwede/],
    demo: [/demo/, /try/, /test/, /paano.*demo/, /makita/],
    online_offline: [/online/, /offline/, /internet/, /connection/, /kailangan/],
    pricing: [/price/, /magkano/, /cost/, /how much/, /bayad/, /presyo/],
    trusted: [/legit/, /trusted/, /secure/, /safe/, /tunay/],
    manual_process: [/manual/, /excel/, /naka.*excel/, /papelado/],
    challenges: [/challenge/, /problem/, /issue/, /hirap/, /problema/],
    yes_response: [/^yes$/, /^oo$/, /^sige$/, /^sure$/, /^okay$/]
  };
  
  for (const [intent, patterns] of Object.entries(intents)) {
    for (const pattern of patterns) {
      if (pattern.test(input)) {
        return intent;
      }
    }
  }
  return null;
}

// Handle responses
function getResponse(intent, userInput) {
  const questions = `You can also ask me po about (1-15):
1. What is CORA?
2. Ano ang mga features?
3. Magkano ang price? (₱36,000)
4. Paano magdemo?
5. Need internet ba?
6. Legit ba kayo?
7. Para saan bahagi ng cooperative?
8. Online or offline?
9. Support and training?
10. How soon can we start?
11. How to migrate from manual?
12. Ano ang requirements?
13. May contract ba?
14. Support after implementation?
15. Mga payment terms?`;
  
  switch (intent) {
    case 'greeting':
      return "Hello po! 😊 Salamat sa interes sa CORA. May tanong po kayo about cooperative automation?";
    case 'what_is_cora':
      return "CORA po is a cooperative management system designed para ma-automate ang operations, accounting, at records ng cooperative 😊\n\nIt helps reduce manual work, pabilisin ang reports, at mas maging organized and CDA-compliant ang processes.";
    case 'features':
      return "CORA can automate:\n✅ Member records\n✅ Savings & loans\n✅ Accounting\n✅ Financial reports\n✅ Patronage refund computation\n✅ Surplus computation\n✅ CDA-related reports\n✅ Transaction monitoring";
    case 'demo':
      return "You can access the CORA demo here po 😊\n\n🔗 https://cora-cooperative.vercel.app/\n\nWe also conduct FREE online demo presentations!";
    case 'online_offline':
      return "CORA po is an online system with offline capability 😊\n\nMeaning kahit mawalan ng internet temporarily, pwede pa rin mag-work!";
    case 'pricing':
      return "Ang CORA po starts at ₱30,000 annually 😊\n\nWould you like po ba makita ang actual demo?";
    case 'trusted':
      return "Yes po 😊 CORA is designed specifically for cooperatives. We're backed by Edgepoint Solutions, Inc.";
    case 'manual_process':
      return "That's common po 😊 Many cooperatives still do manual process. CORA helps automate these tasks!";
    case 'yes_response':
      return "Opo! Narito na po ang CORA All Feature Document 😊\n\n📄 Download: /PDF/CORA_PROPOSAL1.pdf";
    default:
      return "That's a great question po 😊 Can you tell me more po about what you're looking for?";
  }
}

// Main response generator
export function generateResponse(userInput, userId) {
  // Initialize if new user
  if (!conversations[userId]) {
    initConversation(userId);
  }
  
  const session = conversations[userId];
  
  // Add user message to history
  session.history.push({
    role: 'user',
    content: userInput,
    timestamp: new Date().toISOString()
  });
  
  // Match intent
  const intent = matchIntent(userInput);
  const response = getResponse(intent, userInput);
  session.stage = intent || 'unknown';
  
  // Add bot response to history
  session.history.push({
    role: 'assistant',
    content: response,
    timestamp: new Date().toISOString(),
    intent
  });
  
  return { response, intent, stage: session.stage };
}