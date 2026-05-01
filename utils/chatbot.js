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

You can also ask me po by typing the number:
1. What is CORA?
2. Ano ang mga features?
3. Paano magdemo?
4. Need internet ba?
5. Legit ba kayo?
6. Para saan bahagi ng cooperative?
7. Online or offline?
8. Support and training?
9. How soon can we start?
10. Ano ang mga benepisyo ng CORA?
11. Paano ito tumutulong sa pagbabayad ng utang?
12. May mobile app ba?
13. Safe ba ang data namin?
14. Paano ko i-install ang CORA?`;

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
  const input = userInput.toLowerCase().trim();

  // Handle exact numbers
  if (/^\d+$/.test(input)) {
    const num = parseInt(input, 10);
    const numMap = {
      1: 'what_is_cora',
      2: 'features',
      3: 'demo',
      4: 'online_offline',
      5: 'trusted',
      6: 'manual_process',
      7: 'challenges',
      8: 'yes_response',
      9: 'question_10',
      10: 'question_11',
      11: 'question_12',
      12: 'question_13',
      13: 'question_14',
      14: 'question_15'
    };
    if (numMap[num]) return numMap[num];
  }

  const intents = {
    greeting: [/hello/, /hi\b/, /hey/, /good morning/, /good afternoon/, /kumusta/, /maayos/, /halo/],
    what_is_cora: [/what is cora/, /ano.*cora/, /explain.*cora/, /tulungan.*ano/],
    features: [/features/, /ano.*automate/, /kaya.*gawin/, /ano.*features/, /ano.*pwede/, /what can/],
    pricing: [/price/, /magkano/, /cost/, /how much/, /fee/, /bayad/, /presyo/],  // redirects to demo
    demo: [/demo/, /try/, /test/, /how.*demo/, /paano.*demo/, /makita.*demo/, /access/, /login/],
    online_offline: [/online/, /offline/, /internet/, /connection/, /kailangan.*internet/],
    trusted: [/legit/, /trusted/, /secure/, /safe/, /real/, /authentic/, /tunay/],
    manual_process: [/manual/, /excel/, /naka.*excel/, /spreadsheet/, /papelado/, /walang system/],
    challenges: [/challenge/, /problem/, /issue/, /difficult/, /hirap/, /problema/, /struggling/],
    yes_response: [/^yes$/, /^yes\s*$/, /^oo$/, /^sige$/, /^sure$/, /^okay$/]
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
  const defaultMenu = `Or you can simply type a number from 1-14 to ask your question! 😊

