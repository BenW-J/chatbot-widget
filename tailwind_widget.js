(function () {
    if (window.__chatbotWidgetLoaded) return;
    window.__chatbotWidgetLoaded = true;
  
    const config = window.chatbotWidgetConfig || {
      botName: "Connie",
      welcomeMessage: "Hi, what sort of tradesperson are you looking for today?",
      options: ["Shop Fitter", "Electrician", "Plumber", "Builder"],
      theme: {
        accent: "#6366f1", // electric blue
        bgColor: "#f9fafb" // light grey
      }
    };
  
    const twScript = document.createElement("script");
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);
  
    twScript.onload = () => {
      const widget = document.createElement("div");
      widget.id = "chatbot-widget";
      widget.className = "fixed bottom-4 right-4 z-[9999] font-sans";
  
      widget.innerHTML = `
        <button id="chatbot-open" class="w-14 h-14 rounded-full bg-[${config.theme.accent}] text-white text-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          💬
        </button>
  
        <div id="chatbot-window"
          class="hidden flex-col w-80 h-[520px] bg-white rounded-2xl shadow-xl overflow-hidden transition-all transform scale-95 opacity-0 duration-300"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-4 py-3 border-b bg-white">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400"></div>
              <div class="font-semibold text-sm">${config.botName}</div>
            </div>
            <button id="chatbot-close" class="text-gray-400 hover:text-gray-600 text-lg">−</button>
          </div>
  
          <!-- Messages -->
          <div id="chatbot-messages" class="flex-1 px-4 py-3 overflow-y-auto bg-[${config.theme.bgColor}] text-sm space-y-3 flex flex-col"></div>
  
          <!-- Input -->
          <div class="border-t border-gray-200 p-2 bg-white">
            <div class="flex items-center gap-2">
              <input id="chatbot-input" type="text" placeholder="Write a message..."
                class="flex-1 px-4 py-[6px] text-sm border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[${config.theme.accent}]"
              />
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
  
      // Show/hide with animation
      function showWindow() {
        win.classList.remove("hidden");
        btnOpen.classList.add("hidden");
        requestAnimationFrame(() => {
          win.classList.remove("scale-95", "opacity-0");
          win.classList.add("scale-100", "opacity-100");
        });
  
        // Only trigger once
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
        const msg = document.createElement("div");
        msg.className = `max-w-[85%] px-4 py-2 rounded-xl ${
          sender === "user"
            ? "bg-blue-100 self-end text-right"
            : "bg-white self-start shadow-sm border border-gray-100"
        }`;
        msg.textContent = content;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
      }
  
      function appendOptions(options) {
        const wrapper = document.createElement("div");
        wrapper.className = "flex flex-wrap gap-2 self-start";
  
        options.forEach((opt) => {
          const btn = document.createElement("button");
          btn.textContent = opt;
          btn.className = `px-3 py-[6px] border text-sm rounded-full text-[${config.theme.accent}] border-[${config.theme.accent}] hover:bg-[${config.theme.accent}] hover:text-white transition`;
          btn.onclick = () => {
            appendMessage(opt, "user");
            wrapper.remove();
            setTimeout(() => {
              appendMessage(`Thanks for choosing ${opt}!`, "bot");
            }, 800);
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
  
        setTimeout(() => {
          appendMessage("Thanks! We'll be in touch shortly.", "bot");
        }, 1000);
      }
  
      // Events
      btnOpen.onclick = showWindow;
      btnClose.onclick = hideWindow;
      sendBtn.onclick = handleSend;
      input.onkeypress = (e) => {
        if (e.key === "Enter") handleSend();
      };
    };
  })();
  