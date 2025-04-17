//V1.0.0
(function () {
    if (window.__chatbotWidgetLoaded) return;
    window.__chatbotWidgetLoaded = true;
  
    const emailIconURL = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/animations/email-support.json";
    const avatarURL = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/animations/support-woman.json";
  
    window.ChatbotWidget = {
      open: () => {
        const win = document.querySelector("#chatbot-widget-host").shadowRoot.querySelector("#chatbot-window");
        const btnOpen = document.querySelector("#chatbot-widget-host").shadowRoot.querySelector("#chatbot-open");
        if (win && btnOpen) {
            win.style.display = "flex";
            btnOpen.style.display = "none";            
        }
      }
    };
    
    const config = window.chatbotWidgetConfig || {
      botName: "Connie",
      welcomeMessage: "Hi there! I’m Connie from Build Connector. I can help you find the right construction professional — what type of service do you need?",
      options: ["Shop Fitter", "Electrician", "Plumber", "Builder"],
      theme: {
        accent: "#3539f2",
        bgColor: "#f9fafb"
      },
      avatar: avatarURL
    };
    
      // Load Lottie, then init
      const lottieScript = document.createElement("script");
      lottieScript.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      lottieScript.onload = () => {
        try {
          initChatWidget();
        } catch (e) {
          console.error("Chatbot widget failed to initialize:", e);
        }
      };      
      document.head.appendChild(lottieScript);
  
  
    // All chatbot logic inside this
    function initChatWidget() {
      const host = document.createElement("div");
      host.id = "chatbot-widget-host";
      host.style.position = "fixed";
      host.style.bottom = "1rem";
      host.style.right = "1rem";
      host.style.zIndex = "9999";
  
      const shadow = host.attachShadow({ mode: "open" });

      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
      shadow.appendChild(fontLink);            
  
      const widget = document.createElement("div");
      widget.innerHTML = `
      <button id="chatbot-open" aria-label="Open chat"
        style="
          width: 64px;
          height: 64px;
          border-radius: 50%;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          background: transparent;
          padding: 0;
          overflow: hidden;
          transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
        "
        onmouseover="this.style.boxShadow='0 20px 25px -5px rgba(0,0,0,0.15)'"
        onmouseout="this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'"
      >
        <lottie-player
          src="${emailIconURL}"
          background="transparent"
          speed="1"
          autoplay
          loop
          style="width: 64px; height: 64px"
        ></lottie-player>
      </button>
    
      <div id="chatbot-window"
        style="
          display: none;
          width: 90vw;
          max-width: 420px;
          height: 75vh;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          overflow: hidden;
          transform: scale(0.95);
          opacity: 0;
          transition: all 0.3s ease-in-out;
          flex-direction: column;
        "
      >
        <!-- Header -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        ">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            ${
              config.avatar.endsWith(".json")
                ? `<lottie-player src="${config.avatar}" background="transparent" speed="1" style="width: 42px; height: 42px;" autoplay loop></lottie-player>`
                : `<img src="${config.avatar}" style="width: 24px; height: 24px; border-radius: 50%;" alt="bot avatar"/>`
            }
            <div style="font-weight: 600; font-size: 0.875rem;">${config.botName}</div>
          </div>
        <button id="chatbot-close" aria-label="Close chat"
            style="font-size: 1.25rem; color: #9ca3af; border: none; background: transparent; cursor: pointer; display: flex; align-items: center"
            onmouseover="this.style.color='#4b5563'"
            onmouseout="this.style.color='#9ca3af'"
          >−</button>
        </div>
    
        <!-- Messages -->
        <div id="chatbot-messages"
          style="
            flex: 1;
            padding: 0.75rem 1rem;
            overflow-y: auto;
            font-size: 0.875rem;
            line-height: 1.25;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background-color: ${config.theme.bgColor};
          "
        ></div>
    
        <!-- Input -->
        <div style="border-top: 1px solid #e5e7eb; background: white; padding: 0.5rem;">
          <div style="display: flex; align-items: flex-end; gap: 0.5rem;">
            <textarea
              id="chatbot-input"
              style="
                flex: 1;
                resize: none;
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                border: 1px solid #d1d5db;
                border-radius: 20px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                min-height: 36px;
                max-height: 90px;
                overflow-y: auto;
                line-height: 1.4;
                height: auto;
                outline: none;
              "
            ></textarea>
            <button id="chatbot-send" aria-label="Send message"
              style="
                font-size: 1.25rem;
                border: none;
                background: transparent;
                cursor: pointer;
                transition: transform 0.2s ease-in-out;
                color: ${config.theme.accent};
              "
              onmouseover="this.style.transform='scale(1.1)'"
              onmouseout="this.style.transform='scale(1)'"
            >➤</button>
          </div>
        </div>
      </div>
    `;
    
    const fontStyle = document.createElement("style");
    fontStyle.textContent = `
    :host, * {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;  
    shadow.appendChild(fontStyle);
    const responsiveStyle = document.createElement("style");
    responsiveStyle.textContent = `
      @media (min-width: 640px) {
        #chatbot-window {
          width: 384px !important; 
          height: 600px !important;
        }
      }
    
      @media (max-width: 480px) {
        #chatbot-window {
            height: 90vh !important;
            width: 95vw !important;
        }
        }
    `;
    shadow.appendChild(responsiveStyle);
    

    const keyframeStyle = document.createElement("style");
    keyframeStyle.textContent = `
    @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
    `;
      shadow.appendChild(keyframeStyle);

  
      shadow.appendChild(widget);
      shadow.host.setAttribute("lang", "en");

      document.body.appendChild(host);
  
      const btnOpen = shadow.getElementById("chatbot-open");
      const btnClose = shadow.getElementById("chatbot-close");
      const win = shadow.getElementById("chatbot-window");
      const input = shadow.getElementById("chatbot-input");
      input.addEventListener("focus", () => {
        input.style.boxShadow = `0 0 0 1px ${config.theme.accent}`;
      });
      
      input.addEventListener("blur", () => {
        input.style.boxShadow = "none";
      });
      
      const sendBtn = shadow.getElementById("chatbot-send");
      const messages = shadow.getElementById("chatbot-messages");
  
      function showWindow() {
        win.style.display = "flex";
        btnOpen.style.display = "none";
        requestAnimationFrame(() => {
          win.style.transform = "scale(1)";
          win.style.opacity = "1";
        });
      
        if (!win.dataset.initiated) {
          appendMessage(config.welcomeMessage, "bot");
          if (config.options?.length) appendOptions(config.options);
          win.dataset.initiated = true;
        }
      }
      
      function hideWindow() {
        win.style.transform = "scale(0.95)";
        win.style.opacity = "0";
        setTimeout(() => {
          win.style.display = "none";
          btnOpen.style.display = "block";
        }, 300);
      }
        
      function appendMessage(content, sender) {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "flex-end";
        wrapper.style.gap = "0.5rem";
        if (sender === "user") wrapper.style.justifyContent = "flex-end";
  
        const bubble = document.createElement("div");
        bubble.style.maxWidth = "75%";
        bubble.style.padding = "0.5rem 1rem";
        bubble.style.fontSize = "0.875rem";
        bubble.style.overflowWrap = "break-word";
        bubble.style.whiteSpace = "pre-wrap";
        bubble.style.borderRadius = "0.75rem";
        
        if (sender === "user") {
          bubble.style.backgroundColor = "#dbeafe"; // Tailwind blue-100
          bubble.style.textAlign = "right";
          bubble.style.borderBottomRightRadius = "0";
        } else {
          bubble.style.backgroundColor = "#ffffff";
          bubble.style.textAlign = "left";
          bubble.style.border = "1px solid #e5e7eb"; // Tailwind gray-200
          bubble.style.borderBottomLeftRadius = "0";
        }
        
        bubble.textContent = content;
  
        wrapper.appendChild(bubble);
  
        if (sender === "bot" && config.avatar) {
          let avatar;
          if (window.customElements?.get("lottie-player") && config.avatar.endsWith(".json")) {
            avatar = document.createElement("lottie-player");
            avatar.setAttribute("src", config.avatar);
            avatar.setAttribute("autoplay", true);
            avatar.setAttribute("loop", true);
            avatar.setAttribute("background", "transparent");
            avatar.style.width = "36px";
            avatar.style.height = "36px";
          } else {
            avatar = document.createElement("img");
            avatar.src = config.avatar;
            avatar.alt = "bot avatar";
            avatar.style.width = "24px";
            avatar.style.height = "24px";
            avatar.style.borderRadius = "9999px";            
          }
          wrapper.insertBefore(avatar, bubble);
        }
  
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
      }
  
      function appendTypingIndicator() {
        const wrapper = document.createElement("div");
        wrapper.className = "typing-indicator";
        wrapper.style.alignSelf = "flex-start";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "0.5rem";
  
        let avatar;
        if (window.customElements?.get("lottie-player") && config.avatar.endsWith(".json")) {
          avatar = document.createElement("lottie-player");
          avatar.setAttribute("src", config.avatar);
          avatar.setAttribute("autoplay", true);
          avatar.setAttribute("loop", true);
          avatar.setAttribute("background", "transparent");
          avatar.style.width = "24px";
          avatar.style.height = "24px";
        } else {
          avatar = document.createElement("img");
          avatar.src = config.avatar;
          avatar.alt = "bot avatar";
          avatar.style.width = "24px";
          avatar.style.height = "24px";
          avatar.style.borderRadius = "9999px";          
        }
        wrapper.appendChild(avatar);
  
        const dots = document.createElement("div");
        dots.style.display = "flex";
        dots.style.gap = "0.25rem";        
        ["0s", "0.1s", "0.2s"].forEach((delay) => {
            const dot = document.createElement("span");
            dot.style.width = "8px";
            dot.style.height = "8px";
            dot.style.borderRadius = "50%";
            dot.style.backgroundColor = "#9ca3af"; // Tailwind gray-400
            dot.style.animation = `bounce 1s infinite`;
            dot.style.animationDelay = delay;
            dots.appendChild(dot);
          });          
        wrapper.appendChild(dots);
  
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
        return wrapper;
      }
  
      function removeTypingIndicator(indicator) {
        if (indicator) indicator.remove();
      }
  
      function appendOptions(options) {
        const wrapper = document.createElement("div");
        wrapper.id = "chatbot-options";
        wrapper.style.display = "flex";
        wrapper.style.flexWrap = "wrap";
        wrapper.style.gap = "0.5rem"; // gap-2 = ~8px
        wrapper.style.alignSelf = "flex-start";        
      
        options.forEach((opt) => {
          const btn = document.createElement("button");
          btn.textContent = opt;
          btn.style.padding = "6px 12px"; // px-3 (12px horizontal), py-[6px]
          btn.style.fontSize = "0.875rem"; // text-sm
          btn.style.border = `1px solid ${config.theme.accent}`;
          btn.style.borderRadius = "9999px";
          btn.style.background = "transparent";
          btn.style.cursor = "pointer";
          btn.style.transition = "all 0.2s ease-in-out";
          btn.style.color = config.theme.accent;          
          btn.style.borderColor = config.theme.accent;
          btn.onmouseover = () => {
            btn.style.backgroundColor = config.theme.accent;
            btn.style.color = "#fff";
          };
          btn.onmouseout = () => {
            btn.style.backgroundColor = "";
            btn.style.color = config.theme.accent;
          };
  
          btn.onclick = () => {
            const message = `I need a ${opt}`;
            appendMessage(message, "user");
            wrapper.remove(); // remove options from the UI
            threadId = null; // reset thread if needed
            input.value = ""; // just in case
            input.style.height = "auto";
      
            const typing = appendTypingIndicator();
      
            fetch("https://buildconnect1.bwagjor.workers.dev", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userQuery: message, threadId })
            })
              .then(res => res.json())
              .then(data => {
                threadId = data.threadId;
                removeTypingIndicator(typing);
                if (data.reply) {
                  appendMessage(data.reply.trim(), "bot");
                } else {
                  appendMessage("Sorry, no reply received.", "bot");
                }
              })
              .catch(err => {
                removeTypingIndicator(typing);
                appendMessage("Something went wrong.", "bot");
                console.error("Chatbot error:", err);
              });
          };
      
          wrapper.appendChild(btn);
        });
      
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
      }
      
      function removeOptions() {
        const optWrapper = shadow.getElementById("chatbot-options");
        if (optWrapper) optWrapper.remove();
      }
    
  
      function handleSend() {
        const msg = input.value.trim();
        if (!msg) return;
  
        removeOptions(); // Hide buttons if visible    
        appendMessage(msg, "user");
        input.value = "";
        input.style.height = "auto";
      
        const typing = appendTypingIndicator();
      
        // 🔁 Call your Cloudflare Worker
        fetch("https://buildconnect1.bwagjor.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userQuery: msg, threadId }) // send it
        })
          .then(res => res.json())
          .then(data => {
            threadId = data.threadId;
            removeTypingIndicator(typing);
            if (data.reply) {
              appendMessage(data.reply.trim(), "bot");
            } else if (data.error) {
              appendMessage("Error: " + data.error, "bot");
            } else {
              appendMessage("Sorry, no reply received.", "bot");
            }
          })             
          .catch(err => {
            removeTypingIndicator(typing);
            appendMessage("Sorry, something went wrong.", "bot");
            console.error("Chatbot error:", err);
          });
      }
      
  
      // Input height adjustment
      input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = Math.min(input.scrollHeight, 90) + "px";
      });
  
      // Events
      btnOpen.onclick = showWindow;
      btnClose.onclick = hideWindow;
      sendBtn.onclick = handleSend;
      input.onkeydown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };
    }
    let threadId = null;
  })();
  