1. What is CORA?
2. Ano ang mga features?
3. Paano magdemo?
4. Need internet ba?
5. Legit ba kayo?
6. Para saan bahagi ng cooperative?
7. Online or offline?
8. Support and training?
9. How soon can we start?
10. Ano ang mga benepisyo ng CORA?
11. Paano ito tumutulong sa pagbabayad ng utang?
12. May mobile app ba?
13. Safe ba ang data namin?
14. Paano ko i-install ang CORA?`;

  switch (intent) {
    case 'greeting':
      return "Hello po! 😊 Salamat sa interes sa CORA. May tanong po kayo about cooperative automation?";
    case 'what_is_cora':
      return "CORA po is a cooperative management system designed para ma-automate ang operations, accounting, at records ng cooperative 😊\n\nIt helps reduce manual work, pabilisin ang reports, at mas maging organized and CDA-compliant ang processes.\n\nCurrently po ba manual pa rin ang process ninyo or gumagamit na kayo ng system?";
    case 'features':
      return "CORA can automate:\n✅ Member records\n✅ Savings & loans\n✅ Accounting\n✅ Financial reports\n✅ Patronage refund computation\n✅ Surplus computation\n✅ CDA-related reports\n✅ Transaction monitoring\n\nGoal po ni CORA is gawing mas simple, organized, at efficient ang cooperative operations 😊\n\nWhich of these po is most important sa cooperative ninyo?";
    case 'demo':
      return "You can access the CORA demo here po 😊\n\n🔗https://cora-landing-page-liart.vercel.app/\n\nFeel free po to explore the features. We also conduct FREE online demo presentations if gusto ninyo ng guided walkthrough 😊\n\nWould you like po ba to join our free online demo presentation?";
    case 'online_offline':
      return "CORA po is an online system with offline capability 😊\n\nMeaning kahit mawalan ng internet temporarily, pwede pa rin mag-work then automatic mag-uupdate/sync ang data once connected ulit sa internet.\n\nSo no worries about connectivity issues, your cooperative can still operate seamlessly po!";
    case 'pricing':
      return "Great question po! 😊 Para ma-discuss namin nang maayos ang pricing based sa size at needs ng cooperative ninyo, we recommend scheduling a FREE demo first.\n\nDuring the demo, we'll:\n✅ Show you all CORA features\n✅ Discuss the best package for your cooperative\n✅ Answer all your questions live\n\nBook your free demo here po: https://cora-landing-page-liart.vercel.app\n\nOr type 'demo' para sa more details! 😊";
    case 'trusted':
      return "Yes po 😊 CORA is designed specifically for cooperatives to help simplify operations, improve organization, and make reporting easier.\n\nThe goal po is to reduce manual workload and help cooperatives become more efficient and compliant.\n\nWe're backed by Edgepoint Solutions, Inc., a trusted IT solutions provider 😊\n\nInterested po ba to see CORA in action?";
    case 'manual_process':
      return "That's actually very common po 😊\n\nMaraming cooperatives ang nakaka-experience ng delayed reports, duplicate records, at stressful computations dahil manual process pa rin.\n\nCORA helps automate these tasks para mas mabilis, organized, at less hassle ang operations.\n\nWhat is your biggest challenge po ngayon sa operations or reporting?";
    case 'challenges':
      return "I understand po 😊 That's exactly what CORA was designed to solve.\n\nMany cooperatives face similar challenges, and CORA has helped them become more efficient.\n\nWould you be interested po ba to see how CORA can specifically help your cooperative? We offer a FREE guided demo 😊";
    case 'yes_response':
      return "Opo! Narito na po ang CORA All Feature Document 😊\n\n📄 Download link: /PDF/CORA_PROPOSAL1.pdf\n\nThis document contains all the features and benefits of CORA. Please review po and let me know if you have any questions!";
    case 'question_10':
      return "Once you decide po, we can start the setup process within 1-2 weeks! 😊\n\nOur team will guide you through every step, from installation to training your staff. We make sure na smooth ang transition from your current system to CORA.\n\nMay specific timeline po ba kayo na gusto ninyo?";
    case 'question_11':
      return "Ang pangunahing benepisyo ng CORA po ay:\n\n✅ Time savings – reduce manual work by up to 70%\n✅ Accuracy – minimize human errors in calculations and records\n✅ Organization – all data in one secure system\n✅ Compliance – automatically generate CDA-required reports\n✅ Better decision making – real-time financial insights\n✅ Member satisfaction – faster service and accurate records\n\nSa kabuuang picture po, mas productive at stress-free ang cooperative operations 😊\n\nWhich benefit po is most appealing sa inyong cooperative?";
    case 'question_12':
      return "CORA helps sa loan management sa ibang paraan po 😊:\n\n✅ Automated loan tracking – monitor balances, payments, and due dates\n✅ Automatic interest computation – based sa inyong agreed terms\n✅ Payment reminders – automated notices sa members\n✅ Delinquency tracking – easily identify overdue accounts\n✅ Loan statements – generate accurate statements for members\n✅ Collateral management – track secured loans properly\n\nThis means less time on paperwork and more time on serving your members! 😊\n\nMay specific loan management challenge po ba kayo na inyong nais lubusan?";
    case 'question_13':
      return "Currently po, CORA is accessible through any web browser – whether desktop, laptop, tablet, or smartphone! 😊\n\nThis means:\n✅ No need to download or install any app\n✅ Accessible kahit saan na may internet connection\n✅ Automatic updates – you always have the latest version\n✅ Works on any operating system (Windows, Mac, Android, iOS)\n\nSo kahit walang dedicated mobile app, pwede pa rin ninyo gamitan ang CORA sa inyong mobile devices through the browser po! 😊\n\nGusto ninyo ba sabihin kung paano ito accessible sa mobile?";
    case 'question_14':
      return "Opo po! Ang security ng inyong data ay ating utmost priority 😊\n\nWe implement multiple layers of protection:\n\n✅ Data encryption – all data encrypted in transit and at rest\n✅ Secure servers – hosted on reliable, secure infrastructure\n✅ Regular backups – automated backups to prevent data loss\n✅ Access controls – role-based permissions para sa ibang users\n✅ Audit trails – track who accessed what and when\n✅ Privacy compliance – aligned with Philippine data privacy laws\n\nInyong cooperative data ay safe and secure with CORA po! 😊\n\nMay specific security concern po ba kayo na inyong nais i-address?";
    case 'question_15':
      return "Ang installation process ng CORA po is simple and guided! 😊\n\nHere's what to expect:\n\n1. We'll set up your CORA instance sa secure server\n2. Configure ito based sa inyong cooperative's specific needs\n3. Migrate ang inyong existing data (if mayroon)\n4. Conduct training sessions para sa inyong staff and officers\n5. Provide ongoing support durante at pagkatapos ng setup\n\nThe best part po? Handle namin ang lahat ng technical setup – inyong team po only needs to focus on learning how to use the system! 😊\n\nReady ninyo ba umisa sa installation process?";
    default:
      const inputStr = String(userInput || '').trim();
      if (/^\d+$/.test(inputStr)) {
        return "Sorry po, invalid number. Please type a number between 1 and 14. 😊";
      }
      return "That's a great question po 😊 Can you tell me more po about what you're looking for?\n\n" + defaultMenu;
  }
}

// Main response generator
export async function generateResponse(userInput, userId) {
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