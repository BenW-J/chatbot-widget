(function () {
    if (window.__chatbotWidgetLoaded) return;
    window.__chatbotWidgetLoaded = true;
  
    // Inject Google Font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      #chatbot-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-family: 'Inter', sans-serif;
        z-index: 9999;
      }
  
      #chatbot-button {
        background: #0078f0;
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 0 12px rgba(0, 120, 240, 0.6);
        transition: box-shadow 0.3s ease;
      }
  
      #chatbot-button:hover {
        box-shadow: 0 0 20px rgba(0, 120, 240, 0.9);
      }
  
      #chatbot-window {
        display: none;
        flex-direction: column;
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 320px;
        height: 440px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        transform: translateY(20px);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
  
      #chatbot-window.open {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }
  
      #chatbot-header {
        background: linear-gradient(to right, #0078f0, #00b0ff);
        color: white;
        font-size: 16px;
        padding: 12px 16px;
        font-weight: bold;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }
  
      #chatbot-messages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        background: #f8f8f8;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
  
      .chatbot-msg {
        padding: 10px 14px;
        border-radius: 20px;
        max-width: 80%;
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
      }
  
      .chatbot-msg.user {
        background-color: #daf1ff;
        align-self: flex-end;
        margin-left: auto;
      }
  
      .chatbot-msg.bot {
        background-color: #ffffff;
        align-self: flex-start;
        margin-right: auto;
        border: 1px solid #eee;
      }
  
      #chatbot-input-container {
        display: flex;
        border-top: 1px solid #ddd;
      }
  
      #chatbot-input {
        flex: 1;
        padding: 12px;
        border: none;
        font-size: 14px;
        outline: none;
        border-bottom-left-radius: 16px;
      }
  
      #chatbot-send {
        background: #0078f0;
        color: white;
        border: none;
        padding: 12px 16px;
        cursor: pointer;
        border-bottom-right-radius: 16px;
        font-weight: bold;
      }
  
      #chatbot-send:hover {
        background: #005ec4;
      }
    `;
    document.head.appendChild(style);
  
    // Create widget HTML
    const container = document.createElement('div');
    container.id = 'chatbot-widget';
    container.innerHTML = `
      <button id="chatbot-button">💬</button>
      <div id="chatbot-window">
        <div id="chatbot-header">Chat with us</div>
        <div id="chatbot-messages"></div>
        <div id="chatbot-input-container">
          <input id="chatbot-input" type="text" placeholder="Type your message..." />
          <button id="chatbot-send">Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  
    const button = document.getElementById('chatbot-button');
    const windowEl = document.getElementById('chatbot-window');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
  
    button.onclick = () => {
      const isOpen = windowEl.classList.contains('open');
      windowEl.classList.toggle('open', !isOpen);
    };
  
    function appendMessage(content, sender) {
      const msg = document.createElement('div');
      msg.className = `chatbot-msg ${sender}`;
      msg.textContent = content;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
  
    async function handleSend() {
      const userMsg = input.value.trim();
      if (!userMsg) return;
  
      appendMessage(userMsg, 'user');
      input.value = '';
  
      // Simulated response
      setTimeout(() => {
        appendMessage("Thanks for your message! I'm a demo chatbot 🤖", 'bot');
      }, 600);
    }
  
    sendBtn.onclick = handleSend;
    input.onkeypress = (e) => {
      if (e.key === 'Enter') handleSend();
    };
  })();
  