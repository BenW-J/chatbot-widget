//V1.0.0
(function () {
  if (window.__chatbotWidgetLoaded) return;
  window.__chatbotWidgetLoaded = true;

  const emailIconURL = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/animations/email_support.json";
  const avatarURL = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/animations/support_woman.json";

  window.ChatbotWidget = {
    open: () => {
      const win = document.querySelector("#chatbot-widget-host").shadowRoot.querySelector("#chatbot-window");
      const btnOpen = document.querySelector("#chatbot-widget-host").shadowRoot.querySelector("#chatbot-open");
      if (win && btnOpen) {
        win.classList.remove("hidden", "scale-95", "opacity-0");
        win.classList.add("scale-100", "opacity-100");
        btnOpen.classList.add("hidden");
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

    // Inject compiled CSS from jsDelivr
    const style = document.createElement("link");
    style.rel = "stylesheet";
    //style.href = "./widget.css";
    style.href = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/widget.css";
    document.head.appendChild(style);

    // Load Lottie, then init
    const lottieScript = document.createElement("script");
    lottieScript.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    lottieScript.onload = () => {
    initChatWidget();
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

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/widget.css";

    shadow.appendChild(styleLink);

    const widget = document.createElement("div");
    widget.innerHTML = `
        <button id="chatbot-open" class="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden bg-transparent p-0">
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
        class="hidden w-[90vw] max-w-md h-[75vh] sm:w-96 sm:h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden transition-all transform scale-95 opacity-0 duration-300"
      >

        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b bg-white">
          <div class="flex items-center gap-2">
            ${
              config.avatar.endsWith(".json")
                ? `<lottie-player src="${config.avatar}" background="transparent" speed="1" style="width: 42px; height: 42px;" autoplay loop></lottie-player>`
                : `<img src="${config.avatar}" class="w-6 h-6 rounded-full" alt="bot avatar"/>`
            }
            <div class="font-semibold text-sm">${config.botName}</div>
          </div>
          <button id="chatbot-close" class="text-gray-400 hover:text-gray-600 text-lg">−</button>
        </div>

        <!-- Messages -->
        <div id="chatbot-messages" class="flex-1 px-4 py-3 overflow-y-auto text-sm space-y-3 flex flex-col"
               style="background-color: ${config.theme.bgColor};" ></div>

        <!-- Input -->
        <div class="border-t border-gray-200 bg-white px-2 py-2">
          <div class="flex items-end gap-2">
            <textarea
              id="chatbot-input"
              class="flex-1 resize-none px-4 py-2 text-sm border rounded-full shadow-sm min-h-[36px] max-h-[90px] overflow-y-auto leading-tight focus:outline-none"
              style="line-height: 1.4; height: auto;"
            ></textarea>
            <button id="chatbot-send"
                class="text-xl hover:scale-110 transition"
                style="color: ${config.theme.accent};">➤</button>

          </div>
        </div>
      </div>
    `;

    shadow.appendChild(widget);
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
      win.classList.remove("hidden");
      btnOpen.classList.add("hidden");
      requestAnimationFrame(() => {
        win.classList.remove("scale-95", "opacity-0");
        win.classList.add("scale-100", "opacity-100");
      });

      if (!win.dataset.initiated) {
        appendMessage(config.welcomeMessage, "bot");
        if (config.options?.length) appendOptions(config.options);
        win.dataset.initiated = true;
      }
    }

    function hideWindow() {
      win.classList.remove("scale-100", "opacity-100");
      win.classList.add("scale-95", "opacity-0");
      setTimeout(() => {
        win.classList.add("hidden");
        btnOpen.classList.remove("hidden");
      }, 300);
    }

    function appendMessage(content, sender) {
      const wrapper = document.createElement("div");
      wrapper.className = `flex items-end gap-2 ${sender === "user" ? "justify-end" : ""}`;

      const bubble = document.createElement("div");
      bubble.className = `
        max-w-[75%]
        px-4 py-2
        text-sm
        break-words
        whitespace-pre-wrap
        rounded-xl
        ${sender === "user"
          ? "bg-blue-100 text-right rounded-br-none"
          : "bg-white text-left border border-gray-200 rounded-bl-none"}
      `;
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
          avatar.className = "w-6 h-6 rounded-full";
        }
        wrapper.insertBefore(avatar, bubble);
      }

      messages.appendChild(wrapper);
      messages.scrollTop = messages.scrollHeight;
    }

    function appendTypingIndicator() {
      const wrapper = document.createElement("div");
      wrapper.className = "self-start flex items-center gap-2 typing-indicator";

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
        avatar.className = "w-6 h-6 rounded-full";
      }
      wrapper.appendChild(avatar);

      const dots = document.createElement("div");
      dots.className = "flex gap-1";
      dots.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:.1s]"></span>
        <span class="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:.2s]"></span>
      `;
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
      wrapper.className = "flex flex-wrap gap-2 self-start";
    
      options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "px-3 py-[6px] border text-sm rounded-full transition";
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
