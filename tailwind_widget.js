(function () {
  if (window.__chatbotWidgetLoaded) return;
  window.__chatbotWidgetLoaded = true;

  const config = window.chatbotWidgetConfig || {
    botName: "Connie",
    welcomeMessage: "Hi there! I’m Connie from Build Connector. I can help you find the right construction professional — what type of service do you need?",
    options: ["Shop Fitter", "Electrician", "Plumber", "Builder"],
    theme: {
      accent: "#3539f2",
      bgColor: "#f9fafb"
    },
    avatar: "./animations/Muslim Woman.json" // or use an image
  };

  // Load Tailwind
  const twScript = document.createElement("script");
  twScript.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(twScript);

  // After Tailwind loads, load Lottie, then init the widget
  twScript.onload = () => {
    const lottieScript = document.createElement("script");
    lottieScript.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    lottieScript.onload = () => {
      initChatWidget(); // ✅ start only after Lottie is available
    };
    document.head.appendChild(lottieScript);
  };

  // All chatbot logic inside this
  function initChatWidget() {
    const widget = document.createElement("div");
    widget.id = "chatbot-widget";
    widget.className = "fixed bottom-4 right-4 z-[9999] font-sans";

    widget.innerHTML = `
        <button id="chatbot-open" class="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden bg-transparent p-0">
            <lottie-player
              src="./animations/email support.json"
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
        <div id="chatbot-messages" class="flex-1 px-4 py-3 overflow-y-auto bg-[${config.theme.bgColor}] text-sm space-y-3 flex flex-col"></div>

        <!-- Input -->
        <div class="border-t border-gray-200 bg-white px-2 py-2">
          <div class="flex items-end gap-2">
            <textarea
              id="chatbot-input"
              rows="1"
              placeholder="Write a message..."
              class="flex-1 resize-none px-4 py-2 text-sm border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[${config.theme.accent}]
              min-h-[36px] max-h-[90px] overflow-y-auto leading-tight"
              style="line-height: 1.4; height: auto;"
            ></textarea>
            <button id="chatbot-send" class="text-[${config.theme.accent}] text-xl hover:scale-110 transition">➤</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    const btnOpen = document.getElementById("chatbot-open");
    const btnClose = document.getElementById("chatbot-close");
    const win = document.getElementById("chatbot-window");
    const input = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("chatbot-send");
    const messages = document.getElementById("chatbot-messages");

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
          avatar.style.width = "24px";
          avatar.style.height = "24px";
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
        btn.className = `px-3 py-[6px] border text-sm rounded-full text-[${config.theme.accent}] border-[${config.theme.accent}] hover:bg-[${config.theme.accent}] hover:text-white transition`;
        
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
    

    function handleSend() {
      const msg = input.value.trim();
      if (!msg) return;
    
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
