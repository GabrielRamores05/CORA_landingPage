/**
 * CORA Chatbot Widget
 * Embedded chat interface for the landing page
 */

class CORAChat {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || '/api';
    this.userId = options.userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.containerId = options.containerId || 'cora-chat-widget';
    this.theme = options.theme || 'light';
    this.position = options.position || 'bottom-right';
    
    this.isOpen = false;
    this.isWaitingForResponse = false;
    this.hasTrackedOpen = false;
    this.hasTrackedMessage = false;
    
    this.init();
  }
  
  async init() {
    this.createWidget();
    await this.startChat();
  }
  
  createWidget() {
    // Check if container exists, if not create it
    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.appendChild(container);
    }
    
    // Create chatbot HTML
    const chatbotHTML = `
      <div class="cora-chat-widget ${this.theme}" style="display: ${this.isOpen ? 'flex' : 'none'};">
        <!-- Chat Header -->
        <div class="cora-chat-header">
          <div class="cora-chat-header-content">
            <div class="cora-chat-avatar">
              <img src="images/CORAlogo.png" alt="CORA" style="width: 24px; height: 24px; object-fit: contain;">
            </div>
            <div class="cora-chat-header-info">
              <h3>CORA Assistant</h3>
              <p class="cora-status">Online 🟢</p>
            </div>
          </div>
          <button class="cora-chat-close" id="cora-close-btn">✕</button>
        </div>
        
        <!-- Chat Messages -->
        <div class="cora-chat-messages" id="cora-messages">
          <!-- Messages will be added here -->
        </div>
        
        <!-- Chat Input -->
        <div class="cora-chat-input-area">
          <input 
            type="text" 
            id="cora-input" 
            class="cora-chat-input" 
            placeholder="Type your message... (or message in Taglish po 😊)"
            autocomplete="off"
          />
          <button class="cora-chat-send" id="cora-send-btn">
            <span>📤</span>
          </button>
        </div>
      </div>
      
      <!-- Chat Toggle Button (Minimized) -->
      <button class="cora-chat-toggle" id="cora-toggle-btn" style="display: ${this.isOpen ? 'none' : 'flex'};">
        <span class="cora-chat-toggle-label">Chat</span>
      </button>
    `;
    
    container.innerHTML = chatbotHTML;
    
    // Add event listeners
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Close button
    document.getElementById('cora-close-btn').addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Toggle button
    document.getElementById('cora-toggle-btn').addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Send button
    document.getElementById('cora-send-btn').addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Enter key in input
    document.getElementById('cora-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isWaitingForResponse) {
        this.sendMessage();
      }
    });
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen;
    const widget = document.querySelector('.cora-chat-widget');
    const toggleBtn = document.getElementById('cora-toggle-btn');
    
    if (widget && toggleBtn) {
      if (this.isOpen) {
        widget.style.display = 'flex';
        toggleBtn.style.display = 'none';
        document.getElementById('cora-input').focus();
        
        // Track Meta Pixel Event when opened for the first time
        if (typeof fbq === 'function' && !this.hasTrackedOpen) {
          fbq('trackCustom', 'OpenChatbot');
          this.hasTrackedOpen = true;
        }
      } else {
        widget.style.display = 'none';
        toggleBtn.style.display = 'flex';
      }
    }
  }
  
   async startChat() {
     try {
       const response = await fetch(`${this.apiUrl}/chat/start`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ user_id: this.userId })
       });
       
       const data = await response.json();
       if (data.success) {
         this.addMessage(data.welcome_message, 'bot');
         // Do not auto-open chat; keep it closed, toggle button visible
         this.isOpen = false;
       } else {
         this.addMessage('Sorry po, may technical issue kami. Please try again 😊', 'bot');
       }
     } catch (error) {
       console.error('Error starting chat:', error);
       this.addMessage('Sorry po, may connection issue. Please try again 😊', 'bot');
     }
   }
  
  async sendMessage() {
    const input = document.getElementById('cora-input');
    const message = input.value.trim();
    
    if (!message || this.isWaitingForResponse) return;
    
    // Track Meta Pixel Event when sending first message
    if (typeof fbq === 'function' && !this.hasTrackedMessage) {
      fbq('track', 'Contact', { content_name: 'Chatbot Message' });
      this.hasTrackedMessage = true;
    }
    
    // Add user message to chat
    this.addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    this.isWaitingForResponse = true;
    this.addTypingIndicator();
    
    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          user_id: this.userId
        })
      });
      
      const data = await response.json();
      
      // Remove typing indicator
      this.removeTypingIndicator();
      
      if (data.success) {
        this.addMessage(data.response, 'bot');
      } else {
        this.addMessage('Sorry po, may error sa response. Try again po 😊', 'bot');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.removeTypingIndicator();
      this.addMessage('Sorry po, may connection issue. Please try again 😊', 'bot');
    } finally {
      this.isWaitingForResponse = false;
      document.getElementById('cora-input').focus();
    }
  }
  
  addMessage(content, role) {
    const messagesContainer = document.getElementById('cora-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `cora-message cora-message-${role}`;
    
    // Format message content (handle line breaks and links)
    const formattedContent = this.formatMessageContent(content);
    
        messageDiv.innerHTML = `
        <div class="cora-message-avatar">${role === 'bot' ? '<img src="images/CORAlogo.png" alt="CORA" style="width: 24px; height: 24px; object-fit: contain;">' : '👤'}</div>
        <div class="cora-message-content">${formattedContent}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
    formatMessageContent(content) {
        // Replace URLs with clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let formatted = content.replace(urlRegex, '<a href="$1" target="_blank" class="cora-link">$1</a>');
        
        // Also convert relative links in the PDF directory to absolute links
        const pdfUrlRegex = /(\/PDF\/[^\s]*)/g;
        formatted = formatted.replace(pdfUrlRegex, (match) => {
            const absoluteUrl = window.location.origin + match;
            return `<a href="${absoluteUrl}" target="_blank" class="cora-link">${match}</a>`;
        });
        
        // Replace line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return `<p>${formatted}</p>`;
    }
  
  addTypingIndicator() {
    const messagesContainer = document.getElementById('cora-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'cora-message cora-message-bot cora-typing-indicator';
    typingDiv.id = 'cora-typing';
    typingDiv.innerHTML = `
      <div class="cora-message-avatar">🤖</div>
      <div class="cora-message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  removeTypingIndicator() {
    const typingDiv = document.getElementById('cora-typing');
    if (typingDiv) {
      typingDiv.remove();
    }
  }
}

// Initialize chatbot when DOM is ready
const initCORAChat = () => {
  if (window.coraChat) return; // Prevent double initialization
  
  console.log('🤖 CORA Chatbot Initializing...');
  window.coraChat = new CORAChat({
    apiUrl: '/api',
    containerId: 'cora-chat-widget',
    theme: 'light'
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCORAChat);
} else {
  initCORAChat();
}
